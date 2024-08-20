
import { IoMenu } from "react-icons/io5";
import ChatBoxComponent from "@/components/ChatBox/ChatBoxComponent";
import { IoCloseCircle } from "react-icons/io5";
import useChatSideBarStore from "@/store/chatSidebarStore";
import { usePathname } from "next/navigation";

export default function ChatBoxForMobiles() {
    const { showSideBar, setShowSideBar } = useChatSideBarStore();
    const pathname = usePathname()

    return (
        <>
            {
                ((pathname.includes("/chatPage") || pathname == "/") && showSideBar) && <div className="absolute block md:hidden z-10 w-full h-full">
                    <>
                        {
                            showSideBar && <ChatBoxComponent />

                        }
                    </>

                </div>
            }


        </>
    )
}