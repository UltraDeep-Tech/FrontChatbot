
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { IoIosMic } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { getSingleModel } from "@/services/AllMutation/getSingleModel";
import cogoToast from 'cogo-toast';
import useAuthStore from '@/store/authStore';
import { useParams } from 'next/navigation';
import axios from 'axios';
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import useCustomTimer from '@/hooks/useCustomTimer';
import { BeatLoader } from 'react-spinners';
// import * as PlayHT from "playht";
import { MdCallEnd } from "react-icons/md";



export default function VoiceModel({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: any }) {

    const params = useParams()
    const ModelId = params.ModelId as string
    const [recogninzedText, setRecogninzedText] = useState("");
    const [loading, setloading] = useState(false);
    const [audioSrc, setAudioSrc] = useState<string>('/iphoneringtone.mp3');
    const [tempAudio, settempAudio] = useState('/iphoneringtone.mp3')
    const audioRef = useRef<HTMLAudioElement>(null);
    const [agentSpeaking, setAgentSpeaking] = useState(false)
    const [whoIsSpeaking, setWhoIsSpeaking] = useState("")
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);

    const { min, hour, sec, isLate, date } = useCustomTimer(ModelId);

    const { user } = useAuthStore()

    const onError = (res: any) => {
        cogoToast.error(res.data.message);
    };

    const onSuccess = async (res: any) => {
        // console.log("res", res);
    };
    // useEffect(() => {
    //     // Effect to play audio whenever audioSrc changes
    //     if (audioRef.current) {
    //         audioRef.current.play().catch((error) => console.error('Error playing audio:', error));
    //     }
    // }, [audioSrc]);

    const sayPrompt = (query: string) => {
        console.log("Hittted", query, audioRef.current)
        // setTempAudio("")
        if (!audioRef.current) return;
        const onError = () => {
            console.error('Error loading audio');
        };
        console.log("Hittted", query)

        try {
            const audioElement = audioRef.current;
            // audioElement.pause();
            // audioElement.currentTime = 0;

            // audioElement.load();

            const playAudio = () => {
                audioElement.play();
                setWhoIsSpeaking("model")
            };

            const searchParams = new URLSearchParams();
            searchParams.set('query', query);
            searchParams.set('modelId', ModelId);
            setAudioSrc(`${process.env.NEXT_PUBLIC_AUDIO_URL}?query=${query}&modelId=${ModelId}`);


            audioElement.addEventListener('loadeddata', playAudio);
            audioElement.addEventListener('ended', () => {
                settempAudio('')
                setAgentSpeaking(false); // Set AgentSpeaking to false when audio playback is completed
                setAudioSrc('')
                checkPermissions(event)
                setWhoIsSpeaking("user")
            });
            audioElement.addEventListener('error', onError);

            return () => {
                audioElement.removeEventListener('loadeddata', playAudio);
                audioElement.removeEventListener('error', onError);
                audioElement.removeEventListener('ended', () => {
                    setAgentSpeaking(false);
                    setWhoIsSpeaking("user")
                    setAudioSrc('')
                });
            };
        } catch (error) {
            onError();
        }
    };


    useEffect(() => {
        setTimeout(async () => {
            sayPrompt('Hi');
        }, 1000);
        setIsAudioPlaying(true);
    }, [isOpen])


    function closeModal() {
        setIsOpen(false)
        setAudioSrc('')
        setWhoIsSpeaking("model")
    }


    useEffect(() => {
        console.log('audioRef', audioRef.current)
        return () => {
        }
    }, [audioRef.current])


    const {
        data: GetSingleModelData,
        isLoading: gettingModel,
        isRefetching,
    } = getSingleModel(ModelId, onSuccess, onError);


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


    const checkPermissions = async (event: any) => {
        event.preventDefault(); // Prevent the default form submission behavior
        const permissions = navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        console.log(`Checking permissions`, permissions)
        permissions.then((stream) => {
            sttFromMic()
        })
            .catch((err) => {
                cogoToast.warn("Microphone permissions denied")
                console.log(`${err.name} : ${err.message}`)
            });
    }


    const sttFromMic = async () => {
        setWhoIsSpeaking("user")
        try {
            const tokenObj = await getTokenOrRefresh();
            const speechConfig = sdk.SpeechConfig.fromAuthorizationToken(
                tokenObj.authToken,
                tokenObj.region
            );
            speechConfig.speechRecognitionLanguage = "en-IN";

            const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();

            const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

            recognizer?.recognizeOnceAsync(async (result) => {
                if (result.reason === sdk.ResultReason.RecognizedSpeech) {
                    setRecogninzedText(`${result.text}`);
                    const payload: any = {
                        user: user?._id,
                        query: result.text,
                        history: [],
                        model: GetSingleModelData?.data
                    }
                    // const stream = await getAns(payload);
                    // console.log(stream, "stream")
                    setWhoIsSpeaking("model")
                    if (result.text) {
                        sayPrompt(result.text)
                    }
                    // await getAudioFromServer({
                    //     text: result.text
                    // })
                } else {
                    // cogoToast.error(
                    //     "ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly."
                    // );
                }
            });
        } catch (error) {
            console.error("Error in speech recognition:", error);
        }
    };



    return (
        <>


            <div className="mt-2 h-full ">
                <div className="flex flex-col md:flex-row space-y-12 space-x-0 md:space-x-36 md:space-y-0 justify-center items-center p-12">
                    <div >
                        <div className={`  transition duration-300 ease-in-out transform hover:scale-105 ${whoIsSpeaking == "model" ? '   profile-container speaking   rounded-full cursor-not-allowed' : ''}`}>
                            <img
                                src={`${GetSingleModelData?.data.profilePicture[0]}`}
                                alt={`Profile Picture`}
                                className={`w-36 md:w-64 md:h-64  object-top border-4 object-cover rounded-full mx-auto bg-white`}
                            />
                        </div>
                        <p className='text-center mt-4 font-semibold' >{GetSingleModelData?.data?.name}</p>
                    </div>
                    <div >
                        <div className={`cursor-pointer ${whoIsSpeaking == "user" ? 'profile-container aispeaking rounded-full cursor-not-allowed' : ''} transition duration-300 ease-in-out transform hover:scale-105`} onClick={checkPermissions}>
                            <img
                                src={`${user?.profilePicture}`}
                                alt={`Profile Picture`}
                                className={`w-36 md:w-64 md:h-64  object-top border-4 object-cover rounded-full mx-auto bg-white`}
                            />
                        </div>
                        <p className='text-center mt-4 font-semibold'>{user?.firstName} {user?.lastName}</p>
                    </div>

                </div>
                {loading && <BeatLoader className='textw-hite' />}
                <p className='text-center'>{hour}:{min}:{sec}
                </p>

                <div className="flex mt-4 w-full items-center justify-center">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="bg-red-500 rounded-full p-2 hover:bg-red-600 focus:outline-none flex items-center justify-center"
                    >
                        <MdCallEnd className="text-white text-3xl" />
                    </button>
                </div>

                <audio className="w-full hidden" ref={audioRef} src={audioSrc} autoPlay controls />
                <audio className="w-full hidden" src={tempAudio} />
            </div>

        </>
    )
}