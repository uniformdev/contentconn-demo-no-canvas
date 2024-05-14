import { compose, EnhancerBuilder } from "@uniformdev/canvas";
import getConfig from "next/config";

import { CANVAS_CONTENTSTACK_PARAMETER_TYPES } from "@uniformdev/canvas-contentstack";
import { contentstackEnhancer } from "./contentstack/contentstackEnhancer";
import { contentstackModelConverter } from "./contentstack/contentstackModelConverter";

const { serverRuntimeConfig } = getConfig();
const {
  contentstackApiKey,
  contentstackDeliveryToken,
  contentstackEnvironment,
} = serverRuntimeConfig;

const contentstackConfigured: boolean =
  contentstackApiKey !== undefined &&
  contentstackDeliveryToken !== undefined &&
  contentstackEnvironment !== undefined;

console.warn(
  contentstackConfigured
    ? "✅  Contentstack enhancer is configured and enabled."
    : "⚠️   Contentstack enhancer is not configured and therefore disabled. If that's unexpected, please check your env vars."
);

export const enhancers = new EnhancerBuilder().parameterType(
  CANVAS_CONTENTSTACK_PARAMETER_TYPES,
  contentstackConfigured
    ? // @ts-ignore
      compose(contentstackEnhancer(), contentstackModelConverter)
    : () => {}
);
