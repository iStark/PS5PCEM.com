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

const TAG = "v0.3.5";

export const latestRelease: Release = {
  "version": "0.3.5",
  "tag": "v0.3.5",
  "publishedAt": "2026-10-16T03:41:24Z",
  "prerelease": false,
  "notesUrl": "https://github.com/iStark/PS5PCEM/blob/v0.3.5/docs/release-notes/v0.3.5.md",
  "releaseUrl": "https://github.com/iStark/PS5PCEM/releases/tag/v0.3.5",
  "assets": [
    {
      "label": "Windows portable ZIP",
      "fileName": "PS5PCEM-0.3.5-windows-x64-portable.zip",
      "size": 228660896,
      "sha256": "431730b7e3c8ad245f0819896e164fcce6015a7487e9bc6264151ccbeacbfbd2",
      "url": "https://github.com/iStark/PS5PCEM/releases/download/v0.3.5/PS5PCEM-0.3.5-windows-x64-portable.zip",
      "description": "Extract and run ps5pcem.exe. Settings and saves stay beside the application.",
      "primary": true
    },
    {
      "label": "Windows per-user installer",
      "fileName": "PS5PCEM-0.3.5-windows-x64-setup.exe",
      "size": 224151816,
      "sha256": "3ca145200479fdb34a7da6a2e14bbb41ea4f7ba3b01835e8f5d4a036991df8d0",
      "url": "https://github.com/iStark/PS5PCEM/releases/download/v0.3.5/PS5PCEM-0.3.5-windows-x64-setup.exe",
      "description": "Installs for the current Windows user. No administrator rights required."
    },
    {
      "label": "Linux DEB",
      "fileName": "PS5PCEM-0.3.5-linux-x64.deb",
      "size": 12862232,
      "sha256": "85b6534e36982cd02db3c0eaadac29b4e71c0926a7a9dd74675603146c4c3d50",
      "url": "https://github.com/iStark/PS5PCEM/releases/download/v0.3.5/PS5PCEM-0.3.5-linux-x64.deb",
      "description": "Native GTK 3 launcher, runner and extractor for Debian / Ubuntu."
    },
    {
      "label": "Linux RPM",
      "fileName": "PS5PCEM-0.3.5-linux-x64.rpm",
      "size": 11777941,
      "sha256": "7100cc97ac27f093f58331097585e8a328d5f8060acdec7884849c92d677a06a",
      "url": "https://github.com/iStark/PS5PCEM/releases/download/v0.3.5/PS5PCEM-0.3.5-linux-x64.rpm",
      "description": "Native GTK 3 launcher, runner and extractor for Fedora and compatible distributions."
    },
    {
      "label": "Linux Pacman",
      "fileName": "PS5PCEM-0.3.5-linux-x64.pacman",
      "size": 15025056,
      "sha256": "03c14f20c6d2b79e8ad0c67fea29573adebca8fa8039c6b76ecbf29e5e811463",
      "url": "https://github.com/iStark/PS5PCEM/releases/download/v0.3.5/PS5PCEM-0.3.5-linux-x64.pacman",
      "description": "Native GTK 3 launcher, runner and extractor for Arch Linux. Install with pacman -U."
    },
    {
      "label": "Linux AppImage",
      "fileName": "PS5PCEM-0.3.5-linux-x64.AppImage",
      "size": 15903224,
      "sha256": "0ff67ff06d1faff7e54513e58e983fe0b351bbfd850436ef7ad3df9ad121d26e",
      "url": "https://github.com/iStark/PS5PCEM/releases/download/v0.3.5/PS5PCEM-0.3.5-linux-x64.AppImage",
      "description": "Executable Linux image. Requires system GTK 3, X11, PulseAudio and Vulkan libraries."
    },
    {
      "label": "SHA-256 checksums",
      "fileName": "SHA256SUMS.txt",
      "size": 597,
      "sha256": "12baac5358109a4691fcff184739ee79b4d611c44250d9f4675869fc90304dcd",
      "url": "https://github.com/iStark/PS5PCEM/releases/download/v0.3.5/SHA256SUMS.txt",
      "description": "SHA-256 hashes for all six Windows and Linux packages."
    }
  ]
};

export const releaseHighlights = [
  "First native Linux packages: DEB, RPM, Pacman and AppImage with the GTK 3 launcher, runner and extractor.",
  "Both launchers support 48 games, search, table view and GitHub update checks.",
  "Windows controller vibration and game-controlled LightBar; DualSense USB feedback physically confirmed.",
  "Audio corrections for Subnautica, Quake II and Jets, plus shared renderer and loader fixes.",
  "Fifteen newly documented titles, with screenshots and explicit limits for gameplay, graphics and performance.",
  "Windows applications and installer use the existing timestamped certificate. Linux remains experimental; dated Windows FPS results are not Linux benchmarks."
] as const;

export const releaseHistory: {
  version: string;
  tag: string;
  publishedAt: string;
  url: string;
}[] = [
  {
    version: "0.3.5",
    tag: TAG,
    publishedAt: latestRelease.publishedAt,
    url: latestRelease.releaseUrl,
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
  "Install the Windows per-user build, extract the portable ZIP, or install a Linux package.",
  "Start ps5pcem.exe on Windows, or ps5pcem / the AppImage on Linux. The launcher opens its library.",
  "Point it at a directory containing a decrypted title you are legally entitled to use.",
  "Select Launch game.",
] as const;
