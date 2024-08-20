import Link from "next/link";
import { CgArrowRight } from "react-icons/cg";

function page() {
    return (
        <div className="flex justify-center items-center w-full">
            <div className="flex flex-col justify-center items-center">
                <p className=" mt-4 mb-4 text-red-400 text-2xl">
                    {/* {getAllTransactions?.data?.session?.status === "complete"
                ? "Payment Successful"
                : "Payment Unsuccessful"} */}
                    Subscription Canceled
                </p>
                <Link href={"/plandetails"} className=" bg-mainSecond px-2 rounded-lg flex justify-center items-center">
                    Subscribe Again  <CgArrowRight className=" -rotate-45" />
                </Link>
            </div>
        </div>
    );
}

export default page;