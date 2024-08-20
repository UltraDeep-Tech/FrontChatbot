/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useEffect } from "react";
import api from "@/lib/api";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation'
import userDetailsExist from "@/store/userDetails";
import cogoToast from "cogo-toast";

export default function AuthGaurd({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname()
    const signIn = useAuthStore((state: any) => state.signIn)
    const signOut = useAuthStore((state: any) => state.signOut)
    const user = useAuthStore((state: any) => state.user)
    const setDetails = userDetailsExist((state: any) => state.setDetails)
    const clearDetails = userDetailsExist((state: any) => state.clearDetails)
    const router = useRouter()
    // alert(pathname)
    useEffect(() => {
        api.get('/auth/authme').then((res) => {
            console.log(res?.data, 'authme')
            signIn(res.data)
            if (false) {
                cogoToast.warn("Please verify your account by clicking on the link sent to your email. Kindly check your Inbox and Spam folder for it", { hideAfter: 5, toastContainerID: "isEmailVerified" })
            }
        }).catch(({ response }) => {
            console.log('error')
            console.log('authme')

            signOut()
            if (pathname.includes("/chatPage") || pathname == "/userProfile") {
                router.push('/login')
            }

        })
        return () => {
        }
    }, [])

    return (
        <>
            {children}
        </>
    );
}
