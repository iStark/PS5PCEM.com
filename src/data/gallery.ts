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
    src: "/images/subnautica-below-zero-menu.png",
    alt: "Subnautica Below Zero main menu showing Play, Options and Credits in PS5PCEM",
    title: "Subnautica: Below Zero — main menu",
    caption:
      "PPSA02457 v1.022.125, September 28, 2026. Frame 512 from the final measured development run, captured at native 1920×1080 after the scalar scratch change. Enter opens Play, Options and Credits. Median menu performance is about 17 FPS. This change does not demonstrate an FPS improvement; 30 FPS has not been reached. Rendering artifacts and intermittent missing labels remain unresolved. Gameplay is unverified.",
  },
  {
    src: "/images/launcher-library.png",
    alt: "PS5PCEM launcher showing its recent-game library with cover art",
    title: "The launcher",
    caption:
      "A native Windows library with local cover art, per-title saves, input profiles and direct game launching. Release 0.3.2 remembers up to 32 titles across pages of eight, displays the release version, checks Vulkan support, and includes the debug package extractor.",
  },
  {
    src: "/images/ritas-rewind-gameplay.png",
    alt: "Rita's Rewind gameplay with the Red Ranger in the Command Center",
    title: "Rita's Rewind — gameplay",
    caption:
      "The Red Ranger in the Command Center training stage, with the HUD, health bar, objectives and controller prompts. The maintainer confirmed the game is playable and completable on September 24, 2026.",
  },
  {
    src: "/images/big-helmet-heroes-scalar-history-tutorial.png",
    alt: "Big Helmet Heroes tutorial with the HUD, windmills, movement prompts and a blue circular effect",
    title: "Big Helmet Heroes — less scalar bookkeeping",
    caption:
      "September 29, 2026 development build. An unedited capture of the actual game window after removing unused scalar-load history from resource checkpoints. Separate matched samples measure 6.37 FPS in the menu and 3.70 FPS in the tutorial. No game FPS improvement is demonstrated. Longer isolated scalar-load fixtures are 9–45% cheaper; short walks are effectively unchanged. 30 FPS has not been reached. Output is 1080p, with larger internal targets. Visual artifacts remain; full playability and long-session stability are unverified. Public release 0.3.2 predates these changes.",
  },
  {
    src: "/images/big-helmet-heroes-buffer-pool-tutorial.png",
    alt: "Big Helmet Heroes tutorial with the character, HUD, windmills and movement prompts",
    title: "Big Helmet Heroes — fewer Vulkan allocations",
    caption:
      "September 29, 2026 development build. An unedited capture of the actual game window with the default 32 MiB pool for completed Vulkan buffers. Separate matched samples measure 6.54 FPS in the menu and 3.77 FPS in the tutorial. Tutorial buffer creation and destruction cost falls from 28.8 to 15.8 ms; frame ranges overlap, so a repeatable FPS gain is not established. 30 FPS has not been reached. Output is 1080p, with larger internal targets. Visual artifacts remain; full playability and long-session stability are unverified. Public release 0.3.2 predates these changes.",
  },
  {
    src: "/images/big-helmet-heroes-page-watches-tutorial.png",
    alt: "Big Helmet Heroes tutorial after the shared page-watch optimization",
    title: "Big Helmet Heroes — cheaper page watches",
    caption:
      "September 29, 2026 development build. An unedited capture of the actual game window after the shared page-watch optimization. Separate matched samples measure 6.54 FPS in the menu and 3.61 FPS in the tutorial. Ranges overlap the controls, so a repeatable FPS gain is not established. 30 FPS has not been reached. Output is 1080p, with larger internal targets. Visual artifacts remain; full playability and long-session stability are unverified. Public release 0.3.2 predates these changes.",
  },
  {
    src: "/images/big-helmet-heroes-buffer-recency-tutorial.png",
    alt: "Big Helmet Heroes tutorial after the shared buffer-cache recency optimization",
    title: "Big Helmet Heroes — cheaper buffer eviction",
    caption:
      "September 29, 2026 development build. An unedited capture of the actual game window after the shared buffer-cache optimization. Separate matched samples measure 6.21 FPS in the menu and 3.61 FPS in the tutorial. Ranges overlap the controls, so a repeatable FPS gain is not established. 30 FPS has not been reached. Output is 1080p, with larger internal targets. Visual artifacts remain; full playability and long-session stability are unverified. Public release 0.3.2 predates these changes.",
  },
  {
    src: "/images/big-helmet-heroes-wide-tiles-tutorial.png",
    alt: "Big Helmet Heroes tutorial rendered after the shared texture-copy optimization",
    title: "Big Helmet Heroes — faster texture conversion",
    caption:
      "September 29, 2026 development build. An unedited capture of the actual game window after the shared CPU texture-copy optimization. Separate standard-setting samples measure 6.25 FPS in the menu versus 5.85–5.95 FPS in two controls; tutorial samples measure 3.57 FPS without a valid matched comparison. 30 FPS has not been reached. Output is 1080p, with larger internal targets. Visual artifacts remain; full playability and long-session stability are unverified. Public release 0.3.2 predates these changes.",
  },
  {
    src: "/images/big-helmet-heroes-coherence-tutorial.png",
    alt: "Big Helmet Heroes tutorial with the character, HUD, windmills and Move and Sprint prompts",
    title: "Big Helmet Heroes — command-queue fix",
    caption:
      "September 29, 2026 development build, captured from the actual 1765×993 game window. A false command-header check that could stop rendering is fixed. Menu samples measure 6.13 FPS versus 6.04 in the control; tutorial samples measure 3.57 FPS without a matched control. A repeatable FPS gain is not established and 30 FPS has not been reached. Output is 1080p while internal targets can be larger. Visual artifacts remain; full playability and long-session stability are unverified. Public release 0.3.2 predates these changes.",
  },
  {
    src: "/images/big-helmet-heroes-performance-tutorial.png",
    alt: "Big Helmet Heroes tutorial with the character, HUD and Move and Sprint prompts",
    title: "Big Helmet Heroes — performance check",
    caption:
      "September 28, 2026 development build, captured from the actual 1765×993 game window. Menu samples measured about 5.9 FPS and tutorial samples about 3.5 FPS. The buffer-accounting optimization provides no meaningful demonstrated tutorial gain; resource preparation, readbacks and first-use pipeline stalls remain. Output is 1080p, while internal targets can be larger. Full playability and 30 FPS are unverified; public release 0.3.2 predates this change.",
  },
  {
    src: "/images/big-helmet-heroes-startup-tutorial.png",
    alt: "Big Helmet Heroes tutorial character, HUD and windmills after the startup fixes",
    title: "Big Helmet Heroes — tutorial startup",
    caption:
      "September 28, 2026 development build, captured from the actual 1765×993 game window. GPU-watched file reads and interrupted-save mount handling let startup proceed into the tutorial. The internal framebuffer remains 3840×2160. Visual artifacts remain; this limited check does not establish full playability, 30 FPS or long-session stability. Release 0.3.2 predates these fixes.",
  },
  {
    src: "/images/big-helmet-heroes-menu.png",
    alt: "Big Helmet Heroes main menu with correctly rendered characters and lighting",
    title: "Big Helmet Heroes — main menu",
    caption:
      "The menu reference confirmed on September 20, 2026: characters, textures, lighting and colors render correctly across two clean launches. Short menu samples measured 3.2–3.3 FPS. Gameplay has not been verified.",
  },
  {
    src: "/images/yotei-warmup-priority-wolf.png",
    alt: "Ghost of Yotei wolf brightness screen with instructions, slider and confirmation glyph",
    title: "Ghost of Yōtei — brightness screen, September 29",
    caption:
      "Unedited 1765×993 capture of the real game window in a diagnostic development run with default buffer reuse. Foreground compiler capacity is now reserved during warmup. Another launch of the same executable crashed during startup; the intermittent failure remains unresolved. This capture does not demonstrate a steady-state FPS gain or stable gameplay. Release 0.3.2 predates the change.",
  },
  {
    src: "/images/yotei-warmup-priority-tree.png",
    alt: "Ghost of Yotei burning tree in the September 29 diagnostic repeat with default buffer reuse",
    title: "Ghost of Yōtei — burning tree, September 29",
    caption:
      "The same diagnostic repeat proceeds beyond brightness calibration into the burning-tree scene with default buffer reuse. A separate run with reuse disabled also reached the tree, so disabling reuse is not a proven crash fix. Resource errors and very slow streaming remain. The unedited game-window capture records a development milestone, not stable gameplay or 30 FPS.",
  },
  {
    src: "/images/yotei-tree-scene.png",
    alt: "Ghost of Yotei tree scene rendered by PS5PCEM",
    title: "Ghost of Yōtei — tree scene",
    caption:
      "A later 3D scene reached during development. The last measured tree scene presented 22 frames in 30 seconds, about 0.73 FPS; subsequent loading encountered device loss. Movie audio now works, but the title remains unplayable and late-scene stability is unverified.",
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
      "An earlier startup milestone, before the license and Journey Mode selection reached in 0.3.2. At the time, this 1920×1080 R11G11B10_FLOAT intermediate was converted for display because the registered 3840×2160 target was black. This historical capture does not show the latest UI fixes.",
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
