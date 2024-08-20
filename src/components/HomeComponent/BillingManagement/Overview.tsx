import Link from "next/link";
import { BiDollar } from "react-icons/bi";
import { BarLoader, BounceLoader, DotLoader } from "react-spinners"
import { FiDownload } from "react-icons/fi";
import { cancelSubscriptionApi } from "@/services/AllMutation/billing";
import { useState } from "react";
import Subscription from "../Subscription/Subscription";
import { useRouter } from "next/navigation";



export default function Overview({ getSubscriptionDetails, isloading }: { getSubscriptionDetails: any, isloading: boolean }) {
    const router = useRouter()
    const { mutate: cancelSubscription, isLoading: isloadingCancelSubscription } = cancelSubscriptionApi(router)
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false);
    };

    const handleDelete = () => {
        setShowModal(true); // Pass the appropriate chat ID or data to the mutation
    };

    const formatUnixTimestampToDate = (timestamp: any) => {
        const date = new Date(timestamp * 1000); // Multiply by 1000 to convert to milliseconds
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
        } as Intl.DateTimeFormatOptions;
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <>
            {
                isloading ? (
                    <div className="flex justify-center items-center w-full h-full">
                        <BarLoader color="#ffffff" height={6} width={100} />
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col md:flex-row items-start mt-4 gap-4 w-full max-h-screen overflow-y-auto">
                            {/* Card 1 */}
                            <div className="bg-mainSecond rounded-2xl md:w-1/2 w-full shadow-lg p-6">
                                <p className="text-lg font-semibold mb-4">Billing Info</p>
                                <div className="flex flex-col p-4 md:p-8 gap-4 text-sm w-full border-2 border-HoverLight dark:border-HoverDark rounded-2xl mt-4">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold ">Name</p>
                                        <p className="text-right text-sm text-gray-200 ">
                                            {getSubscriptionDetails?.customer?.name ?? "--"}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">Email</p>
                                        <p className="text-right text-gray-200 ">
                                            {getSubscriptionDetails?.customer?.email ?? "--"}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">Phone</p>
                                        <p className="text-right text-gray-200 ">
                                            {getSubscriptionDetails?.customer?.phone ?? "--"}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">Zipcode</p>
                                        <p className="text-right text-gray-200 ">
                                            {
                                                getSubscriptionDetails?.customer?.shipping?.address
                                                    ?.postal_code ?? "--"
                                            }
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">Address</p>
                                        <p className="text-right text-gray-200 mobile:w-28 mobile:truncate mobile:... ">
                                            {
                                                getSubscriptionDetails?.customer?.shipping?.address
                                                    ?.line1 ?? "--"
                                            }{" "}
                                            {getSubscriptionDetails?.customer?.shipping?.address?.city ?? "--"}{" "}
                                            {
                                                getSubscriptionDetails?.customer?.shipping?.address
                                                    ?.country ?? "--"
                                            }
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">Currency</p>
                                        <p className="text-right text-gray-200 ">
                                            {getSubscriptionDetails?.customer?.currency ?? "--"}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">Customer Id</p>
                                        <p className="text-right text-gray-200 ">
                                            {getSubscriptionDetails?.customer?.id ?? "--"}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">Payment Methods</p>
                                        <p className="text-right text-gray-200 ">
                                            Credit, Debit Cards
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {getSubscriptionDetails?.subscription?.status != "canceled" ? (<>
                                <div className="flex justify-start items-start h-full md:w-1/2 w-full gap-4">
                                    <div className="h-full w-full bg-mainSecond dark:bg-mainSecond rounded-2xl flex flex-col items-start justify-start p-4 gap-4 text-sm">
                                        <p className="font-semibold text-lg">Active Plans</p>
                                        <div className="overflow-y-auto w-full">
                                            <div className="w-full h-full gap-4">
                                                {
                                                    <div
                                                        className="border-2 border-HoverLight rounded-2xl w-full h-full p-8 mobile:p-2 flex flex-col gap-4"
                                                    >
                                                        <div className="flex justify-between items-center">
                                                            <p className="font-semibold text-gray-300 text-3xl">
                                                                {getSubscriptionDetails?.subscription.plan.amount / 100 ===
                                                                    999 && "Medium"}
                                                                {getSubscriptionDetails?.subscription.plan.amount / 100 ===
                                                                    4999 && "Large"}
                                                                {getSubscriptionDetails?.subscription.plan.amount / 100 ===
                                                                    0.2 && "Small"}
                                                            </p>
                                                            <div className="flex gap-2 items-center">
                                                                <p className="text-gray-300 uppercase">
                                                                    {getSubscriptionDetails?.subscription.status !== "inActive" ? (
                                                                        <span className="bg-green-200 select-none text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                                                                            Active
                                                                        </span>
                                                                    ) : (
                                                                        <span className="bg-red-200 select-none text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                                                                            Inactive
                                                                        </span>
                                                                    )}
                                                                </p>
                                                                {/* <Link
                                                                    href={`${getSubscriptionDetails?.subscription.invoice?.invoice_pdf}`}
                                                                    className="text-gray-800 rounded-full p-[6px] bg-[#ffffffb7] "
                                                                >
                                                                    <FiDownload />

                                                                </Link> */}
                                                            </div>
                                                        </div>
                                                        <ul className="px-6 text-gray-200 list-disc tracking-wide">
                                                            {/* <li>Unlimited talk.</li> */}
                                                            {/* <li>16+ AI Characters.</li> */}
                                                            <li>1 unit= 1 character - for text.</li>
                                                            <li>1 unit= 1 character - for audio.</li>
                                                            <li>$0.0002/ unit price </li>
                                                        </ul>
                                                        <div className="flex gap-2 items-end justify-between">
                                                            <div className="flex flex-col items-end gap-2">
                                                                <div className="flex items-end gap-2">
                                                                    <p className="text-gray-200 text-2xl ">Current Usage -</p>
                                                                    <div className="flex gap-0 items-start h-full">
                                                                        {/* <BiDollar className="text-4xl" /> */}
                                                                        <p className="text-gray-200 text-3xl ">
                                                                            {!getSubscriptionDetails?.usage || getSubscriptionDetails?.usage == 0 ? 0 :
                                                                                +getSubscriptionDetails?.usage?.map((a: any) => a.total_usage)}
                                                                        </p>
                                                                    </div>
                                                                    <p className="text-gray-400 text-sm md:text-lg ">
                                                                        unit
                                                                        {/* {getSubscriptionDetails?.subscription.plan.interval} */}
                                                                    </p>
                                                                </div>


                                                            </div>
                                                            <div className="flex flex-col items-end py-[2px]">
                                                                <p className="text-gray-200">
                                                                    Next Billing
                                                                </p>
                                                                <p className="text-gray-200 text-xs">
                                                                    {formatUnixTimestampToDate(
                                                                        getSubscriptionDetails?.subscription.current_period_end
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>

                                        <div className="w-full flex justify-end mt-2">
                                            <button type="button" onClick={handleDelete} disabled={isloadingCancelSubscription} className=" bg-mainBg min-w-[60%] rounded-lg p-2  text-center flex justify-center items-center text-sm font-semibold">
                                                {!isloadingCancelSubscription ? "Cancel Subscription"
                                                    : (<>
                                                        Cancel Subscription  <DotLoader color="#ffffff" size={15} />
                                                    </>)}
                                            </button>
                                        </div>
                                    </div>


                                </div>
                            </>) : (<>
                                <div className=" min-sm:w-1/2 flex justify-center items-center">
                                    <Subscription showtext={false} />
                                </div>
                            </>)}

                        </div>
                    </>
                )
            }
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-[50000] ">
                    <div className="bg-[#0000002f] backdrop-blur-xl w-[350px] p-4 text-center rounded-2xl">
                        <p className="mb-4">Are you sure you want to unsubscribe the plan ?</p>
                        <div className="flex justify-center">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 mr-2 bg-[#2e3b5a28] hover:bg-black rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    cancelSubscription();
                                    closeModal();
                                }}
                                className="px-4 py-2 bg-[#ff2a2a50] hover:bg-red-600 text-white rounded-lg"
                            >
                                Unsubscribe
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}