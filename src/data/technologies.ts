/**
 * Mechanisms the emulator actually implements, one page each.
 *
 * The prose lives in src/i18n/tech. This file only records identity, grouping,
 * maturity and which pages should point at each other. States match the
 * implementation notes through 10 October 2026: a focused test passing is
 * "partial" until the path is the normal way a title runs.
 */

export type TechCategory = "firmware" | "graphics" | "audio" | "platform";

export type TechState = "working" | "partial" | "deferred";

export type Technology = {
  slug: string;
  category: TechCategory;
  state: TechState;
  related: readonly string[];
};

export const technologyUpdated = "2026-10-10";

export const techCategories = [
  "firmware",
  "graphics",
  "audio",
  "platform",
] as const satisfies readonly TechCategory[];

export const technologies = [
  {
    slug: "hle",
    category: "firmware",
    state: "partial",
    related: ["memory", "ampr", "apr", "fonts", "cpu", "loader"],
  },
  {
    slug: "ampr",
    category: "firmware",
    state: "partial",
    related: ["apr", "hle", "aio", "memory"],
  },
  {
    slug: "apr",
    category: "firmware",
    state: "partial",
    related: ["ampr", "aio", "hle", "loader"],
  },
  {
    slug: "memory",
    category: "firmware",
    state: "working",
    related: ["hle", "page-tracker", "savedata", "cpu"],
  },
  {
    slug: "savedata",
    category: "firmware",
    state: "working",
    related: ["hle", "memory", "loader"],
  },
  {
    slug: "fonts",
    category: "firmware",
    state: "partial",
    related: ["hle", "png", "avplayer"],
  },
  {
    slug: "png",
    category: "firmware",
    state: "partial",
    related: ["fonts", "hle", "avplayer"],
  },
  {
    slug: "rtc",
    category: "firmware",
    state: "partial",
    related: ["hle", "savedata"],
  },
  {
    slug: "fibers",
    category: "firmware",
    state: "partial",
    related: ["cpu", "hle", "agc"],
  },
  {
    slug: "aio",
    category: "firmware",
    state: "partial",
    related: ["apr", "ampr", "hle", "loader"],
  },
  {
    slug: "agc",
    category: "graphics",
    state: "partial",
    related: ["rdna2", "vulkan", "videoout", "ngg", "msaa"],
  },
  {
    slug: "rdna2",
    category: "graphics",
    state: "partial",
    related: ["agc", "vulkan", "ngg", "mimg", "scalar-calls"],
  },
  {
    slug: "ngg",
    category: "graphics",
    state: "partial",
    related: ["rdna2", "agc", "scalar-calls", "vulkan"],
  },
  {
    slug: "mimg",
    category: "graphics",
    state: "partial",
    related: ["rdna2", "gather4h", "detile", "vulkan"],
  },
  {
    slug: "gather4h",
    category: "graphics",
    state: "partial",
    related: ["mimg", "rdna2", "vulkan"],
  },
  {
    slug: "scalar-calls",
    category: "graphics",
    state: "partial",
    related: ["rdna2", "ngg", "agc"],
  },
  {
    slug: "vulkan",
    category: "graphics",
    state: "working",
    related: ["agc", "rdna2", "videoout", "msaa", "detile", "page-tracker"],
  },
  {
    slug: "msaa",
    category: "graphics",
    state: "partial",
    related: ["vulkan", "metadata", "detile", "agc"],
  },
  {
    slug: "metadata",
    category: "graphics",
    state: "partial",
    related: ["msaa", "detile", "vulkan", "agc"],
  },
  {
    slug: "detile",
    category: "graphics",
    state: "partial",
    related: ["vulkan", "msaa", "metadata", "mimg"],
  },
  {
    slug: "page-tracker",
    category: "graphics",
    state: "partial",
    related: ["memory", "vulkan", "detile"],
  },
  {
    slug: "videoout",
    category: "graphics",
    state: "working",
    related: ["agc", "vulkan", "avplayer"],
  },
  {
    slug: "audio",
    category: "audio",
    state: "working",
    related: ["acm", "ajm", "ngs2", "avplayer"],
  },
  {
    slug: "acm",
    category: "audio",
    state: "partial",
    related: ["audio", "ajm", "ngs2"],
  },
  {
    slug: "ajm",
    category: "audio",
    state: "partial",
    related: ["audio", "avplayer", "acm"],
  },
  {
    slug: "ngs2",
    category: "audio",
    state: "partial",
    related: ["audio", "ajm", "acm"],
  },
  {
    slug: "avplayer",
    category: "audio",
    state: "working",
    related: ["videoout", "ajm", "audio"],
  },
  {
    slug: "cpu",
    category: "platform",
    state: "working",
    related: ["hle", "loader", "fibers", "memory"],
  },
  {
    slug: "loader",
    category: "platform",
    state: "working",
    related: ["cpu", "hle", "pkg", "memory"],
  },
  {
    slug: "input",
    category: "platform",
    state: "working",
    related: ["hle", "cpu", "audio"],
  },
  {
    slug: "pkg",
    category: "platform",
    state: "partial",
    related: ["loader", "hle"],
  },
] as const satisfies readonly Technology[];

export type TechSlug = (typeof technologies)[number]["slug"];

export function technologySlugs(): TechSlug[] {
  return technologies.map((entry) => entry.slug);
}

export function findTechnology(slug: string): Technology | undefined {
  return technologies.find((entry) => entry.slug === slug);
}

export function technologiesIn(category: TechCategory): readonly Technology[] {
  return technologies.filter((entry) => entry.category === category);
}
