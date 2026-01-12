import { db } from "@/db";
import { categories } from "@/db/schema";

const categoryNames = [
  "Cars and Vehicles",
  "Comedy",
  "Education",
  "Gaming",
  "Film and Animation",
  "How-to and Style",
  "Music",
  "News and Politics",
  "People and Blogs",
  "Pets and Animals",
  "Science and Technology",
  "Travel and Events",
  "Sports",
  "Tech",
  "Food and Drink",
  "Fashion",
  "Health and Fitness",
  "Entertainment",
];

async function main() {
  console.log("Seeding categories...");
  try {
    const values = categoryNames.map((name) => ({
      name,
      description: `Videos related to ${name.toLowerCase()}`,
    }));

    await db.insert(categories).values(values);
    console.log("Categories seeded successfully");
  } catch (error) {
    console.log("Error seeding categories:", error);
    process.exit(1);
  }
}

main();
