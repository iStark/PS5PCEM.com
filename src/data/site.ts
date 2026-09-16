export const site = {
  name: "PS5PCEM",
  tagline: "Experimental PlayStation 5 emulation research, written in Zig",
  description:
    "PS5PCEM is an experimental PlayStation 5 emulator and interoperability research project for Windows. Track game compatibility, read measured performance results, and download the latest prototype.",
  url: "https://ps5pcem.com",
  author: "Artur Strazewicz",
  license: "GPL-3.0-or-later",
  links: {
    github: "https://github.com/iStark/PS5PCEM",
    issues: "https://github.com/iStark/PS5PCEM/issues",
    releases: "https://github.com/iStark/PS5PCEM/releases",
    youtube: "https://www.youtube.com/@PS5PCEM",
    boosty: "https://boosty.to/ps5pcem",
    patreon: "https://www.patreon.com/c/PS5PCEM",
    docs: "https://github.com/iStark/PS5PCEM/blob/main/docs/README.md",
    projectStatus:
      "https://github.com/iStark/PS5PCEM/blob/main/docs/project-status.md",
    implementationStatus:
      "https://github.com/iStark/PS5PCEM/blob/main/docs/implementation-status.md",
    legal: "https://github.com/iStark/PS5PCEM/blob/main/docs/legal.md",
    gettingStarted:
      "https://github.com/iStark/PS5PCEM/blob/main/docs/getting-started.md",
  },
} as const;

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/download", label: "Download" },
  { href: "/extract", label: "PKG extractor" },
  { href: "/compatibility", label: "Compatibility" },
  { href: "/status", label: "Project status" },
  { href: "/media", label: "Media" },
] as const;
