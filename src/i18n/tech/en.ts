/**
 * How each PS5PCEM mechanism works, in English.
 *
 * Facts follow the architecture notes and the October 2026 reports in the
 * emulator repository. A page describes the code that exists. It does not
 * promote a focused test into a new game result.
 *
 * This file's shape is the TechCopy type every other locale must satisfy.
 */
import type { TechSlug } from "@/data/technologies";

export type TechSection = {
  heading: string;
  paragraphs: readonly string[];
};

export type TechArticle = {
  title: string;
  summary: string;
  sections: readonly TechSection[];
  works: readonly string[];
  gaps: readonly string[];
};

export type TechCopy = Record<TechSlug, TechArticle>;

const tech: TechCopy = {
  hle: {
    title: "HLE, high-level firmware emulation",
    summary:
      "HLE is how PS5PCEM answers the firmware calls a title imports. Each numeric NID becomes a Zig function on a host stack, with the guest System V calling convention preserved on Windows.",
    sections: [
      {
        heading: "Why the firmware is not in the game",
        paragraphs: [
          "A PlayStation 5 title does not carry the operating system it calls. Its imports are 11-character identifiers. PS5PCEM computes each identifier from the export name: SHA-1 of the name plus a fixed salt, then the first eight digest bytes in a base64 variant. An implementation registers under the readable name and can require the identifier that name must produce, so a misspelled export fails when the module is built.",
          "The dynamic linker looks the identifier up together with the library, the module and their versions. The same identifier can exist in more than one library. A lookup by identifier alone exists for imports that carry no usable metadata, and that fallback is treated as a last resort because it is ambiguous.",
        ],
      },
      {
        heading: "The call runs on a host stack",
        paragraphs: [
          "The guest calls firmware directly, so the call begins on the guest thread's stack, often one megabyte because that is what the title requested. Host work such as opening a file needs a much larger frame. The compiler reserves that frame on entry, before any early return. A firmware body can therefore walk off the guest stack before it reaches the line that needed the space, and the fault lands outside every guest mapping.",
          "Every HLE call switches to a per-thread host stack for the duration of the host work. Arguments travel through memory, so one assembly stub serves every signature, including floating-point and aggregate returns. Nested firmware calls stay on the stack the outer call already established. On Windows the guest uses the System V AMD64 convention while the host uses Microsoft x64, so every guest-callable function is declared with the guest convention. Leaving that declaration off still compiles, and then reads the arguments from the wrong registers.",
        ],
      },
      {
        heading: "What the HLE surface covers",
        paragraphs: [
          "On top of that machinery the firmware libraries supply direct and flexible memory, module handles, pthreads, synchronization, files, savedata, fibers, fonts, PNG, the clock, pads, AudioOut, AJM, NGS2, ACM, AvPlayer, APR and AMPR. Network, SSL and the NP Web API keep their context and request lifetimes and return deterministic offline errors. Dialogs that need a system shell finish immediately with a coherent headless result.",
          "The October 10 validation run passed the full ReleaseSafe HLE suite, 606 of 606 tests. That count is the firmware suite. It does not by itself record a new frame rate or a new completed playthrough.",
        ],
      },
    ],
    works: [
      "NID calculation, a versioned symbol registry and a host-stack switch for every firmware call.",
      "Guest System V calls on Windows, where the host convention is Microsoft x64.",
      "Memory, files, threading, savedata, media, audio codecs and the APR/AMPR command path.",
      "Headless dialogs and an offline network profile that does not open host sockets.",
    ],
    gaps: [
      "Libraries the title imports and PS5PCEM has not implemented still fail the import.",
      "Truly on-demand loading of a module that was not in the published graph returns an error.",
      "Platform services that need a real shell, account or network peer stay unavailable.",
    ],
  },

  ampr: {
    title: "AMPR counters",
    summary:
      "AMPR in PS5PCEM is a process-local software model of the console's counter and completion commands. One hundred and twenty-eight counters accept stores, atomic field updates, paired reads and masked waits, in submission order.",
    sections: [
      {
        heading: "What a title uses AMPR for",
        paragraphs: [
          "On the console, AMPR is the asynchronous engine that moves file data and updates counters the CPU and the GPU can wait on. Games use it to know that a read has landed, or that a later pass may start, without spinning on a shared variable. PS5PCEM does not emulate the AMPR hardware block. It executes the command stream the title built, inside the process, and reports completion through the AMPR event queue the title registered.",
          "The counter bank holds 128 words of 32 bits. A pair is an even counter plus the next word, read and written as one 64-bit value. A single lock covers both halves and every read-modify-write, so a reader cannot observe a torn pair. Access can name the whole pair, the 32-bit word, either 16-bit half, or one of the four bytes.",
        ],
      },
      {
        heading: "Stores, waits and timestamps",
        paragraphs: [
          "A write is a store, a bitwise OR, an AND with the complement, an XOR, or a wrapping add, applied to the selected field. A wait compares that field with a reference under a mask. The comparisons are equal, greater, less, not equal, a reached sequence value, and the signed forms of greater and less. Sequence compares shift the field's sign bit to bit 63, so the same rule works at 8, 16, 32 and 64 bits.",
          "A wait that is already satisfied completes in place. A wait that is not satisfied keeps the submission snapshot and resumes before later writes and events on that stream, including when a later submission on the same guest thread supplies the value. The ordinary API and the _04_00 API have separate argument lists. Timestamps are recorded with the counter commands. Completion-size queries that titles were importing are registered, so those calls resolve.",
        ],
      },
      {
        heading: "What this path has been observed to do",
        paragraphs: [
          "Twenty-two focused AMPR tests pass in ReleaseSafe, including calls through the real export surface. Grand Theft Auto III's startup performs more than 10,000 APR file-read submissions and writes more than 350 AMPR completion events, with no matched AMPR error on that path. That startup does not itself call the counter API. The counter work is covered by the tests and by titles that do wait on the values.",
          "This is API coverage for the commands the emulator executes. It is not a cycle-level model of the console's memory controller, and it does not claim the hardware's timing.",
        ],
      },
    ],
    works: [
      "One hundred and twenty-eight counters, with coherent 64-bit pairs and byte, half and word fields.",
      "Store, OR, AND-complement, XOR and wrapping add, plus masked and signed waits.",
      "Blocked waits that keep their place in the command stream and resume when the value arrives.",
      "Ordered completion delivered through the registered AMPR event queue.",
    ],
    gaps: [
      "WaitOnAddress remains a placeholder.",
      "Hardware timing of the real AMPR block is not reproduced.",
      "A counter command the decoder does not recognise is not silently treated as success.",
    ],
  },

  apr: {
    title: "APR file identifiers and reads",
    summary:
      "APR resolves a title file once and then carries a process-local identifier in later command buffers. Deferred AMPR reads reopen that same read-only /app0 file without keeping a host descriptor forever.",
    sections: [
      {
        heading: "Identifiers instead of paths",
        paragraphs: [
          "The accelerator API does not want a path in every command. The title resolves a path, receives a compact file identifier, and puts that identifier in the read commands it submits later. PS5PCEM keeps the path and the file size next to the identifier. The table is process-local. Host paths are not handed back to the guest.",
          "The files come from the title's read-only /app0 mount. A resolved entry can be reopened when a deferred read runs, so the emulator does not have to hold every descriptor for the whole process lifetime. The cached table holds up to 64 files.",
        ],
      },
      {
        heading: "Command buffers",
        paragraphs: [
          "A submission is a guest command buffer, not a single read call. PS5PCEM accepts up to 32 live command buffers. Each buffer is bounded: 32 reads, 32 writes, 32 maps, 32 completion records and 128 operations. Up to 64 submissions can be in flight, and an automatic pool holds eight buffers. A read names the file identifier, a guest destination, a size and a file offset, and it may name an address that receives the byte count.",
          "The reader rejects an unknown identifier, a missing file, a short or unaligned command buffer, and a request that would walk off the file or the destination. A single read is capped at 4 GiB, which is the interface limit, not a promise that a title issues reads that large. Map commands use the 16 KiB AMM page size the guest expects.",
        ],
      },
      {
        heading: "How APR meets AMPR",
        paragraphs: [
          "APR owns the file table and the command-buffer lifetime. AMPR owns the counters, the waits and the completion events that tell the title the work finished. A title can queue many file reads and then wait on a counter that the completion command updates. Grand Theft Auto III's first startup is the large observed case: the reads go through this path, and the completion events come back through the AMPR queue.",
          "Kernel asynchronous I/O, the other file API, is a separate page. APR is the accelerator command stream. The kernel batch API is the POSIX-style request list.",
        ],
      },
    ],
    works: [
      "Process-local file identifiers for read-only /app0 paths, with size retained for later reads.",
      "Bounded command buffers for reads, writes, maps and completion records.",
      "Deferred reads that reopen the same title file.",
      "Checked rejection of unknown files, overflow and malformed buffers.",
    ],
    gaps: [
      "The path is a software execution of the command buffer, not the console DMA engine.",
      "Writable package files are outside /app0. Saves go through the savedata mount.",
      "A file the resolver has not seen cannot be invented from a bare identifier.",
    ],
  },

  memory: {
    title: "Direct memory, flexible memory and pools",
    summary:
      "Guest addresses are real host addresses. Direct memory is a sparse shared physical pool mapped into that space, and MemoryPool adds reserve, commit and batch operations on top of the same backing.",
    sections: [
      {
        heading: "The guest address is the host address",
        paragraphs: [
          "Guest x86-64 code runs natively and contains absolute addresses, so PS5PCEM cannot relocate the process into an arbitrary allocation. The memory module reserves the console layout before any module is loaded. The system-managed window starts at 0x40000 and runs to just under 32 GiB. System-reserved and device windows follow. The user window on Windows and Linux runs from 0x10_0000_0000 to 0xFC_0000_0000, 944 GiB of address space. macOS starts that window higher and gets 560 GiB.",
          "Those ranges are reservations, not committed RAM. Pages are committed in 16 KiB units when a mapping is created, and unmapping decommits them while the outer reservation stays. Another host allocation cannot steal the guest address between uses.",
        ],
      },
      {
        heading: "Direct and flexible memory",
        paragraphs: [
          "Direct memory is the guest's name for physical video memory. The title reserves a physical range, then maps it. The two steps are separate. Mapping checks that the whole physical range was reserved, translates CPU and GPU protection, and either commits the exact fixed address or searches for an aligned hole. The same physical offset can be mapped at several virtual addresses, and those aliases are coherent because they share one sparse backing object.",
          "A fixed map into a range the title already reserved commits inside the reservation. Releasing the reservation first would drop the title's claim on the pieces it has not mapped yet. Physical memory is released in the shape the title asks for, which may be a hole in the middle or a span of several reservations. Flexible memory uses the same address-space table, with a platform-default budget of 4 GiB, and searches the system-managed window from 0x02_0000_0000 before falling back to the user window.",
        ],
      },
      {
        heading: "MemoryPool and Windows commit",
        paragraphs: [
          "The six libkernel MemoryPool exports reserve a virtual arena, expand physical capacity, commit and decommit shared backing, run ordered batches, and report block statistics. Donated blocks cannot be mapped as ordinary direct memory or released while they are committed. Batch commit, decommit, protect and type changes work. Batch MOVE stays unsupported and returns an error rather than pretending the blocks moved.",
          "On Windows, aligned direct-memory views share 64 KiB section views. Temporary uploads, readbacks and 16 KiB guest pages therefore do not each become their own ever-growing commit charge. Queries of a reservation use the guest's 72-byte virtual-query record and report half-open ranges with the original protection bits.",
        ],
      },
    ],
    works: [
      "Fixed guest address windows, committed in 16 KiB pages and released without giving up the reservation.",
      "Coherent aliases of one direct-memory physical offset.",
      "Flexible memory with the 4 GiB default budget and fixed, no-overwrite and partial unmaps.",
      "MemoryPool reserve, expand, commit, decommit, statistics and ordered batches except MOVE.",
    ],
    gaps: [
      "MemoryPool batch MOVE is explicitly unsupported.",
      "A release of a range the title does not own is still an error.",
      "The reservations are virtual. Only pages the title maps consume host commit.",
    ],
  },

  savedata: {
    title: "Savedata",
    summary:
      "A mounted save slot becomes a writable /savedata0. The title uses the ordinary file API, and the next launch finds the same files under the product code the title publishes.",
    sections: [
      {
        heading: "Where a save lives",
        paragraphs: [
          "The game install is read-only, can sit on removable media, and is replaced wholesale when it is patched. A save has to outlive all three. PS5PCEM stores slots at savedata/<titleId>/<slot>/ under the emulator home, keyed by the product code the title reports. Two dumps of the same game share saves. Two different games do not.",
          "The slot name comes from the guest and is sanitized before it becomes a directory. Separators, the drive colon and parent-directory links become underscores. Dropping those characters would let two different names collapse onto one directory. A name that cannot be a directory at all falls back to a fixed name, because losing the save is worse than placing it somewhere predictable.",
        ],
      },
      {
        heading: "Mounting and existence checks",
        paragraphs: [
          "A mount resolves the slot and points /savedata0 at it. Creating a missing slot happens only when the title asked for one. A probe for a save the title never wrote gets a missing result, which is what the title expects. Everything shipped with the title stays read-only. The save mount is the writable place.",
          "Existence is answered from the metadata path, not by opening the file. A mount that only succeeded at open time made every existence check fail, and Jets 'n' Guns 2 rewrote its profile on every launch because of that. Listing the slots a title has written is answered too. The mount also reports whether it opened an existing save or created a new one. The block-shaped save API uses a separate per-title blob under sce_sdmemory, loaded when the title reserves it and written when the title asks for a sync.",
        ],
      },
      {
        heading: "Incomplete slots",
        paragraphs: [
          "Startup discovery hides interrupted slots that contain only firmware metadata or empty staging files. Cat Quest III had a reproduced path.txt-only settings slot. The title then failed on a missing Data.dat and waited forever after its startup frame. The search now skips that incomplete slot and continues.",
          "The launcher groups every local slot by title ID on the Saves page, including saves written by a different library tile. A development build under zig-out resolves the emulator home to the repository root. A packaged build uses its own directory. Command-line and launcher starts of the same package therefore share one save root.",
        ],
      },
    ],
    works: [
      "Writable /savedata0 mounts keyed by title ID, with sanitized slot names.",
      "Existence checks, slot listing, and a report of whether the mount created the save.",
      "A per-title sce_sdmemory blob for the block-shaped save API.",
      "Hiding of interrupted slots that contain no real save payload.",
    ],
    gaps: [
      "Saves are host directories. The console's save-data dialog and cloud sync are not presented.",
      "A slot the title did not ask to create is reported missing.",
      "Trophy, activity and other account-backed records are outside this mount.",
    ],
  },

  fonts: {
    title: "Font rendering",
    summary:
      "libSceFont rasterizes title-supplied TrueType and OpenType faces with FreeType. System-font requests use the bundled Noto Sans substitute for Latin, Greek and Cyrillic.",
    sections: [
      {
        heading: "Faces, scale and lifetime",
        paragraphs: [
          "A title opens a font library, creates a face from bytes it supplies or from a system-font request, and then asks for glyph metrics and coverage. Each face keeps its own scale, render scale, slant and lifetime. Closing the library releases its faces, and process teardown clears the font state. The font bytes are copied on open, so a later unmap of the title's source buffer cannot invalidate the rasterizer.",
          "Noto Sans is a substitute, not a byte-identical copy of every firmware font. It covers Latin, Greek and Cyrillic. A face the title supplies can contain other glyphs, including CJK, and those outlines are used. The system-font request itself does not substitute a CJK face.",
        ],
      },
      {
        heading: "Glyphs, kerning and atlases",
        paragraphs: [
          "The glyph path returns real metrics, horizontal layout, basic pair kerning, antialiased coverage, clipping and render-result descriptors. A bounded glyph cache avoids rasterizing the same character again, and a separate pair cache reuses kerning across sizes. Writes check CPU permissions and invalidate GPU page watches before they touch a texture atlas.",
          "A valid Unicode scalar that the face does not contain uses the face's .notdef outline, including control codes encountered while a title builds a complete atlas range. That missing-glyph path is what lets Jurassic Park Classic Games Collection finish building its font atlas. Invalid Unicode scalars and out-of-range explicit glyph identifiers still return an error. Coverage is written to pixels of one to four bytes.",
        ],
      },
      {
        heading: "What text layout is left to the title",
        paragraphs: [
          "Many titles never call libSceFont. They draw text with their own engine font, and this implementation does not change those pixels. The HLE path is for titles that ask the firmware to rasterize.",
          "Text shaping, bidirectional layout, synthetic weight, CJK system-font substitution, collection-face selection and the higher-level FontWriting and String APIs are not implemented. Focused checks live behind zig build test-hle with the font filter.",
        ],
      },
    ],
    works: [
      "FreeType rasterization of title-supplied TrueType and OpenType faces.",
      "Noto Sans fallback for system-font requests in Latin, Greek and Cyrillic.",
      "Metrics, horizontal layout, pair kerning, slant, clipping and a glyph cache.",
      ".notdef fallback for missing Unicode scalars, which unblocks Jurassic Park's atlas.",
    ],
    gaps: [
      "Shaping, bidirectional layout and the FontWriting APIs are absent.",
      "System-font requests do not substitute a CJK face.",
      "Titles that draw text entirely in their own engine do not use this path.",
    ],
  },

  png: {
    title: "PNG encode and decode",
    summary:
      "The PNG encoder writes 8-bit RGB or RGBA files from pitched RGBA or BGRA pixels. The decoder reads non-interlaced grayscale, palette, RGB and RGBA images into a checked guest buffer.",
    sections: [
      {
        heading: "Encoding",
        paragraphs: [
          "Titles hand the encoder a rectangle of pixels that may have a row pitch larger than the width. PS5PCEM accepts pitched RGBA and BGRA and writes a standard 8-bit RGB or RGBA PNG. The caller selects the scanline filters and a compression level from 0 through 9. Output writes are bounded by the buffer the title provided.",
          "The encoder is a software implementation of the file format. It does not call out to a system image library, and it does not claim a particular speed against the console's hardware encoder.",
        ],
      },
      {
        heading: "Decoding",
        paragraphs: [
          "libScePngDec parses PNG metadata and decodes non-interlaced grayscale, palette, RGB and RGBA images into checked guest RGBA or BGRA buffers. Scanline filters are applied, and palette transparency is honored. The destination is checked before pixels are written.",
          "Adam7 interlaced input is recognized and refused rather than decoded into a wrong image. Interlaced icons and screenshots therefore do not silently become a garbled buffer.",
        ],
      },
      {
        heading: "Where it sits",
        paragraphs: [
          "PNG is one of the small firmware services a title hits during startup: icons, atlases and save thumbnails. It is independent of the AvPlayer movie path, which uses FFmpeg for H.264, and independent of the font rasterizer.",
          "The October 9 firmware report groups the encoder with the clock and the AMPR completion-size queries. Those three closed import gaps. They do not, by themselves, change a measured frame time.",
        ],
      },
    ],
    works: [
      "Pitched RGBA and BGRA input to 8-bit RGB or RGBA PNG at compression levels 0–9.",
      "Decode of non-interlaced grayscale, palette, RGB and RGBA, including filters and palette alpha.",
      "Checked destination buffers and bounded encoder output.",
    ],
    gaps: [
      "Adam7 interlaced PNG is recognized and not decoded.",
      "16-bit and exotic ancillary chunks are outside the implemented subset.",
      "There is no hardware PNG block. Both sides run on the CPU.",
    ],
  },

  rtc: {
    title: "Real-time clock",
    summary:
      "RTC checks calendar fields, converts Windows FILETIME, and does checked arithmetic on ticks. The guest sees a coherent clock without the host's daylight-saving conversion.",
    sections: [
      {
        heading: "What the calls do",
        paragraphs: [
          "Titles ask the firmware for the current time, for a conversion between tick counts and calendar fields, and for arithmetic that must not wrap into a nonsense date. PS5PCEM validates the calendar fields, converts to and from FILETIME, and checks the tick arithmetic so an overflow is an error instead of a truncated value.",
          "UTC and local queries return coherent values from the host clock. The conversion that would apply the host's daylight-saving rules to a guest local time is not implemented. A title that only needs a monotonic or UTC stamp still gets a usable answer.",
        ],
      },
      {
        heading: "Why it is separate from audio time",
        paragraphs: [
          "Audio pacing uses the host audio device and its buffer clock. AvPlayer uses its own media clock. RTC is the wall clock the title reads for saves, timers and calendar UI. Mixing those clocks up is how a title appears to hang or to stamp a save with a zero time.",
          "The October 9 report added the validation, the FILETIME conversion and the checked arithmetic together with the PNG encoder and three AMPR completion-size exports. Network time and a user-visible clock setting are not part of this surface.",
        ],
      },
    ],
    works: [
      "Calendar field validation and checked tick arithmetic.",
      "FILETIME conversion.",
      "Coherent UTC and local queries from the host clock.",
    ],
    gaps: [
      "Host daylight-saving conversion of guest local time is absent.",
      "There is no emulated system settings UI for the clock.",
      "Network time synchronization is not performed.",
    ],
  },

  fibers: {
    title: "Fibers and user-level threads",
    summary:
      "On Windows, each libSceFiber fiber is a real Windows fiber, so a switch keeps the guest registers and the guest stack. User-level threads start through the same pthread path.",
    sections: [
      {
        heading: "Why a fiber cannot be a no-op",
        paragraphs: [
          "Guest code runs as native machine code. A fiber switch has to resume the exact registers and the exact stack, with host frames and guest frames mixed on that stack. Returning success from sceFiberSwitch without switching would let the title continue on the wrong stack and corrupt both sides.",
          "PS5PCEM backs each initialized guest fiber with one Windows fiber. sceFiberRun, sceFiberSwitch and sceFiberReturnToThread use that mechanism. The thread that called sceFiberRun is the root fiber. The public 128-byte SceFiber record keeps the ABI signatures, the state, the entry argument, the name and the caller-provided context range.",
        ],
      },
      {
        heading: "Whose stack it is",
        paragraphs: [
          "The title supplies a context buffer, and that buffer is recorded in the ABI object. Windows owns the actual stack. Using the title's buffer as a native Windows stack would skip the guard page and the unwind bookkeeping the operating system requires. The minimum context the firmware record expects is still checked, along with alignment and the start and end signatures.",
          "sceFiberGetSelf, finalization, cross-thread ownership checks and runtime reset are implemented. The backend exists on the Windows x86-64 native-execution target. Other hosts can build the rest of the emulator, and this switch path is not available there.",
        ],
      },
      {
        heading: "User-level threads",
        paragraphs: [
          "libSceUlt initialize and finalize succeed so a title's job system can start. Runtimes, waiting queues, queue-data pools, mutexes, semaphores and queues keep host-side state keyed by the objects the title allocated. The work items themselves start through the existing pthread path. Work-area size queries return the aligned sizes those creates expect.",
          "Kernel user-edge event queues share the same sequence-aware wait as pthread synchronization. VideoOut filter -13 and graphics filter -14 ride that queue and keep each registration's identifier and user data. ULT is scheduling glue. It does not add a second CPU emulator.",
        ],
      },
    ],
    works: [
      "Windows fibers for sceFiberRun, sceFiberSwitch and sceFiberReturnToThread.",
      "ABI signatures, ownership checks and a host-owned stack with a guard page.",
      "ULT initialize, queues, mutexes, semaphores and pthread-backed work items.",
      "User-edge event queues shared with VideoOut and graphics completion.",
    ],
    gaps: [
      "The fiber switch exists on Windows x86-64. Other host operating systems do not run guest code natively.",
      "A fiber is not a preemptively scheduled hardware thread.",
      "ULT does not implement a separate interpreter for worker bodies.",
    ],
  },

  aio: {
    title: "Kernel asynchronous file reads",
    summary:
      "The kernel AIO API accepts a batch of reads and returns an identifier. PS5PCEM performs the batch at submission, which the interface allows, and the title collects a finished result.",
    sections: [
      {
        heading: "The interface",
        paragraphs: [
          "Engines that stream assets submit a list of reads and later ask whether the batch is done. A title built that way cannot load a file without the API. PS5PCEM accepts the batch, runs the reads when it is submitted, and stores the results under the identifier. A later poll observes a batch that has already completed.",
          "Completing immediately is a legal outcome of the interface. Callers are required to handle a request that finished before the poll. The emulator does not sleep to imitate device latency, and it does not report the batch as failed in order to look more asynchronous.",
        ],
      },
      {
        heading: "How this differs from APR",
        paragraphs: [
          "Kernel AIO is the POSIX-style batch on file descriptors the title already opened. APR is the accelerator path: paths become identifiers, and the commands live in an AMPR command buffer with counters and completion events. A title can use either, or both.",
          "Both paths read the title install as data the emulator did not produce. Bounds are checked. A short buffer or a bad descriptor is an error return, not a partial write presented as success.",
        ],
      },
    ],
    works: [
      "Batch submission, an identifier, and a completion the title can collect.",
      "Reads performed against the files the title opened.",
      "Immediate completion, which the guest API permits.",
    ],
    gaps: [
      "There is no separate I/O thread imitating disk latency.",
      "The console's priority and bandwidth scheduler is not modeled.",
      "APR command buffers are a different API and are not rewritten into kernel AIO.",
    ],
  },

  agc: {
    title: "AGC and the PM4 command stream",
    summary:
      "A PS5 title builds GPU packets in its own memory and submits the buffer. PS5PCEM decodes that PM4 stream, keeps the register state, and executes draws and dispatches in order.",
    sections: [
      {
        heading: "The stream is the graphics API",
        paragraphs: [
          "The title does not have to call a high-level draw function for every triangle. It writes packets: register updates, draws, dispatches, fences and flips. Whichever layer produced the buffer, the GPU sees the same stream. The decoder names the packets whose opcodes have a documented meaning and leaves the others as numbers. An invented name in a trace would be worse than an opcode.",
          "Packet body length is stored biased by one, so an empty body cannot be encoded. Every step checks its bounds. A body that does not fit is reported. It is not clipped, because a clipped body would shift every following packet and the trace would lie.",
        ],
      },
      {
        heading: "State, waits and indirect buffers",
        paragraphs: [
          "Register state survives across submissions, including writes of zero. The executor applies direct register lists, native and legacy indirect lists, acquire and release, 32-bit and 64-bit waits, writes, events and SetFlip. A wait that is not met returns blocked and the exact word to resume from. Guest memory is not modified to manufacture progress.",
          "Indirect buffers are followed recursively, both the ordinary 4-dword form and the conditional 14-dword form. Chain packets end the parent. Nesting stops at sixteen frames. A blocked child returns a fixed path from the root to the leaf, so resuming does not replay draws that already happened. The scheduler copies each root command buffer and the indirect buffers it can reach, so the title may recycle the arena while a wait is still blocked.",
        ],
      },
      {
        heading: "From registers to a draw",
        paragraphs: [
          "At a draw or a dispatch the register snapshot becomes typed resources: 128-bit buffer and sampler descriptors, 256-bit image descriptors, eight color targets, depth and stencil, viewports, scissor, cull, blend, and the PS5 swizzle and MSAA fields. Missing color-control and clip-control writes inherit the AGC defaults. An explicit disable stays a disable. Two CPU workers prepare graphics and compute commands. One Vulkan owner submits them so execution and completion stay ordered.",
          "Shader metadata supplies the resource tables and the user-data registers. Scalar provenance walks a bounded prefix of the shader, loads only the guest memory the prefix actually touches, and stops on an unknown branch instead of inventing a descriptor. The result is what the translator and the Vulkan backend consume.",
        ],
      },
    ],
    works: [
      "PM4 decode with biased body lengths and hard bounds on every packet.",
      "Persistent register banks, blocked waits, and recursive indirect buffers up to sixteen frames.",
      "Typed buffers, images, color targets, depth, viewport, blend and MSAA state at draw time.",
      "Two preparation workers and one ordered Vulkan submission owner.",
    ],
    gaps: [
      "An opcode without a documented meaning stays unnamed.",
      "A blocked wait is never cleared by writing a fake fence value.",
      "Layers, metadata and a few image operations are still incomplete. Those have their own pages.",
    ],
  },

  rdna2: {
    title: "RDNA2 shaders to SPIR-V",
    summary:
      "PlayStation 5 shaders are RDNA2 machine code. PS5PCEM decodes the GFX10 families, builds a control-flow graph, and lowers the supported operations to SPIR-V 1.5 for Vulkan.",
    sections: [
      {
        heading: "Decode",
        paragraphs: [
          "The frontend recognizes the scalar SOP1, SOP2, SOPK, SOPC, SOPP and SMEM encodings, the vector VOP1, VOP2, VOP3, VOP3P, VOPC and VINTRP encodings, MUBUF, MTBUF, FLAT, DS, MIMG and EXP. Architectural one-word and two-word bodies, optional literals and MIMG NSA address words are kept, so a later unsupported opcode does not desynchronize the stream.",
          "An unrecognized opcode inside a known family becomes an unsupported instruction that still carries its family, its numeric opcode, the raw words and a reason. SDWA and DPP extension words keep their selectors, modifiers and lane masks. The decoder does not rename an opcode it does not know.",
        ],
      },
      {
        heading: "Control flow and the typed IR",
        paragraphs: [
          "Direct branch targets split the program into blocks. Forward merges, nested regions and backward edges are recorded separately. The live translator can emit from the decoded instructions. Setting PS5_GPU_SHADER_IR=1 selects the legalized typed IR. Setting PS5_GPU_SSA=1 adds phi and def-use state, constant folding and iterative dead-code elimination.",
          "Acyclic selections become structured SPIR-V merges with phi values at the joins. Natural loops become loop merges. Irreducible control flow becomes a block-index dispatcher that keeps the VCC and EXEC predicates, so a lane that should have skipped a write still skips it. EXEC masks are reused inside a SPIR-V block and dropped at every label, because a value from one side of a branch does not dominate the other side.",
        ],
      },
      {
        heading: "What the October 9 suite measured",
        paragraphs: [
          "The scalar-call checkpoint of October 9 passed 259 of 259 GPU-analysis tests and 232 of 232 Vulkan tests. The RDNA2 suite passed 271 of 281, with the same ten existing failures and one reported leak. Those instruction probes do not establish a new frame rate for a game.",
          "Multi-texel image loads, horizontal gathers, NGG fetch shaders and bounded scalar calls are implemented as their own paths and described on their own pages. Stores and descriptor combinations that were not in the measured set stay unsupported.",
        ],
      },
    ],
    works: [
      "Decode of the GFX10 scalar, vector, memory, image and export families, including literals and NSA words.",
      "Structured selections, natural loops, and a dispatcher for irreducible flow that preserves lane masks.",
      "Optional typed IR and SSA cleanup, selected with environment variables.",
      "SPIR-V 1.5 for the supported ALU, memory, image, interpolation and export operations.",
    ],
    gaps: [
      "Ten existing RDNA2 suite failures remain, plus one reported leak.",
      "An unsupported opcode stops that lowering. It is not replaced with a guessed operation.",
      "The instruction tests are not a frame-rate result.",
    ],
  },

  ngg: {
    title: "NGG vertex shaders",
    summary:
      "Merged NGG vertex programs, including a fetch shader that continues with S_SETPC_B64, translate as one graphics stage. The export program keeps its own user-data window.",
    sections: [
      {
        heading: "Fetch and export are different programs",
        paragraphs: [
          "A PlayStation 5 draw often splits vertex work into a fetch shader and an export shader. The fetch shader ends its attribute prolog by jumping to the export code with S_SETPC_B64. PS5PCEM treats that continuation as part of the same vertex program and translates the merged result.",
          "The NGG export program does not borrow the geometry-shader user-data bank. Its scalar registers are initialized from its own user-data snapshot, at s8 for the export program. Assuming the resource table lives in s0:s1 is a bug the translator specifically avoids. The table pointer comes from the ShaderResourceTable user-SGPR pair the metadata declared.",
        ],
      },
      {
        heading: "Vertex attributes",
        paragraphs: [
          "The fetch shader and the extended user data are resolved together with the embedded vertex-buffer and vertex-attribute tables. Up to 32 input semantics keep their semantic index, the hardware VGPR they land in, the AGC attribute format, the byte offset, the instance rate and the 128-bit buffer descriptor.",
          "Attribute lookup uses the semantic byte, not the hardware-mapping byte. An incomplete table pair or an index outside the supported domain is rejected before any guest read. PARAM exports from the vertex stage become the fragment interpolation inputs, which is how a later pixel shader sees the varyings.",
        ],
      },
      {
        heading: "Calls into a fetch shader",
        paragraphs: [
          "A verified external fetch shader can also be linked from S_SWAPPC_B64 or S_CALL_B64 when the call's user-data pair still holds the address AGC registered. The fetch body is decoded through its returning S_SETPC_B64, and that return must read the caller's link pair. The details of which calls are legal live on the scalar-calls page.",
          "Merged NGG translation is what lets three-dimensional scenes get past a fetch prolog that used to stop the decoder. It does not by itself supply a missing pixel shader or a missing render target.",
        ],
      },
    ],
    works: [
      "Merged NGG vertex programs, including fetch prologs that end in S_SETPC_B64.",
      "A separate user-data window for the export program.",
      "Up to 32 vertex semantics with formats, offsets, instance rates and buffer descriptors.",
      "PARAM exports connected to fragment interpolation inputs.",
    ],
    gaps: [
      "A fetch shader whose return does not match the caller's link pair is not linked.",
      "General dynamic calls remain unsupported. See scalar calls.",
      "Geometry that depends on an unsupported export or interpolant still fails that draw.",
    ],
  },

  mimg: {
    title: "Multi-texel image loads",
    summary:
      "IMAGE_LOAD_BY2, BY4, PCK2 and PCK4, including the explicit-mip forms, execute for the measured native 2D formats. A BY load returns consecutive texels. A PCK load packs their raw bits into one register.",
    sections: [
      {
        heading: "BY and PCK",
        paragraphs: [
          "A BY load writes consecutive texels into separate VGPRs, channels ordered inside each texel. A PCK load packs the raw component bits into one 32-bit VGPR, with the first texel in the least significant bits. Signed components are truncated to their storage width. UNORM components are reconstructed with round-to-even conversion.",
          "The first texel is aligned down to a group of two or four in X. The bounds test uses the original, unaligned coordinate: the whole group must fit before alignment, Y must be in range, and the requested mip must exist. An invalid group zeros every result register and leaves unrelated destinations alone. Invalid coordinates are replaced with safe fetch operands before Vulkan sees them.",
        ],
      },
      {
        heading: "Which formats",
        paragraphs: [
          "BY2 with DMASK 0x3 covers R8 and R16 in UNORM, SNORM, UINT, SINT, and R16 FLOAT. BY2 with DMASK 0xF covers RG8 UNORM, SNORM, UINT and SINT. BY4 with DMASK 0xF covers R8 in those four numeric types. PCK2 with DMASK 0x1 covers R8, R16 and RG8 UNORM, UINT and SINT. PCK4 with DMASK 0x1 covers R8 UNORM, UINT and SINT. Explicit-mip variants of those loads use the same format lists.",
          "The backend gives translation the exact native format. Separate UINT and SINT sampled-image banks keep integer results typed correctly next to the floating-point and comparison banks. NSA coordinates, overlapping address and destination registers, and the ordinary EXEC mask are preserved.",
        ],
      },
      {
        heading: "What the change is not",
        paragraphs: [
          "The October 9 report is shared shader and backend support. It does not depend on a game identifier or a shader hash. No game compatibility result and no frame-rate change is claimed from these loads alone.",
          "Stores, and format or descriptor combinations that were not in the measured set, stay unsupported. Horizontal gathers are the neighbouring instruction family and have their own page.",
        ],
      },
    ],
    works: [
      "Measured 2D BY2, BY4, PCK2 and PCK4 loads, with and without an explicit mip.",
      "Group alignment, checked bounds, and zeroed results for an invalid group.",
      "Separate integer sampled-image banks so UINT and SINT stay typed.",
      "EXEC masks, NSA coordinates and overlapping register pairs preserved.",
    ],
    gaps: [
      "Image stores of these forms are not implemented.",
      "Formats and descriptor modes outside the measured table are rejected.",
      "The tests do not establish a new frames-per-second figure for any title.",
    ],
  },

  gather4h: {
    title: "Horizontal gathers",
    summary:
      "IMAGE_GATHER4H and IMAGE_GATHER4H_PCK gather one channel across a horizontal group of texels. The measured direct 1D and 2D subset is covered by 1,242 GPU dispatches.",
    sections: [
      {
        heading: "What the instruction returns",
        paragraphs: [
          "A vertical gather reads four texels in Y. The H form reads them in X. GATHER4H writes the selected channel of those texels. GATHER4H_PCK writes the packed raw texel stream. The destination width follows DMASK, and registers the instruction does not own stay unchanged.",
          "Edges use the sampler's addressing rules. A texel that falls outside the image is handled rather than read from a neighbouring allocation. The October 9 probe ran 1,242 GPU dispatches over the measured direct 1D and 2D subset.",
        ],
      },
      {
        heading: "What stays out",
        paragraphs: [
          "A16, D16, R128, indirect resource tables, array, cube and MSAA views, and compressed formats are not part of the measured subset. Those descriptor and control modes remain explicit limitations.",
          "The gather work shares the translator and the Vulkan image path with the multi-texel loads. It does not change detile addressing, and it does not claim a frame-rate result.",
        ],
      },
    ],
    works: [
      "IMAGE_GATHER4H and IMAGE_GATHER4H_PCK for the measured direct 1D and 2D cases.",
      "DMASK destination widths and preservation of unrelated registers.",
      "Edge handling according to the sampler, checked with 1,242 GPU dispatches.",
    ],
    gaps: [
      "Array, cube, MSAA, compressed and several descriptor modes are not in the measured subset.",
      "A16, D16, R128 and indirect tables remain limitations.",
      "No title frame rate is inferred from the probe.",
    ],
  },

  "scalar-calls": {
    title: "Scalar shader calls",
    summary:
      "S_SWAPPC_B64 and S_CALL_B64 save a full return address and run a bounded local subroutine, including a callee that sits after ENDPGM. A verified AGC fetch shader can be linked the same way.",
    sections: [
      {
        heading: "Call and return",
        paragraphs: [
          "SOP1 opcode 0x21 is S_SWAPPC_B64. SOPK opcode 0x16 is S_CALL_B64, with the target at PC + 4 + sign_extend(SIMM16) * 4, which includes backward calls. Both write the address of the next instruction into the destination SGPR pair. A matching S_SETPC_B64 returns there. CALL leaves SCC and EXEC alone.",
          "A SWAPPC whose destination is null remains the existing S_SETPC_B64 continuation. Local SWAPPC targets can be resolved from a GETPC plus a full-width immediate add or subtract. The target is captured even if the instruction also writes the link register. A callee that lives after ENDPGM is decoded through its matching return, inside the allocation and instruction bounds. An ordinary hardware continuation still stops before trailing metadata.",
        ],
      },
      {
        heading: "How the call is lowered",
        paragraphs: [
          "The control-flow graph gains explicit call and return edges. The callee shares the caller's register state and uses the bounded SPIR-V dispatcher. An unsupported call cannot fall through into the linear control-flow path. Host resource discovery follows the calls and the returns, so a descriptor initialized inside the callee is still visible.",
          "Each supported call owns one distinct, even-aligned SGPR pair from s0:s1 through s104:s105, with exactly one matching return. Callees are nested or sequential in the ways the checker allows. General dynamic targets, where the destination is an arbitrary runtime value, stay unsupported.",
        ],
      },
      {
        heading: "Fetch shaders and the probe",
        paragraphs: [
          "An external fetch shader is linked when the call's unchanged user-data pair matches the address AGC registered. The fetch body is decoded to its returning SETPC, and that SETPC must read the caller's link pair. Analysis caching tells an ordinary program apart from a fetch body, so an older fetch insertion cannot overwrite a local subroutine's return.",
          "A 42-dispatch GPU probe checks 21,504 words. The October 9 report does not claim a new game milestone or a new frame rate from the calls alone.",
        ],
      },
    ],
    works: [
      "S_SWAPPC_B64 and S_CALL_B64 with a full return address and a matching S_SETPC_B64.",
      "Nested callees and callees placed after ENDPGM, within the existing bounds.",
      "Linking of a verified AGC fetch shader whose return reads the caller's link.",
      "A 42-dispatch probe covering 21,504 words.",
    ],
    gaps: [
      "General dynamic call targets are unsupported.",
      "A call needs one even-aligned link pair and one matching return.",
      "The probe is not a frames-per-second result.",
    ],
  },

  vulkan: {
    title: "Vulkan renderer",
    summary:
      "The Vulkan backend loads the driver at runtime, requires Vulkan 1.2, and presents guest frames through a swapchain. Render targets, storage images and pipelines stay resident across draws.",
    sections: [
      {
        heading: "Device and memory",
        paragraphs: [
          "The renderer loads the platform Vulkan loader itself, so the build does not need the Vulkan SDK headers. Initialization asks for Vulkan 1.2, the version that accepts the translator's SPIR-V 1.5, and prefers a discrete device with a queue family that can do both graphics and compute. Validation layers are requested in debug builds when they are installed.",
          "One descriptor layout holds 64 storage buffers, separate 64-entry 2D and 3D sampled-image arrays, and typed storage images. A 512-set ring, a 128 MiB upload arena and persistent guest render targets keep a frame's resources on the device. Graphics translations use a 256 MiB, 1,024-entry cache. A streaming scene had exceeded the old 64 MiB budget and was translating the same modules again every frame.",
        ],
      },
      {
        heading: "Pipelines and timelines",
        paragraphs: [
          "Pipeline compilation uses two workers by default. PS5_GPU_COMPILER_WORKERS can set one to four. PS5_GPU_ASYNC_PIPELINES=0 returns to synchronous compilation and turns compute warmup off. Warmup replays previously compiled compute modules into the driver cache on the next launch. It never dispatches them, and it destroys the temporary pipelines. The driver cache is also stored in vulkan_pipeline_cache.bin, up to 4 GiB. A corrupt file is discarded. It can only affect startup time.",
          "The default compatibility profile waits for each submitted batch. The timeline scheduler, selected with PS5_GPU_TIMELINE_SCHEDULER=1, lets several batches stay in flight and waits at a real readback, a guest synchronization point, or an exhausted resource ring. One title, PPSA25872, enables that scheduler and deferred small storage writeback on its own after measured comparisons. Image layout is tracked per aspect, mip and array layer, and barriers come from the previous use of that subresource.",
        ],
      },
      {
        heading: "Formats and residency",
        paragraphs: [
          "Fifty-six host formats are reachable, including BC1 through BC7, integer and normalized channels, R16 and RG16, half-float and RGBA32_FLOAT. Guest image allocations share one alias registry across color, depth, storage and sampled uses. A later pass can sample a depth target that an earlier pass wrote, without a round trip through guest memory, when the signatures match. Reinterpretations and partial overlaps go back through guest memory.",
          "Compute detile on the GPU covers 4, 8 and 16-byte 2D and 3D standard and PRT surfaces. RB+ and MSAA detile still run on the CPU. Single-sample packed 11/11/10 UNORM targets blend through a storage-buffer copy and a fragment unpack, blend and repack. VideoOut is the swapchain on top of these images.",
        ],
      },
    ],
    works: [
      "Runtime Vulkan 1.2 device selection, a swapchain, and resident render targets.",
      "Fifty-six host formats, per-subresource layout tracking, and an image-alias registry.",
      "Two compiler workers, a persistent driver cache, and optional compute warmup.",
      "An opt-in timeline scheduler, with one title enabling it by default.",
    ],
    gaps: [
      "The default profile still waits for each batch. Timeline submission is opt-in.",
      "RB+ and MSAA detile use the CPU.",
      "Game lighting and every compressed metadata path are not implied by the format list.",
    ],
  },

  msaa: {
    title: "MSAA",
    summary:
      "Matching 2×, 4× and 8× color and depth sample counts stay on the host image through a later resolve. Asterix uses that path for MSAA depth and stencil, which removed a large accidental readback.",
    sections: [
      {
        heading: "Sample counts on the host image",
        paragraphs: [
          "A PlayStation 5 render target can be stored with two, four or eight samples. PS5PCEM keeps a color target and a depth target on the Vulkan image when their sample counts match, and resolves later. The guest sample count is part of the resource snapshot, next to the swizzle mode and the metadata pointers.",
          "The Oberon 16-pipe, 8-packer RB+ address equations include the array slice and the 2×, 4× and 8× sample bits for both color and depth. GPU compute detile does not consume those equations yet. RB+ and MSAA surfaces fall back to the CPU detile. The samples are still correct. The fallback is a cost, and it is why MSAA is not described as fully GPU-resident.",
        ],
      },
      {
        heading: "Depth and stencil in Asterix",
        paragraphs: [
          "Asterix & Obelix: Slap Them All! draws the opening forest with MSAA depth and stencil. A depth-only pass that ignored the sample count was reading the attachment back as a diagnostic. Matching MSAA depth and stencil attachments stay on the persistent depth path, and the stencil compare and update the guest requested are applied.",
          "MSAA color attachments no longer request storage-image usage on this backend. On the RTX 3070 Ti at 1080p output, a stationary 30-second UI-counter sample of that opening forest rose from a median of 46.45 FPS to 162.20 FPS. The figure is that view. It is not a minimum across later levels. Movement, jumping and the first Roman encounter were rechecked on the development build.",
        ],
      },
      {
        heading: "What resolve does not include",
        paragraphs: [
          "A later resolve of a matching sample count is implemented. A compressed FMASK surface tied to CMASK is a different mechanism and stays outside this path. An unsupported MSAA import keeps the safe first-use clear instead of sampling uninitialised compressed data.",
          "All 233 Vulkan tests and the native 2× and 4× depth and stencil probes passed with the Asterix fix. The signed runner includes it. The change is newer than the 0.3.4 release notes.",
        ],
      },
    ],
    works: [
      "Host images for matching 2×, 4× and 8× color and depth sample counts, with a later resolve.",
      "MSAA depth and stencil attachments, including stencil compare and update.",
      "CPU detile for MSAA and RB+ addressing, using the Oberon sample-bit equations.",
      "The Asterix opening-forest fix, measured at 162.20 FPS median in that stationary view.",
    ],
    gaps: [
      "GPU compute detile does not cover MSAA or RB+. Those uploads use the CPU.",
      "FMASK linked to CMASK is not resolved as compressed metadata.",
      "The Asterix number is one view on one GPU, not a frame-rate promise for the game.",
    ],
  },

  metadata: {
    title: "HTILE, DCC, CMASK and FMASK",
    summary:
      "HTILE, DCC, CMASK and FMASK are the console's compressed depth and color metadata. PS5PCEM tracks the pointers, clears HTILE in the cases it understands, and refuses a layout it would otherwise detile incorrectly.",
    sections: [
      {
        heading: "What the four names are",
        paragraphs: [
          "HTILE is depth metadata. On the GFX10 pattern PS5PCEM implements, one dword covers an 8×8 pixel region, and those dwords are packed into a 32 KiB block that covers 1024 by 512 pixels. DCC is delta color compression for color targets. CMASK is a fast-clear and expand mask. FMASK tells a multisample resolve which sample belongs in which pixel.",
          "The resource snapshot keeps the metadata pointers and the layout selectors, including the GFX10 linear-CMASK bit. That bit matters because applying a tiled address equation to a linear CMASK would silently scramble the mask. The backend rejects the unsupported layout instead.",
        ],
      },
      {
        heading: "Clears and depth",
        paragraphs: [
          "Correct HTILE and DCC clears are implemented for the layouts the renderer understands. Repeated metadata clears are covered by the vulkan-smoke htile-clears probe. A reset depth extent is recovered only for an active HTILE-backed surface, which keeps Ghost of Yōtei's G-buffer intact and still lets a stale 1×1 UI depth binding fail the attachment-size check.",
          "Single-sample guest depth and stencil can be imported and written back when PS5_GPU_DEPTH_TRANSFER=1. Bound stencil planes become packed depth-plus-stencil attachments with the guest compare and update operations. Multisample depth uses the MSAA path. Compressed Z-range and hierarchical Z inside HTILE are not fully interpreted.",
        ],
      },
      {
        heading: "What is still explicit",
        paragraphs: [
          "The remaining work, stated in the GPU notes, is the rest of the layer views, the remaining compressed DCC and FMASK states, HTILE Z-range and Hi-Z, and CMASK states that are coupled to FMASK. An unsupported MSAA import keeps a first-use clear. Sampling the compressed surface as if it were plain texels is the failure this refusal exists to avoid.",
          "Metadata support is therefore partial on purpose. The pointers are decoded. The layouts that have been validated are honored. The layouts that have not been validated are rejected or cleared.",
        ],
      },
    ],
    works: [
      "HTILE pattern-21 addressing, one dword per 8×8, in 32 KiB blocks.",
      "HTILE and DCC clears for the layouts the renderer understands.",
      "Linear-CMASK detection that refuses a tiled equation on a linear mask.",
      "Opt-in single-sample depth and stencil import and writeback.",
    ],
    gaps: [
      "Full HTILE Z-range and hierarchical-Z interpretation is incomplete.",
      "Compressed DCC and FMASK states, and CMASK coupled to FMASK, remain outside the fast path.",
      "An unsupported compressed import is cleared rather than sampled as raw texels.",
    ],
  },

  detile: {
    title: "Texture detiling",
    summary:
      "PS5 textures are stored in GFX10 swizzle patterns, not in linear rows. PS5PCEM applies the address equations on the CPU, and on the GPU for the large 4, 8 and 16-byte surfaces that qualify.",
    sections: [
      {
        heading: "The address equations",
        paragraphs: [
          "A tiled texture XORs the pixel coordinate with pipe, bank and sample bits so that neighbouring pixels land in different memory channels. PS5PCEM implements the GFX10 equations for linear layouts, Standard 256-byte, 4 KiB and 64 KiB tiles, partially resident 64 KiB tiles, depth Z_X and render-target R_X. The same contract covers mip tails and thick 3D blocks.",
          "Up to sixteen mip levels are placed smallest first. Small levels share the exact 4 KiB and 64 KiB mip-tail positions. Three-dimensional resources use thick blocks and depth block-slices. Every subresource exposes one checked source-byte offset. Buffer, image, block-compressed, color-target and depth-target adapters allocate nothing and reject an overflow or a short range.",
        ],
      },
      {
        heading: "GPU detile and the CPU fallback",
        paragraphs: [
          "First-use uploads of large 4-byte standard 256-byte, 4 KiB and 64 KiB surfaces, and large linear surfaces, detile on the GPU. The compute kernel receives a pointer-free key and an 84-byte parameter block: block size, tail, pitch, slice, sample count and a 64-bit buffer offset, in a stable all-32-bit layout. Eight-byte and sixteen-byte 2D and 3D standard and PRT surfaces are in the same GPU family.",
          "Other families stay on the CPU, including RB+ and MSAA. The Oberon equations for those include the sample bits, and the CPU path uses them. Falling back is a bandwidth cost. It is not a different pixel format. Diagnostics on a live draw report the family, the 3D block dimensions, the sample count, the mip-tail boundary and the guest allocation size.",
        ],
      },
      {
        heading: "Why detile shows up in frame time",
        paragraphs: [
          "A texture that is re-uploaded every frame pays the detile cost every frame. The page tracker, when it is enabled, lets an unchanged page stay resident so the detile is skipped. A texture the GPU itself rewrote still has to be invalidated. Detile does not replace that coherency rule.",
          "Sampled views detile the mip range the descriptor names, including a non-zero base level. The Vulkan image's mip 0 is the view's base level in that case. Component swizzles that are still missing from the view path are a separate limitation from the address equation.",
        ],
      },
    ],
    works: [
      "GFX10 linear, Standard, PRT, depth and render-target address equations, including mip tails and 3D blocks.",
      "GPU compute detile for large 4, 8 and 16-byte 2D and 3D standard and PRT surfaces.",
      "CPU detile for the remaining families, including MSAA and RB+ sample bits.",
      "Checked subresource offsets that reject short ranges and overflows.",
    ],
    gaps: [
      "MSAA and RB+ detile run on the CPU.",
      "Some component swizzles and layer views are still incomplete.",
      "A surface the CPU writes after upload has to be invalidated before it is sampled again.",
    ],
  },

  "page-tracker": {
    title: "GPU page tracker",
    summary:
      "The opt-in page tracker watches 16 KiB guest pages. The first native CPU store faults, advances a generation, and invalidates the GPU copy so unchanged pages do not get hashed and uploaded every frame.",
    sections: [
      {
        heading: "The problem it addresses",
        paragraphs: [
          "A render target or a vertex buffer that lives in guest memory has to reach the GPU. Uploading the whole allocation every frame is correct and expensive. Hashing the whole allocation to discover that it did not change is also expensive. The page tracker instead marks a tracked writable page read-only and lets the CPU fault on the first store.",
          "The fault handler records the page, restores the guest's real protection, and advances that page's generation. A later draw compares generations. An unchanged page stays on the device. A page whose generation moved is uploaded. PS5_GPU_PAGE_TRACKER=1 enables the mechanism. It is off unless that variable, or the experimental bundle, is set.",
        ],
      },
      {
        heading: "What the fault is",
        paragraphs: [
          "The fault is an invalidation, not a guest bug. The page was read-only only so the host could observe the write. The guest store is then allowed to complete under the protection the title asked for. Pages that are not tracked keep the ordinary upload path.",
          "Direct-memory mappings that are recreated with the same address, size, physical offset and CPU permissions keep their host views. That reuse is what makes a generation meaningful across frames. A change of backing or of permissions takes the normal replacement path and the tracker observes the new mapping.",
        ],
      },
      {
        heading: "What it does not do",
        paragraphs: [
          "The tracker does not make a title's internal resolution smaller, and it does not compile shaders. It only removes repeated transfers of pages the CPU did not store to. A title that rewrites a buffer every frame still pays for that buffer.",
          "Font atlas writes and other HLE stores invalidate the watches before they modify guest memory, so a firmware write is not invisible to the GPU. The tracker is part of the experimental GPU set described in the architecture overview.",
        ],
      },
    ],
    works: [
      "Per-page generations for 16 KiB guest pages when PS5_GPU_PAGE_TRACKER=1.",
      "A first-store fault that restores guest protection and invalidates the resident copy.",
      "Reuse of identical direct-memory views so generations survive across frames.",
      "Invalidation when HLE itself writes a watched page.",
    ],
    gaps: [
      "The tracker is opt-in. The default compatibility path does not depend on it.",
      "Pages the CPU rewrites every frame are still uploaded.",
      "It does not cover GPU-to-GPU coherency inside a compressed metadata surface.",
    ],
  },

  videoout: {
    title: "VideoOut",
    summary:
      "VideoOut registers the guest's display buffers and completes a flip only after the presentation callback has accepted the frame. The host window is a Vulkan swapchain at 1080p SDR.",
    sections: [
      {
        heading: "Registration and flips",
        paragraphs: [
          "VideoOut keeps up to sixteen registered display allocations and four attribute groups. It publishes the contiguous sixteen-label record the driver ABI uses. Register, change and unregister are validated. A blank flip of buffer -1, which titles use during startup, is accepted.",
          "CPU flips and end-of-pipe flips go through the live command-buffer backend. A normal flip becomes complete only after the presentation callback accepts the frame. Completion is delivered on the VideoOut event queue with the caller's user data. The queue filter is the same user-edge event implementation the kernel uses, and the registration's identifier is preserved.",
        ],
      },
      {
        heading: "What the host presents",
        paragraphs: [
          "The game window is a Vulkan swapchain. VideoOut reports 1080p SDR. 120 Hz is reported unavailable. The default game preference asks for performance mode. Internal resolution stays under the title's control: a game that renders at 4K still allocates 4K targets, and the swapchain presents the scanout the title registered.",
          "SetFlip resolves the VideoOut slot and the buffer index, selects the cached target with the matching guest address, and publishes the frame. The flip rate can be shown in the window title. The launcher stores that preference, and a command-line run can set PS5_SHOW_FPS=1.",
        ],
      },
      {
        heading: "Movies and the scanout",
        paragraphs: [
          "Intro movies do not bypass VideoOut. AvPlayer decodes into title-owned buffers, and the title's own shaders or a registered scanout present them. Asterix keeps the guest's negative-height viewport as the scanout orientation, so the composite is not flipped upside down on the way out.",
          "A missing Vulkan loader, a missing presentation device or a missing window is reported, and the title continues on the headless path. Headless is for diagnostics. It is not a second, faster renderer.",
        ],
      },
    ],
    works: [
      "Up to sixteen display buffers, four attribute groups, and the sixteen-label ABI.",
      "Flips that complete only after the presentation callback accepts the frame.",
      "A Vulkan swapchain reporting 1080p SDR, with 120 Hz left unavailable.",
      "Performance-mode preference by default, and an optional flip-rate title.",
    ],
    gaps: [
      "120 Hz and a host HDR swapchain are not offered.",
      "Internal resolution is whatever the title allocates.",
      "Without a presentation device the process stays headless.",
    ],
  },

  audio: {
    title: "AudioOut",
    summary:
      "AudioOut plays guest PCM on a Windows device at 48 kHz. Legacy ports have their own streams and queues, so music and effects run together, and an underrun keeps sample order.",
    sections: [
      {
        heading: "Ports and the host device",
        paragraphs: [
          "A title submits a buffer and expects the call to last about as long as the buffer sounds. That wait comes from the host device making room, not from a sleep that throws the samples away. AudioOut, AudioIn and AudioOut2 expose paced ports, queues, speaker metadata and connected-primary state. A batch validates every port and then submits the audible quantum once, so a silent auxiliary port does not multiply the duration.",
          "Legacy AudioOut ports own separate Windows streams and PCM queues. Music and effects can play at the same time. The batch output submits each active port. After an underrun, the active ring keeps its sample order, and a short fade takes the click off the resume. The WinMM device pre-rolls real PCM and uses a one-millisecond timer period.",
        ],
      },
      {
        heading: "Latency",
        paragraphs: [
          "The ordinary reserve starts at 42 ms and grows in steps of four buffers, up to about 170 ms, only when the running title actually starves the device. The measured profile for PPSA25872 starts at 128 ms because its mixer can pause for roughly 100 to 120 ms during startup and scene work. That larger reserve is not imposed on other titles.",
          "Non-finite samples are replaced before they reach the device. That sanitizer protects the speakers. It cannot repair a filter that has already stored a NaN. The ACM page describes the convolution bug that was producing those values in Subnautica.",
        ],
      },
      {
        heading: "Where output exists",
        paragraphs: [
          "Failure to open a device is not reported to the title. A missing sound card is a fact about the host. The caller falls back to a paced silent wait so the title's timing still advances. The same happens if the device dies mid-run. Output is implemented on Windows. Other builds keep the ports silent and correctly paced.",
          "Direct fallback mixing of decoded preview clips is off by default. Playing a preview beside the title's own AudioOut mix is heard as an echo. PS5_AUDIO_FALLBACK_MIX=1 turns that mix on. The launcher can mute the device with its sound setting, which arrives as PS5_AUDIO_DISABLED.",
        ],
      },
    ],
    works: [
      "48 kHz host playback with paced AudioOut, AudioIn and AudioOut2 ports.",
      "Separate Windows streams for legacy ports, so concurrent music and effects stay ordered.",
      "A reserve that starts at 42 ms and grows only when the device starves, up to about 170 ms.",
      "Replacement of non-finite samples, and a silent paced fallback when no device opens.",
    ],
    gaps: [
      "Host output is Windows-only.",
      "Controller vibration is not driven from an audio haptics track.",
      "The sanitizer does not reconstruct a filter history that was already poisoned.",
    ],
  },

  acm: {
    title: "ACM convolution",
    summary:
      "ACM convolution runs FMOD's partitioned reverb on the CPU. Shared-input batches transform one dry signal, apply float or half-float impulse partitions, and overlap-add the wet result.",
    sections: [
      {
        heading: "The bug it closed",
        paragraphs: [
          "Subnautica: Below Zero could start with a crackle, fall silent, and recover minutes later. The PCM reaching the host device contained non-finite floats. An in-memory trace of FMOD's DSP callbacks showed finite audio entering the convolution reverb and garbage leaving it. The HLE functions sceAcm_ConvReverb_SharedInput, the batch submit and sceAcmBatchWait were returning success without writing an output.",
          "FMOD then mixed that unwritten wet buffer into the graph. The NaNs spread through later effects. AudioOut's sanitizer replaced them with silence and could not repair the poisoned filter history. A second error made the wait on the initial batch identifier -1 succeed. FMOD treats a failed initial wait as 'there is no previous wet buffer yet' and only mixes after a real completed job.",
        ],
      },
      {
        heading: "Partitioned convolution",
        paragraphs: [
          "The descriptor layout matches the one observed in FMOD's ACM backend. Impulse-response partitions are interleaved complex bins. A block of B bins belongs to a transform of length 2B. Input, output and overlap buffers are separate and planar. Only the observed zero-offset float32 and float16 spectrum layouts are accepted.",
          "A batch runs on the CPU. Input history is kept across grains and across the ring wrap, and the overlap is carried into the next output grain. Several outputs can share one input transform and one history advance. Mono input can feed more than one channel. The inverse transform is normalized. An independent inverse of a real impulse partition put its energy in the first half of the zero-padded block, which confirms the spectrum sign. The packed impulse the game uses omits the Nyquist bin.",
        ],
      },
      {
        heading: "Waits, limits and the retest",
        paragraphs: [
          "Builders capture pointer arrays and gains into a bounded command record. The PCM itself is read when the batch starts. A wait succeeds only for a batch that this context actually completed. Destroying the context releases the history. Invalid bounds, unknown command encodings and unsupported layouts return errors.",
          "Standalone ACM FFT, IFFT and panner operations are not implemented. Channels are capped at 8, outputs at 32 and the block at 1024. History storage is bounded. On the signed runner, 90 once-per-second PCM snapshots contained no non-finite samples, with a peak of 0.1255 and the first audio above 0.001 at 11.03 seconds. The maintainer confirmed the sound. The samples are a probe, not every sample the game emitted.",
        ],
      },
    ],
    works: [
      "Partitioned FFT convolution for FMOD's shared-input and shared-IR reverb batches.",
      "Float32 and float16 complex spectra, overlap-add, and history across grains.",
      "Waits that succeed only for a completed batch of that context. The initial -1 identifier fails.",
      "Finite PCM on the Subnautica retest, with the crackle and the later silence gone.",
    ],
    gaps: [
      "Standalone ACM FFT, IFFT and panner calls are unimplemented.",
      "Nonzero spectrum offsets and unmeasured routing layouts are rejected.",
      "The convolution runs on the CPU. There is no GPU FFT path.",
    ],
  },

  ajm: {
    title: "AJM codecs",
    summary:
      "AJM decodes ATRAC9, MP3, MPEG-4 AAC and Opus. Each codec instance keeps its own state, and an unknown codec is rejected instead of being reported as silent success.",
    sections: [
      {
        heading: "Codecs and sample formats",
        paragraphs: [
          "Codec 0 is MP3, through minimp3. Codec 1 is ATRAC9. Codec 2 is MPEG-4 AAC, through FAAD2, for ADTS, raw and SAF jobs. Codec 24 is Opus, through libopus. ATRAC9 output can be signed 16-bit, signed 32-bit, float, or planar. Initialize, codec info, gapless metadata, stream byte counts, decoded-frame counts and total sample sidebands are preserved.",
          "Jobs may use a contiguous buffer or a split buffer. The instance state is per decoder, so two streams do not share a bit reservoir. The legacy libSceAudiodec path uses the same backend for ATRAC9, MP3 and AAC after its own init, create, reset and delete calls.",
        ],
      },
      {
        heading: "Movie audio and previews",
        paragraphs: [
          "The observed PlayStation 5 multichannel ATRAC9 layout is decoded as interleaved mono streams. Ghost of Yōtei's movie audio starts at the correct point because of that layout. A haptics track the movie carries is timed with silence. Controller vibration is not synthesized from it.",
          "FSB-backed fallback previews are resampled to the 48 kHz mix, given a short fade, and drained once. They are not mixed into the live AudioOut graph unless PS5_AUDIO_FALLBACK_MIX=1, because a second copy of the same clip is an echo.",
        ],
      },
      {
        heading: "Licenses",
        paragraphs: [
          "ATRAC9, FAAD2, minimp3 and Opus are third-party decoders. Their licenses ship in the repository's docs/licenses directory and with the portable build. The emulator's own code stays GPL-3.0-or-later.",
          "A codec number outside the four implemented values is an error. Returning a buffer of zeros and a success code would let a title believe the stream had been decoded.",
        ],
      },
    ],
    works: [
      "ATRAC9, MP3, MPEG-4 AAC and Opus, with per-instance decoder state.",
      "ATRAC9 output as signed 16-bit, signed 32-bit, float or planar PCM.",
      "Gapless and sideband metadata, contiguous and split input buffers.",
      "The shared backend behind libSceAudiodec.",
    ],
    gaps: [
      "Unknown AJM codec numbers are rejected.",
      "Haptics tracks stay silent. Vibration is not emulated from them.",
      "Fallback preview mixing is off unless PS5_AUDIO_FALLBACK_MIX=1.",
    ],
  },

  ngs2: {
    title: "NGS2",
    summary:
      "NGS2 keeps system, rack and voice handles, parses ordinary RIFF/WAVE data, and paces a silent 48 kHz grain so a software-DSP worker cannot spin. Voice synthesis itself is incomplete.",
    sections: [
      {
        heading: "Handles and parameters",
        paragraphs: [
          "A title creates an NGS2 system, racks and voices and then walks a linked list of parameter changes. PS5PCEM issues stable handles, checks that a child still belongs to a live parent, and walks those lists inside a bound. Play, pause, resume, stop and kill are applied when the voice is rendered. State is reported with the exact 32-bit flags the guest reads.",
          "Ordinary RIFF/WAVE geometry is parsed. A neutral pan matrix is preserved, so a voice that has not been panned does not pick up a stale matrix from another voice. The grain is float32.",
        ],
      },
      {
        heading: "Why the grain is paced",
        paragraphs: [
          "Each silent render grain is paced at 48 kHz. Without that wait, a title's software-DSP worker calls the renderer in a tight loop and takes a whole host core. The pace matches the AudioOut clock so the worker sleeps for about the length of the grain.",
          "The samples themselves are silence. Actual NGS2 voice synthesis and mixing are not implemented. A title whose soundtrack is produced entirely inside NGS2 will not hear those voices through this path. Titles that decode with AJM and submit PCM to AudioOut do not need NGS2 synthesis.",
        ],
      },
    ],
    works: [
      "Stable system, rack and voice handles with parent lifetime checks.",
      "RIFF/WAVE geometry, bounded parameter lists, and exact 32-bit state flags.",
      "Play, pause, resume, stop and kill applied on render, with a neutral pan matrix.",
      "A silent float32 grain paced at 48 kHz.",
    ],
    gaps: [
      "Voice synthesis and the NGS2 mixer are not implemented.",
      "The paced grain is silence, so an NGS2-only score stays quiet.",
      "Custom DSP plugins inside a voice are outside this model.",
    ],
  },
  avplayer: {
    title: "AvPlayer",
    summary:
      "SceAvPlayer decodes movie containers with FFmpeg into title-owned NV12 frames and 48 kHz stereo PCM. Playback ends when the source duration passes, even if the title never reads one of the streams.",
    sections: [
      {
        heading: "Buffers the title owns",
        paragraphs: [
          "The player uses the title's allocation callbacks and the title's file callbacks. FFmpeg probes the container and decodes video to source-resolution NV12 and audio to interleaved signed 16-bit stereo at 48 kHz. Video and audio have separate locks and separate decoder processes. Timestamps share one monotonic clock.",
          "Pause, seek, loop and end-of-stream are retained. The software-decoder ABI reports aligned pitch, allocation height and the visible crop. Both the extended and the legacy stream-info calls exist. Current time, normal-speed trick mode, stream disable and a bounded media clock cover the Unity middleware Asterix ships.",
        ],
      },
      {
        heading: "Ending a movie the title only half-reads",
        paragraphs: [
          "A title may take the pictures and mix its own sound, or the other way around. Waiting until every stream has been read keeps that player alive for the rest of the process. Jurassic Park Classic Games Collection sat on its intro for this reason: the clock was ninety seconds past a three-second clip because the unread audio stream never ended.",
          "The duration comes from the source. When the clock passes it, playback ends even if a stream was ignored. While a stream is still delivering, the reported position stays within the frames actually handed over, so a slow machine is not cut off early. Once the stream has genuinely ended, the clock may run to the duration. Looping sources and sources of unknown length are left alone.",
        ],
      },
      {
        heading: "Presentation",
        paragraphs: [
          "Observed intro movies play at about their native frame rate in ReleaseFast builds. The last valid image is retained while Unity changes clips, instead of presenting a cleared decoder surface as a solid color. A 1920×1080 source can be scaled into the scanout target the title registered.",
          "The haptics track is timed and silent. AvPlayer does not drive a controller. The pixels reach the screen through the title's shaders or through VideoOut, not through a second compositor inside the player.",
        ],
      },
    ],
    works: [
      "FFmpeg decode to NV12 video and 48 kHz stereo PCM, in title-owned buffers.",
      "Extended and legacy stream info, pause, seek, loop, and a shared media clock.",
      "End of playback at the source duration when the title leaves a stream unread.",
      "Retention of the last valid frame across a clip change.",
    ],
    gaps: [
      "Haptics are silence. Controller vibration is not emulated.",
      "Looping and unknown-length sources are not cut off by the duration rule.",
      "A missing file callback or a container FFmpeg cannot probe fails that asset.",
    ],
  },

  cpu: {
    title: "Native guest execution",
    summary:
      "On Windows x86-64 the guest's machine code runs directly. One host worker carries each guest pthread, and the FS base is restored after every blocking call because Windows does not keep it.",
    sections: [
      {
        heading: "One worker per guest thread",
        paragraphs: [
          "The dispatcher starts one host worker for each guest pthread, installs that thread's TLS, and enters the guest at the requested address with the System V argument registers. Join, detach, yield, sleep, nested callbacks and scePthreadExit all come back through this path. The HLE thread is completed only after guest execution has left that context.",
          "The bridge checks that the entry point is executable and that the stack and TLS are mapped. It saves the Windows nonvolatile registers, MXCSR and the x87 control word, switches to the guest stack, installs the guest FS base, and calls the entry. A synchronous scePthreadExit leaves through a native escape that discards the guest frames and restores the host FS before the dispatcher sees the interrupt.",
        ],
      },
      {
        heading: "Windows drops the FS base",
        paragraphs: [
          "Installing FS once is not enough. Windows does not preserve a user-written FS base across a context switch. After a sleep, rdfsbase reads zero again. Guest code keeps its thread-local storage in FS, under the System V convention, so the next FS-relative access would fault near address zero. Nothing in the guest is wrong. The host dropped a register the guest is entitled to rely on.",
          "The dispatcher therefore restores FS after blocking calls. Waits use a sequence-aware futex so a wake that arrives between an unlock and the park is consumed once, and a broadcast remains visible to every waiter that observed the older sequence. If the fixed wake history is ever saturated, the dispatcher over-wakes and lets HLE recheck the object. Timed sleeps use a private non-alertable delay so an unrelated wake cannot turn an audio worker into a spin.",
        ],
      },
      {
        heading: "Faults and other operating systems",
        paragraphs: [
          "A faulting guest thread is contained. Diagnostics attribute the address to a module and a symbol when they can, and the process does not have to die with an unhandled host exception. PS5_CPU_WAIT_DIAGNOSTICS=1 turns the verbose wait trace back on. It is off during normal play because several parked workers printing at once can themselves stall a frame.",
          "Native execution requires Windows x86-64 and the RDWRFSGSBASE processor feature. Linux and macOS builds still compile the decoder, the loader and HLE, and they report the native bridge as unsupported. Guest binaries are x86-64 machine code. They are not interpreted.",
        ],
      },
    ],
    works: [
      "Native x86-64 guest execution on Windows, one host worker per guest pthread.",
      "System V calls, guest stacks, and FS restored after blocking calls.",
      "Sequence-aware waits, contained faults, and pthread exit that restores the host.",
      "Inspection, decoding and HLE on Linux and macOS, without native execution.",
    ],
    gaps: [
      "There is no interpreter. Hosts other than Windows x86-64 do not run the guest.",
      "A CPU that cannot write FS and GS bases cannot enter the native bridge.",
      "Verbose wait diagnostics are off by default because their printing stalls play.",
    ],
  },

  loader: {
    title: "ELF and SELF loading",
    summary:
      "The loader maps decrypted PS5 SELF and bare ELF64 modules, applies relocations, and resolves imports against the HLE registry. The title then receives stable handles for modules it starts itself.",
    sections: [
      {
        heading: "Images",
        paragraphs: [
          "A PlayStation 5 executable is usually a SELF container around an ELF64 image. PS5PCEM reads both the container and a bare ELF. The reader collects imports, maps segments into the reserved guest address space, and applies relocations. TLS images are registered with the threads that will run them.",
          "The tooling can inspect a module, dump a relocated dependency graph, or disassemble a shader without starting the title. game-run is the path that loads, initializes HLE, and enters the guest. When the decrypted eboot.bin lives apart from the install, --app0 points the read-only mount at the content directory.",
        ],
      },
      {
        heading: "Modules the title starts later",
        paragraphs: [
          "The runtime maps the reachable dependency graph, plus anything named in PS5_PRELOAD, before guest code runs. sceKernelLoadStartModule then returns a stable handle for a module in that set. Loading it again does not create a second relocated copy. sceKernelDlsym hashes the name the title passed and searches only the module the handle selected, so two plugins that export the same callback do not alias.",
          "Path matching ignores slash direction and case. One observed title asks for Il2CppUserAssemblies.prx and ships Il2cppUserAssemblies.prx. An exact match would refuse a file the title installed. The relative path is tried before the bare file name, so two modules that share a file name stay distinct. A module that was not in the published set returns ENOENT. It is not mapped while guest threads are already running.",
        ],
      },
      {
        heading: "Unity plugins",
        paragraphs: [
          "Unity plugins can be mapped with their constructors deferred. sceKernelLoadStartModule then starts them once, with the title's real argument block, instead of running those constructors during graph initialization. That ordering is the difference between a plugin that sees its arguments and a plugin that starts too early.",
          "The loader does not decrypt a retail SELF. The input is a decrypted image the user is entitled to load. Encrypted packages are the PKG tool's problem, and retail encryption is outside that tool as well.",
        ],
      },
    ],
    works: [
      "ELF64 and decrypted SELF mapping, relocation, imports and TLS.",
      "A preloaded dependency graph and stable sceKernelLoadStartModule handles.",
      "Dlsym limited to the selected module, with case-insensitive path matching.",
      "Deferred constructors for Unity plugins so they start with the real arguments.",
    ],
    gaps: [
      "A module that appears only after startup, and was not preloaded, returns ENOENT.",
      "Encrypted retail SELF images are not decrypted.",
      "Inspection builds do not execute the loaded image on non-Windows hosts.",
    ],
  },

  input: {
    title: "Controllers and keyboard",
    summary:
      "DualSense, DualSense Edge and DualShock 4 are read over HID, on USB and Bluetooth. Xbox-compatible pads use XInput. The keyboard maps to the sticks through a launcher profile.",
    sections: [
      {
        heading: "HID reports",
        paragraphs: [
          "XInput enumerates Xbox-compatible devices. A DualSense plugged into the PC is invisible to it unless a translation layer invents a virtual Xbox pad. PS5PCEM opens the Sony pad over HID and decodes the report. The fields are the same on USB and Bluetooth. The offsets move, because Bluetooth prefixes the payload, and the DualSense places its triggers ahead of the button bytes.",
          "The d-pad arrives as one of eight compass positions, not as four independent bits. Reads are overlapped and never block. A poll drains the driver's queue and keeps the newest report. Answering with the oldest report would lag the sticks by however far behind the frame had fallen.",
        ],
      },
      {
        heading: "Output, motors and the light bar",
        paragraphs: [
          "Output reports carry both motors and the light bar. On Bluetooth the report is shifted and ends with a checksum the pad checks before it acts, so a report built for the cable is ignored over the air. The launcher's input page names the pad it found and can run a one-second test that spins both motors and sweeps the light bar. The device is opened shared, and for writing where the host allows it.",
          "The pad takes precedence over XInput. XInput remains the path for Xbox-compatible controllers and for anything that presents itself as one. The launcher stores the choice, the controller index and the keyboard bindings, and passes them to game-run as environment variables.",
        ],
      },
      {
        heading: "Keyboard and scripted input",
        paragraphs: [
          "WASD is the left stick. Alt plus the arrow keys is the right stick. Profiles can be controller, keyboard, or both. PS5_INPUT_MODE=scripted keeps the bring-up button pulses and ignores the physical devices, so a keypress in another window does not change a measured scene.",
          "Inside HLE, the primary pad can be opened with scePadOpen or obtained with scePadGetHandle. The second path matters for titles that never open the logged-in user's controller before they poll it. This is the host side of that handle.",
        ],
      },
    ],
    works: [
      "DualSense, DualSense Edge and DualShock 4 over USB and Bluetooth HID.",
      "Newest-report polling, motors, light bar, and a Bluetooth checksum.",
      "XInput for Xbox-compatible pads, and remappable keyboard profiles.",
      "A scripted input mode that ignores physical devices during measurements.",
    ],
    gaps: [
      "Touchpad, adaptive triggers and motion sensors are not a full DualSense feature set.",
      "Haptics from a movie track are not routed to the motors.",
      "The HID path is the Windows host path used by the launcher and game-run.",
    ],
  },

  pkg: {
    title: "PKG extractor",
    summary:
      "pkgextractor unpacks the debug FPKG layouts observed in development: the outer package, inner PFS, NAPS name maps and Kraken-compressed payloads. Encrypted retail packages are out of scope.",
    sections: [
      {
        heading: "What a debug package contains",
        paragraphs: [
          "A PlayStation 5 package wraps a file system. The debug layouts PS5PCEM has observed use an outer package, an inner PFS image, a NAPS table that maps package names to files, and payloads compressed with Kraken. The extractor walks those layers and writes the files out. It ships beside the launcher as pkgextractor.exe, and the launcher has an Extract PKG button that drives it.",
          "The October 2 development extractor fixes InvalidPfs for Grand Theft Auto III: The Definitive Edition, PPSA03527 version 1.007. All 48 files extract, including eboot.bin, six modules and both PAK archives, and both PAK index checksums match. Twenty-one package tests pass. That report did not launch the game. Extraction and execution are separate claims.",
        ],
      },
      {
        heading: "Retail encryption",
        paragraphs: [
          "Encrypted retail packages are not supported. No keys are included or implied. A package the observed debug parser does not recognise fails the parse. It is not partially extracted into a directory that looks complete.",
          "The legal boundary matches the rest of the project. The tool exists so a person who already has a dump they are entitled to use can feed the loader. The site and the emulator do not distribute games, firmware or keys.",
        ],
      },
      {
        heading: "After extraction",
        paragraphs: [
          "The loader reads the decrypted eboot.bin and mounts the content directory as /app0. A typical layout keeps eboot.bin in the package root or in a decrypted subdirectory. The launcher looks in both. Savedata is not inside the package. It lives under the emulator home, keyed by title ID.",
          "Kraken, NAPS and PFS here are package-file mechanisms. They are not the GPU swizzle, the AMPR engine, or the audio codecs, which are easy to confuse with them because those also compress or remap data.",
        ],
      },
    ],
    works: [
      "Observed debug FPKG layouts, inner PFS, NAPS name maps and Kraken payloads.",
      "A command-line extractor and a launcher button.",
      "The GTA III development extraction: 48 files and matching PAK index checksums.",
      "Twenty-one package tests passing on that extractor.",
    ],
    gaps: [
      "Encrypted retail packages are not supported, and no keys ship with the tool.",
      "An unrecognised layout fails. It is not emitted as a partial tree.",
      "A successful extract is not a statement that the title then runs.",
    ],
  },
};

export default tech;
