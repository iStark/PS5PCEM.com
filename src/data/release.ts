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

const TAG = "v0.3.1-beta.1";
const DOWNLOAD_BASE = `https://github.com/iStark/PS5PCEM/releases/download/${TAG}`;

export const latestRelease: Release = {
  version: "0.3.1-beta.1",
  tag: TAG,
  publishedAt: "2026-09-15T11:41:55Z",
  prerelease: true,
  notesUrl:
    "https://github.com/iStark/PS5PCEM/blob/main/docs/release-notes/v0.3.1-beta.1.md",
  releaseUrl: `https://github.com/iStark/PS5PCEM/releases/tag/${TAG}`,
  assets: [
    {
      label: "Portable ZIP",
      fileName: "PS5PCEM-0.3.1-beta.1-windows-x64-portable.zip",
      url: `${DOWNLOAD_BASE}/PS5PCEM-0.3.1-beta.1-windows-x64-portable.zip`,
      size: 20289889,
      sha256:
        "a33d7b9279db9a027728838ac7e3c3baf8d7523b3c54d91d18fe8bcf20bdc093",
      description:
        "Extract anywhere and run ps5pcem.exe. Settings and savedata stay beside the application.",
      primary: true,
    },
    {
      label: "Per-user installer",
      fileName: "PS5PCEM-0.3.1-beta.1-windows-x64-setup.exe",
      url: `${DOWNLOAD_BASE}/PS5PCEM-0.3.1-beta.1-windows-x64-setup.exe`,
      size: 20488760,
      sha256:
        "e1f7a9390a7969d592ae5df2943c73e328543c065936a806b93acaf9c283e96c",
      description:
        "Installs for the current user only. No administrator rights required.",
    },
    {
      label: "SHA-256 checksums",
      fileName: "SHA256SUMS.txt",
      url: `${DOWNLOAD_BASE}/SHA256SUMS.txt`,
      size: 223,
      description:
        "Verify a download before running it. Compare against the hashes listed on this page.",
    },
  ],
};

export const releaseHistory: {
  version: string;
  tag: string;
  publishedAt: string;
  url: string;
}[] = [
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
