"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { FilterCarousel } from "@/components/filter-carousel";
import { useTRPC } from "@/trpc/client";

interface CategoriesSectionProps {
  categoryId: string;
}

export function CategoriesSection({ categoryId }: CategoriesSectionProps) {
  return (
    <Suspense fallback={<FilterCarousel isLoading data={[]} onSelect={() => {}} />}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <CategoriesSectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
}

function CategoriesSectionSuspense({ categoryId }: CategoriesSectionProps) {
  const router = useRouter();
  const trpc = useTRPC();
  const categories = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  const onSelect = (value: string | null) => {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set("categoryId", value);
    } else {
      url.searchParams.delete("categoryId");
    }
    router.push(url.toString());
  };

  return (
    <FilterCarousel
      value={categoryId}
      data={categories.data.map((category) => ({
        value: category.id,
        label: category.name,
      }))}
      onSelect={onSelect}
    />
  );
}
