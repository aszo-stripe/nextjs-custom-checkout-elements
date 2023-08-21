This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) which demonstrates various configurations of [Stripe Elements](https://stripe.com/docs/payments/elements).

More specifically, this project demonstrates:

- [Payment Element](https://stripe.com/docs/payments/payment-element)
- [Address Element](https://stripe.com/docs/elements/address-element)
- [Link Authentication Element](https://stripe.com/docs/payments/elements/link-authentication-element)
- [Express Checkout Element](https://stripe.com/docs/elements/express-checkout-element)
- [Elements Appearance API](https://stripe.com/docs/elements/appearance-api)

## Getting Started

First, you'll need a Stripe account. [Sign up for free](https://dashboard.stripe.com/register) before running the application.

Copy the example .env file.

```bash
$ cp .env.local.example .env.local
```

Add your Stripe API keys in the new `.env.local` file.

Next, install all project dependencies by running `npm install`

Finally, run the dev server locally:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage Instructions

By default, the page will start with only the Payment Element visible. Click on the gear icon in the top right corner to open the settings panel, inside of which you can toggle the various elements on and off.

As you change the settings toggles, you will see the inputs for the various elements displayed in the code block below.

To see the Appearance API in action, use the Theme dropdown in the settings panel to choose from some pre-configured examples. The result will be shown in the `appearance` variable, which is then passed in to `elementsOptions` which is used to initialise Elements.

## Google Pay and Apple Pay

Google Pay and Apple Pay require https so will not display in either the Express Checkout Element or the Payment Element when running locally.

You can test these by using a tunnel service like ngrok or similar method.

## Modification

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
