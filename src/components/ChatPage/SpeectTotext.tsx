"use client";
import { useState } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { BiSolidMicrophone } from "react-icons/bi";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import cogoToast from "cogo-toast";
import { checkTextCondition } from "@/services/PlanGuard";


const SpeechToTextComponent = ({ setListenerMessage, getUserActiveSubscription, setShowPopup }: any) => {
  const [displayText, setDisplayText] = useState("");
  const [recogninzedText, setRecogninzedText] = useState("");
  const [showListerner, setShowListerner] = useState(false);

  async function getTokenOrRefresh() {
    const subscriptionKey: any = process.env.NEXT_PUBLIC_SPEECH_KEY;
    const region: any = process.env.NEXT_PUBLIC_SPEECH_REGION;
    const url: any = process.env.NEXT_PUBLIC_SPEECH_URL;
    try {
      const response = await axios.post(url, null, {
        headers: {
          "Ocp-Apim-Subscription-Key": subscriptionKey,
        },
      });

      if (response.status === 200) {
        const authToken = response.data;
        return { authToken, region };
      } else {
        throw new Error(
          `Failed to retrieve auth token. Status code: ${response.status}`
        );
      }
    } catch (error: any) {
      throw new Error(`Error while fetching auth token: ${error.message}`);
    }
  }
  const [isMicPermission, setisMicPermission] = useState(false)


  const checkPermissions = async (event: any) => {
    event.preventDefault(); // Prevent the default form submission behavior
    let userHasPermission = checkTextCondition(getUserActiveSubscription)

    if (userHasPermission){
      const permissions = navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      console.log(`Checking permissions`, permissions)
      permissions.then((stream) => {
        setisMicPermission(true)
        sttFromMic()
      })
        .catch((err) => {
          cogoToast.warn("Microphone permissions denied")
          setisMicPermission(false)
          console.log(`${err.name} : ${err.message}`)
        });
    }else{
      setShowPopup(true)
    }
  }


  const sttFromMic = async () => {
    setShowListerner(true);

    try {
      const tokenObj = await getTokenOrRefresh();
      const speechConfig = sdk.SpeechConfig.fromAuthorizationToken(
        tokenObj.authToken,
        tokenObj.region
      );
      speechConfig.speechRecognitionLanguage = "en-IN";

      const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
      const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

      setDisplayText("Listening...");

      recognizer?.recognizeOnceAsync((result) => {
        if (result.reason === sdk.ResultReason.RecognizedSpeech) {
          setRecogninzedText(`${result.text}`);
          setListenerMessage(result.text)
          setShowListerner(false);
        } else {
          setDisplayText(
            "ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly."
          );
          cogoToast.error(
            "ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly."
          );
        }
      });
    } catch (error) {
      console.error("Error in speech recognition:", error);
    }
  };
  setListenerMessage(recogninzedText);



  return (
    <div className="h-full mr-1 ml-1 flex justify-center items-center">
      <button onClick={checkPermissions}>
        <BiSolidMicrophone className="text-[25px]" />
      </button>
      {displayText === "Listening..." && isMicPermission ? (
        <div
          className={`${showListerner
            ? "absolute rounded-2xl mb-72 p-6 w-48 bg-slate-300 text-black"
            : "hidden"
            }`}
        >
          <div className="flex flex-col gap-3 justify-center items-center">
            {displayText}
            <ScaleLoader color="#36d7b7" />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SpeechToTextComponent;
