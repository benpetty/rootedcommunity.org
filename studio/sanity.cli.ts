import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "wnfi1j4a",
    dataset: "production",
  },
  deployment: {
    appId: "byz907emdwxbdexj91jafp0n",
    autoUpdates: true,
  },
});
