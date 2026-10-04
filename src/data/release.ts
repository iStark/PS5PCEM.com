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

const TAG = "v0.3.3";

export const latestRelease: Release = {
  "version": "0.3.3",
  "tag": "v0.3.3",
  "publishedAt": "2026-10-04T23:47:06Z",
  "prerelease": false,
  "notesUrl": "https://github.com/iStark/PS5PCEM/blob/v0.3.3/docs/release-notes/v0.3.3.md",
  "releaseUrl": "https://github.com/iStark/PS5PCEM/releases/tag/v0.3.3",
  "assets": [
    {
      "label": "Portable ZIP",
      "fileName": "PS5PCEM-0.3.3-windows-x64-portable.zip",
      "url": "https://github.com/iStark/PS5PCEM/releases/download/v0.3.3/PS5PCEM-0.3.3-windows-x64-portable.zip",
      "size": 129837911,
      "sha256": "b89dc8b60e932425e480a9262d9ba3ec51a8af15c15b6d66c1df93bff573a912",
      "description": "Extract anywhere and run ps5pcem.exe. Settings and savedata stay beside the application.",
      "primary": true
    },
    {
      "label": "Per-user installer",
      "fileName": "PS5PCEM-0.3.3-windows-x64-setup.exe",
      "url": "https://github.com/iStark/PS5PCEM/releases/download/v0.3.3/PS5PCEM-0.3.3-windows-x64-setup.exe",
      "size": 128205208,
      "sha256": "090e6cbc0818f1a59c65803820cb5fa19daa43550f76794e0d44f9a469d5df03",
      "description": "Installs for the current user only. No administrator rights required."
    },
    {
      "label": "SHA-256 checksums",
      "fileName": "SHA256SUMS.txt",
      "url": "https://github.com/iStark/PS5PCEM/releases/download/v0.3.3/SHA256SUMS.txt",
      "size": 209,
      "sha256": "13b6a270f9f13d0d04b38f4c9e13a796917bdc966720abe085ecb797d308a085",
      "description": "Verify a download before running it. Compare against the hashes listed on this page."
    }
  ]
};

export const releaseHighlights = [
  "Subnautica: Below Zero creates and restores a world; its latest development repeat measures 10.60 FPS combined in the world and 15.50 FPS in the menu.",
  "GTA III reaches walking and driving: 8.53 FPS combined at the opening position, with lower FPS in wider city views and remaining rendering defects.",
  "Little Nightmares reaches character control and save/reload at 3.73–4.46 FPS; Big Helmet Heroes reaches its tutorial.",
  "Ghost of Yōtei reaches the post-tree cinematic and illustrated movie. Character control remains unconfirmed; compilation, texture churn and lighting defects remain.",
  "Shared resource analysis, corrected GPU publications, runtime texture tables and smaller shader-cache allocations reduce repeated work and memory overhead.",
  "Version 0.3.3 includes the GTA III package-extraction fix, launcher extraction progress, 1080p startup preferences and timestamped signatures on all three applications and the installer."
] as const;

export const releaseHistory: {
  version: string;
  tag: string;
  publishedAt: string;
  url: string;
}[] = [
  {
    version: "0.3.3",
    tag: TAG,
    publishedAt: latestRelease.publishedAt,
    url: latestRelease.releaseUrl,
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
    value: "Windows 10 version 2004 or newer, x86-64",
  },
  {
    label: "Graphics",
    value: "A current Vulkan 1.2-capable driver",
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
  "Install the per-user build, or extract the portable ZIP anywhere you like.",
  "Start ps5pcem.exe. The launcher opens with its recent-game library.",
  "Point it at a directory containing a decrypted title you are legally entitled to use.",
  "Select Launch game.",
] as const;
