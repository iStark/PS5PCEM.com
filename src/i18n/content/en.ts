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
      "headline": "Corrected colors and reflections in GTA III gameplay.",
      "summary": "October 3 development build, PPSA03527 v1.007: Give Me Liberty renders the player, vehicle, bridge, HUD and minimap. Fixes address green overexposure and incomplete reflection mips. Shared resource analysis and GPU-resident textures reduce repeated CPU work and transfers.",
      "strengths": [
        "New Game advances through the intro into the opening mission.",
        "Keyboard movement and a change of direction are verified."
      ],
      "limits": [
        "Rendering imperfections and unresolved resource diagnostics remain.",
        "Reliable startup, saves, audio correctness and completion remain unverified."
      ],
      "performance": "8.10–8.97 FPS at the opening position (two 30-second samples; 8.53 FPS combined). Seated car: 7.20 FPS; wider city view after driving: 3.57 FPS. Performance mode, Bloom/Motion Blur off, Classic Lighting on. Output 1080p; internal resolution is game-controlled. Not an 8 FPS minimum throughout gameplay.",
      "imageAlt": "GTA III player and car at Callahan Bridge after the color and reflection fixes"
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
      performance: "Gameplay typically measures 28–31 ms per frame.",
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
      headline: "Finished, and the opening runs at the 60 FPS cap.",
      summary:
        "Confirmed playable on September 15, 2026. Menus, the animated title, world scenes, characters and NPCs all render correctly, and the first scene holds the frame cap on the reference host.",
      strengths: [
        "Complete playthrough confirmed by the maintainer.",
        "Title menu and first scene hold the 60 FPS cap — 5,280 flips over 90 seconds.",
        "Animated title, world scenes and NPCs all draw correctly.",
      ],
      limits: [
        "The maintainer reports frame rate dropping in the second gameplay scene, which has not been measured.",
        "Loading needed eboot.bin and sce_module/libc.prx restored from the backups left by the copy's own eboot patcher, which had truncated both.",
      ],
      performance:
        "The title menu and first scene hold 60 FPS, measured as 5,280 flips across 90 seconds.",
      imageAlt:
        "Dreaming Sarah forest scene with an NPC, rendered by PS5PCEM",
    },

    "jurassic-park-classic-games-collection": {
      status: "Playable · Completable",
      headline: "Finished, including the intro, animated title and collection menu.",
      summary:
        "A confirmed playthrough. The intro, animated title and collection selection all work, with cover art, navigation arrows and an animated preview. Performance depends on which collection game is running.",
      strengths: [
        "Complete playthrough confirmed by the maintainer.",
        "Collection selection shows cover art, navigation arrows and an animated preview.",
        "Startup rendering, title logo and confirmation prompt are all correct.",
      ],
      limits: [
        "Cycling preview videos repeatedly can exhaust an AvPlayer handle pool, after which later previews freeze.",
        "Frame cost varies by collection game and by hardware.",
      ],
      performance:
        "Earlier title and selection frames sampled at roughly 27 and 33 ms.",
      imageAlt:
        "Jurassic Park Classic Games Collection game selection with cover art, rendered by PS5PCEM",
    },

    "jets-n-guns-2": {
      status: "Playable · Completable",
      headline: "Finished, with levels, HUD, score and parallax scene all correct.",
      summary:
        "Confirmed playable on September 15, 2026. Levels, HUD, score, enemies and the parallax background render correctly in the captured gameplay. Frame cost is dominated by GPU waits and by staging a large number of guest buffers each frame.",
      strengths: [
        "Complete playthrough confirmed by the maintainer.",
        "Levels, HUD, score, enemies and parallax layers all draw correctly.",
        "Audio no longer thrashes: release 0.3.2 stopped two output ports competing for the host device.",
      ],
      limits: [
        "Frame cost is still dominated by synchronous GPU waits and buffer staging.",
      ],
      performance:
        "Frames measure 70–92 ms, about 11–14 FPS. In a 70 ms frame, 18 ms waits on the GPU across 33 submissions, 11 ms prepares resource checkpoints, and 13 ms stages 894 distinct guest buffers totalling 15 MiB.",
      imageAlt:
        "Jets 'n' Guns 2 gameplay with the player ship, HUD and score, rendered by PS5PCEM",
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
        "This is the project's hardest test case and its most documented one. Intro movies play with sound, the bonus notices and brightness calibration appear, and later 3D scenes including the tree scene reach the screen. None of that is playable: scene frames arrive at well under 1 FPS, and a complete playthrough is not claimed.",
      strengths: [
        "Intro movies play at roughly their native 30 FPS, with audio starting in step with the track.",
        "The loading indicator, bonus notices and the brightness calibration screen with its wolf image, slider and prompt all render.",
        "Later 3D scenes, including the tree scene, reach the screen with menu music audible.",
      ],
      limits: [
        "Gameplay — moving a character through a loaded world — remains unverified.",
        "Scene preparation is extremely slow, and a transition frame was measured at 167.2 s, of which 164.8 s created 206 compute pipelines.",
        "Two recent checks stalled awaiting GPU completion before the tree scene and were terminated deliberately after diagnostics.",
        "Invalid indirect draws, a corrupt-count failure, streaking and excessive brightness are all still open.",
      ],
      performance:
        "October 3 baseline tree measurements before the dynamic-state change: 0.83–0.97 FPS over 30-second presentation-counter intervals. The earlier 0.73 FPS result is historical. These are tree/setup measurements, not post-cinematic gameplay. Different cache histories prevent a controlled before/after comparison.",
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
        "30 FPS has not been reached.",
      ],
      performance:
        "Matched menu samples measure 157 ms, about 6.37 FPS; tutorial samples measure 270 ms, about 3.70 FPS. The most recent bookkeeping change showed no demonstrable game frame-rate gain.",
      imageAlt:
        "Big Helmet Heroes tutorial scene rendered by PS5PCEM",
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
