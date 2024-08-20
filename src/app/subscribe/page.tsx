"use client"
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51OWjBbDODE91yh2VuuSSboA01exGis2j0mDDJGgwR0j7623nLIitqdTkaTsyMIrmXTR71oaptFs9AhMHH7OnpBGv00iaQ0J8sQ');

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [email, setEmail] = useState('');

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        // @ts-ignore
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: { email },
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);

            // Here you would call your backend to create the subscription
            // fetch('/subscriptions/create-customer', ...) to create a customer
            // and fetch('/subscriptions/create-subscription', ...) to subscribe them
        }
    };

    return (
        <form className='mt-10 text-black' onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Subscribe
            </button>
        </form>
    );
};

const SubscribePage = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default SubscribePage;