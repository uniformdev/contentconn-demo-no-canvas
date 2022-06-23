import {
  Context,
  ContextPlugin,
  enableContextDevTools,
  ManifestV2,
  enableDebugConsoleLogDrain,
} from "@uniformdev/context";
import { NextCookieTransitionDataStore } from "@uniformdev/context-next";
import type { NextPageContext } from "next";
import manifest from "./context-manifest.json";
import { enableGoogleGtagAnalytics } from "@uniformdev/context-gtag";

export function createUniformContext(serverContext?: NextPageContext) {
  const plugins: ContextPlugin[] = [
    enableContextDevTools(),
    enableDebugConsoleLogDrain("debug"),
    enableGoogleGtagAnalytics(),
  ];

  return new Context({
    defaultConsent: true,
    manifest: manifest as ManifestV2,
    transitionStore: new NextCookieTransitionDataStore({
      serverContext,
    }),
    plugins,
  });
}
