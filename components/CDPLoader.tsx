import Splitter from "./Splitter";
import { useQuirks, useScores } from "@uniformdev/context-react";
import { useUniformContext } from "@uniformdev/context-react";

const randomQuirksSet = [
  {
    industry: "Services",
    "audienceSegment": "Analysts",
  },
  {
    industry: "Biotech",
    "audienceSegment": "Prospects",
  },
  {
    industry: "Hospitality",
    "audienceSegment": "Prospects",
  },
  {
    industry: "Hospitality",
    "audienceSegment": "Customers",
  },
  {
    industry: "Retail",
    "audienceSegment": "Prospects",
  },
  {
    industry: "Retail",
    "audienceSegment": "Customers",
  },
];

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function CDPLoader({ title }: { title: string }) {
  const { context } = useUniformContext();
  const quirks = useQuirks();

  async function handleSetProfileClick(e: React.MouseEvent) {
    e.preventDefault();

    const randomIndex = getRandomInt(0, randomQuirksSet.length - 1);
    const randomQuirks = randomQuirksSet[randomIndex];
    await context.update({
      quirks: randomQuirks,
    });
  }

  return (
    <>
      <div className="pt-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-full justify-center items-start text-center md:text-left min-h-500">
            <p className="uppercase tracking-loose w-full">
              Demo CDP profile simulator
            </p>
            <h1 className="my-4 text-5xl font-bold leading-tight">{title}</h1>

            <button
              onClick={handleSetProfileClick}
              className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg"
            >
              Load now
            </button>
            <p className="my-4 text 4xl font-bold leading-tight">
              Current visitor profile:
            </p>
            <code>{JSON.stringify(quirks)}</code>
          </div>
        </div>
      </div>
      <Splitter />
    </>
  );
}
