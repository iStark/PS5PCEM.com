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

const TAG = "v0.3.2";
const DOWNLOAD_BASE = `https://github.com/iStark/PS5PCEM/releases/download/${TAG}`;

export const latestRelease: Release = {
  version: "0.3.2",
  tag: TAG,
  publishedAt: "2026-09-24T14:59:54Z",
  prerelease: false,
  notesUrl:
    "https://github.com/iStark/PS5PCEM/blob/v0.3.2/docs/release-notes/v0.3.2.md",
  releaseUrl: `https://github.com/iStark/PS5PCEM/releases/tag/${TAG}`,
  assets: [
    {
      label: "Portable ZIP",
      fileName: "PS5PCEM-0.3.2-windows-x64-portable.zip",
      url: `${DOWNLOAD_BASE}/PS5PCEM-0.3.2-windows-x64-portable.zip`,
      size: 29220424,
      sha256:
        "384ae82e6ae30f5800953af513f1eb167f95381884ca0add01a636236f5855a8",
      description:
        "Extract anywhere and run ps5pcem.exe. Settings and savedata stay beside the application.",
      primary: true,
    },
    {
      label: "Per-user installer",
      fileName: "PS5PCEM-0.3.2-windows-x64-setup.exe",
      url: `${DOWNLOAD_BASE}/PS5PCEM-0.3.2-windows-x64-setup.exe`,
      size: 29071000,
      sha256:
        "bba5e8d8f3d10c6ce7f6958d36e1f8ee86e26696331a3b389d6b1b5835e8c974",
      description:
        "Installs for the current user only. No administrator rights required.",
    },
    {
      label: "SHA-256 checksums",
      fileName: "SHA256SUMS.txt",
      url: `${DOWNLOAD_BASE}/SHA256SUMS.txt`,
      size: 209,
      description:
        "Verify a download before running it. Compare against the hashes listed on this page.",
    },
  ],
};

export const releaseHighlights = [
  "Rita's Rewind is confirmed playable and completable. Quake II gains model, lighting-data and shadow-sampling fixes.",
  "Ghost of Yōtei gains movie audio and reaches later 3D scenes. Its measured tree scene is still only 0.73 FPS; late loading remains unstable.",
  "Tetris reaches a readable license screen and Journey Mode selection with fewer rendering artifacts and faster frames. Gameplay and stability remain unverified.",
  "Shader compilation uses two workers by default, with parallel CPU command preparation and fewer unnecessary GPU waits.",
  "The launcher displays 0.3.2, remembers 32 titles across pages of eight, and includes the debug PKG extractor with Kraken support.",
] as const;

export const releaseHistory: {
  version: string;
  tag: string;
  publishedAt: string;
  url: string;
}[] = [
  {
    version: "0.3.2",
    tag: TAG,
    publishedAt: latestRelease.publishedAt,
    url: latestRelease.releaseUrl,
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
