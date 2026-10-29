import type { HistoryEntry } from "@/data/history";

export function GraphicsApiBadge({ api, unknownLabel }: {
  api: HistoryEntry["graphicsApi"];
  unknownLabel: string;
}) {
  return (
    <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${
      api === "d3d12"
        ? "border-sky-400/40 bg-sky-400/10 text-sky-300"
        : api === "vulkan"
          ? "border-amber-400/40 bg-amber-400/10 text-amber-300"
          : "border-ink-600 bg-ink-850 text-ink-400"
    }`}>
      {api === "d3d12" ? "DirectX 12" : api === "vulkan" ? "Vulkan" : unknownLabel}
    </span>
  );
}
