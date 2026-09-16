/**
 * PKG extractor copy, mirroring the behaviour of zig-out/bin/pkgextractor.exe
 * in the PS5PCEM repository.
 */

export const extractor = {
  binary: "pkgextractor.exe",
  cli: "pkgextractor <game.pkg> [-o <output-dir>]",
  title: "PS5 package extractor",
  summary:
    "A separate command-line tool, invoked from the launcher, that reads a PS5 debug package (FPKG / FIH) and writes unencrypted metadata into an sce_sys tree the emulator already understands.",
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
    body: "game-run still needs an extracted dump with eboot.bin. Metadata extraction does not replace that; it prepares sce_sys so the launcher can show param.json and artwork while inner PFS unpacking is unfinished.",
  },
] as const;

export const extractorWrites = [
  "sce_sys/param.json (title id, content id, localized names)",
  "sce_sys/icon0.png and pic0.png (and their DDS siblings when present)",
  "PlayGo tables (playgo-chunk.dat, playgo-hash-table.dat, playgo-ficm.dat)",
  "Trophy and UDS archives when they are stored as unencrypted CNT entries",
] as const;

export const extractorLimits = [
  "Retail packages (FIH signed byte 0x80 / CNT-only retail images) are refused. They need console image keys that this project does not ship.",
  "The inner PFS that holds eboot.bin and the rest of /app0 is AES-XTS encrypted. That unpack is not implemented yet, so a package extract is not enough to boot the title.",
  "Encrypted CNT entries (licenses, some npbind records) are skipped rather than written as garbage.",
  "The tool is for dumps and debug FPKGs you are legally allowed to access. Game content is not included with the emulator.",
] as const;
