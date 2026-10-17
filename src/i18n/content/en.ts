/**
 * Per-title prose and test-history text, in English.
 *
 * The facts come from docs/project-status.md, the release notes and the dated
 * investigations in the emulator repository, but the wording here is written for
 * the site rather than copied from them. Claims are kept exactly as narrow as
 * the source: a rendered menu is never described as a playable game.
 *
 * This file's shape is the `Content` type every other locale must satisfy.
 */
export type Content = {
  games: Record<
    string,
    {
      status: string;
      headline: string;
      summary: string;
      strengths: readonly string[];
      limits: readonly string[];
      performance?: string;
      imageAlt?: string;
    }
  >;
  history: Record<
    string,
    { title: string; summary: string; imageAlt?: string }
  >;
};

const content: Content = {
  games: {
    "astro-bot": {
      "status": "Diagnostic cinematic · rendering defects",
      "headline": "Rendering and performance work continues",
      "summary": "October 16: shared resource preparation uses fewer copies, faster content checks and shorter scalar walks. PPSA21564 v1.018 has a new title measurement; cinematic rendering defects remain.",
      "strengths": [
        "Shared command queues and native transfer paths pass targeted unit and GPU checks."
      ],
      "limits": [
        "Missing source fonts, dark/patchy surfaces and expensive readbacks remain. Character control and completion are unverified."
      ],
      "performance": "Animated title: 20.07 FPS over 2,640 frames / 131.56 s; 60-frame blocks 18.39–21.68 FPS. Ryzen 7 7700 / RTX 3070 Ti, 1080p output, game-controlled 4K source, retained caches. This is a title-screen average, not a minimum or gameplay result. The earlier crowd sample was 4.60 FPS over 10 s.",
      "imageAlt": "ASTRO BOT arrival cinematic with the small craft and crashed ship; dark and patchy surfaces remain"
    },
    "goat-simulator-3": {
      "status": "In-game · inverted image · low FPS",
      "headline": "Controllable farm scene reached",
      "summary": "PPSA04158 v01.000.000: With the complete game files, the existing development runner passes the long world load and cart introduction. The goat, compass and Goat Castle objective appear; keyboard movement is verified.",
      "strengths": [
        "Offline menu navigation, new-world creation and movement work. Nonempty save files are written; pause and the emote wheel respond."
      ],
      "limits": [
        "The scene and HUD stay vertically inverted after closing pause; menu transitions repeat subframes. Shading artifacts, unsupported 3D storage images and unresolved bindings remain. Audio quality, save reload, multiplayer and completion are unverified."
      ],
      "performance": "1.8 FPS median (1.7–1.8), 30 stationary window-counter samples over 30.011 seconds. RTX 3070 Ti, 1080p output, internal targets up to 3200×1800, Speed preset; caches retained.",
      "imageAlt": "Goat Simulator 3 controllable farm scene with goat, compass and objective rendered upside down"
    },
    "minecraft-legends": {
      "status": "In-game · severe rendering defects",
      "headline": "Opening tutorial reached; movement verified",
      "summary": "PPSA05510 v01.013.000: Native file rename unblocks the campaign database. A fresh development-build run reaches the mounted hero, health hearts and tutorial. Keyboard movement and turning work.",
      "strengths": [
        "Main menu, campaign creation and the first controllable tutorial scene are verified."
      ],
      "limits": [
        "Severe color and lighting corruption, large black regions and missing text remain. Startup also logs image-read failures. Save reload, audible quality and completion are unverified."
      ],
      "performance": "No sustained FPS measurement in this capture run. RTX 3070 Ti, 1920×1080 output, Speed preset; existing caches retained.",
      "imageAlt": "Minecraft Legends tutorial with a mounted hero, health hearts, corrupted colors and black regions"
    },
    "police-simulator-patrol-officers": {
      "status": "Intro/menu · rendering defects",
      "headline": "Career creation and district selection reached",
      "summary": "PPSA05831 v01.000.000: Startup, New Career and district confirmation work. Bright green output corrupts the main-menu background; flipped UI and recursive image copies obstruct shift selection. Street gameplay was not verified.",
      "strengths": [
        "Keyboard menu input and creation of a career save were verified."
      ],
      "limits": [
        "Severe rendering corruption; street control, save reload and audible quality remain unverified."
      ],
      "performance": "Main-menu capture: 16.3 FPS, one reading. Corrupted district selection: 8.2–9.9 FPS, median 9.2, 30 one-second samples. RTX 3070 Ti, Speed, 1920×1080 output; internal targets reach 2560×1440. These are not gameplay FPS.",
      "imageAlt": "Police Simulator main menu with a severely corrupted green background"
    },
    "monster-boy-and-the-cursed-kingdom": {
      "status": "In-game · rendering defects",
      "headline": "First controllable level reached",
      "summary": "PPSA02787 v01.000.004: New Game now saves and loads the first level after fixes to NGS2 port queries, keyboard taps and save services. Movement was verified; large black polygons remain.",
      "strengths": [
        "Menu, save creation and first-level movement work."
      ],
      "limits": [
        "Severe background and ground defects; no completed playthrough, save-reload or audible-output verification."
      ],
      "performance": "First level: 3.8–5.7 FPS, median 4.2; 30 one-second counter samples. RTX 3070 Ti, 1920×1080, Speed. Concurrent compilation affected the run; this is not an isolated benchmark.",
      "imageAlt": "Monster Boy first level with HUD, character, hut and black polygon defects"
    },
    "oxide-room-104": {
      "status": "Startup notice · later black screen",
      "headline": "The autosave notice renders; later rendering hits shader and queue errors.",
      "summary": "PPSA07653 v01.000.000: Two launches pass linking. Automatic Cross reaches black output with FLAT addressing, IMAGE_BVH_INTERSECT_RAY, InvalidScalarCall and DMA_DATA rejection errors. A keyboard-only repeat displays the autosave notice. Gameplay is unverified.",
      "strengths": [
        "The autosave text, animated icon and Cross/OK prompt render in the repeat; neither run logs a guest CPU fault."
      ],
      "limits": [
        "Both runs have unresolved storage bindings. The repeat stays on the notice; a short automated key press was not observed by Pad diagnostics. Main menu and controls remain unverified.",
        "Manual controls, audio quality, saves, completion and long-session stability were not verified."
      ],
      "performance": "Autosave notice: 18.45 FPS median (17.5–19.1), 30 readings over 29.829 s. Not a gameplay benchmark. The 18.8 FPS retained on the black screen is stale. October 11 development build; RTX 3070 Ti, 1920×1080 output, Speed preset. Existing caches retained. First run: automatic Cross; measured repeat: keyboard only.",
      "imageAlt": "Oxide Room 104 autosave notice with a white icon and Cross OK prompt on a dark red background"
    },
    "medieval-dynasty": {
      "status": "Main menu · vertically inverted image",
      "headline": "The main menu renders, but its artwork and text are upside down.",
      "summary": "PPSA07933 v01.413.001: The existing runner reaches the main menu. The background, logo and option text are vertically inverted. Scripted Cross does not enter a level during this check; gameplay is unverified.",
      "strengths": [
        "New Game, Load Game, Settings and Credits render; no guest fault was logged."
      ],
      "limits": [
        "38 of 50 GPU-gap reports contain 72 unresolved storage bindings. Their relationship to the inversion is unknown. Manual navigation remains unverified.",
        "Manual controls, audio quality, saves, completion and long-session stability were not verified."
      ],
      "performance": "Menu: 32.3 FPS median (28.8–33.2), 30 readings over 29.763 s. Largest internal target 1920×1080. Not a gameplay benchmark. October 11 development build; RTX 3070 Ti, 1920×1080 output, Speed preset. Existing caches retained; automatic Cross input enabled. Internal rendering remains game-controlled.",
      "imageAlt": "Medieval Dynasty main menu with vertically inverted snowy village artwork, logo and option text"
    },
    "charons-staircase": {
      "status": "Opening 3D scene · controls unverified",
      "headline": "The illustrated introduction leads into the forest-road scene.",
      "summary": "PPSA06603 v01.000.000: The existing runner reaches the opening 3D forest road. A 32.342-second transition frame includes 26.810 seconds of graphics pipeline misses. The scene renders, but character control and playability are unverified.",
      "strengths": [
        "The introduction text, trees, road lighting and lens flare are visible; no guest fault was recorded."
      ],
      "limits": [
        "63 of 64 GPU-gap reports contain unresolved storage bindings, usually 72. Their visual consequences remain unisolated; lighting correctness is unverified.",
        "Manual controls, audio quality, saves, completion and long-session stability were not verified."
      ],
      "performance": "Forest view: 9.1 FPS median (8.0–9.3), 30 counter readings over 29.852 s. Automatic Cross remains active; largest internal target 3456×1944. Not a game-wide benchmark. October 11 development build; RTX 3070 Ti, 1920×1080 output, Speed preset. Existing caches retained; automatic Cross input enabled. Internal rendering remains game-controlled.",
      "imageAlt": "Charon's Staircase opening forest road with dark trees, bright road lighting and lens flare"
    },
    "pac-man-world-re-pac": {
      "status": "Intro · title and terms screens",
      "headline": "Opening movie and title screen reached; movie colors are incorrect.",
      "summary": "PPSA06399 v01.000.002: The existing runner passes Unity initialization and reaches the title and terms screens after the opening movie. The movie has severe color distortion. Automatic Cross cycles through startup screens; gameplay is unverified.",
      "strengths": [
        "All 180 periodic GPU-gap reports have zero counters; no guest fault was logged."
      ],
      "limits": [
        "Zero diagnostic counters do not establish correct graphics. No level or character control was tested.",
        "Manual controls, audio quality, saves, completion and long-session stability were not verified."
      ],
      "performance": "Startup transitions: 9.55 FPS median, 5.9–14.1 over 30 counter samples spanning 29.927 s. Concurrent desktop launcher activity; not a stationary or gameplay benchmark. October 11 development build; RTX 3070 Ti, 1920×1080 output, Speed preset. Existing caches retained; automatic Cross input enabled. Internal rendering remains game-controlled.",
      "imageAlt": "PAC-MAN WORLD Re-PAC title logo and Cross prompt over a dark island background"
    },
    "keywe": {
      "status": "Startup · save-slot menu · rendering incomplete",
      "headline": "Missing imports resolved; the save-slot screen is reachable.",
      "summary": "October 11 development build, PPSA02210 v01.000.000: pthread_setcancelstate now preserves state per guest thread. Seven subsequent Audio3d imports also have implementations, including owned PCM queues and stereo mixing. KeyWe passes linking and Unity initialization.",
      "strengths": [
        "The developer and publisher screens render. Automatic Cross input reaches the SAVE SLOT panel with Select and Delete prompts.",
        "All 635 HLE tests pass. The first runtime check records 26 GPU-gap reports with zero counters and no guest fault."
      ],
      "limits": [
        "The captured slot panels are empty against a black background; after automatic confirmation, the screen turns black while frame submissions continue. Gameplay is unverified. A keyboard-only repeat also turns black after the logos.",
        "Audio3d uses approximate stereo positioning, without HRTF or room acoustics. This run opens ordinary AudioOut; Audio3d playback, audio quality, manual controls, saves and completion are unverified."
      ],
      "performance": "The save-slot capture shows 8.1 FPS on RTX 3070 Ti at 1920×1080 output and reported largest internal target. This is one window-counter reading, not a sustained or gameplay benchmark.",
      "imageAlt": "KeyWe SAVE SLOT panel with three empty slots and Select/Delete prompts on a black background"
    },
    "super-woden-gp": {
      "status": "Main menu · graphical issues · gameplay unverified",
      "headline": "Startup fixed; the world-map menu is now reachable.",
      "summary": "October 11 development build, PPSA07211 v01.000.003: two missing libkernel imports in Unity’s Il2CppUserAssemblies.prx now have real per-thread cleanup handlers. The game passes linking and Unity initialization, then reaches language selection and the world-map menu.",
      "strengths": [
        "Three launches pass startup. Scripted Cross and Down input advances through language selection into the main map menu.",
        "All 164 periodic GPU-gap reports in the menu run have zero counters; no guest fault or cleanup callback failure was recorded."
      ],
      "limits": [
        "Several map labels and icons are vertically inverted, and flags on the language screen have incorrect colors. Zero gap counters do not establish correct graphics.",
        "Manual navigation, racing, audio quality, saves, completion and long-session stability remain unverified."
      ],
      "performance": "The saved menu frame shows 71.8 FPS on RTX 3070 Ti, with 1920×1080 output and the same reported largest internal target. This is a single window-counter observation with scripted input, not a sustained benchmark, race performance result or before/after comparison.",
      "imageAlt": "Super Woden GP world-map menu with inverted labels and icons; window counter 71.8 FPS"
    },
    "arcade-spirits-the-new-challengers": {
      "status": "Main menu · opening video · gameplay unverified",
      "headline": "Startup fixed; the main menu measures a 252.9 FPS median.",
      "summary": "October 11 development build, PPSA06409 v01.000.000: five missing scePthreadSem imports now use real counted semaphores and scheduler waits. Python/Ren’Py initializes and the signed runner renders the main menu. A repeat with automatic Cross input selects START and reaches the opening video with subtitles.",
      "strengths": [
        "START, LOAD, PREFS, PRIZES and ABOUT render over the title artwork; the repeat advances into the Fist of Discomfort 2 Pro Tour introduction.",
        "All 517 menu-run and 278 repeat-run GPU-gap reports are zero, with no guest fault or sampled-image rejection."
      ],
      "limits": [
        "Manual menu navigation and gameplay remain unverified: the UI tool’s short key presses did not appear in Pad diagnostics.",
        "Audio quality, save recovery, full completion and long-session stability are untested. Zero reported gaps do not establish correctness in later scenes."
      ],
      "performance": "Menu: 252.9 FPS median, 221.1–272.3 FPS range from 30 one-second window-counter readings spanning 29.939 seconds, with automatic input disabled. RTX 3070 Ti, requested output 1920×1080, internal target 3840×2160. The intro capture shows 200.3 FPS, a single observation. These are not gameplay benchmarks or a before/after comparison.",
      "imageAlt": "Arcade Spirits main menu with START, LOAD, PREFS, PRIZES and ABOUT over the title artwork"
    },
    "arkanoid-eternal-battle": {
      "status": "Title screen · main menu · gameplay unverified",
      "headline": "Startup and menu artwork restored; the mode-selection menu measures 45.6 FPS.",
      "summary": "October 11 development build, PPSA06328 v01.002.000: four missing Fiber/POSIX imports are implemented. Independent firmware stacks and synchronized fiber migration between workers remove the subsequent startup failures. A separate upload limit for large BC7 atlases restores the title artwork.",
      "strengths": [
        "Two launches reach the animated title screen. Automatic Cross input opens the mode-selection carousel with Options, Retro, Eternal Battle, Versus and Neo.",
        "No guest faults or sampled-image rejections appear in the final traces; reported GPU gap counters remain zero in the checked frames."
      ],
      "limits": [
        "The online Eternal Battle mode reports that it is not accessible, with failed server connections in the guest log.",
        "Offline mode selection, paddle control and gameplay remain unverified. Audio quality, completion and long-session stability have not been tested."
      ],
      "performance": "Menu: 45.6 FPS median, 43.5–46.6 FPS range over 30 one-second window-counter samples spanning 29.962 seconds. Automatic Cross remained enabled. Title-screen observations: 138–149 FPS, not a timed benchmark. RTX 3070 Ti, 1920×1080 output request, 3840×2160 internal target. These are menu readings, not gameplay performance or a before/after comparison.",
      "imageAlt": "Arkanoid main mode-selection menu with Retro, Eternal Battle and Versus cards; window counter 45.2 FPS"
    },
    "raiden-iv-mikado-remix": {
      "status": "Playable · Completable",
      "headline": "First-level gameplay, working effects and reduced rendering costs.",
      "summary": "October 17 development build: the NGS2 voice pool now accommodates 1,024 sampler voices plus the master. ATRAC9 decoding and in-memory waveform parsing restore sound effects. Compatible render passes and sampled-image descriptor banks reduce driver overhead.",
      "strengths": [
        "The first OverKill level renders the player ship, enemies, bullets, terrain and HUD; death and continuation were checked.",
        "The user confirms menu-button sounds. Checked frames report no draw/dispatch failures or unsupported compute operations."
      ],
      "limits": [
        "Playable · Completable is the maintainer-assigned grade. This run did not verify a complete playthrough or long-session stability.",
        "Background music remains incorrect: the user hears it only around death. Sustained 60 FPS has not been reached."
      ],
      "performance": "39.75 FPS: 1,193 frames in 30.013 seconds, one-second intervals 24.99–63.97 FPS. Later heavy combat was observed around 18–22 FPS. Moving scenes, not a controlled before/after comparison. RTX 3070 Ti, 1920×1080 output and observed internal target. The final snapshot optimization is not included in this timed candidate.",
      "imageAlt": "Raiden IV gameplay with the player ship, enemy formation, bullets and HUD; score 14000"
    },
    "dead-cells": {
      "status": "Main menu · first level renders · playability unverified",
      "headline": "The first room, character and HUD render; menu music now produces a nonzero mix.",
      "summary": "October 11 development build, PPSA15552 v01.005.000: after resolving eight NGS2 imports, two shared fixes restore the visible level and menu-audio data. Full-screen copy shortcuts now respect blending, preserving the lit scene. Custom NGS2 sampler voices now accept waveform format, blocks and pitch instead of mixing silence.",
      "strengths": [
        "The Prisoners’ Quarters room, character, weapon, tutorial prompt and HUD are visible.",
        "All 101 periodic reports show zero draw/dispatch failures; the repeat has no image_sample rejection with InvalidStorageBinding."
      ],
      "limits": [
        "Automatic Cross presses started the game; combat, progression, saves and longer sessions remain untested.",
        "Menu audio is confirmed only by mix levels, not listening. Spatial audio matrices and channel panning remain incomplete."
      ],
      "performance": "Seven starting-room window-counter readings: 59.2–68.1 FPS, including 62.5 FPS at capture; not a timed median. Earlier main-menu readings: 71–72 FPS. RTX 3070 Ti, Speed preset, 1080p output request.",
      "imageAlt": "Dead Cells in the Prisoners’ Quarters with the lit room, character, tutorial prompt and HUD"
    },
    "little-nightmares-enhanced-edition": {
      "status": "In-game · rendering incomplete",
      "headline": "Save/reload works; opening gameplay measures 3.73–4.46 FPS.",
      "summary": "October 3, PPSA10737 v01.004.000: asynchronous save writes now persist progress and fresh processes Resume the opening room. HTILE handling, batched eager readbacks and four copy workers reduce rendering costs. The updated runner still falls short of 5 FPS.",
      "strengths": [
        "New Game, movement, camera follow and lighter input are verified.",
        "Nonempty saves are written and reloaded after restarting the emulator."
      ],
      "limits": [
        "Dark lighting, reflective material defects and unsupported FLAT/ray-intersection shaders remain.",
        "Intermittent allocator failures can interrupt startup; completion and long-session stability remain unverified."
      ],
      "performance": "Updated default build: 4.46 FPS beside the suitcase, 3.73 FPS after moving right, each over 30 unpaused seconds. RTX 3070 Ti, 1080p output request, Speed preset, in-game Performance; internal resolution is game-controlled. The earlier 2.16 FPS check is not an identical-position comparison. 5 FPS is not achieved.",
      "imageAlt": "Six beside the suitcase in the opening room; dark lighting and reflective material defects remain"
    },
    "gta-iii-definitive-edition": {
      "status": "In-game · movement verified",
      "headline": "Cold launcher startup verified; green reflection publication fixed.",
      "summary": "October 10 development build, PPSA03527 v1.007: the installed signed runner automatically reaches the menu after both startup movies, with the emulator caches absent. Give Me Liberty renders the player, car, bridge, HUD and minimap. Ordered buffer/storage-image publication removes the observed green reflection clear; shared shader analysis reduces repeated CPU work.",
      "strengths": [
        "Actual launcher cold start reaches the menu without skipping movies; New Game reaches the opening mission.",
        "Keyboard movement and a change of direction are verified."
      ],
      "limits": [
        "Opening-scene reports show zero draw/dispatch failures and unresolved storage bindings; later shaders and remaining visual defects are not fully audited.",
        "Vehicle/object shadows moving with the player and duplicated player shadows were reported on October 11; reproduction and correction remain pending. One rejected vertex-only draw at initialization is also under investigation.",
        "Whole-game completion, long-session stability, save recovery and audio correctness remain unverified."
      ],
      "performance": "October 10–11 opening-position checks: 7.37 FPS on the installed runner after a cold launch and 8.27 FPS after indexing uniform scalar analysis. Each interval is 30 unpaused seconds. A later 7.10 FPS sample with user movement is excluded from the stationary comparison. Performance mode, Bloom/Motion Blur off, Classic Lighting on; output 1080p, internal resolution game-controlled. Traffic and time of day vary. Further buffer-index and compact variant-key changes await a clean gameplay measurement; 10 FPS is not yet established.",
      "imageAlt": "GTA III player and car at Callahan Bridge after cold launcher startup and the reflection publication fixes"
    },
    "subnautica-below-zero": {
      "status": "Playable · Completable",
      "headline": "New Game reaches the opening world, with camera movement and walking verified.",
      "summary": "October 3 repeat, PPSA02457 v1.022.125: the installed runner restores the Survival save and renders the snowy crash site and HUD. This run measures the current build after the shared GTA III renderer changes; it adds no new emulator fixes.",
      "strengths": [
        "New Game, intro, world rendering, camera input and walking verified."
      ],
      "limits": [
        "Dark lighting, visual artifacts and long pauses remain.",
        "Full playthrough, audio correctness and long-session stability remain unverified."
      ],
      "performance": "Second fresh launch, same executable and Survival save: menu 15.50 FPS; two unpaused 30-second stationary world samples 12.70 and 8.50 FPS, 10.60 FPS combined. Output 1080p, Speed preset, warm caches. No ten-second stop in these intervals, but shorter delays remain. The previous launch averaged 9.52 FPS. This is run-to-run variation, not a new optimization; 30 FPS remains unmet.",
      "imageAlt": "Subnautica: Below Zero snowy crash site and survival HUD during the October 3 performance repeat"
    },

    "terminator-2d-no-fate": {
      status: "Playable · Completable",
      headline: "Played to the end with nothing reported wrong.",
      summary:
        "The maintainer completed this title. Backgrounds, characters, HUD, textures and colours all come out as intended, and it has been the project's most stable reference title since the September 8 confirmation.",
      strengths: [
        "A full playthrough with no reported defects.",
        "Correct texture alpha, channel swizzles and sRGB sampling keep the intended colour balance.",
        "HUD and character art render cleanly throughout.",
      ],
      limits: [
        "Frame times still vary with the scene rather than holding a fixed rate.",
      ],
      performance:
        "Once warmed up, startup frames land between 22 and 65 ms on the reference host.",
      imageAlt:
        "Terminator 2D: No Fate gameplay with the player character, HUD and a desert scene, rendered by PS5PCEM",
    },

    "asterix-obelix-slap-them-all": {
      status: "Playable · Completable",
      headline: "Finished end to end, with the intro and UI both correct.",
      summary:
        "A confirmed playthrough. Gameplay and interface draw the right way up, and intro playback works. The final fullscreen composite stays on the GPU, and scanout keeps the guest viewport's orientation without copying a frame back through host memory.",
      strengths: [
        "Complete playthrough confirmed by the maintainer.",
        "Intro video plays, and gameplay and UI are correctly oriented.",
        "A 3,000-flip development run finished without a single rejected submission.",
      ],
      limits: [
        "Frame cost depends on scene density rather than being locked.",
      ],
      performance: "October 9 development retest: stationary opening-forest median 46.45 → 162.20 FPS, from 30-second UI-counter samples at 1080p output on RTX 3070 Ti. Later levels are not measured.",
      imageAlt:
        "Asterix & Obelix: Slap Them All! gameplay in a forest with the HUD and a GO sign, rendered by PS5PCEM",
    },

    "cat-quest-iii": {
      status: "Playable · Completable",
      headline:
        "Finished, with menus, dialogue and island terrain all drawing correctly.",
      summary:
        "A confirmed playthrough. Menus, adventure cards, dialogue, island terrain and colours are right in the captured scenes. Getting there took fixes to world orientation, stencil-only passes, AGC interpolant mapping and scanout channel order.",
      strengths: [
        "Complete playthrough confirmed by the maintainer.",
        "The language list keeps its text and clips it inside its panel instead of being painted over.",
        "Adventure selection shows slot artwork, labels, add buttons and scroll arrows.",
      ],
      limits: [
        "Frame rate on the opening island, not correctness, is the remaining limit.",
      ],
      performance:
        "Opening-island samples have a median of 124 ms, roughly 8 FPS, improved from about 148 ms before the optimisation work.",
      imageAlt:
        "Cat Quest III island gameplay with the HUD, mountains and blue sea, rendered by PS5PCEM",
    },

    "dreaming-sarah": {
      status: "Playable · Completable",
      headline: "Opening forest exceeds 100 FPS after vertex upload optimization.",
      summary:
        "The October 10 development build replaces oversized sprite-buffer copies with proven vertex ranges. Buffer uploads fall from about 78 MiB to 4.9 MiB per opening frame. Movement, jumping and the next platform screen are verified; the earlier completed-playthrough report remains on record.",
      strengths: [
        "Complete playthrough confirmed by the maintainer.",
        "60-second opening sample: 198.25 FPS median, 187.8–203.2 FPS. After waking: 197.25 FPS; next platform screen: 144.35 FPS (30 seconds each).",
        "Animated title, world scenes and NPCs all draw correctly.",
      ],
      limits: [
        "These are window-counter samples on an RTX 3070 Ti with 1080p output and audio enabled; they do not establish a minimum across the entire game.",
        "Loading needed eboot.bin and sce_module/libc.prx restored from the backups left by the copy's own eboot patcher, which had truncated both.",
      ],
      performance:
        "60-second opening sample: 198.25 FPS median, 187.8–203.2 FPS. After waking: 197.25 FPS; next platform screen: 144.35 FPS (30 seconds each).",
      imageAlt:
        "Dreaming Sarah opening forest after bounded vertex uploads",
    },

    "jurassic-park-classic-games-collection": {
      status: "Playable · Completable",
      headline:
        "Startup restored; the first level is verified again.",
      summary:
        "Startup works again in development commit a3d371e. The October 8, 2026 retest passed two launches, reached the first level and confirmed keyboard input in the map overlay. The maintainer's earlier completed-playthrough report remains on record.",
      strengths: [
        "The October 8 development build passes font-atlas initialization and reaches the first level.",
        "Complete playthrough confirmed by the maintainer.",
        "Collection selection shows cover art, navigation arrows and an animated preview.",
        "Startup rendering, title logo and confirmation prompt are all correct.",
      ],
      limits: [
        "Cycling preview videos repeatedly can exhaust an AvPlayer handle pool, after which later previews freeze.",
        "Frame cost varies by collection game and by hardware.",
      ],
      performance:
        "Historical title and selection frames sampled at roughly 27 and 33 ms. The October 8 retest checked startup and the first level; it did not establish a new FPS benchmark.",
      imageAlt:
        "Jurassic Park first level at the park gates after the font-atlas startup fix, rendered by PS5PCEM",
    },

    "jets-n-guns-2": {
      "status": "Playable · Completable",
      "headline": "Finished, with levels, HUD, score and parallax scene all correct.",
      "summary": "Concurrent music and effects now keep separate host streams. The October 9 development fix also preserves PCM order after an underrun; it is newer than release 0.3.4. The maintainer confirmed a complete playthrough on September 15.",
      "strengths": [
        "Complete playthrough confirmed by the maintainer.",
        "Levels, HUD, score, enemies and parallax layers all draw correctly.",
        "Music and effects no longer compete for one output device."
      ],
      "limits": [
        "A final 30-second installed-runner menu recording retained one 30 ms silent interval; its cause is not established.",
        "Short menu and combat audio checks passed; end-to-end sound latency and long-session stability were not measured."
      ],
      "performance": "October 9 combat UI samples read 35.7–45.8 FPS. The historical 70–92 ms frames (11–14 FPS) used an earlier build and scene; this is not a matched speedup benchmark.",
      "imageAlt": "Pirate Base combat during the October 9 audio retest"
    },

    "the-precinct": {
      status: "Title menu, intro movies, and a first in-engine gameplay frame",
      headline:
        "Plays both intro movies, draws the title menu, and enters the cold world load.",
      summary:
        "The complete six-image guest graph links, Unity plug-ins start, and both observed intro movies play as synchronised 4K video with 48 kHz stereo sound. The title artwork and a readable NEW GAME confirmation render, and holding Triangle begins the world load. An earlier guarded run produced the first verified in-engine gameplay frame.",
      strengths: [
        "Both intro movies play as synchronised 3840×2160 video with 48 kHz stereo audio.",
        "The full 1920×1080 title artwork and a readable NEW GAME confirmation render.",
        "Exception delivery to a target thread completes Unity's stop-the-world handshake.",
      ],
      limits: [
        "The first world transition still takes minutes: first-use shader translation, driver pipeline compilation, synchronous submission and staging are all expensive.",
        "A title-specific compiler workaround was dropped in favour of the general shader path, so the transition needs fresh end-to-end validation before any gameplay claim.",
      ],
      performance:
        "The world-load frame now measures 2.1 s, down from 5.1 s, once descriptor recovery stopped replaying each kernel's prolog for every resource it names.",
      imageAlt:
        "The Precinct title menu with the NEW GAME confirmation, rendered by PS5PCEM",
    },

    "ghost-of-yotei": {
      status:
        "Intro playback · bonus notices · brightness calibration · reaches in-game scenes · not playable",
      headline:
        "Menus and the tree render, with visible defects and very low frame rates.",
      summary:
        "Loading, bonus notices, brightness calibration and the tree/settings scene render. Earlier runs reached an incomplete post-tree cinematic. The October 13 repeat measures 1.27 FPS at the tree/settings sequence; graphical defects and long compilation stalls remain. Controllable gameplay has not been reached in this investigation.",
      strengths: [
        "Intro movies play at roughly their native 30 FPS, with audio starting in step with the track.",
        "The loading indicator, bonus notices and the brightness calibration screen with its wolf image, slider and prompt all render.",
        "Later 3D scenes, including the tree scene, reach the screen with menu music audible.",
      ],
      limits: [
        "Character control remains unverified.",
        "Bright tree streaks, incomplete lighting and unresolved resource bindings remain.",
        "First-use pipeline compilation, large transfers and high memory use still dominate some transitions.",
        "An earlier BVH traversal stall remains unresolved; captures add synchronization, so successful replay does not establish normal-run stability.",
      ],
      performance:
        "October 13: 38 presented frames in 30.001 seconds (1.27 FPS), tree/settings sequence on RTX 3070 Ti at 1080p output. One first-use frame takes 461.2 seconds, including 433.5 seconds creating graphics and compute pipelines. These are different intervals, not a controlled before/after comparison. No FPS gain is established for the final memory change.",
      imageAlt:
        "Ghost of Yōtei Digital Deluxe Bonus notice, rendered by PS5PCEM",
    },

    "quake-ii-2023": {
      status: "Playable · Completable",
      headline: "Finished, with lighting, models and weapons all restored.",
      summary:
        "Confirmed playable on September 16, 2026 and rechecked on September 25 as PPSA09477 v1.003. Level lighting, textures, weapons and NPCs are visible: the dark world and missing models seen in earlier builds are resolved in the observed gameplay. Menus, HUD and controller input all work.",
      strengths: [
        "Complete playthrough confirmed by the maintainer, with rendering rechecked later.",
        "Lighting, textures, weapons and NPC models all appear; earlier dark-world and missing-geometry defects are gone.",
        "Menus, HUD and controller input behave correctly.",
      ],
      limits: [
        "Busy combat scenes still run well below the peaks, so the high figures are not a floor.",
        "Performance work continues.",
      ],
      performance:
        "The maintainer reports peaks of 60–70 FPS in lighter scenes, with busy combat noticeably slower. Buffer reuse and GPU clears cut transfer overhead.",
      imageAlt:
        "Quake II gameplay with a lit level, visible enemies and the player's weapon, rendered by PS5PCEM",
    },

    reanimal: {
      status: "Animated 4K title menu, with incomplete option labels",
      headline:
        "Plays the logo sequence and sustains the animated title-menu render graph.",
      summary:
        "The observed native and firmware modules resolve, the company-logo sequence plays, and the animated 3840×2160 title menu keeps rendering. The buoy background, title logo, water highlights and SELECT prompt are all visible — but the menu's own option labels are not.",
      strengths: [
        "The company-logo sequence plays and the animated 4K title menu sustains.",
        "Narrow Unity UI intermediates no longer replace the full scanout.",
        "Dynamic R8 font atlases correctly invalidate stale sampled images.",
      ],
      limits: [
        "Central menu option labels are reduced to small red marks, so navigation and the move into gameplay are unverified.",
        "Performance and longer-run stability are unmeasured, and no gameplay is claimed.",
      ],
      imageAlt:
        "REANIMAL animated title menu with incomplete option labels, rendered by PS5PCEM",
    },

    "ritas-rewind": {
      status: "Playable · Completable",
      headline:
        "Finished, from the publisher sequence through to Command Center gameplay.",
      summary:
        "Confirmed playable on September 24, 2026. The publisher sequence, title menu and gameplay all render and respond to controller input; the capture shows the Red Ranger in the Command Center training stage with HUD, health bar, objectives and button prompts.",
      strengths: [
        "Complete playthrough confirmed by the maintainer.",
        "Native cooperative fibers keep suspended guest stacks intact.",
        "Exact V_SAD_U32, V_MUL_HI_I32 and V_CVT_FLR_I32_F32 lowering removed the diagnostic shader fallback.",
      ],
      limits: [
        "The exact guest CRT composite still produces static on the reference host, so a narrowly matched shader-signature fallback scales the scene 4× in RGBA8 before post-processing.",
      ],
      performance:
        "The intro holds roughly 13–20 ms per frame. Dense post-menu frames of about 255 draws cost around 470 ms, dominated by repeated guest-buffer staging.",
      imageAlt:
        "Mighty Morphin Power Rangers: Rita's Rewind gameplay with the Red Ranger in the Command Center, rendered by PS5PCEM",
    },

    "big-helmet-heroes": {
      status: "Main menu and tutorial render · playability unverified",
      headline:
        "Reaches a correct main menu and a tutorial scene, at single-digit frame rates.",
      summary:
        "The title advances from its intro to a correctly rendered main menu with character models, textures, lighting and colours, and on into a tutorial scene. Fixes covered Gen5 single-sample texture addressing, layered render targets and scanout channel order. Gameplay itself has not been verified.",
      strengths: [
        "A correct main menu with models, textures, lighting and colours.",
        "The tutorial scene renders after startup and loading stalls were fixed.",
        "Output is a clean 1080p presentation, though internal targets can be larger.",
      ],
      limits: [
        "Gameplay, save recovery and long-session stability are all unverified.",
        "Visual artifacts remain, and copies, resource preparation and GPU waits stay expensive.",
        "Stable 15 FPS in the menu is not achieved.",
      ],
      performance: "Main-menu median: 9.4 FPS (9.0–9.5), versus 4.9 FPS before; 45 one-second window-counter samples after warmup. RTX 3070 Ti, 1080p output, game-controlled internal resolution. All samples remain below 15 FPS. Tutorial performance was not retested.",
      imageAlt: "Big Helmet Heroes main menu with character models, readable labels and dense orange grass",
    },

    "tetris-effect-connected": {
      status:
        "Developer logos · readable license screen · Journey Mode selection · gameplay unverified",
      headline:
        "Logos, the license screen and Journey Mode selection render, much faster than before.",
      summary:
        "Verified on September 24, 2026 with PPSA07923 v2.000.022. A translated composite replaced the earlier speculative 4K overrides, and the license and menu pages now render without the duplicated interface and vertical seam seen in earlier builds. Both screens also got substantially cheaper.",
      strengths: [
        "The license screen and menus render without duplicated UI or the vertical scene boundary.",
        "Publishing linear metadata fills, with R11G11B10 and RGB10A2 DCC clears, removed accumulated UI copies.",
        "A 128-target profile retains the roughly 100-attachment working set instead of thrashing a smaller cache.",
      ],
      limits: [
        "Dark interface elements and an unresolved compute texture binding are still open.",
        "Later video playback faults in the guest H.264 decoder.",
        "Longer-run stability and gameplay are not established.",
      ],
      performance:
        "Median license frames fell from 235 ms to 159 ms, about 4.3 to 6.3 FPS. Sampled Journey frames fell from 1127–1276 ms to 318–396 ms.",
      imageAlt:
        "An early Tetris Effect particle frame rendered by PS5PCEM",
    },

    "propagation-paradise-hotel": {
      status: "Mounts its package, opens the shader archive, submits the first command buffer",
      headline: "Completes the Unreal bootstrap up to its first submission.",
      summary:
        "The 8.8 GiB Unreal package mounts, ICU and configuration bootstrap complete, the cooked global shader archive opens, AGC shaders are created, and the first command buffer is submitted. Nothing is claimed about a presented frame.",
      strengths: [
        "The 8.8 GiB Unreal package mounts and the engine bootstrap completes.",
        "The cooked global shader archive opens and AGC shaders are created.",
        "The first command buffer reaches submission.",
      ],
      limits: [
        "The milestone predates the current synchronisation packet constructors and needs a fresh run.",
        "VR presentation has no host headset bridge, so there is nothing to present to.",
      ],
    },

    "pistol-whip": {
      status: "Maps its VR modules, then loads Unity archives",
      headline: "Gets as far as loading Unity asset archives.",
      summary:
        "The native PS VR2 plugin and the Burst module both map, and the title starts loading its Unity asset archives. Everything past that depends on VR support the project has deliberately put off.",
      strengths: [
        "The native PS VR2 plugin and Burst module map successfully.",
        "Unity asset archive loading begins.",
      ],
      limits: [
        "Headset, tracking, controller and host OpenXR support are deliberately deferred.",
      ],
    },
  },

  history: {
    "raiden-iv-audio-rendering-20261017": {
      "title": "Playable grade, partial audio fix and new gameplay capture",
      "imageAlt": "Raiden IV gameplay with the player ship, enemy formation, bullets and HUD; score 14000",
      "summary": "The maintainer assigns Playable · Completable. NGS2 voice allocation, ATRAC9 effects and render-pass/descriptor handling improve. A moving first-level interval averages 39.75 FPS over 1,193 frames; later combat falls to about 18–22 FPS. Background music remains incorrect and completion is unverified. The screenshot comes from the native renderer."
    },
    "astro-bot-storage-readbacks-20261016": {
      "title": "Storage copies reduced; title averages 20.07 FPS",
      "summary": "The renderer avoids 26.125 MiB of obsolete host copies per frame; queue discovery avoids about 117 repeated pointer checks. The uninterrupted title measurement is 20.07 FPS over 2,640 frames, with 60-frame blocks at 18.39–21.68. 680 HLE tests, 274 Vulkan tests and 64 native overwrite configurations pass. Twelve unresolved storage bindings and cinematic defects remain; character control is unverified.",
      "imageAlt": "ASTRO BOT animated title after storage-copy and queue-discovery changes"
    },
    "astro-bot-resource-walks-20261016": {
      "title": "Resource preparation updated; title averages 17.83 FPS",
      "summary": "Borrowed shader data, compact lookup keys, content fingerprints and cached loop writes reduce CPU work. Omitting inert CPU scalar steps measures 17.85 → 17.88 FPS, an inconclusive difference. The final 2,640-frame run averages 17.83 FPS; 582 GPU/Vulkan tests and five native probes pass. Twelve unresolved storage bindings and cinematic defects remain; 20 FPS and character control are unverified.",
      "imageAlt": "ASTRO BOT animated title screen after resource-walk and content-check changes"
    },
    "astro-bot-resource-costs-20261015": {
      "title": "Resource costs reduced; 18.05 FPS title average",
      "summary": "Packed linear texture reads, smaller scalar scratch and static-query caches reduce CPU work. Counter-assisted GPU waiting measures 17.78 → 18.02 FPS in a balanced comparison; the uninterrupted 2,640-frame confirmation averages 18.05 FPS. 573 GPU/Vulkan tests and native validation pass. Twelve unresolved storage bindings and cinematic defects remain; character control is unverified.",
      "imageAlt": "ASTRO BOT animated title screen with logo and button prompt after CPU resource optimizations"
    },
    "astro-bot-uniform-scan-20261015": {
      "title": "Reduce uniform-analysis reads and texture scans",
      "summary": "AnyPS5/KytyPS5 review: omit 49 unused CPU proof reads per frame and reuse compute texture instruction indices. Later title comparison: 14.95 versus 14.91 FPS, 660 frames per mode; no established gain, 25 FPS not reached. 560 GPU/Vulkan tests and native validation pass; 12 unresolved storage bindings remain. Graphics uniform specialization was also tested and remains disabled because it reduced FPS.",
      "imageAlt": "ASTRO BOT title during uniform-read and texture-scan validation"
    },
    "astro-bot-entry-scalars-20261015": {
      "title": "Reuse proven scalar reads",
      "summary": "Reviewed AnyPS5 and KytyPS5; removed redundant preparation for proven entry scalar reads. Title: 14.92 versus 15.02 FPS, 660 frames per mode; no measured gain, 25 FPS not reached. About 411 buffer preparations avoided per frame. 558 GPU/Vulkan tests and native graphics validation pass.",
      "imageAlt": "ASTRO BOT title after entry-scalar validation"
    },
    "astro-bot-descriptor-semantics-20261014": {
      "title": "Scalar reads and split texture descriptors",
      "summary": "AnyPS5 review led to fixes for unused scalar-buffer fields and bounded texture descriptors assembled from multiple loads. Title: 14.97 FPS over 660 frames. 556 GPU/Vulkan tests and native probes pass; ten broader RDNA2 failures also occur on the baseline. New capture; 25 FPS and character control remain unverified.",
      "imageAlt": "ASTRO BOT title after scalar descriptor fixes"
    },
    "astro-bot-draw-capture-20261014": {
      "title": "Draw capture and cache comparison",
      "summary": "Title: 15.33 versus 15.22 FPS, 660 frames per setting. Unusable replay data is no longer copied or hashed. A larger cache did not improve FPS; the default stays unchanged. All 553 tests and native Vulkan checks pass. New title capture; 25 FPS and character control remain unverified.",
      "imageAlt": "ASTRO BOT title after draw capture optimization"
    },
    "astro-bot-storage-layouts-20261014": {
      "title": "Storage ownership and scalar loop budgets",
      "summary": "Title comparison: 14.48 versus 14.26 FPS, 660 frames per setting. GPU layout conversion preserves padding; rectangular overwrite proofs avoid redundant uploads. Shared scalar walks use exact instruction budgets. All 551 tests and native validation probes pass. New title capture; 25 FPS and character control remain unverified.",
      "imageAlt": "ASTRO BOT title screen after storage ownership changes"
    },
    "astro-bot-static-analysis-20261014": {
      "title": "Static shader analysis and narrow texture layouts",
      "summary": "Title comparison: 14.25 versus 14.19 FPS, 660 frames per setting. Reused immutable call/NGG analysis, cheaper buffer queries and bounded Vulkan waits. Added verified 8/16-bit GPU layout transforms; storage uploads stay disabled after a slower comparison. 548 tests pass. New title capture; 25 FPS and character control are not confirmed.",
      "imageAlt": "ASTRO BOT title screen after static shader analysis changes"
    },
    "astro-bot-scalar-merges-20261014": {
      "title": "Scalar analysis and queued completion",
      "summary": "Balanced title comparison: 13.79 versus 13.43 FPS, 660 frames per setting. Less repeated shader analysis, indexed dirty-buffer completion, queued satisfied waits and faster large copies. 542 GPU/Vulkan tests pass. New title capture; 25 FPS is not reached and character control remains unverified.",
      "imageAlt": "ASTRO BOT title screen after scalar-analysis optimizations"
    },
    "astro-bot-bounded-recording-20261014": {
      "title": "Bounded recording and exact storage proofs",
      "summary": "A 250 μs command-recording budget improved the balanced title comparison from 11.69 to 12.43 FPS. Later storage changes measured 12.55 versus 12.49 FPS: no clear extra gain, but 26.125 MiB of redundant hashing is avoided per frame. 537 GPU/Vulkan tests and 64 overwrite configurations pass. New title capture; 25 FPS and character control are not verified.",
      "imageAlt": "ASTRO BOT title screen after bounded command recording"
    },
    "astro-bot-scalar-checkpoints-20261014": {
      "title": "Smaller scalar checkpoints and uploads",
      "summary": "Register snapshots are half the previous size while retaining dependency tracking. Scalar uploads write only the words used by the shader. GPU/Vulkan tests pass 535/535; native checks use nonzero poisoned buffers and cover changing inputs, loops, pixels and worker/shared preparation. A 1,320-frame title run measured 11.62 FPS. The balanced upload comparison measured 11.79 versus 11.69 FPS, 660 frames per setting: only a 0.9% observed difference. No fresh screenshot or character-control check; 25 FPS remains unmet."
    },
    "astro-bot-cpu-baselines-20261014": {
      "title": "Less CPU image copying",
      "summary": "Exact texel digests replace retained image copies, and checked guest fingerprints avoid the temporary snapshot. Balanced title comparisons: 11.19 versus 10.83 FPS for digest baselines; 11.51 versus 11.36 FPS for direct fingerprints, 660 frames per setting. Each step removes a 26.125 MiB CPU copy per frame. Native checks pass 32 configurations covering padding, newer CPU writes, unavailable fingerprints, aborted preparation and fallback; mip publication also passes. No new capture or visual/control verification. The 25 FPS target remains unmet."
    },
    "astro-bot-relative-moves-20261014": {
      "title": "Indirect shader register moves",
      "summary": "M0-indexed register moves now preserve indirect reads/writes, masked lanes and loops. Native checks pass 128 GPU dispatches; GPU/Vulkan tests pass 534/534. The warmed animated title measured 10.85 FPS across 1,320 frames, comparable to the previous build. No new draw/dispatch failures appeared in the log. No fresh screenshot or visual/control verification; the 25 FPS target remains unmet."
    },
    "astro-bot-full-stores-20261014": {
      "title": "Proven full-image stores",
      "summary": "A conservative shader proof avoids uploading old output pixels while preserving padding, newer CPU writes and recovery after aborted preparation. Native GPU checks pass with immediate and batched commands; 532 GPU/Vulkan unit tests pass. Balanced title samples: 9.45 FPS enabled versus 9.36 disabled, 660 frames per setting, with 25.38 MiB of uploads avoided per frame. The first old-raster readback comparison measured 9.64 versus 9.67 FPS but skipped no readbacks. The 25 FPS target remains unmet; no new screenshot or character-control result. With DCC-enabled raster sources included under the same coverage checks, the final comparison reaches 10.95 FPS versus 9.68 FPS (660 frames per setting, about 13.1% faster), avoiding one raster readback per frame. Native tests also preserve DCC metadata."
    },
    "astro-bot-native-layouts-20261014": {
      "title": "Native image transfers: correctness and FPS checks",
      "summary": "Native image transfers preserve texels, padding and newer CPU writes in GPU tests. Exact buffer reads preserve published holes; completion batches reuse valid prefetched copies. Vulkan tests pass 259/259. Balanced title comparisons measured 9.42 FPS with native storage transfers versus 9.55 with the CPU path, and 9.50 versus 9.55 after the prefetch completion fix. Those experimental transfers remain disabled by default. Exact interior buffer reads recorded no uses in their measured interval. The 25 FPS target is not reached; no new screenshot or character-control result is claimed."
    },
    "astro-bot-gds-publication-20261014": {
      "title": "GDS ordering and repeated title measurements",
      "summary": "Deferred GDS snapshots preserve counter values across later resets; transfer batching and full-image overwrite handling pass native checks. The follow-up warmed title baseline is 9.20–9.65 FPS over 20 seconds. Enabled/disabled comparisons remain around 9–10 FPS and do not establish a speedup. Vulkan tests pass 256/256. Incompatible image views still cause about 20 MiB of render-target readback per frame. No fresh screenshot or character-control check: window automation was unavailable. The 25–30 FPS target remains unmet."
    },
    "astro-bot-performance-20261014": {
      "title": "Renderer optimization: title and crowd measurements",
      "summary": "October 14 development build: warmed title observations are about 9–10 FPS; the crowd scene presents 46 frames in 10 seconds (4.60 FPS). Shared command banks, bounded resource analysis, cache recovery and native GPU transfers reduce overhead. GPU tests pass 272/272 and Vulkan tests 256/256. The final 2D storage-to-color transfer passes native probes but has no live benchmark yet. Rendering defects remain, character control is unverified and the 25–30 FPS target is not reached. No new capture; the displayed image is from October 13."
    },
    "astro-bot-lighting-20261013": {
      "title": "Wave synchronization removes horizontal lighting bands",
      "summary": "Whole-wave scalar branches and converged LDS barriers fix the repeating bands. BVH bounds and opaque child pointers are corrected; opt-in PSR v9 snapshots complete the captured query with a 16,384-block budget. Later sampled frames report no draw/dispatch failures, but four warm-up programs were rejected before the switch was enabled. Dark/patchy surfaces remain; gameplay and a sustained FPS gain are unverified.",
      "imageAlt": "ASTRO BOT arrival cinematic with the small craft and crashed ship; dark and patchy surfaces remain"
    },
    "astro-bot-startup-20261013": {
      "title": "Startup fixes and removal of green corruption",
      "summary": "JSON, APR, font and shader fixes reach the diagnostic hub cinematic using local font aliases and disabled acoustic propagation. The SDWA correction removes severe green corruption; this first checkpoint still rejects four BVH compute programs. Character control is not established.",
      "imageAlt": "ASTRO BOT arrival cinematic with the small craft and crashed ship; dark and patchy surfaces remain"
    },
    "yotei-renderer-followup-20261013": {
      "title": "Shared renderer improvements and complete compute replays",
      "summary": "October 13 development build: the tree/settings sequence presents 38 frames in 30.001 seconds (1.27 FPS). Changes reduce redundant Vulkan state commands and array-layer copies, index shader metadata reads, compact large snapshot shaders and release excessive CPU frame capacity. Native probes pass; two complete compute replays reproduce all 26 and 25 bound buffers byte for byte. Tree streaks, lighting defects, heavy transfers and first-use compilation remain. An earlier BVH traversal stall is unresolved: diagnostic captures add synchronization and cannot prove it fixed. Runs were stopped with low Windows memory headroom. Character control and a controlled FPS gain remain unverified; the final frame-memory change has no live benchmark.",
      "imageAlt": ""
    },
    "goat-simulator-3-gameplay-20261013": {
      "title": "First farm gameplay capture and stationary FPS sample",
      "summary": "PPSA04158 v01.000.000: With the complete game files, the existing development runner passes the long world load and cart introduction. The goat, compass and Goat Castle objective appear; keyboard movement is verified. 1.8 FPS median (1.7–1.8), 30 stationary window-counter samples over 30.011 seconds. RTX 3070 Ti, 1080p output, internal targets up to 3200×1800, Speed preset; caches retained. The scene and HUD stay vertically inverted after closing pause; menu transitions repeat subframes. Shading artifacts, unsupported 3D storage images and unresolved bindings remain. Audio quality, save reload, multiplayer and completion are unverified.",
      "imageAlt": "Goat Simulator 3 controllable farm scene with goat, compass and objective rendered upside down"
    },
    "minecraft-legends-gameplay-20261013": {
      "title": "Campaign database fix and first gameplay capture",
      "summary": "Real rename operations replace unsupported errors and allow LevelDB to publish its CURRENT file. All 653 HLE tests pass. The repeat reaches controllable tutorial gameplay, but severe graphics and text defects remain. This is a development build, not a completed-playthrough report.",
      "imageAlt": "Minecraft Legends tutorial with a mounted hero, health hearts, corrupted colors and black regions"
    },
    "police-simulator-career-20261012": {
      "title": "Career creation and district selection reached",
      "summary": "PPSA05831 v01.000.000: Startup, New Career and district confirmation work. Bright green output corrupts the main-menu background; flipped UI and recursive image copies obstruct shift selection. Street gameplay was not verified.",
      "imageAlt": "Police Simulator main menu with a severely corrupted green background"
    },
    "monster-boy-gameplay-20261012": {
      "title": "First controllable level reached",
      "summary": "PPSA02787 v01.000.004: New Game now saves and loads the first level after fixes to NGS2 port queries, keyboard taps and save services. Movement was verified; large black polygons remain.",
      "imageAlt": "Monster Boy first level with HUD, character, hut and black polygon defects"
    },
    "oxide-room-104-startup-20261011": {
      "title": "The autosave notice renders; later rendering hits shader and queue errors.",
      "summary": "PPSA07653 v01.000.000: Two launches pass linking. Automatic Cross reaches black output with FLAT addressing, IMAGE_BVH_INTERSECT_RAY, InvalidScalarCall and DMA_DATA rejection errors. A keyboard-only repeat displays the autosave notice. Gameplay is unverified.",
      "imageAlt": "Oxide Room 104 autosave notice with a white icon and Cross OK prompt on a dark red background"
    },
    "medieval-dynasty-startup-20261011": {
      "title": "The main menu renders, but its artwork and text are upside down.",
      "summary": "PPSA07933 v01.413.001: The existing runner reaches the main menu. The background, logo and option text are vertically inverted. Scripted Cross does not enter a level during this check; gameplay is unverified.",
      "imageAlt": "Medieval Dynasty main menu with vertically inverted snowy village artwork, logo and option text"
    },
    "charons-staircase-startup-20261011": {
      "title": "The illustrated introduction leads into the forest-road scene.",
      "summary": "PPSA06603 v01.000.000: The existing runner reaches the opening 3D forest road. A 32.342-second transition frame includes 26.810 seconds of graphics pipeline misses. The scene renders, but character control and playability are unverified.",
      "imageAlt": "Charon's Staircase opening forest road with dark trees, bright road lighting and lens flare"
    },
    "pac-man-world-re-pac-startup-20261011": {
      "title": "Opening movie and title screen reached; movie colors are incorrect.",
      "summary": "PPSA06399 v01.000.002: The existing runner passes Unity initialization and reaches the title and terms screens after the opening movie. The movie has severe color distortion. Automatic Cross cycles through startup screens; gameplay is unverified.",
      "imageAlt": "PAC-MAN WORLD Re-PAC title logo and Cross prompt over a dark island background"
    },
    "keywe-pthread-audio3d": {
      "title": "Thread cancellation state and Audio3d imports unblock startup",
      "summary": "Implemented per-thread cancellation state with previous-state output and argument validation, plus seven Audio3d APIs with owned PCM queues, position/gain and simultaneous stereo mixing. All 635 HLE tests pass. The game reaches save-slot selection, but a subsequent black screen remains unresolved. Full spatial audio and gameplay are not established. Development build.",
      "imageAlt": "KeyWe SAVE SLOT panel with three empty slots and Select/Delete prompts on a black background"
    },
    "super-woden-gp-pthread-cleanup": {
      "title": "Thread cleanup handlers unblock Unity startup",
      "summary": "Implemented __pthread_cleanup_push_imp and __pthread_cleanup_pop_imp with a separate LIFO list for each guest thread, using caller-owned storage. Pop removes an entry before invoking its callback; pthread_exit runs remaining handlers before TLS destructors. All 627 HLE tests pass. A third launch reaches the map menu with scripted Cross/Down input. The capture shows 71.8 FPS, but inverted labels and incorrect flag colors remain. Racing is untested. Development build.",
      "imageAlt": "Super Woden GP main map menu after the startup fix, with remaining inverted labels"
    },
    "arcade-spirits-pthread-semaphores": {
      "title": "Counted pthread semaphores unblock startup and the opening story",
      "summary": "Implemented scePthreadSemInit, Wait, Trywait, Post and Destroy on the shared semaphore store. Waits park and consume tokens; posting reserves a token before waking its recipient. Empty polling, overflow, stale handles and busy destruction return errors. All 625 HLE tests pass. The rebuilt, signed runner reaches the menu at a 252.9 FPS median over 30 readings; a repeat using automatic Cross advances into the opening video with readable subtitles. Manual controls, gameplay and audio quality remain unverified. Development build.",
      "imageAlt": "Arcade Spirits opening Fist of Discomfort 2 Pro Tour video with readable subtitles; window counter 200.3 FPS"
    },
    "arkanoid-fiber-startup": {
      "title": "Fiber startup fixed and large menu atlases restored",
      "summary": "Implemented sceFiberGetInfo, sceFiberRename, process-private pthread_mutexattr_setpshared and real fsync, shared by sceKernelFsync. Per-fiber firmware stacks prevent overflow; synchronized migration allows suspended loading jobs to resume on another worker. A separate 512 MiB sampled-image upload bound accepts the 16K BC7 menu atlases without raising framebuffer limits. All 623 HLE and 244 Vulkan tests pass; the rebuilt, signed runner reaches the title and mode menu in repeat launches. Menu median: 45.6 FPS over 30 samples. Gameplay remains unverified; this run uses a development build.",
      "imageAlt": "Restored Arkanoid: Eternal Battle title artwork and START prompt; window counter 138.0 FPS"
    },
    "raiden-iv-startup-depth": {
      "title": "Startup fixed; raw depth clears restore the first level",
      "summary": "The loader now separates library-version metadata from dynamic tables instead of reading an absent 39-byte segment. NGS2 file/rack queries and font-cache storage are implemented; packed 16-bit textures now upload with correct channel order. Publishing full raw depth-plane clears to Vulkan removes the black level. The final automatic-input run reaches the first level with shots and enemies visible. All 921 loader, HLE and Vulkan unit tests and two native GPU clear probes pass. This is a development build; ATRAC9 sampler playback, live-thread cancellation and full playability remain incomplete.",
      "imageAlt": "Raiden IV first level with the player ship firing, enemies, terrain and HUD; score 4090"
    },
    "dead-cells-level-menu-audio": {
      "title": "Blended scene composition and custom sampler audio restored",
      "summary": "A copy shortcut ignored blending and replaced the lit scene with a black emissive image. Restricting it to replace blending restores the level and character. The custom NGS2 sampler rack (0x4001) now accepts waveform format, blocks and pitch; the menu mix changes from silence to a peak near 0.12 of full scale. Listening has not yet confirmed the music. Seven starting-room counter readings span 59.2–68.1 FPS; combat, progression and saves were not tested.",
      "imageAlt": "Dead Cells in the Prisoners’ Quarters with the lit room, character, tutorial prompt and HUD"
    },
    "dead-cells-ngs2-link": {
      "title": "NGS2 audio functions let Dead Cells link and reach gameplay",
      "summary": "The October 11 development build implements eight libSceNgs2 functions Dead Cells needs to link: buffer-backed creation of the audio system and racks, and the 3D audio geometry helpers — listener basis, distance rolloff, cone, Doppler and speaker panning. Every observed call returns success. The main menu renders correctly, with 71–72 FPS on the window counter; gameplay shows the HUD and tutorial prompt, but the level and the character are dark. The main menu is silent, while gameplay is audible.",
      "imageAlt": "Dead Cells main menu with the Clean Cut Update title art"
    },
    "sarah-bounded-vertex-uploads": {
      "title": "Proven vertex ranges remove oversized sprite uploads",
      "summary": "The October 10 development build replaces oversized sprite-buffer copies with proven vertex ranges. Buffer uploads fall from about 78 MiB to 4.9 MiB per opening frame. Movement, jumping and the next platform screen are verified; the earlier completed-playthrough report remains on record. 60-second opening sample: 198.25 FPS median, 187.8–203.2 FPS. After waking: 197.25 FPS; next platform screen: 144.35 FPS (30 seconds each). These are window-counter samples on an RTX 3070 Ti with 1080p output and audio enabled; they do not establish a minimum across the entire game.",
      "imageAlt": "Dreaming Sarah opening forest after bounded vertex uploads"
    },
    "subnautica-acm-convolution": {
      "title": "ACM reverb fixes delayed and corrupted audio",
      "summary": "ACM now computes convolution reverb and rejects the invalid initial batch wait. Previously FMOD mixed unwritten output into its effects, producing crackle, NaNs and prolonged silence. Two fresh launches produce finite, nonzero PCM within 11–13 seconds; the maintainer confirms clear sound. The earlier Options explanation is withdrawn. All 606 HLE tests pass. Short scheduling dropouts, rendering defects and the 30 FPS target remain separate work.",
      "imageAlt": "Subnautica menu during the ACM convolution audio retest"
    },
    "asterix-msaa-depth-passes": {
      "title": "MSAA depth/stencil fix raises opening-forest FPS",
      "summary": "The October 9 development build preserves the sample count in depth/stencil-only passes, restoring stencil masks and removing four accidental full-frame readbacks per frame. Stationary opening-forest UI-counter medians rise from 46.45 to 162.20 FPS in 30-second samples on the RTX 3070 Ti at 1080p output. Movement and the first Roman encounter are rechecked. All 233 Vulkan tests and native 2×/4× probes pass. This is a shared renderer fix after 0.3.4, not a minimum across all levels or a new full playthrough.",
      "imageAlt": "Asterix in the opening forest with green HUD gauges after the MSAA depth/stencil fix"
    },
    "quake2-raw-pcm-audio": {
      "title": "Native PCM restores Quake II audio",
      "summary": "The October 9 development build handles the raw stereo PCM blocks, compact playback commands and 256-frame NGS2 grain used by Quake II. A 10-second attract-sequence loopback changes from complete silence to audible output with no fully silent 10 ms blocks. Full routing and effects remain incomplete; this is not a new playthrough or an FPS benchmark. All 602 HLE tests pass.",
      "imageAlt": "Quake II attract sequence during the native PCM audio retest"
    },
    "subnautica-audio-clock": {
      "title": "Audio clock corrected; menu audio and FPS checked",
      "summary": "Subnautica already produced native audio after title-screen confirmation. A depth-one queue clock error is now fixed. Separate 30-second menu samples read 14.4 FPS with output, 14.9 with output disabled and 15.2 after the clock fix; these are UI counters, not a controlled speedup claim. Longer recordings still contain short dropouts, so crackling is not fully resolved.",
      "imageAlt": "Subnautica menu during the audio-clock retest"
    },
    "asterix-watched-video-buffers": {
      "title": "Opening movie no longer stalls on reused video buffers",
      "summary": "The October 9 development fix restores startup with GPU page tracking enabled. The old reader wrote FFmpeg output directly into guest video pages that had become read-only after texture upload, so playback stalled on the third frame. Video and audio now use the existing host pipe buffer before publishing tracked guest writes. The retest passes the bumper and reaches gameplay. All 597 HLE tests pass. This fix postdates 0.3.4; the earlier confirmed playthrough grade is retained.",
      "imageAlt": "Asterix gameplay after the watched video-buffer startup fix"
    },
    "jets-independent-audio-streams": {
      "title": "Independent music and effects streams; audio retested",
      "summary": "A 20-second mission-menu loopback recording fell from 92.25% silent 10 ms blocks on 0.3.4 to zero with the fix. Two 13-second active combat intervals also had no silent blocks. Full recordings include silence at transitions and after player death. Separate host streams replace device handoffs, and recovery now wraps within the active PCM ring. All 596 HLE tests passed. This is a development fix after 0.3.4, not a new complete playthrough or a controlled FPS comparison.",
      "imageAlt": "Pirate Base combat during the October 9 audio retest"
    },
    "jurassic-font-atlas-startup": {
      "title": "Font-atlas startup fixed; first level reached",
      "summary": "Development commit a3d371e fixes the startup regression introduced by Font HLE. The collection requested U+007F while building its ImGui atlas; rejecting that missing character triggered the CalcGlyphInfo assertion and terminated CarbonMainThread, leaving other threads waiting on pending AGC commands. Missing characters now use the font's .notdef glyph. Both retest launches passed the failure point; the first level rendered and the map overlay responded to keyboard input. All 569 HLE tests passed, including complete Latin-1 atlas metrics and rendering checks. This record covers the startup and first-level retest.",
      "imageAlt": "Jurassic Park first level at the park gates after the font-atlas startup fix, rendered by PS5PCEM"
    },
    "yotei-cache-memory": {
      "title": "Post-tree bottlenecks and lower cache memory",
      "summary": "The repeat reaches the post-tree 3D cinematic, with incomplete lighting and character surfaces. The tree remains at 1.231 FPS; a later cinematic interval presents two frames in 30 seconds (0.067 FPS). One 198-second transition frame spends 177 seconds creating pipelines. Later frames also reload 1.4–2.6 GiB of textures. Shader variants now share canonical program bytes, and large Windows driver-cache snapshots use a temporary file mapping. A 256 MiB isolated snapshot test saves about 256 MiB of additional private memory and produces identical files. All 21 cache tests and three native Vulkan probes pass. These memory changes have no new game FPS measurement; character control remains unconfirmed.",
      "imageAlt": "Pause overlay over the incomplete post-tree cinematic"
    },
    "yotei-color-export-routing": {
      "title": "Color export masks and attachment routing",
      "summary": "The renderer now respects shader channel masks and routes compact color exports to the intended surfaces, including gaps between attachment slots. Six native Vulkan probes pass, checking retained pixels, mixed packing formats and pipeline reuse after a mask change. Active packed UNORM blending remains explicitly unsupported. Compiler experiments did not establish a useful speedup and were not enabled in the game. The repeat records 1.231 FPS at the tree and reaches the incomplete post-tree cinematic; character control is unconfirmed.",
      "imageAlt": ""
    },
    "yotei-runtime-image-tables": {
      "title": "Runtime texture tables and recovered disk cache",
      "summary": "Small indirect texture tables now keep descriptor addresses in runtime data, avoiding new pipelines solely for relocation or changed hash collisions. A native probe verifies three correctly rendered passes with one compilation; nine Vulkan checks pass. The live disk cache resumed saving after redundant probe-cache copies were removed. Save failures now report an error and retry while retaining the previous cache. No new game FPS gain or character control is confirmed; tree streaks, lighting defects and packed-color blending remain open. The repeat presents 37 frames in 30.049 seconds at Medium difficulty (1.231 FPS), matching the previous tree measurement.",
      "imageAlt": "Medium difficulty menu with runtime texture lookups; bright tree streaks remain"
    },
    "yotei-selected-flat-reads": {
      "title": "Fewer snapshot reads; lower compiler cost",
      "summary": "Bounded FLAT reads now select the matching buffer before loading data, preserving overlaps, unaligned addresses and fault reports. In a controlled shader replay, compilation falls from 46.55 to 39.36 seconds and peak private memory from 3.96 to 3.37 GB. A slower loop variant was discarded. Native Vulkan checks pass. These are compiler results, not game FPS; tree streaks, incomplete later rendering and unconfirmed character control remain. The installed runner records 37 frames in 30.046 seconds at the tree (1.231 FPS), with no demonstrated frame-rate improvement.",
      "imageAlt": "Tree at difficulty selection in the installed selected-FLAT runner; bright vertical streaks remain"
    },
    "yotei-compiler-memory-audit": {
      "title": "First-use shader compilation and memory pressure",
      "summary": "A live thread audit confirms driver compilation during the post-tree stall. The captured original compute module takes 59.47 seconds and peaks at 7.40 GB of private memory in an isolated probe. Reusing its saved cache entry takes 14 ms; the old cache is backed up for the next game repeat. Offline SPIR-V optimization does not materially improve this case. These are compiler measurements, not gameplay FPS. Tree streaks and incomplete later rendering remain, and character control is unconfirmed.",
      "imageAlt": ""
    },
    "yotei-compact-shader-analysis": {
      "title": "Less shader-cache memory; tree at 1.26 FPS",
      "summary": "Unused diagnostic shader IR is now released during decoded-stream execution. At the tree, 648 cached analyses retain zero bytes in those extra arrays; their original code and decoded instructions remain intact. The repeat presents 38 frames in 30.044 seconds (1.26 FPS), within the previous sample range, so no repeatable speedup is established. Five focused tests and native Vulkan image/material probes pass. Tree streaks remain and character control is unconfirmed. The local runner and matching PDB are updated with a backup.",
      "imageAlt": ""
    },
    "yotei-sparse-regions-repeat": {
      "title": "Tree repeat: 1.23 FPS, post-tree memory limit",
      "summary": "The updated local runner presents 37 frames in 30.043 seconds at the tree (1.23 FPS), with no demonstrated gain over the preceding 1.26 FPS sample. It reaches an incomplete 3D cinematic, with long first-use pipeline compilation and unsupported packed-color blending. The diagnostic guard stops the run after 1,158 seconds as system commit approaches its limit. Character control remains unconfirmed; the capture shows unresolved material and lighting defects.",
      "imageAlt": "Incomplete post-tree scene with missing material and lighting detail"
    },
    "yotei-sparse-material-regions": {
      "title": "Sparse material indices and smaller shaders",
      "summary": "The preceding tree repeat records 1.26 FPS; severe first-use stalls and dark post-tree rendering remain. Texture discovery now retains the possible masked indices instead of every intermediate record. Adjacent captured memory pages share one checked region. A native wide-table fragment is 22.8% smaller with the same pixel result; 12 memory-read cases and 26 sampler cases pass Vulkan validation. The game repeat is ongoing. A game FPS gain and character control are not yet confirmed.",
      "imageAlt": ""
    },
    "yotei-integer-material-flat-reads": {
      "title": "Integer material indices and checked memory reads",
      "summary": "The captured material table now resolves 84 valid 2D textures instead of 229 candidates containing false array images. The live run passes that lookup and exposes a later unsupported FLAT read. A new checked memory path passes ten Vulkan cases; 26 sampler cases also pass. The preceding tree repeat records 1.16 FPS, with no demonstrated speedup. First-use pipeline compilation and host memory pressure still cause severe stalls. Lighting defects remain and character control is unconfirmed.",
      "imageAlt": ""
    },
    "yotei-checked-material-samplers": {
      "title": "Material sampler recovered; severe post-tree stalls remain",
      "summary": "The combined sampler/cache repeat records 1.23 FPS at the tree and five frames in 60 seconds after it (0.083 FPS). A different cinematic interval prevents claiming a speedup. The original material rejection is passed; a later texture lookup in the same shader remains unsupported. Signed-index tests and 26 native Vulkan cases pass. Tree streaks, incomplete lighting and packed-color blending remain unresolved. Character control is not reached. The candidate stays isolated; the installed runner is unchanged.",
      "imageAlt": "Incomplete character surfaces after the tree in the material-pointer repeat"
    },

    "yotei-material-pointer-checks": {
      "title": "Tree repeat at 1.30 FPS; material-pointer recovery",
      "summary": "The content-generation repeat presents 39 frames in 30 seconds at the tree and only four in 60 seconds in the dark cinematic. Lighting and character geometry remain incomplete; character control is unconfirmed. A captured shader replay now resolves 60 texture descriptors. Ten native Vulkan cases verify sparse material tables and report an error when an active shader selects an unsupported record. Game validation of the new material fix is pending.",
      "imageAlt": "Incomplete characters in the dark post-tree cinematic"
    },
    "yotei-color-content-generations": {
      "title": "Packed color repeat; content-cache and memory fixes",
      "summary": "The packed UNORM candidate records 1.23 FPS at the tree. A later dark cinematic stalls at one frame in 60 seconds; this is not steady gameplay FPS. Lighting and geometry remain broken, and a blended color pass is unsupported. Further cache-generation and memory-batch fixes pass seven Vulkan probe groups and five kernel tests; their game benefit is not yet measured. Character control is unconfirmed.",
      "imageAlt": "Dark post-tree cinematic with unresolved lighting and geometry defects"
    },
    "yotei-color-transfer-memory": {
      "title": "Shared color transfers; tree repeat at 1.40 FPS",
      "summary": "The runner removes separate host readback buffers for color targets. Brightness and tree repeats each present 42 frames in 30 seconds, about 1.40 FPS versus 1.26 previously. Cache history differs, so this does not isolate the improvement. Tree streaks remain; the illustrated movie is reached, but character control is unconfirmed.",
      "imageAlt": "Tree difficulty screen; bright streaks remain"
    },
    "yotei-illustrated-movie-compilation": {
      "title": "Illustrated movie reached; compute compilation stalls",
      "summary": "The updated runner passes the tree and dark cinematic into the illustrated narrative movie. Character control is still unconfirmed. The tree repeat remains 1.26 FPS; the read-only texture reuse fix shows no additional game FPS gain. One later frame takes 239.4 seconds, including 234.9 seconds creating compute pipelines. A live texture-cache increase coincides with the scene change and proves no speedup. Lighting, streaks and a missing pixel-shader resource remain open.",
      "imageAlt": "Illustrated movie after the tree and dark cinematic; character control unconfirmed"
    },
    "yotei-post-tree-texture-reuse": {
      "title": "Post-tree cinematic: compilation and texture churn",
      "summary": "The combined build reaches a very dark cinematic after setup. One cold frame takes 59.3 seconds, including 35.4 seconds of graphics pipeline creation. Reducing caches to contain memory use causes several GiB of texture uploads per frame. A separate Vulkan regression verifies that read-only storage bindings no longer invalidate sampled textures. Gameplay FPS and character control are still unconfirmed; streaks and a missing pixel-shader resource remain.",
      "imageAlt": "Very dark cinematic after the tree; character control is not confirmed"
    },
    "yotei-array-layer-coherence": {
      "title": "Array-layer coherence: tree detail returns",
      "summary": "Restricting color-surface tracking to the selected slices prevents neighboring layers from invalidating GPU contents. Compatible sampled arrays now refresh dirty layers on the GPU. A 30-second tree interval records 1.23 FPS versus 1.03 in the control, with differing animation phases and cache history. Bark is visible again, but bright streaks remain. Loading beyond setup still reaches the host memory limit; character control is unconfirmed.",
      "imageAlt": "Tree bark and branches are visible; bright vertical streaks remain"
    },
    "yotei-candidate-visual-check": {
      "title": "Candidate check: tree smearing remains",
      "summary": "The third run measures 1.30 FPS at the tree with different cache budgets, but the image is more smeared. Restoring the render-target limit does not visibly fix it. The user closes the run during scene preparation; post-cinematic gameplay is not confirmed. This is not a verified FPS gain, and the installed runner remains the baseline pending a clean visual comparison.",
      "imageAlt": "Candidate check: tree smearing remains"
    },
    "yotei-post-tree-dynamic-state": {
      "title": "Tree measurements and graphics pipeline reuse",
      "summary": "Before the change, tree intervals measure 0.83–0.97 FPS. Two attempts to continue beyond the tree are deliberately stopped near the Windows commit limit. Dynamic depth bias and stencil references remove 61 redundant variants from a 1,007-pipeline snapshot; GPU probes pass. This is not a measured gameplay FPS gain, and the bright streaks remain.",
      "imageAlt": "Tree at difficulty selection, with vertical bright streaks still visible"
    },
    "little-nightmares-saves-performance": {
      "title": "Save/reload verified; 3.73–4.46 FPS in gameplay",
      "summary": "Save writes and file resizing now persist real payloads; restarting and Resume load the opening room. Shared HTILE and eager-readback changes, plus four copy workers, yield 4.46 FPS beside the suitcase and 3.73 FPS after movement in separate 30-second samples. The installed executable matches the measured build. 5 FPS, correct materials and reliable startup remain unresolved; the report records shader omissions and intermittent allocator failures.",
      "imageAlt": "Six beside the suitcase in the opening room; dark lighting and reflective material defects remain"
    },
    "little-nightmares-gameplay": {
      "title": "Opening gameplay reached; 2.16 FPS measured",
      "summary": "Native compute-ring consumption fixes the repeatable 510-frame stop. Deferred writes then expose a MallocBinned3 failure during New Game; a fresh eager-write run reaches interactive gameplay and presents 3,540 frames before an intentional stop. Two unpaused 30-second samples each present 65 frames: 2.16 FPS combined. The title profile selects eager writes automatically. Graphics defects and empty save files remain.",
      "imageAlt": "Six with her lighter in the opening room; materials and lighting remain incomplete"
    },
    "little-nightmares-startup": {
      "title": "Title screen restored after startup and descriptor fixes",
      "summary": "Resolved Trinity-mode and IPMI imports, native graphics-event changes and invalid dispatch dimensions. Correcting scalar BITSET restores the visible title and first-run UI. Two launches reach the title screen; gameplay and long-session stability remain unverified. A repeat exits after a 120-second render-thread wait during first-run setup; stability is not established.",
      "imageAlt": "Little Nightmares Enhanced Edition title and Press X prompt rendered by PS5PCEM"
    },
    "subnautica-performance-repeat-2": {
      "title": "Second fresh-process performance repeat",
      "summary": "Second fresh launch, same executable and Survival save: menu 15.50 FPS; two unpaused 30-second stationary world samples 12.70 and 8.50 FPS, 10.60 FPS combined. Output 1080p, Speed preset, warm caches. No ten-second stop in these intervals, but shorter delays remain. The previous launch averaged 9.52 FPS. This is run-to-run variation, not a new optimization; 30 FPS remains unmet.",
      "imageAlt": "Subnautica: Below Zero snowy crash site and survival HUD during the October 3 performance repeat"
    },
    "subnautica-performance-repeat": {
      "title": "Performance repeated on the current runner",
      "summary": "October 3 repeat, PPSA02457 v1.022.125: the installed runner restores the Survival save and renders the snowy crash site and HUD. This run measures the current build after the shared GTA III renderer changes; it adds no new emulator fixes. Main menu: 14.67 FPS. Two unpaused 30-second stationary world samples: 7.27 and 11.77 FPS; 9.52 FPS combined. The first includes a 9.998-second stall. Output 1080p, Speed preset, warm caches. The earlier valid sample was 7.93 FPS, but this is not a controlled speedup comparison. 30 FPS remains unmet.",
      "imageAlt": "Subnautica: Below Zero snowy crash site and survival HUD during the October 3 performance repeat"
    },
    "gta3-startup-reflections": {
      "title": "Movie completion and green reflection publication corrected",
      "summary": "The real launcher reaches the menu automatically in 139 seconds with both active emulator caches absent. Pending buffer and storage-image clears complete before newer reflection faces, removing the observed green wash and neon-green reflections. Live bounded uniform guards remove inactive resource references from both staging and SPIR-V. The tested opening scene reports zero draw/dispatch failures and unresolved storage bindings. Indexed resource checks and compact shader variant keys reduce repeated preparation work. A stationary opening sample records 8.27 FPS; 10 FPS remains unverified. Reported moving/duplicated shadows and one rejected vertex-only initialization draw remain under investigation.",
      "imageAlt": "GTA III opening gameplay from the updated installed runner after the startup and reflection fixes"
    },
    "gta3-renderer-performance": {
      "title": "Colors, reflections and resource preparation corrected",
      "summary": "The updated installed runner reaches Give Me Liberty with player control. Measured opening-position samples reach 8.10–8.97 FPS with Performance mode, Bloom and Motion Blur off and Classic Lighting on. Shared scalar walks, resident volume/mip copies and lower bookkeeping costs accompany the rendering fixes. The report records settings, slower samples and test limits; full playability is not established.",
      "imageAlt": "GTA III player and car at Callahan Bridge after the color and reflection fixes"
    },
    "gta3-ngg-gameplay": {
      "title": "NGG exports corrected; opening gameplay and movement verified",
      "summary": "The installed runner reaches Give Me Liberty with visible geometry, the player, vehicle, HUD and minimap. W moves the player and D changes his direction. A shared NGG export fix restores all 32 color-grading layers. A world sample measures 0.97 FPS; severe green overexposure, missing resources and intermittent crashes or timeouts remain.",
      "imageAlt": "GTA III player running toward a car at Callahan Bridge, with the HUD and severe green overexposure"
    },
    "gta3-ampr-startup": {
      "title": "AMPR imports resolved; policy screen reached",
      "summary": "October 2 development build, PPSA03527 v1.007: resolving 13 missing AMPR imports lets the extracted game start. Two fresh processes reach the readable policy screen after Cross input advances an initial blank stage. The policy screen shows about 30 FPS. Gameplay performance has not been measured. Gameplay, saves and audio correctness are unverified. Shader diagnostics and incomplete wait/counter emulation remain.",
      "imageAlt": "GTA III Rockstar Games Policies and Terms screen rendered by PS5PCEM"
    },
    "gta3-pkg-extraction": {
      "title": "NAPS alignment fixed; package fully extracted",
      "summary": "The extractor now writes all 48 files, including eboot.bin, six modules and two PAK archives. Both PAK index checksums match and all 21 package tests pass. This was an extraction check; the startup result is recorded separately."
    },
    // Subnautica: Below Zero
    "subnautica-startup": {
      title: "Startup crash traced to a misread shader header",
      summary:
        "Early runs stopped dead at the same guest address. Unity's shader reader had taken four bytes of mesh data as a signed string length and written a terminator into unmapped memory. Fixing the file descriptor behaviour behind it got the title past startup.",
    },
    "subnautica-menu-missing": {
      title: "The menu was missing because audio initialisation stalled",
      summary:
        "The animated background was already running, but no menu appeared: the platform initialisation coroutine had stopped inside FMOD, leaving the services the start screen waits for null forever. These were the last 4K-era measurements before the switch to native 1080p.",
      imageAlt:
        "Subnautica: Below Zero title screen without its menu, rendered by PS5PCEM",
    },
    "subnautica-native-1080p": {
      title: "Native 1080p output and cheaper resource preparation",
      summary:
        "Presentation moved to native 1920×1080 and the shared graphics path stopped copying decoded instruction structures around during resource preparation and scalar interpretation. Play, Options and Credits are readable; water and lighting artifacts remain.",
      imageAlt:
        "Subnautica: Below Zero menu at native 1080p, rendered by PS5PCEM",
    },
    "subnautica-menu-performance": {
      title: "A run of CPU-side reductions across the shared draw path",
      summary:
        "Index staging, pipeline lookup, scalar register snapshots, queue probing and scratch initialisation were each made cheaper, all without any title-specific condition. The menu settled at roughly 17 FPS — still well short of the 30 FPS target.",
      imageAlt:
        "Subnautica: Below Zero menu from the measured development build, rendered by PS5PCEM",
    },
    "subnautica-new-game": {
      "title": "New Game reaches the opening world",
      "summary": "October 1 development build, PPSA02457 v1.022.125: Survival passes loading and the intro, then renders the snowy crash site and HUD. Fixes protect CPU memory from stale GPU writeback, retire released storage buffers and preserve colour during depth-only draws. RG32F attachments, mip views and D16 shadow bias are supported. This validation did not include a full playthrough, save recovery or audio correctness.",
      "imageAlt": "Subnautica: Below Zero snowy opening area with the survival HUD, captured from PS5PCEM"
    },
    "subnautica-lighting-baseline": {
      "title": "Lighting baseline: loading is still intermittent",
      "summary": "Three additional runs of the previous build failed during loading or the world transition, after two earlier runs had reached gameplay. A worker can stop while audio continues and the window stays black. The old log also confirms a 1×1 mip incorrectly refreshing the 512×512 base texture. These failures are recorded separately from the earlier successful run; stable loading is not yet established."
    },
    "subnautica-colour-mips": {
      "title": "Colour mip sampling corrected on the GPU",
      "summary": "Resident texture lookup now keeps mip levels and array slices distinct. Complete colour pyramids can be assembled on the GPU. A six-level RG32F probe verifies each level, a same-frame rewrite and sampling without extra target readbacks or texture uploads; 128 focused tests pass. The game candidate still faults during loading, including diagnostic synchronous and 8192-entry-cache runs. A world FPS gain and the final lighting result remain unverified."
    },
    "subnautica-windows-stack": {
      "title": "Windows stack bounds fix diagnostic-output startup failure",
      "summary": "A standalone reproduction exited with 0x40010006 when Windows debug output ran on the firmware stack. The stack switch now updates Windows bounds, and guest escapes restore the enclosing HLE state. ANSI/Unicode output, 8 stack tests and 9 native bridge tests pass. The installed build starts without a debugger or a temporary-directory override and restores the save. Unpaused gameplay records 7.93 FPS over 30.02 seconds. This is not a controlled performance comparison; 30 FPS, complete rendering correctness and long-session stability remain unverified.",
      "imageAlt": "Subnautica: Below Zero — Windows stack-boundary fix, 2026-10-02"
    },
    "subnautica-resource-scratch": {
      "title": "Less resource preparation overhead; stencil warning located",
      "summary": "Large indirect-image tables no longer occupy ordinary draw/dispatch stacks. Scalar pointer recovery reuses an immutable register snapshot and initializes only the eligible bitmap range. 72 scalar/resource tests and targeted Vulkan probes pass. A fresh process restores the save and records 11.96 FPS over 30.01 seconds in unpaused gameplay. Different weather and warm-up prevent a controlled speedup claim; 30 FPS remains unmet. A bounded trace locates the remaining scalar-resource warning in a stencil-only draw with colour writes disabled. Full rendering correctness and long-session stability remain unverified. A separate trace finds repeated 4 MiB mappings holding the memory lock. Reusing physical page commitment and removing duplicate native queries reduces the mapping microbenchmark median by 18%; a gameplay gain is not established.",
      "imageAlt": "Subnautica: Below Zero — resource preparation build, 2026-10-02"
    },
    "subnautica-descriptor-unmap": {
      "title": "Descriptor workspace reuse and safer failed unmaps",
      "summary": "Sampled-image descriptor updates reuse temporary arrays, reducing their stack frame from 753,720 to 56 bytes without changing the Vulkan batch. A separate regression fixes unmap failures that left removed native pages marked readable. 154 renderer/index, 29 memory and 60 submission tests pass, along with Vulkan checks including 4352 mixed texture views. The first fresh load restores the saved world; a stationary unpaused sample records 12.03 FPS over 30.01 seconds. Different weather and warm-up prevent a controlled speedup claim. One scalar resource remains unresolved. 30 FPS, reliable loading and a full playthrough are not verified.",
      "imageAlt": "Subnautica: Below Zero — unpaused 12.03 FPS sample, 2026-10-02"
    },
    "subnautica-read-lease": {
      "title": "Smaller draw stack and protected guest reads",
      "summary": "Reusable scalar storage reduces the draw function stack from 447,424 to 32,640 bytes. A further loading crash in hashing exposed a check-to-read race: GPU input copies and hashes now hold the mapping until they finish. A concurrent-unmap regression passes, along with 34 memory/lifetime/index tests and 60 submission tests. The first follow-up restores the saved world and measures 8.63 FPS over 30.01 seconds without pausing. Different weather and warm-up prevent a direct comparison with the earlier 10.00 FPS sample. One shader resource remains unresolved; 30 FPS and long-session stability are still unverified. A fresh repeat with the same executable still crashes during loading in hash + 0xf0. The protected-read regression is valid, but this observed crash is not fixed; the failing caller is under investigation.",
      "imageAlt": "Subnautica: Below Zero — guest read lease build, 2026-10-02"
    },
    "subnautica-overlap-world": {
      "title": "Second save recovery and buffer overlap measurements",
      "summary": "A fresh process restores the same saved world again after the buffer ownership fix. Bounded overlap queries replace full scans without changing writer order or the 4096-entry cache limit. One paused ABBA comparison gives 11.93–12.23 FPS for linear scans and 12.30–12.43 for indexed scans; this small difference is not a proven general gain. A separate unpaused, fixed-camera sample records 300 flips in 30.01 seconds: 10.00 FPS, with changing weather and frost. 154 backend/index tests and five targeted Vulkan checks pass. 30 FPS, long-session stability and complete rendering correctness remain open.",
      "imageAlt": "Subnautica: Below Zero — unpaused world, 2026-10-02"
    },
    "subnautica-save-recovery": {
      "title": "Saved world loads after buffer ownership correction",
      "summary": "A traced 6 MiB GPU readback overlapped a corrupted game object during loading. Buffer caches now track mapping ownership so a new allocation at an old address cannot receive a retired result. The first follow-up restores the saved snowy world and responds to walking input. This is one successful recovery, not proof of long-session stability. 29 memory/retirement tests, 60 submission tests and four targeted Vulkan probes pass. Increasing cache capacity alone measured 9.93 to 9.10 FPS in the same paused scene; the default remains unchanged. 30 FPS is still unmet.",
      "imageAlt": "Subnautica: Below Zero — recovered world, 2026-10-02"
    },
    "subnautica-save-metadata": {
      "title": "Save writes and metadata corrected; world reload still fails",
      "summary": "Normal Save now writes a 213,388-byte archive, commits it and returns to gameplay. A fresh process recognizes the slot with the correct date and duration, without the damaged-save label. Shared fixes cover POSIX file writes and the complete save-parameter structure; 52 save/filesystem tests pass. Restoring the world still encounters memory corruption, so reliable save recovery is not claimed. A separate released-command-arena check passes 60 submission tests; its connection to the loading failure is unproven."
    },
    "subnautica-vector-walk": {
      "title": "Cheaper CPU shader walks; world sample remains at 7 FPS",
      "summary": "CPU resource walks bypass vector-only interpretation while retaining dependency checks and GPU instructions. A separate correction invalidates both words of vector mask outputs. All 71 scalar tests and nine GPU probes pass. Isolated walks take 15–36% less time; the latest 30-second world sample records 7.00 FPS, without a controlled before/after gain. Copying, resource preparation and submissions remain expensive. Keyboard input now follows foreground focus. Loading corruption, one unresolved binding and the 30 FPS target remain open.",
      "imageAlt": "Subnautica: Below Zero — 1920×1080 gameplay, 2026-10-02"
    },
    "subnautica-srgb-spans": {
      "title": "sRGB colour writes corrected; mip checks reuse their ranges",
      "summary": "The captured G-buffer and final output requested sRGB but used UNORM attachments, darkening colours when read back as sRGB. The renderer now encodes colour writes and preserves encoded bytes during display transfer. A GPU regression verifies sampling, alpha and scanout, including Vulkan validation; 129 focused tests pass. Mip backing checks also retain their calculated byte ranges. See the report for live runs and remaining limits. The new run reaches the snowy world with visibly brighter materials and records 9.49 FPS over 30.05 seconds (baseline: 9.13 FPS). Different weather and effects prevent a controlled speedup claim; 30 FPS, the unresolved scalar binding and intermittent loading failures remain open.",
      "imageAlt": "Subnautica Below Zero snowy crash site and survival HUD after correcting sRGB colour writes"
    },
    "subnautica-mip-coherence": {
      "title": "Tracked mip memory: repeated transfers removed",
      "summary": "A real-game trace found ten RG32F mip readbacks per frame (2730 KiB) followed by repeated uploads. Shared-memory validation now distinguishes a verified GPU publication from a CPU replacement. All four Vulkan cases with linear/packed mips and memory tracking pass, alongside 129 focused tests. In the new game run, menu render-target uploads and readbacks fall to zero and the ten-level pyramid stays on the GPU. Dark lighting, intermittent loading failures and the 30 FPS target remain open. The candidate reaches the snowy world; a 30.01-second stationary sample records 260 flips (8.66 FPS), so an overall FPS gain is not established.",
      "imageAlt": "Subnautica: Below Zero snowy crash site and HUD after the mip-coherence fix; dark lighting remains"
    },

    // Ghost of Yōtei
    "yotei-intro-video": {
      title: "The intro video decodes and plays",
      summary:
        "H.264 access units handed to the guest video library are now decoded on the host, converted from NV12 with BT.709 coefficients, and paced at about one picture per display interval so a title feeding frames as fast as they are accepted no longer burns through a whole movie in seconds. The in-engine frame behind the video was still black, so this was a playback milestone only.",
      imageAlt:
        "A Ghost of Yōtei intro frame decoded and presented by PS5PCEM",
    },
    "yotei-bonus-notices": {
      title: "Through the intro to the bonus notices and brightness calibration",
      summary:
        "Intro playback became continuous at roughly the stream's native 30 FPS, and the run advanced through streamed menu resources into the loading indicator, the Digital Deluxe Bonus, Gift of the Northern Star and Pre-order Bonus notices, and brightness calibration — wolf image, instructions, slider and confirmation glyph all readable.",
      imageAlt:
        "Ghost of Yōtei brightness calibration screen with the wolf image, rendered by PS5PCEM",
    },
    "yotei-difficulty": {
      title: "Difficulty selection renders over a loaded 3D scene",
      summary:
        "Menu composition reached difficulty selection drawn over real 3D geometry, with trees and parts of the background visible and menu music playing. Getting there took several minutes of intro and scene loading, and frames arrived at 0.6 FPS.",
      imageAlt:
        "Ghost of Yōtei difficulty selection over a loaded 3D scene, rendered by PS5PCEM",
    },
    "yotei-tree-scene": {
      title: "Movie audio works and later 3D scenes appear",
      summary:
        "Intro movies gained sound, starting in step with the audio track rather than staying silent, after multichannel ATRAC9 was decoded as interleaved mono streams across layouts from 2 to 36 channels. The run reached later 3D scenes including the tree scene, at 0.73 FPS, and the following loading sequence lost the Vulkan device.",
      imageAlt: "Ghost of Yōtei tree scene rendered by PS5PCEM",
    },
    "yotei-command-writes": {
      title: "Command-processor writes survive deferred readback",
      summary:
        "An explicit command-processor write inside a cached storage buffer could be lost when an older GPU result was published over it, because the flush path only matched a buffer's base address. Indexing overlapping buffers and publishing only proven write ranges fixed the resulting header corruption.",
      imageAlt:
        "Ghost of Yōtei tree scene after the command-write corrections, rendered by PS5PCEM",
    },
    "yotei-null-images": {
      title: "All-zero textures treated as unbound, and faster descriptor recovery",
      summary:
        "Textures proven to be entirely zero now use unbound-image semantics instead of rejecting the shader, and scalar descriptor recovery reuses intermediate values within a call — a nested fixture dropped from 504 reads to 18 and ran about 4.6× faster in isolation. Two checks of the installed runner still stalled awaiting GPU completion before the tree scene and were stopped deliberately after diagnostics.",
      imageAlt:
        "Ghost of Yōtei Digital Deluxe Bonus notice before the October 1 GPU wait, rendered by PS5PCEM",
    },

    // Big Helmet Heroes
    "bhh-startup": {
      title: "An indefinite wait during loading, fixed",
      summary:
        "The title could stop on its first black frame or part-way through resource loading while its process and audio threads stayed alive: the loading thread waited forever after a file read returned an I/O error. Handling GPU-watched file reads correctly cleared the stall.",
      imageAlt:
        "Big Helmet Heroes main menu after the startup fix, rendered by PS5PCEM",
    },
    "bhh-menu": {
      title: "A correct main menu, and where the time goes",
      summary:
        "With Gen5 single-sample texture addressing, layered render targets and scanout channel order corrected, the menu renders properly with its character models, textures and lighting. Profiling put the cost in the host graphics backend — resource preparation, guest-to-Vulkan copies and synchronisation — rather than in pipeline compilation.",
      imageAlt:
        "Big Helmet Heroes main menu with character models and lighting, rendered by PS5PCEM",
    },
    "bhh-copies": {
      title: "Wider tile copies, cheaper eviction and grouped page watches",
      summary:
        "The layout converter now copies a full 16-byte horizontal run whenever its address equation proves those bytes are contiguous, instead of moving one pixel at a time. Buffer-cache eviction stopped scanning all 4,096 entries, adjacent guest pages are watched in groups, and completed Vulkan buffers are recycled.",
      imageAlt:
        "Big Helmet Heroes tutorial scene after the copy optimisations, rendered by PS5PCEM",
    },
    "bhh-menu-performance-20261010": {
      title: "Less transfer work, with the grass preserved",
      summary: "October 10 menu check: 9.4 FPS median (9.0–9.5) over 45 seconds, versus 4.9 FPS before. Resource coherence fixes, bounded GPU readbacks, volume reuse and asynchronous batching reduce repeated work. An intermediate stencil-discard regression was removed and dense grass is visible again. Sampled failure counters are zero; stable 15 FPS and universal rendering correctness remain unverified.",
      imageAlt: "Big Helmet Heroes main menu with character models, readable labels and dense orange grass",
    },
    "bhh-scalar-history": {
      title: "Scalar bookkeeping trimmed, with no frame-rate gain to show",
      summary:
        "Resource checkpoints stopped carrying unused scalar-load history, and full scalar analysis avoids redundant scans on forward visits. Isolated fixtures got 9–45% cheaper, but matched game samples were effectively unchanged — 157 ms in the menu against 154.5 ms in the control — and the report says so plainly.",
      imageAlt:
        "Big Helmet Heroes tutorial after the scalar-load bookkeeping change, rendered by PS5PCEM",
    },

    // Quake II
    "quake-playable": {
      title: "Playable and completable",
      summary:
        "The maintainer confirmed a full playthrough. The work behind it covered startup imports and directory listings, deferred G-buffer writes, depth comparison samplers, and the typed buffer reads that model vertices and lighting data depend on. Missing NPC geometry came back.",
      imageAlt: "Quake II title screen rendered by PS5PCEM",
    },
    "quake-rendering": {
      title: "Rendering rechecked, with peaks of 60–70 FPS",
      summary:
        "A recheck as PPSA09477 v1.003 found level lighting, textures, weapons and NPCs all visible, resolving the earlier dark-world and missing-model reports. Buffer reuse and GPU clears reduced transfer overhead; lighter scenes peak at 60–70 FPS while busy combat stays slower.",
      imageAlt:
        "Quake II gameplay with a lit level, visible enemies and the player's weapon, rendered by PS5PCEM",
    },

    // Tetris Effect
    "tetris-first-render": {
      title: "The first recognisable frame out of the startup graph",
      summary:
        "595 guest draws and 63 compute dispatches completed without a rejected draw, producing the first recognisable particle frame. Because the registered 4K output target was still black, presentation fell back to converting a 1920×1080 intermediate — an early rendering milestone, not a menu.",
      imageAlt:
        "The first recognisable Tetris Effect particle frame rendered by PS5PCEM",
    },
    "tetris-license-journey": {
      title: "License screen and Journey Mode selection, several times faster",
      summary:
        "A translated composite replaced the speculative 4K overrides, and publishing linear metadata fills removed the duplicated interface and vertical seam. Median license frames fell from 235 ms to 159 ms, and sampled Journey frames from 1127–1276 ms to 318–396 ms. Dark UI elements and a guest decoder fault remain.",
    },

    // Rita's Rewind
    "rita-intro-menu": {
      title: "Publisher intro, title menu and the scene behind it",
      summary:
        "The title settled into a stable 1920×1080 graphics and audio loop and rendered its animated publisher sequence, title menu and post-menu scene. The scene comes from a real 480×270 guest target carried through the CRT and post-processing chain, which replaced the former full-screen static.",
      imageAlt:
        "Mighty Morphin Power Rangers: Rita's Rewind publisher intro rendered by PS5PCEM",
    },
    "rita-playable": {
      title: "Playable and completable",
      summary:
        "The maintainer confirmed a full playthrough on September 24. The capture shows the Red Ranger in the Command Center training stage with HUD, health bar, objectives and button prompts, all responding to controller input. The narrowly matched CRT scaling fallback is still needed on the reference host.",
      imageAlt:
        "Rita's Rewind gameplay with the Red Ranger in the Command Center, rendered by PS5PCEM",
    },

    // Jets 'n' Guns 2
    "jets-tutorial": {
      title: "START GAME reaches 4K tutorial gameplay",
      summary:
        "Title content resolved, AGC resource registration completed, and the full graphics, compute and output loop sustained. START GAME got past the loading screen into recognisable 3840×2160 tutorial gameplay, and an unattended run stayed live past flip 300.",
      imageAlt:
        "Jets 'n' Guns 2 tutorial gameplay rendered by PS5PCEM",
    },
    "jets-playable": {
      title: "Playable and completable",
      summary:
        "The maintainer confirmed a full playthrough. Levels, HUD, score, enemies and the parallax scene all render correctly. Profiling a 70 ms frame found 18 ms waiting on the GPU across 33 submissions, 11 ms on resource checkpoints and 13 ms staging 894 guest buffers.",
      imageAlt:
        "Jets 'n' Guns 2 gameplay with the player ship, HUD and score, rendered by PS5PCEM",
    },
    "jets-audio": {
      title: "Audio stops tearing itself down",
      summary:
        "Two active output ports had been competing for the host audio device, tearing down the mix and reopening the device several times per frame. Release 0.3.2 fixed the routing; the existing playable and completable status was unaffected.",
    },

    // Cat Quest III
    "cat-quest-render-fixes": {
      title: "An upside-down world, corrupted text and swapped colours, all fixed",
      summary:
        "The world rendered upside down while the UI did not; fragment coverage and stencil-only passes corrupted menu text; the original AGC interpolant-mapping interface was missing, so adventure artwork and scenery used the wrong vertex-to-fragment exports; and registered scanout formats were ignored, swapping red and blue. All four were corrected.",
      imageAlt:
        "Cat Quest III language list with readable text clipped inside its panel, rendered by PS5PCEM",
    },
    "cat-quest-playable": {
      title: "Playable and completable",
      summary:
        "The maintainer confirmed a full playthrough. Alongside it, shader-translation work per sampled frame dropped from about 40 ms to 7 ms and buffer uploads from roughly 125 MiB to 65–75 MiB, moving the opening island from about 148 ms to a 124 ms median.",
      imageAlt:
        "Cat Quest III island gameplay with the HUD, mountains and blue sea, rendered by PS5PCEM",
    },

    // Single-run entries
    "precinct-title-menu": {
      title: "Both intro movies, the title menu, and a first gameplay frame",
      summary:
        "The six-image guest graph linked, Unity plug-ins started, and both intro movies played as synchronised 4K video with stereo sound before the title artwork and a readable NEW GAME confirmation appeared. An earlier guarded run reached the Cross prompt and produced the first verified in-engine gameplay image.",
      imageAlt:
        "The Precinct title menu with the NEW GAME confirmation, rendered by PS5PCEM",
    },
    "sarah-playable": {
      title: "Playable and completable at the frame cap",
      summary:
        "A confirmed playthrough, with the title menu and first scene holding the 60 FPS cap — 5,280 flips over 90 seconds. Loading first required restoring eboot.bin and sce_module/libc.prx from backups the copy's own eboot patcher had left behind after truncating both.",
      imageAlt:
        "Dreaming Sarah forest scene with an NPC, rendered by PS5PCEM",
    },
    "terminator-playable": {
      title: "Playable and completable",
      summary:
        "Completed with nothing reported wrong. Backgrounds, characters, HUD, textures and colours are all correct, and warmed-up startup frames measure 22–65 ms. Texture alpha, channel swizzles and sRGB sampling preserve the intended colour balance.",
      imageAlt:
        "Terminator 2D gameplay with the player character, HUD and desert scene, rendered by PS5PCEM",
    },
    "asterix-playable": {
      title: "Playable and completable",
      summary:
        "A confirmed playthrough at 28–31 ms per frame, with a 3,000-flip development run free of rejected submissions. The fullscreen composite stays GPU-resident, and scanout preserves the guest viewport's orientation without a host-memory round trip.",
      imageAlt:
        "Asterix & Obelix: Slap Them All! gameplay with the HUD and a GO sign, rendered by PS5PCEM",
    },
    "jurassic-playable": {
      title: "Playable and completable",
      summary:
        "A confirmed playthrough. Startup rendering was restored along with the title logo, confirmation prompt, collection cover art and animated preview. Cycling previews repeatedly can still exhaust a media handle pool, after which later previews freeze.",
      imageAlt:
        "Jurassic Park Classic Games Collection selection screen with cover art, rendered by PS5PCEM",
    },
    "reanimal-title-menu": {
      title: "An animated 4K title menu, missing its labels",
      summary:
        "Native and firmware modules resolved, the company-logo sequence played, and the animated 3840×2160 title menu sustained with its buoy background, title logo, water highlights and SELECT prompt visible. The central option labels are still only small red marks, so navigation was never verified.",
      imageAlt:
        "REANIMAL animated title menu with incomplete option labels, rendered by PS5PCEM",
    },
    "propagation-bootstrap": {
      title: "Unreal bootstrap through to the first submission",
      summary:
        "The 8.8 GiB package mounted, ICU and configuration bootstrap completed, the cooked global shader archive opened, AGC shaders were created, and the first command buffer was submitted. The run predates the current synchronisation packet constructors and needs repeating.",
    },
    "pistol-whip-modules": {
      title: "VR modules map, Unity archives start loading",
      summary:
        "The native PS VR2 plugin and the Burst module both mapped, and the title began loading its Unity asset archives. Progress beyond that waits on headset, tracking and host OpenXR support, which the project has deliberately deferred.",
    },
  },
};

export default content;
