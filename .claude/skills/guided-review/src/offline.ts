/* whether this machine can reach beyond localhost. A served page keeps
   working fully offline - monaco and every asset come from the local server -
   but the reviewer should know notes will queue for a later agent rather than
   reach a live one. */

import { makeStore } from "./stores.ts";

export const offlineStore = makeStore(!navigator.onLine);

window.addEventListener("offline", () => offlineStore.set(true));
window.addEventListener("online", () => offlineStore.set(false));
