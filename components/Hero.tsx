import Link from "next/link";
import Splitter from "./Splitter";
import { IHero } from "../lib/contentstack";

export function Hero(props: IHero) {
  const { title, description, button_text, image, button_link_slug } =
    props || {};
  return (
    <>
      <div className="pt-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-1/2 justify-center items-start text-center md:text-left md:min-h-500">
            <p className="uppercase tracking-loose w-full">
              This is Uniform demo
            </p>
            <h1 className="my-4 text-5xl font-bold leading-tight">{title}</h1>
            <p className="leading-normal text-2xl mb-8">{description}</p>
            {button_text ? (
              <Link
                prefetch={false}
                href={button_link_slug ? button_link_slug : "#"}
              >
                <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg">
                  {button_text}
                </button>
              </Link>
            ) : null}
          </div>
          <div className="w-full md:w-1/2 py-6 pb-24 text-center">
            {image && (
              <img
                className="w-full md:w-4/5 z-50 max-h-500"
                height={500}
                src={image.url}
                alt={button_text}
              />
            )}
          </div>
        </div>
      </div>
      <Splitter />
    </>
  );
}
