import {
  Context,
  ManifestV2,
  enableContextDevTools,
  ContextPlugin,
  TransitionDataStore,
  StorageCommands,
  VisitorData,
  enableDebugConsoleLogDrain,
} from "@uniformdev/context";
//import { enableGoogleGtagAnalytics } from "@uniformdev/context-gtag";
//import getConfig from "next/config";
import { createClient, Client, Room, LiveObject } from "@liveblocks/client";
import { nanoid } from "nanoid";

import type { NextPageContext } from "next";
import manifest from "./context-manifest.json";

// const {
//   publicRuntimeConfig: { gtmId },
// } = getConfig();

class YoloTransitionStore extends TransitionDataStore {
  readonly visitorId: string | undefined;
  readonly client: Client | undefined;
  readonly room: Room | undefined;

  private visitor: LiveObject<Partial<VisitorData>> | undefined;
  private latestData: VisitorData | undefined;

  constructor() {
    super({
      initialData: {},
    });

    if (typeof window === "undefined") {
      return;
    }

    if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
      console.error("Liveblocks public key is not set");
      return;
    }

    let id = localStorage.getItem("visitorId");

    if (!id) {
      id = nanoid();
      localStorage.setItem("visitorId", id);
    }

    this.visitorId = id;
    this.client = createClient({
      publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY,
    });
    this.room = this.client.enter(this.visitorId, {
      initialStorage: {
        visitor: new LiveObject<Partial<VisitorData>>(),
      },
    });

    this.room.getStorage().then((storage) => {
      this.visitor = storage.root.get("visitor") as LiveObject<
        Partial<VisitorData>
      >;

      if (this.latestData) {
        console.log("live blocks sending queued data", this.latestData);
        this.visitor.update(this.latestData);
        this.latestData = undefined;
      } else {
        console.log("no queued data");
      }

      this.room!.subscribe(this.visitor, (data) => {
        if (data) {
          const updatedVisitorData = data.toObject();

          if (Object.keys(updatedVisitorData).length > 0) {
            this.signalAsyncDataUpdate(updatedVisitorData);
          }
        }
      });
    });
  }

  async delete(fromAllDevices?: boolean): Promise<void> {
    const cleanData: VisitorData = {
      scores: {},
      quirks: {},
      sessionScores: {},
      consent: true,
      controlGroup: false,
      tests: {},
    };

    this.updateData([], cleanData);
  }

  async handleDelete(fromAllDevices?: boolean): Promise<void> {
    console.log("this will never fire.");
  }

  async handleUpdateData(
    _commands: StorageCommands[],
    computedValue: VisitorData
  ): Promise<void> {
    console.log(computedValue);

    if (this.visitor) {
      console.log("live blocks sending data", computedValue);
      this.visitor.update(computedValue);
    } else {
      console.log("live blocks queueing data", computedValue);
      this.latestData = computedValue;
    }
  }
}

export function createUniformContext(serverContext?: NextPageContext) {
  const plugins: ContextPlugin[] = [
    enableContextDevTools(),
    enableDebugConsoleLogDrain("debug"),
  ];

  // if (gtmId) {
  //   plugins.push(enableGoogleGtagAnalytics());
  // }

  return new Context({
    defaultConsent: true,
    manifest: manifest as ManifestV2,
    transitionStore: new YoloTransitionStore(),
    plugins,
  });
}
