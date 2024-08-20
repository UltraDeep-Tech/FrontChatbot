// components/AddPaymentMethod.tsx
import { useState } from 'react';
import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface AddPaymentMethodProps {
    isOpen: boolean;
    onClose: () => void;
    onPaymentMethodAdded: (paymentMethod: any) => void;
}

const AddPaymentMethod: React.FC<AddPaymentMethodProps> = ({ isOpen, onClose, onPaymentMethodAdded }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);


        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setLoading(false);
            console.error('Card element not found');
            return;
        }

        const result = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        setLoading(false);

        if (result.error) {
            console.error(result.error);
        } else {
            // Send the payment method to your server for customer association
            onPaymentMethodAdded(result.paymentMethod);
            onClose();
        }
    };

    return (
        <>
            <Transition appear show={isOpen} as={Dialog} onClose={onClose}>
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                <Transition.Child
                    as={React.Fragment}
                    enter="transition ease-out duration-300"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-300"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <div className="fixed inset-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[350px] w-96 p-6 bg-sideBarBg rounded-2xl">
                        <Dialog.Title as="h3" className="text-lg text-gray-300 font-semibold mb-4">
                            Add Payment Method
                        </Dialog.Title>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <label className='font-bold'>Card information</label>
                            <div className='border border-HoverLight text-white dark:border-HoverDark rounded-lg p-2'>
                                <CardElement className='text-white' />
                            </div>

                            <label className='font-bold'>Name on Card</label>
                            <div className="w-full flex flex-col justify-start items-start">
                                <input type="text" id="firstName" name="firstName" className="w-full border border-HoverLight dark:border-HoverDark rounded-lg py-1 px-2 text-black" />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-full disabled:opacity-50"
                                    disabled={loading}
                                >
                                    {loading ? 'Adding...' : 'Add Card'}
                                </button>
                            </div>
                        </form>
                    </div>
                </Transition.Child>
            </Transition>
        </>
    );
};

export default AddPaymentMethod;
