"use client"
import SlideWindow from "@/components/Reusable/SlideWindow";
import Filters from "./Filter";
import { useState } from "react";

function HomePageSideWindwow() {
    const [menuAddOpen, setMenuAddOpen] = useState(false);

    return (
        <>
            <SlideWindow menuAddOpen={menuAddOpen} setMenuAddOpen={setMenuAddOpen}>
                <Filters setMenuAddOpen={setMenuAddOpen} />
            </SlideWindow></>

    );
}

export default HomePageSideWindwow;