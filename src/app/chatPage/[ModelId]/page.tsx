"use server"
import React from "react";
import { useParams } from "next/navigation";
import ChatPage from "@/components/ChatPage/ChatPage";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { getAns } from "@/components/Ai/GetAns";
import { getAudio } from "@/components/Ai/GetAudio";


const page = ({ params }: { params: { ModelId: string } }) => {

  return (
    <>
      <ChatPage getAns={getAns} getAudio={getAudio} id={params.ModelId} />
    </>
  );
};

export default page;