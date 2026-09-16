/**
 * Development captures from docs/project-status.md. Each caption states exactly
 * what the capture shows, so a render milestone is never read as a gameplay
 * claim.
 */

export type Capture = {
  src: string;
  alt: string;
  title: string;
  caption: string;
};

export const captures: Capture[] = [
  {
    src: "/images/launcher-library.png",
    alt: "PS5PCEM launcher showing its recent-game library with cover art",
    title: "The launcher",
    caption:
      "A native Windows library with local cover art, per-title saves, input profiles and direct game launching. It remembers up to eight recent titles and reads artwork from each title's own sce_sys/icon0.png.",
  },
  {
    src: "/images/cat-quest-iii-world.png",
    alt: "Cat Quest III island gameplay with HUD, mountains and blue sea rendered by PS5PCEM",
    title: "Cat Quest III — opening island",
    caption:
      "Island gameplay with the HUD, restored mountains, blue sea and sky, and correct character colors. Cat Quest III is fully playable according to the maintainer's September 8 playtest.",
  },
  {
    src: "/images/quake-ii-gameplay.png",
    alt: "Quake II tutorial gameplay with HUD, health, blaster and crosshair rendered by PS5PCEM",
    title: "Quake II (2023) — tutorial gameplay",
    caption:
      "A live 1920×1080 Tutorial frame after the photosensitivity warning and title menu. The HUD, health, blaster, objective text and crosshair come from the guest draws. The interpolator-less NGG atlas stamp is skipped so it no longer covers the scene. Deferred lighting and the 960-to-1920 composite remain incomplete, so the presented world is still dark.",
  },
  {
    src: "/images/quake-ii-title.png",
    alt: "Quake II title screen with the series logo and legal notices rendered by PS5PCEM",
    title: "Quake II (2023) — title screen",
    caption:
      "The title screen drawn by the game's own render graph after the emulator learned to list directories the way a title that reads one exactly once expects. That fix is what lets it find its 1.7 GiB pack file, load a level and reach audio and input.",
  },
  {
    src: "/images/jets-n-guns-2-gameplay.png",
    alt: "Jets 'n' Guns 2 gameplay with the player ship, HUD and score rendered by PS5PCEM",
    title: "Jets 'n' Guns 2 — gameplay",
    caption:
      "A gameplay frame from the playthrough the maintainer completed on September 15, 2026. The ship, weapon fire, enemies, HP and heat gauges, score and the layered station all come from the title's own draws. Measured frames take 70–92 ms on an RTX 3070 Ti, about 11–14 FPS.",
  },
  {
    src: "/images/jets-n-guns-2.png",
    alt: "Jets 'n' Guns 2 tutorial gameplay rendered by PS5PCEM",
    title: "Jets 'n' Guns 2 — tutorial gameplay",
    caption:
      "A live 3840×2160 tutorial frame reached through START GAME and the title's loading screen. The ship, HUD, layered level art, lighting and text come from the guest multi-draw, sampled-texture, persistent-render-target, compute and VideoOut paths.",
  },
  {
    src: "/images/asterix-obelix-gameplay.png",
    alt: "Asterix & Obelix: Slap Them All! gameplay rendered by PS5PCEM",
    title: "Asterix & Obelix — gameplay at flip 512",
    caption:
      "A live 1920×1080 gameplay frame captured at flip 512. The scene, characters, HUD and prompt all come from the title's guest draws, and scanout preserves the guest viewport's vertical orientation without a per-frame host-memory round trip.",
  },
  {
    src: "/images/dreaming-sarah-gameplay.png",
    alt: "Dreaming Sarah forest scene with an NPC rendered by PS5PCEM",
    title: "Dreaming Sarah — world scene",
    caption:
      "A world scene with an NPC, rendered at the 60 FPS cap on the current test host. The maintainer confirmed a full playthrough on September 15, 2026.",
  },
  {
    src: "/images/precinct-title-menu.png",
    alt: "The Precinct title menu and NEW GAME confirmation rendered by PS5PCEM",
    title: "The Precinct — title menu",
    caption:
      "A live 1920×1080 title menu and NEW GAME confirmation, composed by the guest graphics and compute passes after both SceAvPlayer intro movies. Structured shader control flow restores the UI text. This capture predates the now-verified transition into the first in-engine gameplay scene.",
  },
  {
    src: "/images/yotei-intro-video.png",
    alt: "Ghost of Yotei intro video decoded and presented by PS5PCEM",
    title: "Ghost of Yōtei — intro video",
    caption:
      "A live intro frame decoded from the title's own H.264 stream through libSceVideodec2 and presented at 1920×1080. The picture is converted from NV12 with BT.709 coefficients, and playback follows the frame rate reported by the decoded stream.",
  },
  {
    src: "/images/yotei-difficulty.png",
    alt: "Ghost of Yotei difficulty selection rendered over a 3D scene by PS5PCEM",
    title: "Ghost of Yōtei — difficulty selection",
    caption:
      "Difficulty selection composed over a loaded 3D scene. Reaching this point takes several minutes of intro and scene loading, and the frame rate here is 0.6 FPS. The title is not playable at that rate.",
  },
  {
    src: "/images/reanimal-menu-partial.png",
    alt: "REANIMAL animated title menu rendered by PS5PCEM with incomplete option labels",
    title: "REANIMAL — animated title menu",
    caption:
      "A live title-menu frame from the guest Unity render graph. The animated buoy background, title logo, water highlights and SELECT prompt are visible. The missing central option labels remain an active rendering issue, so this is not a complete menu or gameplay claim.",
  },
  {
    src: "/images/ritas-rewind-intro.png",
    alt: "Mighty Morphin Power Rangers: Rita's Rewind intro rendered by PS5PCEM",
    title: "Rita's Rewind — publisher intro",
    caption:
      "A live 1920×1080 publisher and title intro frame produced by the guest indexed vertex, sampled fragment, render-target composition and VideoOut paths. Animation and audio stay smooth in the observed run; this is an intro milestone, not a gameplay claim.",
  },
  {
    src: "/images/ritas-rewind-post-menu.png",
    alt: "Rita's Rewind post-menu scene rendered by PS5PCEM",
    title: "Rita's Rewind — post-menu scene",
    caption:
      "Rendered from the real 480×270 guest scene target and carried through the 1920×1080 CRT and post-processing chain. The strict CRT-composite compatibility path removes the former full-screen static while preserving the title's pixel-art presentation.",
  },
  {
    src: "/images/tetris-effect-first-render.png",
    alt: "The first recognizable Tetris Effect particle frame rendered by PS5PCEM",
    title: "Tetris Effect: Connected — first render",
    caption:
      "The first recognizable render produced by the title's startup graph: 595 guest draws and 63 compute dispatches complete without a rejected draw. This 1920×1080 R11G11B10_FLOAT intermediate is converted for display because the registered 3840×2160 VideoOut target is still black.",
  },
  {
    src: "/images/live-gameplay.png",
    alt: "Terminator 2D gameplay rendered by PS5PCEM",
    title: "Terminator 2D: No Fate — gameplay",
    caption:
      "A live gameplay frame produced by the current guest VS/PS, sampled-texture, render-target and Vulkan presentation paths. Texture alpha, component swizzles and sRGB sampling preserve the title's intended color balance.",
  },
  {
    src: "/images/jurassic-park-menu.png",
    alt: "Jurassic Park Classic Games Collection game selection rendered by PS5PCEM",
    title: "Jurassic Park Classic Games Collection — selection",
    caption:
      "Game selection with cover art, navigation arrows and an animated preview. This development capture precedes the maintainer's full-playability confirmation.",
  },
  {
    src: "/images/cat-quest-iii-dialogue.png",
    alt: "Cat Quest III opening gameplay dialogue rendered by PS5PCEM",
    title: "Cat Quest III — dialogue",
    caption:
      "Captain Cappey's dialogue stays readable over the rendered island scene.",
  },
  {
    src: "/images/cat-quest-iii-catventure.png",
    alt: "Cat Quest III adventure selection cards rendered by PS5PCEM",
    title: "Cat Quest III — Catventure selection",
    caption:
      "Catventure selection displays the slot artwork, labels, add buttons and scroll arrows, with the clipping mask linked to the correct shader export.",
  },
  {
    src: "/images/cat-quest-iii-language.png",
    alt: "Cat Quest III language modal rendered by PS5PCEM",
    title: "Cat Quest III — language modal",
    caption:
      "The language list retains its text and clips it inside the panel; the stencil pop no longer paints a white rectangle over the labels.",
  },
];
