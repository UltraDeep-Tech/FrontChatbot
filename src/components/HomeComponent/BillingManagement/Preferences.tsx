import api from "@/lib/api";
import { updatePaymentMethodApi } from "@/services/AllMutation/billing";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import CountryList from "react-select-country-list";

const Preferences = ({ getSubscriptionDetails }: { getSubscriptionDetails: any, }) => {
    const [selectedCountry, setSelectedCountry] = useState<any>(null);
    const [editMode, setEditMode] = useState(false);
    const countryOptions = CountryList().getData();
    const [formData, setFormData] = useState({
        companyName: "",
        billingEmail: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        postalCode: "",
        state: "",
        customer: "",
    });

    useEffect(() => {
        if (getSubscriptionDetails && getSubscriptionDetails && getSubscriptionDetails.customer) {
            const customerData = getSubscriptionDetails.customer;

            setFormData({
                companyName: customerData.name || "",
                billingEmail: customerData.email || "",
                addressLine1: customerData.shipping?.address?.line1 || "",
                addressLine2: customerData.shipping?.address?.line2 || "",
                city: customerData.shipping?.address?.city || "",
                postalCode: customerData.shipping?.address?.postal_code || "",
                state: customerData.shipping?.address?.state || "",
                customer: customerData.id || "",
            });

            setSelectedCountry({
                label: customerData.shipping?.address?.country || "",
                value: customerData.shipping?.address?.country || "",
            });
        }
    }, [getSubscriptionDetails]);

    const queryClient = useQueryClient();

    const updateFormData = (key: any, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const { mutate: updatePaymentMethod, isLoading } = updatePaymentMethodApi(setEditMode)

    const handleUpdate = () => {
        const data: any = {
            country: selectedCountry,
            formData: formData,
        };
        updatePaymentMethod(data);
    };

    return (
        <div className="px-8 mt-4 mobile:px-2 w-1/2 md:w-3/4 w-full">
            <form className="flex text-sm flex-col gap-2">
                <div className="flex flex-col gap-2">
                    <label className="font-bold">Company Name</label>
                    <div className=" md:w-3/4 w-full flex flex-col justify-start items-start">
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.companyName}
                            placeholder="Company Name"
                            onChange={(e) => updateFormData("companyName", e.target.value)}
                            className={`bg-mainSecond dark:bg-primaryLight md:w-3/4 w-full border text-sm border-HoverLight text-white dark:border-HoverDark rounded-lg py-2 px-2 ${editMode ? "border-blue-500" : ""
                                }`}
                            readOnly={!editMode}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-bold">Billing email</label>
                    <div className="md:w-3/4 w-full flex flex-col justify-start items-start">
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.billingEmail}
                            placeholder="Billing Email"
                            onChange={(e) => updateFormData("billingEmail", e.target.value)}
                            className={`bg-mainSecond dark:bg-primaryLight md:w-3/4 w-full border text-sm border-HoverLight text-white dark:border-HoverDark rounded-lg py-2 px-2 ${editMode ? "border-blue-500" : ""
                                }`}
                            readOnly={!editMode}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-bold">Primary business address</label>
                    <div className="md:w-3/4 w-full flex flex-col justify-start items-start gap-2">
                        <Select
                            options={countryOptions}
                            value={selectedCountry}
                            onChange={(value: any) => setSelectedCountry(value)}
                            placeholder="Select Country"
                            className="md:w-1/2 w-full border text-black text-sm border-HoverLight dark:border-HoverDark rounded-lg bg-mainSecond"
                            isDisabled={!editMode}
                        />
                        <input
                            type="text"
                            id="line1"
                            name="line1"
                            value={formData.addressLine1}
                            placeholder="Address Line 1"
                            onChange={(e) => updateFormData("addressLine1", e.target.value)}
                            className={`bg-mainSecond dark:bg-primaryLight md:w-3/4 w-full border text-sm border-HoverLight text-white dark:border-HoverDark rounded-lg py-2 px-2 ${editMode ? "border-blue-500" : ""
                                }`}
                            readOnly={!editMode}
                        />
                        <input
                            type="text"
                            id="line2"
                            name="line2"
                            value={formData.addressLine2}
                            placeholder="Address Line 2"
                            onChange={(e) => updateFormData("addressLine2", e.target.value)}
                            className={`bg-mainSecond dark:bg-primaryLight md:w-3/4 w-full border text-sm border-HoverLight text-white dark:border-HoverDark rounded-lg py-2 px-2 ${editMode ? "border-blue-500" : ""
                                }`}
                            readOnly={!editMode}
                        />
                        <div className="flex justify-start items-center w-1/2 gap-2">
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                placeholder="City"
                                onChange={(e) => updateFormData("city", e.target.value)}
                                className={`bg-mainSecond dark:bg-primaryLight md:w-3/4 w-full border text-sm border-HoverLight text-white dark:border-HoverDark rounded-lg py-2 px-2${editMode ? "border-blue-500" : ""
                                    }`}
                                readOnly={!editMode}
                            />
                            <input
                                type="text"
                                id="postalcode"
                                name="postalcode"
                                value={formData.postalCode}
                                placeholder="Postal Code"
                                onChange={(e) => updateFormData("postalCode", e.target.value)}
                                className={`bg-mainSecond dark:bg-primaryLight md:w-3/4 w-full border text-sm border-HoverLight text-white dark:border-HoverDark rounded-lg py-2 px-2 ${editMode ? "border-blue-500" : ""
                                    }`}
                                readOnly={!editMode}
                            />
                        </div>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            placeholder="State, county, province, or region"
                            onChange={(e) => updateFormData("state", e.target.value)}
                            className={`bg-mainSecond dark:bg-primaryLight md:w-3/4 w-full border text-sm border-HoverLight text-white dark:border-HoverDark rounded-lg py-2 px-2 ${editMode ? "border-blue-500" : ""
                                }`}
                            readOnly={!editMode}
                        />
                    </div>
                </div>

                <div className="pt-2 flex justify-start">
                    {editMode ? (
                        <>
                            <button
                                type="button"
                                className="bg-mainSecond dark:bg-HoverDark text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg mr-2"
                                onClick={handleUpdate}
                                disabled={isLoading}
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                className="bg-red-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg"
                                onClick={() => setEditMode(false)}
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            className="bg-mainSecond dark:bg-HoverDark text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg disabled:opacity-50"
                            onClick={() => setEditMode(true)}
                        >
                            Edit
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Preferences;
