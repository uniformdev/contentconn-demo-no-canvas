import React from "react";
import { ToggleEmbeddedContextDevTools } from "@uniformdev/context-devtools";
import getConfig from "next/config";
import FollowLarsButton from "./FollowLarsButton";
const { serverRuntimeConfig } = getConfig();
const { projectId, apiKey, apiHost } = serverRuntimeConfig;

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto px-8">
        <div className="w-full flex flex-col md:flex-row py-4">
          <div className="flex-1 mb-6"></div>
          <p className="text-gray-900 text-right flex-1 leading-8">
            Uniform starter for Contentstack © {new Date().getFullYear()}
          </p>
        </div>
        <FollowLarsButton />
        <ToggleEmbeddedContextDevTools
          initialSettings={{
            apiHost: apiHost,
            apiKey: apiKey,
            projectId: projectId,
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
