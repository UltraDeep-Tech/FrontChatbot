import CardSkeleton from "@/components/HomeComponent/Explore/CardSkeleton";
import Explore from "@/components/HomeComponent/Explore/Explore";
import fetchCacheApi from "@/lib/fetchCacheApi";
import React, { Suspense } from "react";

const numberOfCardsToAdd = 4
const page = async () => {
  let data = [];
  try {
    const result = await fetchCacheApi("models/getAllModels");
    data = result.slice(0, numberOfCardsToAdd); // Select the first 3 elements
  } catch (e) {
    console.error("Failed to fetch data:", e);
  }

  return (
    <>
      <Suspense fallback={<CardSkeleton />}>
        <Explore data={data} />
      </Suspense>
    </>
  );
};

export default page;
