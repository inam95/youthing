import { Sidebar, SidebarContent, SidebarSeparator } from "@/components/ui/sidebar";

import { MainSection } from "./main-section";
import { PersonalSection } from "./personal-section";

export function HomeSidebar() {
  return (
    <Sidebar className="z-40 border-none pt-16" collapsible="icon">
      <SidebarContent className="bg-background">
        <MainSection />
        <SidebarSeparator />
        <PersonalSection />
      </SidebarContent>
    </Sidebar>
  );
}
