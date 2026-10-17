/**
 * The renderers PS5PCEM can select, mirroring src/graphics_api.zig,
 * src/game_run.zig and docs/architecture/d3d12.md in the emulator repository
 * at commit fafd205. Prose lives in the dictionaries and in the "vulkan" and
 * "d3d12" technology articles.
 */

import type { TechSlug } from "@/data/technologies";

export type GraphicsApi = {
  /** The value saved as graphics_api= in ps5pcem.ini and passed as PS5_GRAPHICS_API. */
  value: "vulkan" | "d3d12";
  /** The name the launcher shows on its Graphics API card. */
  label: string;
  /** Host systems whose runner accepts it (graphics_api.zig supportsPlatform). */
  platforms: readonly string[];
  isDefault: boolean;
  techSlug: TechSlug;
};

/** In the launcher's order; Vulkan stays the default. */
export const graphicsApis: readonly GraphicsApi[] = [
  {
    value: "vulkan",
    label: "Vulkan",
    platforms: ["Windows", "Linux"],
    isDefault: true,
    techSlug: "vulkan",
  },
  {
    value: "d3d12",
    label: "DirectX 12",
    platforms: ["Windows"],
    isDefault: false,
    techSlug: "d3d12",
  },
];

/** The implementation and validation notes for the Direct3D 12 backend. */
export const d3d12Notes =
  "https://github.com/iStark/PS5PCEM/blob/main/docs/architecture/d3d12.md";
