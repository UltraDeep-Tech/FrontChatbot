

import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";



export default function BillingTable({ getSubscriptionDetails }: { getSubscriptionDetails: any }) {


    const payInvoiceMutation = useMutation(
        (invoiceId) => api.post(`payment/PayInvoice/${invoiceId}`),
        {
            onSuccess: (data) => {
            },
            onError: (error) => {
                console.error("Payment error:", error);
                // Handle error, show notification, etc.
            },
        }
    );

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
            <div className="w-full mt-4 px-8 h-full overflow-y-auto">
                {/* <div>No invoices found</div> */}
                <table className="w-full">
                    <thead>
                        <tr className="bg-mainSecond ">
                            <th className="py-3 px-4 text-left border-b border-gray-300 text-sm">INVOICE</th>
                            <th className="py-3 px-4 text-left border-b border-gray-300 text-sm">STATUS</th>
                            <th className="py-3 px-4 text-left border-b border-gray-300 text-sm">AMOUNT</th>
                            <th className="py-3 px-4 text-left border-b border-gray-300 text-sm">CREATED</th>
                            <th className="py-3 px-4 text-left border-b border-gray-300 text-sm">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="font-medium text-xs">
                        {getSubscriptionDetails?.invoices?.data?.map((item: any, index: any) => (
                            <tr key={index} className="bg-mainSecond">
                                <td className="py-3 px-4 border-b border-gray-300 dark:border-gray-700 text-gray-200">{item?.id}</td>
                                <td className="py-3 px-4 border-b border-gray-300 dark:border-gray-700">
                                    <p className={`w-10 py-1 px-2 rounded-full text-center text-sm ${item?.paid ? "bg-green-400 text-white" : "bg-blue-400 text-white"}`}>
                                        {item?.paid ? "Paid" : "Open"}
                                    </p>
                                </td>
                                <td className="py-3 px-4 border-b border-gray-300 dark:border-gray-700 text-gray-200">$ {item?.amount_paid / 100}.00</td>
                                <td className="py-3 px-4 border-b border-gray-300 dark:border-gray-700 text-gray-200">{formatUnixTimestampToDate(item?.created)}</td>
                                <td className="py-3 px-4 border-b border-gray-300 dark:border-gray-700 font-semibold">
                                    {item?.paid ? (
                                        <button className="text-gray-200" onClick={() => window.open(item?.hosted_invoice_url, "_blank")}>View</button>
                                    ) : (
                                        <button onClick={() => payInvoiceMutation.mutate(item?.id)}>Pay</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {getSubscriptionDetails?.invoices?.data?.map((item: any, index: any) => (
                            <tr key={index} className="bg-mainSecond">
                                <td className="py-3 px-4 border-b border-gray-300 dark:border-gray-700 text-gray-200">{item?.id}</td>
                                <td className="py-3 px-4 border-b border-gray-300 dark:border-gray-700">
                                    <p className={`w-10 py-1 px-2 rounded-full text-center text-sm ${item?.paid ? "bg-green-400 text-white" : "bg-blue-400 text-white"}`}>
                                        {item?.paid ? "Paid" : "Open"}
                                    </p>
                                </td>
                                <td className="py-3 px-4 border-b border-gray-300 dark:border-gray-700 text-gray-200">$ {item?.amount_paid / 100}.00</td>
                                <td className="py-3 px-4 border-b border-gray-300 dark:border-gray-700 text-gray-200">{formatUnixTimestampToDate(item?.created)}</td>
                                <td className="py-3 px-4 border-b border-gray-300 dark:border-gray-700 font-semibold">
                                    {item?.paid ? (
                                        <button className="text-gray-200" onClick={() => window.open(item?.hosted_invoice_url, "_blank")}>View</button>
                                    ) : (
                                        <button onClick={() => payInvoiceMutation.mutate(item?.id)}>Pay</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    )
}