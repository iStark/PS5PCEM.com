/**
 * Launcher facts, mirroring src/launcher.zig, src/launcher_common.zig and
 * src/launcher_linux.zig in the PS5PCEM repository, its release notes and
 * docs/architecture/overview.md. Prose lives in the dictionaries; this file
 * holds only what is the same in every language.
 */

import type { Locale } from "@/i18n/config";

export const commitUrl = (sha: string) =>
  `https://github.com/iStark/PS5PCEM/commit/${sha}`;

/**
 * The newest development commit these pages describe: the FPS limit. The
 * Graphics API card came in fafd205 and the four newest languages in 83948d3.
 */
export const launcherDevelopmentCommit = {
  sha: "6654cf5",
  date: "2026-10-21",
  url: commitUrl("6654cf5"),
} as const;

export type LauncherLanguage = {
  /** The site locale with the same language. */
  locale: Locale;
  /** The value saved as language=<id> in ps5pcem.ini. */
  launcherId: number;
  /** First published release whose launcher offered it; null while unreleased. */
  since: string | null;
};

/**
 * Every launcher language in Language order (launcher_common.zig). IDs are
 * appended, never reordered, so a saved choice keeps its meaning.
 */
export const launcherLanguages: readonly LauncherLanguage[] = [
  { locale: "en", launcherId: 0, since: "0.3.0-alpha.1" },
  { locale: "ru", launcherId: 1, since: "0.3.0-alpha.1" },
  { locale: "de", launcherId: 2, since: "0.3.0-alpha.1" },
  { locale: "fr", launcherId: 3, since: "0.3.0-alpha.1" },
  { locale: "zh", launcherId: 4, since: "0.3.0-alpha.4" },
  { locale: "es", launcherId: 5, since: "0.3.0-alpha.4" },
  { locale: "ar", launcherId: 6, since: "0.3.0-alpha.4" },
  { locale: "pt", launcherId: 7, since: "0.3.0-alpha.4" },
  { locale: "tr", launcherId: 8, since: null },
  { locale: "ja", launcherId: 9, since: null },
  { locale: "hi", launcherId: 10, since: null },
  { locale: "ko", launcherId: 11, since: null },
];

/** Releases the languages first shipped in, for the counts on the page. */
export const releasedLauncherLanguages = launcherLanguages.filter(
  (language) => language.since !== null,
);

/**
 * When each launcher capability first appeared in a published release, or
 * null for the development build after the latest release, which links to
 * its commit instead. Keys name the matching dictionary strings
 * (launcher.timeline.<key>).
 */
export const launcherTimeline = [
  { key: "alpha1", version: "0.3.0-alpha.1", commit: null },
  { key: "alpha4", version: "0.3.0-alpha.4", commit: null },
  { key: "beta1", version: "0.3.1-beta.1", commit: null },
  { key: "v032", version: "0.3.2", commit: null },
  { key: "v033", version: "0.3.3", commit: null },
  { key: "v034", version: "0.3.4", commit: null },
  { key: "v035", version: "0.3.5", commit: null },
  { key: "development", version: null, commit: "83948d3" },
  { key: "graphicsApi", version: null, commit: "fafd205" },
  { key: "fpsLimit", version: null, commit: "6654cf5" },
] as const;

/** The environment variables the launcher sets before starting game-run. */
export const launcherEnvironment = [
  { name: "PS5_INPUT_MODE", values: "controller | keyboard | hybrid", key: "input" },
  { name: "PS5_CONTROLLER_INDEX", values: "0–3", key: "controller" },
  { name: "PS5_KEYMAP", values: "cross=32,circle=69,…", key: "keymap" },
  { name: "PS5_OUTPUT_RESOLUTION", values: "1080 | 1440 | 2160 | 4320", key: "resolution" },
  { name: "PS5_GRAPHICS_API", values: "vulkan | d3d12", key: "graphicsApi" },
  { name: "PS5_FPS_LIMIT", values: "30 | 60 | 120 | 0", key: "fpsLimit" },
  { name: "PS5_PERFORMANCE_MODE", values: "speed | graphics", key: "preset" },
  { name: "PS5_GAME_PRESET", values: "default | performance", key: "gamePreset" },
  { name: "PS5_SHOW_FPS", values: "1", key: "fps" },
  { name: "PS5_AUDIO_DISABLED", values: "1", key: "audio" },
] as const;

export const launcherFacts = {
  windowsBinary: "ps5pcem.exe",
  linuxBinary: "ps5pcem",
  runner: "game-run",
  libraryCapacity: 48,
  outputResolutions: ["1080p", "1440p", "4K", "8K"],
  windowsSettings: "ps5pcem.ini",
  linuxSettings: "${XDG_CONFIG_HOME:-$HOME/.config}/ps5pcem/ps5pcem.ini",
  linuxData: "${XDG_DATA_HOME:-$HOME/.local/share}/ps5pcem/",
  saves: "savedata/<titleId>/<slot>/",
  source:
    "https://github.com/iStark/PS5PCEM/blob/main/docs/architecture/overview.md",
  linuxGuide: "https://github.com/iStark/PS5PCEM/blob/main/docs/linux.md",
} as const;

export const launcherImages = {
  settings: { src: "/images/launcher-settings-en.png", width: 1180, height: 760 },
  controls: { src: "/images/launcher-controls-en.png", width: 1180, height: 760 },
  library: { src: "/images/launcher-library.png", width: 1182, height: 792 },
  languages: { src: "/images/launcher-settings-ja.png", width: 1180, height: 760 },
  /** The Graphics API card cropped from Settings, with DirectX 12 selected. */
  graphicsApi: { src: "/images/launcher-graphics-api-en.png", width: 838, height: 104 },
  /** The library's bottom card with the FPS limit set to 60. */
  fpsLimit: { src: "/images/launcher-fps-limit-en.png", width: 824, height: 105 },
} as const;
