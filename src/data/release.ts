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

const TAG = "v0.3.4";

export const latestRelease: Release = {
  "version": "0.3.4",
  "tag": "v0.3.4",
  "publishedAt": "2026-10-08T23:26:59Z",
  "prerelease": false,
  "notesUrl": "https://github.com/iStark/PS5PCEM/blob/v0.3.4/docs/release-notes/v0.3.4.md",
  "releaseUrl": "https://github.com/iStark/PS5PCEM/releases/tag/v0.3.4",
  "assets": [
    {
      "label": "Portable ZIP",
      "fileName": "PS5PCEM-0.3.4-windows-x64-portable.zip",
      "url": "https://github.com/iStark/PS5PCEM/releases/download/v0.3.4/PS5PCEM-0.3.4-windows-x64-portable.zip",
      "size": 130614229,
      "sha256": "d437316e9e07b7b40e4f32dc0738624381f0971cbc98440df014a35651f88f6a",
      "description": "Extract anywhere and run ps5pcem.exe. Settings and savedata stay beside the application.",
      "primary": true
    },
    {
      "label": "Per-user installer",
      "fileName": "PS5PCEM-0.3.4-windows-x64-setup.exe",
      "url": "https://github.com/iStark/PS5PCEM/releases/download/v0.3.4/PS5PCEM-0.3.4-windows-x64-setup.exe",
      "size": 128772280,
      "sha256": "9776a4ae00f55959c3377928d43e0177126da24787d3ef32397a1926453ecc0d",
      "description": "Installs for the current user only. No administrator rights required."
    },
    {
      "label": "SHA-256 checksums",
      "fileName": "SHA256SUMS.txt",
      "url": "https://github.com/iStark/PS5PCEM/releases/download/v0.3.4/SHA256SUMS.txt",
      "size": 209,
      "sha256": "8954ce92d4afcd75637cc6a74e8f995c68775605d40a94cee43f495297c4ef91",
      "description": "Verify a download before running it. Compare against the hashes listed on this page."
    }
  ]
};

export const releaseHighlights = [
  "Fixes packaged launchers failing to start games because Windows received an invalid working directory; launch failures now show the Windows error and code.",
  "Adds FreeType font rendering and the missing-glyph fallback that restores Jurassic Park startup and its first level.",
  "Implements MemoryPool allocation operations, PNG encoding, RTC additions and AMPR counters with deferred counter waits.",
  "Adds packed 11/11/10 UNORM blending, DS instructions, BY2/BY4 and PCK2/PCK4 loads, horizontal gathers and bounded scalar shader calls.",
  "Reports 1080p SDR output and leaves 120 Hz unavailable. Internal rendering remains game-controlled.",
  "The applications and installer use the existing certificate with timestamps. Instruction tests do not establish new game FPS or full-playthrough results."
] as const;

export const releaseHistory: {
  version: string;
  tag: string;
  publishedAt: string;
  url: string;
}[] = [
  {
    version: "0.3.4",
    tag: TAG,
    publishedAt: latestRelease.publishedAt,
    url: latestRelease.releaseUrl,
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
