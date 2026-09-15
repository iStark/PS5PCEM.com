/**
 * Subsystem-by-subsystem state, condensed from docs/implementation-status.md
 * in the PS5PCEM repository.
 */

export type SubsystemState = "working" | "partial" | "deferred";

export type Subsystem = {
  id: string;
  name: string;
  state: SubsystemState;
  summary: string;
  details: string[];
};

export const subsystemStateLabel: Record<SubsystemState, string> = {
  working: "Working",
  partial: "Partial",
  deferred: "Deferred",
};

export const subsystems: Subsystem[] = [
  {
    id: "cpu",
    name: "Guest execution",
    state: "working",
    summary:
      "Native x86-64 guest execution on Windows, with ELF/SELF loading, relocation, module linking and TLS.",
    details: [
      "ELF and SELF loading, relocation, module linking, TLS and firmware HLE.",
      "Contained-fault diagnostics keep a faulting guest thread from taking down the host.",
      "Native cooperative fibers retain suspended guest stacks across switches.",
      "Inspection, decoding and HLE components also build on Linux and macOS; native execution is Windows-only.",
    ],
  },
  {
    id: "gpu",
    name: "AGC command stream",
    state: "partial",
    summary:
      "Stateful AGC command-stream execution drives graphics, compute and VideoOut work.",
    details: [
      "Ordered AGC completion acknowledgement removes intermittent retirement races.",
      "Guest image allocations share a range-based alias registry across colour, depth/stencil, storage and sampled use.",
      "Descriptor recovery no longer replays each kernel's prolog once per resource it names.",
    ],
  },
  {
    id: "shaders",
    name: "RDNA2 shader translation",
    state: "partial",
    summary:
      "A growing RDNA2-to-SPIR-V pipeline covers graphics and compute workloads.",
    details: [
      "Merged NGG vertex programs translate, including fetch-shader continuations ending in S_SETPC_B64.",
      "Runtime shaders can pass through a common typed IR before SPIR-V; PS5_GPU_SHADER_IR=1 selects legalized IR and PS5_GPU_SSA=1 adds phi/def-use state, constant folding and iterative DCE.",
      "Structured control flow restores UI text in titles that previously lost it.",
      "Fetch-shader continuations, exact layered rendering and some scanout paths are still incomplete.",
    ],
  },
  {
    id: "vulkan",
    name: "Vulkan rendering",
    state: "working",
    summary:
      "VideoOut reaches a Vulkan swapchain with resident render targets and timeline scheduling.",
    details: [
      "Persistent render targets, large writable storage buffers, resident storage images, and bounded texture and pipeline caches.",
      "Fifty-six host formats are reachable, spanning BC1–BC7, signed and unsigned integer and normalized channels, R16/RG16, half-float and RGBA32_FLOAT.",
      "Image layout and access state is tracked per aspect, mip and array layer.",
      "The default profile waits on each submitted batch; the opt-in timeline scheduler keeps several batches in flight.",
      "GPU compute detile covers 4/8/16-byte 2D and 3D standard and PRT surfaces; RB+ and MSAA still fall back to the CPU.",
    ],
  },
  {
    id: "audio-video",
    name: "Audio and media",
    state: "working",
    summary:
      "Host audio at 48 kHz, plus H.264/AAC playback through FFmpeg.",
    details: [
      "SceAvPlayer returns synchronized NV12 video and stereo PCM through the title's own allocation and file callbacks.",
      "Observed intro movies play at about their native frame rate in ReleaseFast builds.",
    ],
  },
  {
    id: "input",
    name: "Input",
    state: "working",
    summary:
      "DualSense and DualShock 4 pads are read directly over HID, with XInput and keyboard fallbacks.",
    details: [
      "Sony pads work without a translation layer; the launcher reports which one it found.",
      "The launcher can drive motors and the light bar as a check.",
      "Launcher-managed input profiles support controller, keyboard or hybrid control.",
    ],
  },
  {
    id: "storage",
    name: "Savedata and storage",
    state: "working",
    summary:
      "A mounted slot becomes a writable /savedata0, so titles store and reload progress.",
    details: [
      "Games save through the ordinary file API and find their data again on the next run.",
      "The launcher groups every local slot by title ID.",
      "Portable settings and savedata are kept beside the application.",
    ],
  },
  {
    id: "launcher",
    name: "Windows launcher",
    state: "working",
    summary:
      "A native library with local cover art, per-title saves, input profiles and direct launching.",
    details: [
      "Remembers up to eight recent titles.",
      "Reads artwork from each title's local sce_sys/icon0.png.",
      "Detects DualSense and DualShock controllers and persists sound and input profiles.",
    ],
  },
  {
    id: "memory",
    name: "Memory",
    state: "working",
    summary:
      "A freeing, thread-safe allocator and aligned direct-memory ranges keep long runs stable.",
    details: [
      "Aligned Windows direct-memory ranges share 64 KiB section views, so temporary uploads, readbacks and 16 KiB guest pages no longer accumulate as an ever-growing host commit charge.",
      "The opt-in GPU page tracker tracks 16 KiB guest pages by generation and handles the first native CPU store as an invalidation fault.",
    ],
  },
  {
    id: "vr",
    name: "VR presentation",
    state: "deferred",
    summary:
      "VR titles map their plugins and boot, but there is no host headset bridge.",
    details: [
      "Headset, tracking, controller and host OpenXR support are intentionally deferred.",
      "Pistol Whip and Propagation: Paradise Hotel reach engine bootstrap without VR presentation.",
    ],
  },
];

export const highlights = [
  {
    title: "Native guest execution",
    body: "x86-64 guest code runs natively on Windows with ELF/SELF loading, relocation, module linking, TLS, firmware HLE, savedata and contained-fault diagnostics.",
  },
  {
    title: "RDNA2 to SPIR-V",
    body: "Stateful AGC command-stream execution feeds a growing RDNA2-to-SPIR-V shader pipeline covering both graphics and compute workloads.",
  },
  {
    title: "Vulkan VideoOut",
    body: "Resident render targets, image alias tracking, timeline scheduling, typed storage images, texture detiling, depth/stencil and MSAA reach a Vulkan swapchain.",
  },
  {
    title: "Audio, video and pads",
    body: "Host audio, H.264/AAC playback through FFmpeg, Sony controller HID support, XInput and keyboard fallbacks, and launcher-managed input profiles.",
  },
] as const;
