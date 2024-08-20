"use server"

import api from "@/lib/api";





export const getAns = async (payload: any) => {
    const user = payload?.user;
    const query = payload?.query;
    const history = payload?.history;
    const model = payload?.model;



}