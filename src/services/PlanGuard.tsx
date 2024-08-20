

export const checkTextCondition = (getUserActiveSubscription: any) => {
    let TEXT_UNIT_LIMIT = 2000
    // return true
    if (getUserActiveSubscription?.data?.lastInvoicePaid != "free plan") {
        return true
    }
    if (getUserActiveSubscription?.data?.textUnit?.units > TEXT_UNIT_LIMIT) {
        if (getUserActiveSubscription?.data?.hasActiveSubscription && getUserActiveSubscription?.data?.lastInvoicePaid === "paid") {
            return true
        }
        return false
    }

    return true
}


export const checkAudioCondition = (getUserActiveSubscription: any) => {
    let AUDIO_UNIT_LIMIT = 2000
    // return true
    if (getUserActiveSubscription?.data?.lastInvoicePaid != "free plan") {
        return true
    }
    if (getUserActiveSubscription?.data?.audioUnit?.units > AUDIO_UNIT_LIMIT) {
        if (getUserActiveSubscription?.data?.hasActiveSubscription && getUserActiveSubscription?.data?.lastInvoicePaid === "paid") {
            return true
        }
        return false
    }
    return true
}

