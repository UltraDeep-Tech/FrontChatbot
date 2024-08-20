import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import useAuthStore from "@/store/authStore";
import Chatbotbox from "./ChatBotBox";
import { createHistory } from "@/services/AllMutation/createHistory";
import { getSingleSession } from "@/services/AllMutation/getSingleSession";
import { BarLoader } from "react-spinners";
import ChatBotBoxLoader from "./ChatBotBoxLoader";
import { IoIosMic } from "react-icons/io";
import SpeechToTextComponent from "./SpeectTotext";
import { getUserActiveSubscriptionApi } from "@/services/AllMutation/billing";
import { checkTextCondition } from "@/services/PlanGuard";
import { useQueryClient } from "@tanstack/react-query";
import PlanPopUp from "./PlanPopUp";
import CallModal from "../CallModal/PopUp";
import { getAnswerApi } from "@/services/AllMutation/audio";
import { BackgroundEvent } from "microsoft-cognitiveservices-speech-sdk/distrib/lib/src/common/BackgroundError";
const apiUrl = "/api/gemini";

async function* getIterableStream(
  body: ReadableStream<Uint8Array>
): AsyncIterable<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    const decodedChunk = decoder.decode(value, { stream: true });
    yield decodedChunk;
  }
}

export const generateStream = async (
  payload: any
): Promise<AsyncIterable<string>> => {
  const response = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (response.status !== 200) throw new Error(response.status.toString());
  if (!response.body) throw new Error("Response body does not exist");
  return getIterableStream(response.body);
};

const ChatUi = ({ showPopUpVoice, setShowPopupVoice, getAns, getAudio, GetSingleModelData }: { showPopUpVoice: boolean, setShowPopupVoice: any, getAns: any, getAudio: any, GetSingleModelData: any }) => {
  // All the state are  declared below --------------->
  const [messages, setMessages] = useState<{ text: any; fromUser?: boolean, createdAt: Date }[]>(
    []
  );
  const [showPopUp, setShowPopup] = useState(false)

  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const user = useAuthStore((state) => state.user);
  const [listenerMessage, setListenerMessage] = useState("")

  const [response, setResponse] = useState("")

  // -------------------------------------------------------->
  // User declaration below ------------>>
  // Topic handler ---------------------->>
  const [isLoading, setisLoading] = useState(false)

  const [isFirstMessage, setIsFirstMessage] = useState(true);

  const scrollToBottom = () => {
    const element: any = document.getElementById("chatDiv");
    element.scrollTop = element.scrollHeight;
  }
  //  Send message function ------------>>
  const sendMessage = async () => {
    if (inputMessage.trim() !== "") {

      const payload = {
        query: inputMessage,
        modelId: GetSingleModelData?._id
      }
      // callAPi(inputMessage, true)
      setMessages([...messages, { text: inputMessage, fromUser: true, createdAt: new Date() }]);
      setInputMessage("")
      scrollToBottom()
      const randomNormal = 0;// Math.max(0, 5 + 5 * Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random()));
      const delayInSeconds = isFirstMessage ? 0 : randomNormal;//Math.random() * 30;
      const delayInMilliseconds = delayInSeconds * 1000;
      console.log("delayInMilliseconds", delayInMilliseconds);
      // Create a promise that resolves after the delay
      scrollToBottom()
      await new Promise(resolve => setTimeout(resolve, delayInMilliseconds));
      scrollToBottom()
      setisLoading(true);
      scrollToBottom()
      await getAnswer(payload);
      scrollToBottom()

      if (isFirstMessage) {
        setIsFirstMessage(false);
      }
    }
  };

  const { data: getUserActiveSubscription } = getUserActiveSubscriptionApi()


  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    let userHasPermission = checkTextCondition(getUserActiveSubscription)
    if (true) {
      sendMessage();
    } else {
      setShowPopup(true)
    }
  };

  const [activeMsg, setactiveMsg] = useState<string>();
  const onSuccess = async (res: any) => {
    setMessages(res.data)
    scrollToBottom()
  };
  useEffect(() => {
    scrollToBottom()

    return () => {
    }
  }, [messages, isLoading])

  const onError = (res: any) => { };
  const { mutate: mutateHistory, isLoading: HistoryisLoading } = createHistory(() => { }, onError);
  const { data, isLoading: getAllisLoading } = getSingleSession(GetSingleModelData?._id, showPopUpVoice, onSuccess, onError)
  const { mutate: getAnswer, isLoading: isLoadinggetAnswer } = getAnswerApi(setInputMessage, setisLoading, setMessages, scrollToBottom)


  useEffect(() => {
    setInputMessage(listenerMessage)
  }, [listenerMessage])

  return (
    <>
      <div className="flex flex-col h-full  justify-between">
        {loadingMessages ? (
          <div className="flex justify-center items-center h-full w-full ">
            <BarLoader color="#ffffff" height={6} width={100} />
          </div>
        ) : (
          <>

            <div id="chatDiv" className="px-5 md:px-5 py-5 flex flex-col gap-4 justify-between overflow-x-hidden overflow-y-auto max-h-[65vh]">
              {messages.map((message: any, index: number) => (
                <div
                  className={`flex w-full ${message?.fromUser ? "justify-end" : "justify-start"
                    } items-center max-sm:gap-2 gap-1 text-md`}
                  key={index}
                >
                  <div
                    className={`border-white  hover:scale-105 duration-500 ease-in-out flex flex-col  leading-1.5 p-2 px-4 bg-white rounded-t-xl rounded-es-xl `}
                  >
                    <div>
                      <Chatbotbox
                        message={message}
                        activeMsg={activeMsg}
                        user={user}
                        model={GetSingleModelData}
                        setactiveMsg={setactiveMsg}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (<>
                <div
                  className={`animate-bounce flex flex-col w-[50%] sm:w-fit max-w-[320px] leading-1.5 p-2 px-4  border-white bg-white rounded-t-xl rounded-es-xl `}
                >
                  <ChatBotBoxLoader model={GetSingleModelData} />
                </div>
              </>)}
            </div>
          </>
        )}
        <div className="flex flex-row md:gap-3 pr-5 py-4 ">
          <div className=" bg-white  rounded-full backdrop-blur-lg w-[100%] mx-3 px-3 items-center flex flex-row justify-between">
            <input
              disabled={loading}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit(e); // Prevent form submission on Enter key press
                }
              }}
              name="message"
              placeholder="Write here ..."
              className=" text-black/90 bg-transparent border-none focus:outline-none  w-[90%] py-2   px-3"
            />
            <button
              title="Send"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <IoSend className="w-7 h-7 text-[#111111] duration-300 transition-colors" />
            </button>
          </div>
          <div className="flex items-center justify-between">

            <SpeechToTextComponent setListenerMessage={setListenerMessage} getUserActiveSubscription={getUserActiveSubscription} setShowPopup={setShowPopup} />
            {
              user && <CallModal showPopUpVoice={showPopUpVoice} setshowPopUpVoice={setShowPopupVoice} setShowPopup={setShowPopup} />
            }
          </div>
        </div>
      </div>

      {
        false && <PlanPopUp showPopUp={showPopUp} setShowPopup={setShowPopup} />
      }
    </>
  );
};

export default ChatUi;
