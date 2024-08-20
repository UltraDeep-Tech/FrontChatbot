
import { useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import AddPaymentMethod from "./AddPaymentMethod";
import { createPaymentMethodApi, updateDefaultCardApi } from "@/services/AllMutation/billing";
import cogoToast from "cogo-toast";


export default function PaymentMethods({ getSubscriptionDetails, isloading }: { getSubscriptionDetails: any, isloading: any }) {

    const [isAddPaymentMethodModalOpen, setIsAddPaymentMethodModalOpen] = useState(false);
    const { mutate: createPaymentMethod, isLoading } = createPaymentMethodApi();
    const [defaultId, setDefaultId] = useState("")
    const { mutate: updateDefaultCard, isLoading: isLoadingUpdateDefaultCard } = updateDefaultCardApi(setDefaultId);
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false);
    };

    const handleClick = (id: string) => {
        setDefaultId(id)
        setShowModal(true); // Pass the appropriate chat ID or data to the mutation
    }

    const handlePaymentMethodAdded = async (paymentMethod: any) => {
        const isCardAlreadyAdded = getSubscriptionDetails?.paymentMethods?.data.some(
            (existingMethod: any) => {
                return (
                    existingMethod.card.last4 === paymentMethod.card.last4 &&
                    existingMethod.card.exp_month === paymentMethod.card.exp_month &&
                    existingMethod.card.exp_year === paymentMethod.card.exp_year
                );
            }
        );

        if (isCardAlreadyAdded) {
            cogoToast.warn("This card is already added.");
            return;
        }

        const data: any = {
            id: paymentMethod.id,
            name: getSubscriptionDetails?.customer?.id,
        };
        createPaymentMethod(data);
    };

    const defaultPaymentMethod = getSubscriptionDetails?.customer?.invoice_settings?.default_payment_method;
    return (
        <>
            {
                getSubscriptionDetails?.paymentMethods ? (
                    <>
                        <div className="flex flex-wrap gap-4 justify-start items-center mt-4">
                            {getSubscriptionDetails?.paymentMethods?.data?.map(
                                (paymentMethods: any) => (
                                    <div onClick={() => handleClick(paymentMethods?.id)} className="p-3 w-[200px] rounded-xl border border-HoverLight dark:border-HoverDark flex flex-col justify-start items-start cursor-pointer">
                                        <div className="select-none flex gap-4 items-center justify-start">
                                            <p className="bg-blue-800 rounded-md text-white p-1">
                                                {paymentMethods?.card?.brand}
                                            </p>
                                            <div className="flex flex-col items-start justify-start gap-1">
                                                <p className="flex items-center justify-between gap-2">
                                                    ....
                                                    {paymentMethods?.card?.last4}
                                                    {paymentMethods?.id === defaultPaymentMethod &&
                                                        <p className="border text-xs border-HoverLight dark:border-HoverDark text-gray-500 rounded-full px-2">
                                                            Default
                                                        </p>}
                                                </p>
                                                <p className="text-gray-300">
                                                    Expires {paymentMethods?.card?.exp_month}/
                                                    {paymentMethods?.card?.exp_year}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                        <button
                            className="bg-mainSecond hover:bg-transparent dark:bg-mainSecond hover:border-2 hover:border-mainSecond rounded-full  hover:dark:border-mainSecond text-white  px-4 py-2 mt-4"
                            onClick={() => setIsAddPaymentMethodModalOpen(true)}
                        >
                            Add Payment Method
                        </button>
                        <AddPaymentMethod
                            isOpen={isAddPaymentMethodModalOpen}
                            onClose={() => setIsAddPaymentMethodModalOpen(false)}
                            onPaymentMethodAdded={handlePaymentMethodAdded}
                        />
                    </>
                ) : (
                    <>
                        <div className="border border-HoverLight dark:border-HoverDark p-4 w-[65%] rounded-2xl flex justify-start items-start gap-6">
                            <RiErrorWarningLine className="text-3xl text-orange-400 mt-2" />
                            <div className="flex flex-col justify-center items-start">
                                <div className="font-bold">
                                    You have not started a billing plan yet or It is ended.
                                </div>
                                <div>
                                    To add a payment method and start paying for services, go to
                                    the Billing overview page and select "Add payment details"
                                    to continue.
                                </div>
                            </div>
                        </div>
                    </>
                )
            }

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-[50000] ">
                    <div className="bg-[#0000002f] backdrop-blur-xl w-[350px] p-4 text-center rounded-2xl">
                        <p className="mb-4">Are you sure you want to chnage the default card ?</p>
                        <div className="flex justify-center">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 mr-2 bg-[#2e3b5a28] hover:bg-black rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    updateDefaultCard({
                                        cardId: defaultId
                                    });
                                    closeModal();
                                }}
                                className="px-4 py-2 bg-[#ff2a2a50] hover:bg-red-600 text-white rounded-lg"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}