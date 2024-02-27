import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export const POST = async (req: Request) => {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return new NextResponse(`Webhook error: ${error}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;

  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      return new NextResponse("Webhook error: Metadata Missing", {
        status: 400,
      });
    }

    await db.purchase.create({
      data: {
        courseId: courseId as string,
        userId: userId as string,
      },
    });
  } else {
    return new NextResponse("Webhook error: Unhandled Event Log", {
      status: 200,
    });
  }

  return new NextResponse(null, { status: 200 });
};
