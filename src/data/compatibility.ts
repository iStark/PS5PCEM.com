/**
 * Title compatibility results, mirroring docs/project-status.md in the PS5PCEM
 * repository. Playability and completion reports were confirmed by the project
 * maintainer on September 8, 2026, except where an entry names its own date.
 *
 * Every measurement refers to the current RTX 3070 Ti test host. Title content
 * is supplied locally by the user and is not distributed with the emulator.
 */

export type CompatibilityTier = "playable" | "ingame" | "intro" | "boots";

export type TierMeta = {
  id: CompatibilityTier;
  label: string;
  shortLabel: string;
  description: string;
};

export const tiers: TierMeta[] = [
  {
    id: "playable",
    label: "Playable · Completable",
    shortLabel: "Playable",
    description:
      "The maintainer played the title through to the end. Rendering, input and audio are correct in the observed runs, though frame rate still varies.",
  },
  {
    id: "ingame",
    label: "Reaches in-game scenes",
    shortLabel: "In-game",
    description:
      "The title renders loaded gameplay or in-engine scenes, but a full playthrough is not claimed — usually because of frame rate, load times, or unverified input.",
  },
  {
    id: "intro",
    label: "Intro and menus render",
    shortLabel: "Intro / menus",
    description:
      "Intro video, publisher sequences, title art or menus are produced by the guest render graph. Gameplay has not been reached or verified.",
  },
  {
    id: "boots",
    label: "Boots and loads assets",
    shortLabel: "Boots",
    description:
      "The title's modules link and its engine bootstrap progresses, but no presented frame is claimed yet.",
  },
];

export type CompatibilityEntry = {
  slug: string;
  title: string;
  tier: CompatibilityTier;
  /** The status text as written in docs/project-status.md. */
  status: string;
  /** Short headline used in cards and the summary table. */
  headline: string;
  /** Full milestone description from docs/project-status.md. */
  milestone: string;
  /** Known limits and caveats from the Notes column. */
  notes: string;
  /** Measured timings, phrased for the site. */
  performance?: string;
  /** Screenshot under /public/images, when the doc links one. */
  image?: { src: string; alt: string };
  /** ISO date when the maintainer last confirmed the entry. */
  confirmedOn?: string;
};

export const compatibility: CompatibilityEntry[] = [
  {
    slug: "terminator-2d-no-fate",
    title: "Terminator 2D: No Fate",
    tier: "playable",
    status: "Playable · Completable",
    headline: "Completed without reported problems.",
    milestone:
      "Completed without reported problems. Backgrounds, characters, HUD, textures and colors are all correct.",
    notes:
      "Texture alpha, component swizzles and sRGB sampling preserve the title's intended color balance.",
    performance:
      "Warmed-up startup frames measure 22–65 ms on the current test host.",
    image: {
      src: "/images/live-gameplay.png",
      alt: "Terminator 2D gameplay with the player character, HUD and a desert scene rendered by PS5PCEM",
    },
    confirmedOn: "2026-09-08",
  },
  {
    slug: "asterix-obelix-slap-them-all",
    title: "Asterix & Obelix: Slap Them All!",
    tier: "playable",
    status: "Playable · Completable",
    headline: "Playthrough confirmed. Gameplay and UI render upright.",
    milestone:
      "Playthrough confirmed. Gameplay and UI render upright, and intro playback works. The final fullscreen compositor stays GPU-resident while scanout preserves the guest viewport's vertical orientation without a per-frame host-memory round trip.",
    notes:
      "A 3,000-flip development run completed free of rejected submissions.",
    performance: "Observed gameplay typically measures 28–31 ms per frame.",
    image: {
      src: "/images/asterix-obelix-gameplay.png",
      alt: "Asterix & Obelix: Slap Them All! gameplay frame rendered by PS5PCEM",
    },
    confirmedOn: "2026-09-08",
  },
  {
    slug: "cat-quest-iii",
    title: "Cat Quest III",
    tier: "playable",
    status: "Playable · Completable",
    headline:
      "Playthrough confirmed. Menus, dialogue and island terrain render correctly.",
    milestone:
      "Playthrough confirmed. Menus, adventure cards, dialogue, island terrain and colors render correctly in the captured scenes. The language list retains and clips its text, and Catventure selection displays slot artwork, labels, add buttons and scroll arrows.",
    notes:
      "Frame rate on the opening island is still the main limit rather than correctness.",
    performance:
      "Opening-island samples have a median of 124 ms (about 8 FPS), against roughly 148 ms before optimization.",
    image: {
      src: "/images/cat-quest-iii-world.png",
      alt: "Cat Quest III island gameplay with HUD, mountains and blue sea rendered by PS5PCEM",
    },
    confirmedOn: "2026-09-08",
  },
  {
    slug: "dreaming-sarah",
    title: "Dreaming Sarah",
    tier: "playable",
    status: "Playable · Completable",
    headline:
      "Playthrough confirmed. Title menu and first scene hit the 60 FPS cap.",
    milestone:
      "Playthrough confirmed on September 15, 2026. Menus, the animated title, world scenes, characters and NPCs render correctly.",
    notes:
      "Loading required restoring eboot.bin and sce_module/libc.prx from the backups left by the copy's eboot patcher, which had truncated both. The maintainer reports the frame rate falling on the second gameplay scene, which is not yet measured.",
    performance:
      "The title menu and first scene run at the 60 FPS cap, measured as 5,280 flips over 90 seconds.",
    image: {
      src: "/images/dreaming-sarah-gameplay.png",
      alt: "Dreaming Sarah forest scene with an NPC rendered by PS5PCEM",
    },
    confirmedOn: "2026-09-15",
  },
  {
    slug: "jurassic-park-classic-games-collection",
    title: "Jurassic Park Classic Games Collection",
    tier: "playable",
    status: "Playable · Completable",
    headline: "Playthrough confirmed. Intro, animated title and selection work.",
    milestone:
      "Playthrough confirmed. The intro, animated title and collection selection all work, with cover art, navigation arrows and an animated preview.",
    notes: "Performance varies by collection game and by hardware.",
    performance:
      "Earlier sampled title and selection frames measured about 27 and 33 ms.",
    image: {
      src: "/images/jurassic-park-menu.png",
      alt: "Jurassic Park Classic Games Collection game selection rendered by PS5PCEM",
    },
    confirmedOn: "2026-09-08",
  },
  {
    slug: "jets-n-guns-2",
    title: "Jets 'n' Guns 2",
    tier: "playable",
    status: "Playable · Completable",
    headline:
      "Played through by the maintainer on September 15, 2026.",
    milestone:
      "Resolves title content through /app0, completes AGC resource registration, and sustains the full graphics, compute and VideoOut loop. Targetless final passes survive flip, while dynamic SGPR data and descriptor-sized buffer bounds keep streamed sprite batches on stable Vulkan pipelines. Levels, HUD, score, enemies and the parallax scene render correctly through a playthrough. Firmware-default mutex compatibility preserves the CRT's recursive trylock guard without leaking recursion into the audio workers' blocking slow path.",
    notes:
      "Audio routing moved the host device between two simultaneously active output ports several times per frame, closing and reopening it each time, which tore the mix apart. That is fixed but is not yet in a packaged release.",
    performance:
      "Measured frames take 70–92 ms, about 11–14 FPS. Of a 70 ms frame, 18 ms waits on the GPU across 33 queue submissions, 11 ms prepares resource checkpoints, and 13 ms stages 894 distinct guest buffers totalling 15 MiB. The cold transition into the first dense gameplay scene still takes roughly 30–40 seconds.",
    image: {
      src: "/images/jets-n-guns-2-gameplay.png",
      alt: "Jets 'n' Guns 2 gameplay with the player ship, HUD and score rendered by PS5PCEM",
    },
    confirmedOn: "2026-09-15",
  },
  {
    slug: "the-precinct",
    title: "The Precinct",
    tier: "ingame",
    status: "Title menu, intro movies, and a first in-engine gameplay image",
    headline:
      "Plays both intro movies, renders the title menu, and enters the cold world load.",
    milestone:
      "Links the complete six-image guest graph, starts Unity plug-ins through sceKernelLoadStartModule, indexes its audio assets, and plays both observed intro movies as synchronized 3840×2160 NV12 video with 48 kHz stereo PCM. It renders the complete 1920×1080 title artwork, opens PLAY GAME, and displays a readable NEW GAME confirmation. Holding Triangle enters the cold world load; an earlier guarded run reached the Cross prompt and produced the first verified in-engine gameplay image. Target-thread exception delivery completes Unity's stop-the-world handshake, resident typed storage images preserve its compute graph, and dynamic compute scalars stop runtime SGPR values from generating a new Vulkan pipeline every frame.",
    notes:
      "The former title- and shader-signature-specific NVIDIA compiler guard was removed in favor of the general shader path, so the world transition needs a fresh end-to-end validation before current gameplay compatibility is claimed.",
    performance:
      "The world-load frame measures 2.1 s where it previously measured 5.1 s, after descriptor recovery stopped replaying each kernel's prolog once per resource it names. The first world transition still takes several minutes, because first-use shader translation, NVIDIA pipeline compilation, synchronous submission and resource staging remain expensive.",
    image: {
      src: "/images/precinct-title-menu.png",
      alt: "The Precinct title menu and NEW GAME confirmation rendered by PS5PCEM",
    },
  },
  {
    slug: "ghost-of-yotei",
    title: "Ghost of Yōtei",
    tier: "ingame",
    status:
      "Intro playback · bonus notices · brightness calibration · reaches in-game scenes · not playable",
    headline:
      "Renders its menus and 3D scenes correctly, at 0.6 FPS. Not playable.",
    milestone:
      "The verified reference run reached the animated loading indicator, the Digital Deluxe Bonus, Gift of the Northern Star and Pre-order Bonus notices, and brightness calibration with the wolf image, instructions, slider and confirmation glyph. The maintainer also observed trees and parts of the 3D background, with menu music audible. Intro movies play at about their native 30 FPS in ReleaseFast. Streamed scene loading, material tables and shader execution have advanced substantially.",
    notes:
      "Gameplay itself — moving the character through a loaded world — remains unverified, and scene preparation frames are still very slow. Time to reach a scene varies widely between runs on the same build. The latest renderer was checked through the intro into scene loading; the complete bonus and brightness sequence was verified on reference build 796a484, not repeated on the release candidate.",
    performance:
      "Reaching difficulty selection takes several minutes of intro and scene loading, and the frame rate there is 0.6 FPS: sampled frames measure 1504–1554 ms for 321 draws and about 1330 compute dispatches.",
    image: {
      src: "/images/yotei-difficulty.png",
      alt: "Ghost of Yotei difficulty selection rendered over a 3D scene by PS5PCEM",
    },
  },
  {
    slug: "quake-ii-2023",
    title: "Quake II (2023)",
    tier: "playable",
    status: "Playable · Completable",
    headline:
      "Played through by the maintainer on September 16, 2026.",
    milestone:
      "Menus, the photosensitivity warning and the Tutorial level load. The HUD, health, weapon icon, objective text and crosshair render, and controller input reaches the in-game scene. Deferred colour writes honour CB_COLOR_CONTROL.MODE=DISABLE when TARGET_MASK is live, unified format 57 samples as RGBA8 SNORM, and the interpolator-less NGG rect no longer stamps a texture atlas over the mesh G-buffer.",
    notes:
      "The presented scene is still dark while deferred lighting and the 960-to-1920 composite are incomplete.",
    image: {
      src: "/images/quake-ii-gameplay.png",
      alt: "Quake II tutorial gameplay with HUD, health, blaster and crosshair rendered by PS5PCEM",
    },
    confirmedOn: "2026-09-16",
  },
  {
    slug: "reanimal",
    title: "REANIMAL",
    tier: "intro",
    status: "Animated 3840×2160 title menu, with incomplete option labels",
    headline:
      "Plays the company-logo sequence and sustains the animated title-menu render graph.",
    milestone:
      "Resolves the observed native and firmware modules, plays the company-logo sequence, and sustains the animated 3840×2160 title-menu render graph. Narrow Unity UI intermediates no longer replace the full scanout, dynamic R8 font atlases invalidate stale sampled images, and the buoy background, full title logo, water highlights and SELECT prompt are visible in the live capture.",
    notes:
      "The central menu-option labels are still reduced to small red marks, so navigation and the transition into gameplay have not been verified. Performance and longer-run stability remain unmeasured, and gameplay is not claimed.",
    image: {
      src: "/images/reanimal-menu-partial.png",
      alt: "REANIMAL animated title menu rendered by PS5PCEM, with incomplete option labels",
    },
  },
  {
    slug: "ritas-rewind",
    title: "Mighty Morphin Power Rangers: Rita's Rewind",
    tier: "intro",
    status: "Publisher sequence, title menu and post-menu scene render",
    headline:
      "Enters a stable 1920×1080 graphics and audio loop through the title menu.",
    milestone:
      "Resolves the observed Fiber, Pad, offline NP, AGC 1.1 and AGC driver imports, enters a stable 1920×1080 graphics and audio loop, and renders the animated publisher sequence, title menu and post-menu scene. Native cooperative fibers retain suspended guest stacks, scePadGetHandle supplies a readable primary controller, and exact V_SAD_U32, V_MUL_HI_I32 and V_CVT_FLR_I32_F32 lowering removes the diagnostic shader fallback. Holding Cross advances through the title prompt.",
    notes:
      "The exact guest CRT composite still produces static on the current host, so a strict shader-signature fallback performs the observed 4× RGBA8 scene scale before downstream post-processing. Broad gameplay and input compatibility are not claimed yet.",
    performance:
      "The observed intro stays smooth at roughly 13–20 ms per frame. Dense post-menu frames can contain roughly 255 draws and currently take about 470 ms, dominated by repeated guest-buffer staging.",
    image: {
      src: "/images/ritas-rewind-post-menu.png",
      alt: "Mighty Morphin Power Rangers: Rita's Rewind post-menu scene rendered by PS5PCEM",
    },
  },
  {
    slug: "tetris-effect-connected",
    title: "Tetris Effect: Connected",
    tier: "intro",
    status: "Unreal bootstrap completes and the first particle frame renders",
    headline:
      "595 guest draws and 63 compute dispatches complete without a rejected draw.",
    milestone:
      "Completes the Unreal bootstrap and a measured startup frame with 595 guest draws and 63 compute dispatches, including typed 2D/3D storage images, 64×64×64 RGBA16_FLOAT volumes, layered post-process targets, RGBA32_FLOAT exposure surfaces, a 10_10_10_2_UNORM lookup target, and the mixed image/LDS prepass. Ordered AGC completion acknowledgement removed the intermittent retirement race, and the latest unattended run advanced through 49 VideoOut cycles. The first generated 0xe060-byte material pixel shader is now decoded within its exact AGC allocation instead of the old fixed instruction ceiling.",
    notes:
      "The exact registered 3840×2160 VideoOut target remains black, so presentation falls back to a converted R11G11B10_FLOAT intermediate. NGG/fetch-shader continuations, exact layered rendering, final scanout aliasing and tonemapping, one oversized guest-buffer descriptor, and performance all remain incomplete. Neither a menu nor gameplay is claimed.",
    performance: "Most post-bootstrap cycles measured about 3.3–3.8 seconds.",
    image: {
      src: "/images/tetris-effect-first-render.png",
      alt: "The first recognizable Tetris Effect particle frame rendered by PS5PCEM",
    },
  },
  {
    slug: "propagation-paradise-hotel",
    title: "Propagation: Paradise Hotel",
    tier: "boots",
    status: "Mounts its PAK, opens the shader archive, and submits the first DCB",
    headline:
      "Completes the Unreal bootstrap up to the first command buffer submission.",
    milestone:
      "Mounts the 8.8 GiB UE PAK, completes ICU and config bootstrap, opens the cooked Global shader archive, creates AGC shaders, and submits the first DCB.",
    notes:
      "This milestone predates the new synchronization packet constructors and needs a fresh run. VR presentation still has no host headset bridge.",
  },
  {
    slug: "pistol-whip",
    title: "Pistol Whip",
    tier: "boots",
    status: "Maps the PS VR2 plugin and Burst module, then loads Unity archives",
    headline: "Starts loading Unity asset archives after mapping its VR modules.",
    milestone:
      "Maps the native PS VR2 plugin and the Burst module, then starts loading Unity asset archives.",
    notes:
      "Headset, tracking, controller and host OpenXR support are intentionally deferred.",
  },
];

export const compatibilityMeta = {
  /** Date the maintainer confirmed the playability and completion reports. */
  confirmedOn: "2026-09-08",
  testedOnRelease: "0.3.1-beta.1",
  host: "NVIDIA GeForce RTX 3070 Ti",
} as const;

/** Tier order used everywhere the list is rendered, best result first. */
export const tierOrder: CompatibilityTier[] = [
  "playable",
  "ingame",
  "intro",
  "boots",
];

export function tierOf(id: CompatibilityTier): TierMeta {
  const tier = tiers.find((candidate) => candidate.id === id);
  if (!tier) {
    throw new Error(`Unknown compatibility tier: ${id}`);
  }
  return tier;
}

export function countByTier(): Record<CompatibilityTier, number> {
  const counts: Record<CompatibilityTier, number> = {
    playable: 0,
    ingame: 0,
    intro: 0,
    boots: 0,
  };
  for (const entry of compatibility) {
    counts[entry.tier] += 1;
  }
  return counts;
}

export function sortedCompatibility(): CompatibilityEntry[] {
  return [...compatibility].sort((a, b) => {
    const byTier = tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier);
    return byTier !== 0 ? byTier : a.title.localeCompare(b.title);
  });
}
