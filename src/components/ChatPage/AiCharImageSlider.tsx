import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ModelPicture from "./ModelPicture";
import cogoToast from "cogo-toast";
import { getUserDescriptionForModelApi, createUserModelApi } from "@/services/AllMutation/createModel";
import { useParams } from "next/navigation";
import { useState } from "react";
import { MdDone, MdClose, MdEdit } from "react-icons/md";

interface ImageCarouselProps {
  images: string[];
  GetSingleModelData: any
}

const AiCharImageSlider: React.FC<ImageCarouselProps> = ({ images, GetSingleModelData }) => {

  const [showTextArea, setShowTextArea] = useState<boolean>(false)
  const [description, setDescription] = useState<string>("")
  const params = useParams()
  const modelId = params.ModelId as string

  const { data: getUserDescriptionForModel } = getUserDescriptionForModelApi(modelId, setDescription)
  const { mutate: createUserModel, isLoading } = createUserModelApi(setDescription, setShowTextArea)


  const handleEditClick = (event: any) => {
    // event.preventDefault();
    setShowTextArea(true);
  };


  const handleSave = () => {
    if (description.trim() !== "") {
      createUserModel({
        modelId: modelId,
        description: description
      })
    } else {
      cogoToast.error("Description cannot be empty ")
    }
  }

  const handleClose = () => {
    setDescription("")
  }

  return (
    <>
      <div className="relative h-full">
        <Carousel showThumbs={false} showStatus={false}>
          {images?.map((image: any, index: any) => (
            <div key={index} style={{ position: 'relative', width: '100%',  }} className="rounded-2xl h-[95vh]">
              <ModelPicture size={100} user={undefined} path={image} />
            </div>
          ))}

        </Carousel>
        <div className="mt-4 w-full absolute bottom-12 px-12 bg-[#0000009f]">
          {
            showTextArea ? (
              <>
                <div className="relative">
                  <div className="absolute top-0 right-0 flex items-center p-3">
                    <MdDone className="text-green-500 cursor-pointer" onClick={handleSave} />
                    <MdClose className="text-red-500 ml-2 cursor-pointer" onClick={() => setShowTextArea(false)} />
                  </div>
                  <textarea
                    className="w-full text-sm bg-transparent border-2 p-2 border-gray-200 rounded-md focus:outline-none focus:border-gray-300 bg-mainBg"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter your text here..."
                  />
                </div>
              </>
            ) : (
              <>
                {/* <div className="w-full flex justify-end"> */}
                  {/* <button className="cursor-pointer" onClick={handleEditClick}> */}
                    {/* <MdEdit size={20} className={"text-white"} /> */}
                  {/* </button> */}

                {/* </div> */}
                <div className="flex flex-col items-center text-darkText">
                  <div>
                    <div className="p-3 flex flex-col items-center">
                      <h1 className="text-xl font-semibold">{GetSingleModelData?.data?.name}</h1>
                      <p className="text-sm pt-4 text-justify">{GetSingleModelData?.data?.description}</p>
                    </div>
                  </div>
                </div>
              </>
            )
          }
        </div>
      </div>

    </>

  );
};

export default AiCharImageSlider;
