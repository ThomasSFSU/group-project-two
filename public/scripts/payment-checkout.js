// This is your test publishable API key.
const API_KEY = "pk_test_51PFNf7HG3I7WJJZ7gYrwpykQUhfsNCQChIDMX2lBXE4Z9M0I9ieXa5on1EseT5Y7mLHDV9owO4Ryjmo15qSKnbiF00QPDAbA3P";

const stripe = Stripe(API_KEY);

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}