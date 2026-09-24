/**
 * PKG extractor copy, mirroring the behaviour of zig-out/bin/pkgextractor.exe
 * in the PS5PCEM repository.
 */

export const extractor = {
  binary: "pkgextractor.exe",
  cli: "pkgextractor <game.pkg> [-o <output-dir>]",
  title: "PS5 package extractor",
  summary:
    "Included with PS5PCEM 0.3.2, pkgextractor reads supported PS5 debug packages (FPKG / FIH), writes sce_sys metadata, and extracts application files from the inner PFS, including observed NAPS layouts and Kraken-compressed payloads.",
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
    body: "After a successful extraction, select the output folder like any other dump. Supported debug packages include eboot.bin, sce_module files, and the inner application assets. Extraction alone does not guarantee that a title is compatible with the emulator.",
  },
] as const;

export const extractorWrites = [
  "eboot.bin (uncompressed SCE_DYNEXEC SELF from the nested pfs_image.dat)",
  "sce_module/*.prx (other uncompressed SELF modules from the same image)",
  "Inner application files, including supported Kraken-compressed blocks and NAPS-mapped payloads",
  "SELF dynlib-data tails required by the extracted executables",
  "sce_sys/param.json (title id, content id, localized names)",
  "sce_sys/icon0.png and pic0.png (and their DDS siblings when present)",
  "PlayGo tables (playgo-chunk.dat, playgo-hash-table.dat, playgo-ficm.dat)",
  "Trophy and UDS archives when they are stored as unencrypted CNT entries",
] as const;

export const extractorLimits = [
  "Retail packages (FIH signed byte 0x80 / CNT-only retail images) are refused. They need console image keys that this project does not ship.",
  "Support covers the debug layouts observed in local tests; unfamiliar or damaged packages may still fail to extract.",
  "Encrypted CNT entries (licenses, some npbind records) are skipped rather than written as garbage.",
  "The tool is for dumps and debug FPKGs you are legally allowed to access. Game content is not included with the emulator.",
] as const;
