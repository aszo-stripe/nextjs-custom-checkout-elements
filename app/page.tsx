"use client";
import { useState } from "react";
import {
	loadStripe,
	StripeElementsOptions,
	StripePaymentElementOptions,
	LayoutObject,
	Appearance,
	ContactOption,
	StripeAddressElementOptions,
} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { themes, layouts } from "@/lib/checkout";
import CheckoutForm from "./components/checkoutform";
import SectionHeader from "@/app/components/sectionheader";
import {
	SettingsPanel,
	SettingToggle,
	SettingSelectObject,
	SettingTabs,
} from "@/app/components/settingspanel";
import Image from "next/image";
import Link from "next/link";
import {
	Cog8ToothIcon,
	ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";
import CodeBlock from "@/app/components/codeblock";
import { prettyPrintJson } from "@/lib/utils";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? ""
);

export default function Checkout() {
	const [showSettings, setShowSettings] = useState(false);
	const [link, setLink] = useState(false);
	const [expressCheckout, setExpressCheckout] = useState(false);
	const [address, setAddress] = useState(false);
	const [layout, setLayout] = useState("accordion");
	const [theme, setTheme] = useState("stripe");
	const [addressContacts, setAddressContacts] = useState(false);
	const [addressPhone, setAddressPhone] = useState(true);
	const [addressMode, setAddressMode] = useState("shipping");
	const [prefillEmail, setPrefillEmail] = useState(false);

	const elementsOptions: StripeElementsOptions = {
		mode: "payment",
		currency: "aud",
		amount: 3499,
		appearance: themes[theme].output as Appearance,
	};

	const paymentElementOptions: StripePaymentElementOptions = {
		layout: layouts[layout].output as LayoutObject,
	};

	const sampleContact: ContactOption = {
		name: "Jenny Rosen",
		address: {
			line1: "1 Sussex Street",
			city: "Barangaroo",
			state: "New South Wales",
			postal_code: "2000",
			country: "AU",
		},
	};

	const addressElementOptions: StripeAddressElementOptions = {
		mode: addressMode as "shipping" | "billing",
		fields: {
			phone: addressPhone ? "always" : "never",
		},
		contacts: addressContacts ? [sampleContact] : undefined,
	};

	const appearanceString =
		"const appearance = " + prettyPrintJson(themes[theme].output);
	const elementsOptionsString =
		`const elementsOptions = {\n` +
		`  mode: "payment",\n` +
		`  currency: "aud",\n` +
		`  amount: 3999,\n` +
		`  appearance,\n` +
		`}`;
	const paymentElementOptionsString =
		"const paymentElementOptions = " + prettyPrintJson(paymentElementOptions);

	const addressElementOptionsString =
		"const addressElementOptions = " + prettyPrintJson(addressElementOptions);

	const handleAddressReload = async (toggle: () => void) => {
		setAddress(false);
		await toggle();
		setAddress(true);
	};

	const handleRemovePrefill = async (toggle: () => void) => {
		toggle();
	};

	return (
		<Elements stripe={stripePromise} options={elementsOptions}>
			<main className={`h-screen relative z-0 ${themes[theme].className}`}>
				<button
					className="absolute top-5 right-5 text-gray-500 dark:text-white z-10"
					onClick={() => setShowSettings(true)}
				>
					<Cog8ToothIcon className="h-10 w-10" />
				</button>
				<div className="max-w-7xl m-auto">
					<div className="flex flex-row dark:text-white">
						<div className="flex-auto p-4 border-r-2">
							<CheckoutForm
								link={link}
								expressCheckout={expressCheckout}
								address={address}
								addressElementOptions={addressElementOptions}
								paymentElementOptions={paymentElementOptions}
								layout={layouts[layout].output as LayoutObject}
							/>
						</div>
						<div className="w-1/2 p-4">
							<div className="max-w-xs m-auto text-mdtext-gray-600">
								<h2 className="text-lg text-center font-semibold">
									High Growth Handbook
								</h2>
								<div className="h-96 w-full relative my-8 drop-shadow-2xl">
									<Image
										src="/images/high_growth_handbook.png"
										alt="An image of the book"
										fill={true}
										style={{ objectFit: "contain" }}
									/>
								</div>
								<div className="flex justify-between pb-4">
									<div>Subtotal</div>
									<div className="">$34.99</div>
								</div>
								<div className="border-b border-gray-200 flex justify-between pb-4">
									<div>Shipping</div>
									<div className="">$5</div>
								</div>
								<div className="flex justify-between py-3 font-semibold text-lg light:text-gray-900">
									<div>Total</div>
									<div>$39.99</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
			<SettingsPanel
				open={showSettings}
				setOpen={setShowSettings}
				title="Settings"
			>
				<div className="flex flex-col">
					<Link
						href="https://dashboard.stripe.com/test/settings/payment_methods"
						target="_blank"
						className="flex items-center self-start text-blurple underline hover:text-indigo-700 gap-1"
					>
						<div>Manage payment methods</div>
						<ArrowTopRightOnSquareIcon className="h-5 w-5" />
					</Link>
					<SectionHeader>Look and feel</SectionHeader>
					<div className="flex justify-between flex-grow gap-4">
						<SettingSelectObject
							list={layouts}
							selected={layout}
							setSelected={setLayout}
							label="Layout"
						/>
						<SettingSelectObject
							list={themes}
							selected={theme}
							setSelected={setTheme}
							label="Theme"
						/>
					</div>
				</div>
				<div>
					<SectionHeader>Additional Elements</SectionHeader>
					<SettingToggle
						enabled={link}
						setEnabled={setLink}
						label={"Link Authentication Element"}
					/>
					<SettingToggle
						enabled={expressCheckout}
						setEnabled={setExpressCheckout}
						label={"Express Checkout Element"}
					/>
					<SettingToggle
						enabled={address}
						setEnabled={setAddress}
						label={"Address Element"}
					/>
					{address && (
						<div className="ml-5">
							<SectionHeader>Address Element options</SectionHeader>
							<SettingTabs
								options={["shipping", "billing"]}
								tab={addressMode}
								setTab={(value) =>
									handleAddressReload(() => setAddressMode(value))
								}
								suffix="mode"
							/>
							<SettingToggle
								enabled={addressContacts}
								setEnabled={() =>
									handleAddressReload(() =>
										setAddressContacts(!addressContacts)
									)
								}
								label={"Pre-fill Contacts"}
							/>
							<SettingToggle
								enabled={addressPhone}
								setEnabled={setAddressPhone}
								label={"Collect phone number"}
							/>
						</div>
					)}
				</div>
				<div>
					<CodeBlock language="javascript">
						{appearanceString +
							"\n\n" +
							elementsOptionsString +
							"\n\n" +
							paymentElementOptionsString +
							"\n\n" +
							addressElementOptionsString}
					</CodeBlock>
				</div>
			</SettingsPanel>
		</Elements>
	);
}
