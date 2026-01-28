import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export const createCheckoutSession = async (planData) => {
  const stripe = await stripePromise;
  
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(planData)
  });
  
  const session = await response.json();
  
  const result = await stripe.redirectToCheckout({
    sessionId: session.id
  });
  
  if (result.error) {
    console.error(result.error.message);
  }
};