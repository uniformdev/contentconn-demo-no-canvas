import {
  Context,
  ContextPlugin,
  enableContextDevTools,
  ManifestV2,
  enableDebugConsoleLogDrain,
} from "@uniformdev/context";
import { NextCookieTransitionDataStore } from "@uniformdev/context-next";
import type { NextPageContext } from "next";
import getConfig from "next/config";
import { enableGoogleGtagAnalytics } from "@uniformdev/context-gtag";
import manifest from "./context-manifest.json";

export function createUniformContext(serverContext?: NextPageContext) {
  const plugins: ContextPlugin[] = [
    enableContextDevTools(),
    enableDebugConsoleLogDrain("debug"),
  ];

  const {
    publicRuntimeConfig: { gtmId },
  } = getConfig();

  if (gtmId) {
    console.info(
      "GTM ID is set, activating the enableGoogleGtagAnalytics plugin with Uniform Tracker."
    );
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
