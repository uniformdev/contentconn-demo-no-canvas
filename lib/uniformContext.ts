import {
  Context,
  ManifestV2,
  enableContextDevTools,
  ContextPlugin,
  enableDebugConsoleLogDrain,
} from "@uniformdev/context";
import { NextCookieTransitionDataStore } from "@uniformdev/context-next";
import { enableGoogleGtagAnalytics } from "@uniformdev/context-gtag";
import getConfig from "next/config";

import type { NextPageContext } from "next";
import manifest from "./context-manifest.json";

const {
  publicRuntimeConfig: { gtmId },
} = getConfig();

export function createUniformContext(serverContext?: NextPageContext) {
  const plugins: ContextPlugin[] = [
    enableContextDevTools(),
    enableDebugConsoleLogDrain("debug"),
  ];

  if (gtmId) {
    plugins.push(enableGoogleGtagAnalytics());
  }

  return new Context({
    defaultConsent: true,
    manifest: manifest as ManifestV2,
    transitionStore: new NextCookieTransitionDataStore({
      serverContext,
    }),
    plugins,
  });
}
