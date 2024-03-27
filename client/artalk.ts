import { onMounted, computed, ComputedRef, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { useAddonArtalk } from "./options";
import type { ArtalkOptions } from "../types";
import Artalk from "artalk";

export function useArtalk(options: ComputedRef<ArtalkOptions | undefined>) {
  const { locale } = useI18n();
  let artalk: Artalk;
  onMounted(() => {
    const defaultOptions = {
      el: "#ArtalkComment",
      locale: locale.value,
    };
    const newArtalkOptions = Object.assign(defaultOptions, options.value || {});
    artalk = Artalk.init(newArtalkOptions);
  });

  onUnmounted(() => {
    artalk.destroy();
  });
}

export function useArtalkWithOptions() {
  const addonArtalk = useAddonArtalk();
  const options = computed(() => addonArtalk.value.options);
  useArtalk(options);
}
