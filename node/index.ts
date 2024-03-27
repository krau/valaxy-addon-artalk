import { defineValaxyAddon } from "valaxy";
import type { ArtalkOptions } from "../types";

export const addonArtalk = defineValaxyAddon<ArtalkOptions>((options) => ({
  name: "valaxy-addon-artalk",
  enable: true,
  options,
}));
