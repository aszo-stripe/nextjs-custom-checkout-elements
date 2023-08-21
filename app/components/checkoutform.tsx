"use client";
import { useState } from "react";
import {
	StripePaymentElementOptions,
	LayoutObject,
	StripeExpressCheckoutElementConfirmEvent,
	StripeAddressElementOptions,
} from "@stripe/stripe-js";
import {
	Elements,
	PaymentElement,
	LinkAuthenticationElement,
	ExpressCheckoutElement,
	AddressElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import { themes, layouts } from "@/lib/checkout";
import SectionHeader from "@/app/components/sectionheader";
import Spinner from "@/app/components/spinner";
import { getHostname } from "@/lib/utils";

export default function CheckoutForm({
	link,
	expressCheckout,
	address,
	addressElementOptions,
	paymentElementOptions,
	layout,
}: {
	link: boolean;
	expressCheckout: boolean;
	address: boolean;
	addressElementOptions: StripeAddressElementOptions;
	paymentElementOptions: StripePaymentElementOptions;
	layout: LayoutObject;
}) {
	const [errorMessage, setErrorMessage] = useState<string>();
	const [successMessage, setSuccessMessage] = useState<string>();
	const [loading, setLoading] = useState(false);

	const stripe = useStripe();
	const elements = useElements();

	const onSubmit = async (
		e: React.FormEvent | StripeExpressCheckoutElementConfirmEvent
	) => {
		if ("preventDefault" in e) {
			e.preventDefault();
		}

		if (!stripe || !elements) {
			return;
		}

		setLoading(true);

		const { error: submitError } = await elements.submit();

		if (submitError) {
			setErrorMessage(submitError.message);
			setLoading(false);
			return;
		}

		try {
			const response = await fetch("/api/payments/createintent", {
				method: "POST",
			});
			if (response.status !== 200) {
				throw response.statusText;
			}
			const { client_secret: clientSecret } = await response.json();
			const { error } = await stripe.confirmPayment({
				elements,
				clientSecret,
				confirmParams: {
					return_url: `${getHostname()}`,
				},
				redirect: "if_required",
			});

			if (error) {
				setErrorMessage(error.message);
				setLoading(false);
			} else {
				setSuccessMessage("Payment successful");
				setErrorMessage("");
			}
		} catch (error: any) {
			setErrorMessage(error);
			setLoading(false);
			return;
		}
		setLoading(false);
	};

	return (
		<form onSubmit={onSubmit} className="max-w-md m-auto h-full flex flex-col">
			{successMessage && (
				<div>
					<div className="bg-green-200 text-green-800 p-3 mb-3 text-center font-semibold">
						{successMessage}
					</div>
					<a
						href="/"
						className="bg-blurple text-white font-semibold px-2 py-1 rounded-md hover:drop-shadow-lg float-right"
					>
						Restart
					</a>
				</div>
			)}
			{expressCheckout && (
				<div className="mb-4">
					<SectionHeader>Express Checkout</SectionHeader>
					<ExpressCheckoutElement onConfirm={onSubmit} />
				</div>
			)}
			{link && (
				<div>
					<LinkAuthenticationElement />
				</div>
			)}
			{address && (
				<div>
					<SectionHeader>Shipping details</SectionHeader>
					<AddressElement options={addressElementOptions} />
				</div>
			)}
			<div className="mb-4">
				<SectionHeader>Payment</SectionHeader>
				<PaymentElement options={paymentElementOptions} />
			</div>
			{errorMessage && (
				<div className="bg-red-200 text-red-600 p-3 mb-3 text-center font-semibold">
					{errorMessage}
				</div>
			)}
			{!successMessage && (
				<button
					className="p-3 w-full relative rounded-md mt-auto center text-lg font-semibold text-white disabled:bg-gray-200 disabled:text-gray-500 bg-blue-600"
					type="submit"
					disabled={loading}
				>
					Pay
					{loading && <Spinner />}
				</button>
			)}
		</form>
	);
}
