
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import VoiceModel from './VoiceModel';
import { FaPhoneAlt } from "react-icons/fa";
import { useParams } from 'next/navigation';
import useCustomTimer from '@/hooks/useCustomTimer';
import { getUserActiveSubscriptionApi } from '@/services/AllMutation/billing';
import { checkAudioCondition } from '@/services/PlanGuard';
// import * as PlayHT from "playht";


export default function CallModal({ showPopUpVoice: isOpen, setshowPopUpVoice: setIsOpen, setShowPopup }: { showPopUpVoice: boolean, setshowPopUpVoice: any, setShowPopup: any }) {

    // let [isOpen, setIsOpen] = useState(false)
    const params = useParams()
    const ModelId = params.ModelId as string
    const { data: getUserActiveSubscription } = getUserActiveSubscriptionApi()


    function openModal() {
        let userHasPermission = checkAudioCondition(getUserActiveSubscription)

        if (userHasPermission) {
            // RecordTimer({ action: "start", modelId: ModelId, })
            setIsOpen(true)
        } else {
            setShowPopup(true)
        }
    }


    return (
        <>
            <div >
                <button
                    type="button"
                    onClick={openModal}
                    className="rounded-full bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                >
                    <FaPhoneAlt className="text-[20px]" />
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => { }}>
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

                    <div className="fixed inset-0 overflow-y-auto ">
                        <div className="flex h-[90%] mt-16 items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                {/* bg-[#ffffff23] */}
                                <Dialog.Panel className="w-[80%] h-full border-2 border-white bg-heart-pattern bg-mainBg  transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl ">

                                    <VoiceModel isOpen={isOpen} setIsOpen={setIsOpen} />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}