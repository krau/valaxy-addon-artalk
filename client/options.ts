import { computed } from "vue";
import type { ValaxyAddon } from "valaxy";
import { useRuntimeConfig } from "valaxy";
import type { ArtalkOptions } from "../types";

/**
 * get addon config
 */
export function useAddonArtalk() {
  const runtimeConfig = useRuntimeConfig();
  return computed(
    () =>
      runtimeConfig.value.addons[
        "valaxy-addon-artalk"
      ] as ValaxyAddon<ArtalkOptions>
  );
}
