import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { IoClose } from 'react-icons/io5'


interface PlanPopUpProps {
    showPopUp: boolean
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>
}


export default function PlanPopUp({ showPopUp, setShowPopup }: PlanPopUpProps) {

    function closeModal() {
        setShowPopup(false)
    }

    function openModal() {
        setShowPopup(true)
    }

    return (
        <>

            <Transition appear show={showPopUp} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-mainBg p-8 text-left align-middle shadow-xl transition-all border-2 border-white">
                                    <div className="w-full flex items-center justify-between">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg md:text-xl font-semibold text-center leading-6 text-gray-300"
                                        >
                                           Get more out of your AI Staff Officer with our Premium Plan
                                        </Dialog.Title>

                                        <button
                                            type="button"
                                            className="rounded-full bg-red-500 text-white p-2 hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            <IoClose />
                                        </button>

                                    </div>

                                    <div className="mt-6 md:mt-12">
                                        <p className="text-sm md:text-base text-gray-300 my-4 md:my-12">
                                         Full access to all features.
                                        </p>

                                        <div className="flex items-center justify-center">
                                            <form action={"/plandetails"} method="GET">
                                                <button className=" bg-mainSecond rounded-lg p-2 animate-bounce text-center text-lg font-medium">
                                                    Subscribe to Premium
                                                </button>
                                            </form>
                                        </div>
                                    </div>

                                </Dialog.Panel>

                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
