import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";

import { db } from "@/db";
import { users } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    const eventType = evt.type;

    if (eventType === "user.created") {
      const data = evt.data;
      console.log(`Received webhook with ID ${data.id} and event type of ${eventType}`);
      console.log("Webhook payload:", evt.data);
      await db.insert(users).values({
        clerkId: data.id,
        name: `${data.first_name} ${data.last_name}`,
        imageUrl: data.image_url,
      });
    }

    if (eventType === "user.deleted") {
      const data = evt.data;
      console.log(`Received webhook with ID ${data.id} and event type of ${eventType}`);
      console.log("Webhook payload:", evt.data);
      if (!data.id) {
        return new Response("Missing user id", { status: 400 });
      }
      await db.delete(users).where(eq(users.clerkId, data.id));
    }

    if (eventType === "user.updated") {
      const data = evt.data;
      console.log(`Received webhook with ID ${data.id} and event type of ${eventType}`);
      console.log("Webhook payload:", evt.data);
      await db
        .update(users)
        .set({
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        })
        .where(eq(users.clerkId, data.id));
    }

    return new Response("Webhook received", { status: 200 });
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
