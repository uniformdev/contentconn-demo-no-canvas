import React from "react";

export const Talk = (props: any) => {
  const { title, description, pz } = props || {};
  return (
    <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
      <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow space-y-2 pt-2">
        <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden">
          <div className="mt-3 mb-3 flex items-center justify-start">
            {getAudienceFromCriteria(pz)}
          </div>
        </div>
        <a href="#" className="flex flex-wrap no-underline hover:no-underline">
          <div className="w-full font-bold text-xl text-gray-800 px-6">
            {title}
          </div>
        </a>
        <div className="text-gray-800 px-6 pb-6 text-sm">{description}</div>
      </div>
    </div>
  );
};

const getAudienceFromCriteria = (pz: any) => {
  const { crit } = pz || {};
  let label = "Everyone";
  if (crit && crit.length > 0) {
    if (crit[0].l == "1_dev") {
      label = "Developers";
    } else if (crit[0].l == "1_mkt") {
      label = "Marketers";
    }
  }
  return <AudienceLabel audienceName={label} />;
};

const AudienceLabel: React.FC<{
  audienceName?: string;
}> = ({ audienceName }) => {
  let labelStyle = "bg-red-100 text-red-800";
  if (audienceName === "Developers") {
    labelStyle = "bg-green-100 text-green-800";
  } else if (audienceName === "Marketers") {
    labelStyle = "bg-indigo-800 text-white";
  }
  return (
    <span
      className={`ml-6 px-6 inline-flex text-xs leading-5 font-semibold rounded-full ${labelStyle}`}
    >
      {audienceName}
    </span>
  );
};
