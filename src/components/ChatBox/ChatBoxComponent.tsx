import api from "@/lib/api";
import { getAllSessions } from "@/services/AllMutation/getAllSessions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import cogoToast from "cogo-toast";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { BarLoader } from "react-spinners";
import ProfilePicture from "../ChatPage/ProfilePicture";
import useChatSideBarStore from "@/store/chatSidebarStore";




export default function ChatBoxComponent() {
    const [deleteChatId, setDeleteChatId] = useState("");
    const [showModal, setShowModal] = useState(false);
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();
    const router = useRouter();
    const { showSideBar, setShowSideBar } = useChatSideBarStore();


    const onSuccess = (res: any) => {
        console.log("res", res);
    };

    const onError = (res: any) => {
        // cogoToast.error("No");
    };

    const {
        data: GetAllSessions,
        isLoading: gettingSessions,
        isRefetching,
    } = getAllSessions(onSuccess, onError);

    //  Delete Function here  -------------------------------->>
    const handleDelete = (session_id: string) => {
        setDeleteChatId(session_id);
        setShowModal(true); // Pass the appropriate chat ID or data to the mutation
    };
    //  Modal close button -------------->>
    const closeModal = () => {
        setShowModal(false);
    };

    const mutation = useMutation(
        () => api.delete(`session/deleteSession/${deleteChatId}`), // Use deleteChatId here
        {
            onSuccess: (res) => {
                cogoToast.success("Session deleted successfully");
                queryClient.refetchQueries(["getAllSessions"]);
                router.push("/");
            },
            onError: (error: any) => {
                cogoToast.error(error?.data?.message || "An error occurred");
            },
        }
    );

    return (
        <>
            <div className={`xl:block max-w-[92vw]  h-full flex-grow rounded-2xl backdrop-blur-xl bg-mainBg border-2 border-mainSecond text-redText `}>
                <div className="  pt-[0.1%] w-full h-full">
                    <div className="flex flex-col h-full w-full justify-start items-start pt-3">
                        <div className="pl-6  gap-3 flex w-full flex-col overflow-y-auto mb-2 ">
                            <h1 className="text-lg">Conversations</h1>
                            <div className="pr-6">
                                {/* <span className="text-gray-300 ">No chat history</span> */}
                                {gettingSessions ? (
                                    <>
                                        {" "}
                                        <div
                                            className={`h-full w-full p-4 flex justify-center items-center  }`}
                                        >
                                            <BarLoader color="#ffffff" height={6} width={100} />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {GetAllSessions?.data?.map((session: any, index: any) => (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center w-full mt-2 p-2 rounded-lg px-2 text-white  bg-mainSecond hover:scale-105 duration-500 ease-in-out"
                                            >
                                                <Link
                                                    href={`/chatPage/${session?.model?._id}`}
                                                    className="w-full"
                                                >
                                                    <div className="flex items-center gap-4" onClick={() => setShowSideBar(false)}
                                                    >
                                                        <div className="max-w-xs">
                                                            <ProfilePicture size={15} user={session?.model} path={session?.model?.profilePicture[0]} />
                                                        </div>
                                                        {/* <img className="w-10 h-10 rounded-full" src={session?.model?.profilePicture} alt="" /> */}
                                                        <div className="font-medium  ">
                                                            <div className=" font-semibold">{session?.model?.name}</div>
                                                            <div className="text-md truncate max-w-[130px]">
                                                                {session?.text}
                                                            </div>
                                                        </div>
                                                    </div>

                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(session?._id)}
                                                    className="hover:text-black z-10"
                                                >
                                                    <MdDelete size={18} />
                                                </button>
                                            </div>
                                        ))}

                                        {GetAllSessions?.data?.length == 0 && (<>
                                            <p className=" pt-20 w-full text-center">
                                                No conversations history
                                            </p>
                                        </>)}
                                    </>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-[50000] ">
                    <div className="bg-[#0000002f] backdrop-blur-xl w-[350px] p-4 text-center rounded-2xl">
                        <p className="mb-4">Are you sure you want to delete this chat?</p>
                        <div className="flex justify-center">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 mr-2 bg-[#2e3b5a28] hover:bg-black rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    mutation.mutate();
                                    closeModal();
                                }}
                                className="px-4 py-2 bg-[#ff2a2a50] hover:bg-red-600 text-white rounded-lg"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}