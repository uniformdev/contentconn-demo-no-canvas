import Link from "next/link";
import Initializer from "../components/Initializer";
import Splitter from "../components/Splitter";

const SetupPage = () => {
  return (
    <>
      <div className="pt-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-1/2 justify-center items-start text-center md:text-left md:min-h-500">
            <p className="uppercase tracking-loose w-full"></p>
            <h1 className="my-4 text-5xl font-bold leading-tight">
              <Initializer />
            </h1>
            <a href={"/"}>
              <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg">
                Go Home
              </button>
            </a>
          </div>
        </div>
      </div>
      <Splitter />
    </>
  );
};

export default SetupPage;
