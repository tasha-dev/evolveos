// Codes by mahdi tasha
// Importing part
import { Serwist } from "serwist";
import { defaultCache } from "@serwist/next/worker";

// Declrating self
declare const self: ServiceWorkerGlobalScope & {
  __SW_MANIFEST: (string | { url: string; revision?: string | null })[];
};

// Defining serwist configs
const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

// Adding event listeners
serwist.addEventListeners();
