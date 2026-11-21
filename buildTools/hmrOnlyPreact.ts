import { debounce } from "@github/mini-throttle";
import {
  type HotUpdateOptions,
  type PluginOption,
  type ViteDevServer,
} from "vite";

const testFilePattern = /\.(test|spec)\.[tj]sx?$/;
const nonRuntimeDirPattern =
  /[/\\](e2e|_testUtils|scripts|db|manual|sounds|zx_savestates|campaignXml2Json)[/\\]/;

export const hmrOnlyPreact = (): PluginOption => {
  let reload: (() => void) | undefined;

  return {
    name: "hmr-only-preact",
    configureServer(server: ViteDevServer) {
      reload = debounce(() => {
        server.hot.send({ type: "full-reload" });
      }, 500);
    },
    hotUpdate({ file }: HotUpdateOptions) {
      if (testFilePattern.test(file) || nonRuntimeDirPattern.test(file)) {
        return [];
      }
      if (!file.endsWith(".tsx")) {
        reload?.();
        return [];
      }
    },
  };
};
