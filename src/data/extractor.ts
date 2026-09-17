/**
 * PKG extractor copy, mirroring the behaviour of zig-out/bin/pkgextractor.exe
 * in the PS5PCEM repository.
 */

export const extractor = {
  binary: "pkgextractor.exe",
  cli: "pkgextractor <game.pkg> [-o <output-dir>]",
  title: "PS5 package extractor",
  summary:
    "A separate command-line tool, invoked from the launcher, that reads a PS5 debug package (FPKG / FIH), writes unencrypted metadata into sce_sys, and unpacks uncompressed SELF modules (eboot.bin and sce_module) from the inner PFS.",
} as const;

export const extractorSteps = [
  {
    title: "From the launcher",
    body: "On the Library tab, choose Extract PKG, pick a .pkg file, and wait for the console window to finish. The output folder is created next to the package (same name, without .pkg) and becomes the selected game folder.",
  },
  {
    title: "From the command line",
    body: "Run pkgextractor.exe beside ps5pcem.exe. If -o is omitted, the tool writes to a folder named after the package stem.",
  },
  {
    title: "Then launch as usual",
    body: "The output folder is the game folder. Debug PLAIN-NOAUTH packages now include eboot.bin (and other uncompressed SELF modules under sce_module). Launch from that folder like any other dump.",
  },
] as const;

export const extractorWrites = [
  "eboot.bin (uncompressed SCE_DYNEXEC SELF from the nested pfs_image.dat)",
  "sce_module/*.prx (other uncompressed SELF modules from the same image)",
  "sce_sys/param.json (title id, content id, localized names)",
  "sce_sys/icon0.png and pic0.png (and their DDS siblings when present)",
  "PlayGo tables (playgo-chunk.dat, playgo-hash-table.dat, playgo-ficm.dat)",
  "Trophy and UDS archives when they are stored as unencrypted CNT entries",
] as const;

export const extractorLimits = [
  "Retail packages (FIH signed byte 0x80 / CNT-only retail images) are refused. They need console image keys that this project does not ship.",
  "Kraken-compressed inner payloads (level data, textures, most /app0 files) are not unpacked yet. A debug extract can launch eboot.bin but may still miss game assets.",
  "Encrypted CNT entries (licenses, some npbind records) are skipped rather than written as garbage.",
  "The tool is for dumps and debug FPKGs you are legally allowed to access. Game content is not included with the emulator.",
] as const;
