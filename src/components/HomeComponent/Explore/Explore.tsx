import Cards from "./Cards";
import HomePageSideWindwow from "./HomePageSideWindwow";

const Explore = ({ data }: { data: any }) => {

  return (
    
    <>
      <div
        className="flex pb-3 gap-4 items-start md:ml-4  px-5 w-full overflow-y-auto h-full rounded-2xl pt-3"
      >
        <div className="w-full flex flex-col h-full">
          <div className="flex flex-row justify-center items-center">
            {/* <h1 className=" mt-2 text-center  text-2xl font-medium  text-redText animate-bounce">
              Pick Your AI Friend and Starts Chatting!

            </h1> */}
          </div>
          <div className=" w-full h-full ">
            <Cards data={data} />
          </div>
        </div>
        <HomePageSideWindwow />
      </div>
    </>
  );
};

export default Explore;
