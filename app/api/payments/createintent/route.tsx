import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Hardcoded values for demo
export async function POST() {
	try {
		const res = await stripe.paymentIntents.create({
			amount: 3999,
			currency: "aud",
			automatic_payment_methods: {
				enabled: true,
			},
		});
		return NextResponse.json(res);
	} catch (error: any) {
		console.log(error.message);
		throw error;
	}
}
