import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { campaign } from "./_generated/originalCampaign/campaign.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App campaign={campaign} />
    {/* <App campaign={testCampaign()} /> */}
  </StrictMode>,
);
