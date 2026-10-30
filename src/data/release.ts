export type ReleaseAsset = {
  /** Human readable name shown on the download card. */
  label: string;
  /** File name exactly as published on the GitHub release. */
  fileName: string;
  url: string;
  /** Size in bytes, as reported by the GitHub release API. */
  size: number;
  sha256?: string;
  description: string;
  primary?: boolean;
};

export type Release = {
  version: string;
  tag: string;
  publishedAt: string;
  prerelease: boolean;
  notesUrl: string;
  releaseUrl: string;
  assets: ReleaseAsset[];
};

const TAG = "v0.3.6";

export const latestRelease: Release = {
  "version": "0.3.6",
  "tag": "v0.3.6",
  "publishedAt": "2026-10-30T10:32:33Z",
  "prerelease": false,
  "notesUrl": "https://github.com/iStark/PS5PCEM/blob/v0.3.6/docs/release-notes/v0.3.6.md",
  "releaseUrl": "https://github.com/iStark/PS5PCEM/releases/tag/v0.3.6",
  "assets": [
    {
      "label": "Windows portable ZIP",
      "fileName": "PS5PCEM-0.3.6-windows-x64-portable.zip",
      "size": 306065798,
      "sha256": "194989ac77a3b76c60477b4c102784e9b840a31567b1591c96d3b4ccf0603ac6",
      "url": "https://github.com/iStark/PS5PCEM/releases/download/v0.3.6/PS5PCEM-0.3.6-windows-x64-portable.zip",
      "description": "Extract and run ps5pcem.exe. Settings and saves stay beside the application.",
      "primary": true
    },
    {
      "label": "Windows per-user installer",
      "fileName": "PS5PCEM-0.3.6-windows-x64-setup.exe",
      "size": 296414768,
      "sha256": "b0bac9a84fbdc88d3aea495a41857664a26c2cc568bfcfc76238b3dfe98ad58e",
      "url": "https://github.com/iStark/PS5PCEM/releases/download/v0.3.6/PS5PCEM-0.3.6-windows-x64-setup.exe",
      "description": "Installs for the current Windows user. No administrator rights required."
    },
    {
      "label": "Linux DEB",
      "fileName": "PS5PCEM-0.3.6-linux-x64.deb",
      "size": 13050792,
      "sha256": "53b368aa72ba7019bcf0c793cd60dd09f377996f289e25b526638ff97a8681b9",
      "url": "https://github.com/iStark/PS5PCEM/releases/download/v0.3.6/PS5PCEM-0.3.6-linux-x64.deb",
      "description": "Native GTK 3 launcher, runner and extractor for Debian / Ubuntu."
    },
    {
      "label": "Linux RPM",
      "fileName": "PS5PCEM-0.3.6-linux-x64.rpm",
      "size": 11932245,
      "sha256": "ae718718c381bde2fbae8e8e4a0390626ba40fe7c699043efd5c7b55e6e20567",
      "url": "https://github.com/iStark/PS5PCEM/releases/download/v0.3.6/PS5PCEM-0.3.6-linux-x64.rpm",
      "description": "Native GTK 3 launcher, runner and extractor for Fedora and compatible distributions."
    },
    {
      "label": "Linux Pacman",
      "fileName": "PS5PCEM-0.3.6-linux-x64.pacman",
      "size": 15250705,
      "sha256": "59a1eb176d9c656b019a23b8e6965d4801f7a4c25b5bfd2b80dc5fb05b17dad0",
      "url": "https://github.com/iStark/PS5PCEM/releases/download/v0.3.6/PS5PCEM-0.3.6-linux-x64.pacman",
      "description": "Native GTK 3 launcher, runner and extractor for Arch Linux. Install with pacman -U."
    },
    {
      "label": "Linux AppImage",
      "fileName": "PS5PCEM-0.3.6-linux-x64.AppImage",
      "size": 16157176,
      "sha256": "85351157f488e988ae2ef364dc70ba327910f8937cf339deef9d7168b7ded9cc",
      "url": "https://github.com/iStark/PS5PCEM/releases/download/v0.3.6/PS5PCEM-0.3.6-linux-x64.AppImage",
      "description": "Executable Linux image. Requires system GTK 3, X11, PulseAudio and Vulkan libraries."
    },
    {
      "label": "SHA-256 checksums",
      "fileName": "SHA256SUMS.txt",
      "size": 597,
      "sha256": "587fcf87c4f28a6b09a8cf8de14655a900e71979508eecab3dcd97d6a59891b1",
      "url": "https://github.com/iStark/PS5PCEM/releases/download/v0.3.6/SHA256SUMS.txt",
      "description": "SHA-256 hashes for all six Windows and Linux packages."
    }
  ]
};

export const releaseHighlights = [
  "Experimental native DirectX 12 on Windows, selectable alongside the default Vulkan backend; indexed draws, textures, depth/stencil, MRT and rendering caches.",
  "Vulkan graphics corrections for ASTRO BOT, Severed Steel and Super Woden GP, plus shared performance work and the Raiden IV fast path.",
  "KeyWe save-slot creation, Jets first-run saves, Oxide Room 104 loading and additional kernel, audio and runtime imports.",
  "PKG and ZAR extraction, twelve launcher languages, FPS limits and Windows motion input.",
  "Dated screenshots and per-backend test reports distinguish verified gameplay from unresolved title-specific issues.",
  "Signed, timestamped Windows ZIP and installer, plus Linux DEB, RPM, Pacman and AppImage packages. Linux uses Vulkan; Windows FPS results are not Linux benchmarks."
] as const;

export const releaseHistory: {
  version: string;
  tag: string;
  publishedAt: string;
  url: string;
}[] = [
  {
    version: "0.3.6",
    tag: TAG,
    publishedAt: latestRelease.publishedAt,
    url: latestRelease.releaseUrl,
  },
  {
    version: "0.3.5",
    tag: "v0.3.5",
    publishedAt: "2026-10-16T03:41:24Z",
    url: "https://github.com/iStark/PS5PCEM/releases/tag/v0.3.5",
  },
  {
    version: "0.3.4",
    tag: "v0.3.4",
    publishedAt: "2026-10-08T23:26:59Z",
    url: "https://github.com/iStark/PS5PCEM/releases/tag/v0.3.4",
  },
  {
    version: "0.3.3",
    tag: "v0.3.3",
    publishedAt: "2026-10-04T23:47:06Z",
    url: "https://github.com/iStark/PS5PCEM/releases/tag/v0.3.3",
  },
  {
    version: "0.3.2",
    tag: "v0.3.2",
    publishedAt: "2026-09-24T14:59:54Z",
    url: "https://github.com/iStark/PS5PCEM/releases/tag/v0.3.2",
  },
  {
    version: "0.3.1-beta.1",
    tag: "v0.3.1-beta.1",
    publishedAt: "2026-09-15T11:41:55Z",
    url: "https://github.com/iStark/PS5PCEM/releases/tag/v0.3.1-beta.1",
  },
  {
    version: "0.3.0-alpha.4",
    tag: "v0.3.0-alpha.4",
    publishedAt: "2026-09-08T03:47:25Z",
    url: "https://github.com/iStark/PS5PCEM/releases/tag/v0.3.0-alpha.4",
  },
  {
    version: "0.3.0-alpha.3",
    tag: "v0.3.0-alpha.3",
    publishedAt: "2026-09-04T19:56:27Z",
    url: "https://github.com/iStark/PS5PCEM/releases/tag/v0.3.0-alpha.3",
  },
  {
    version: "0.3.0-alpha.2",
    tag: "v0.3.0-alpha.2",
    publishedAt: "2026-08-25T22:57:21Z",
    url: "https://github.com/iStark/PS5PCEM/releases/tag/v0.3.0-alpha.2",
  },
  {
    version: "0.3.0-alpha.1",
    tag: "v0.3.0-alpha.1",
    publishedAt: "2026-08-25T22:38:22Z",
    url: "https://github.com/iStark/PS5PCEM/releases/tag/v0.3.0-alpha.1",
  },
];

export const systemRequirements = [
  {
    label: "Operating system",
    value: "Windows 10 version 2004 or newer, or Linux 5.11+ with glibc 2.31+, x86-64",
  },
  {
    label: "Graphics",
    value: "A current Vulkan 1.2-capable driver; experimental DirectX 12 is available on Windows",
  },
  {
    label: "Processor",
    value: "x86-64-v3 with AVX2, BMI2 and FMA. AVX-512 is not required.",
  },
  {
    label: "Reference test host",
    value: "NVIDIA GeForce RTX 3070 Ti — every timing on this site was measured there",
  },
  {
    label: "Game content",
    value:
      "Supplied by you. No games, firmware, keys, or system libraries are included.",
  },
] as const;

export const quickStart = [
  "Install the Windows per-user build, extract the portable ZIP, or install a Linux package.",
  "Start ps5pcem.exe on Windows, or ps5pcem / the AppImage on Linux. The launcher opens its library.",
  "Point it at a directory containing a decrypted title you are legally entitled to use.",
  "Select Launch game.",
] as const;
