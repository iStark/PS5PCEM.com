import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RunHistoryFilter } from "@/components/RunHistoryFilter";
import { GraphicsApiBadge } from "@/components/GraphicsApiBadge";
import { history } from "@/data/history";
import { historyApiCopy } from "@/i18n/history-api";
import { locales } from "@/i18n/config";

vi.mock("next/navigation", () => ({ notFound: () => { throw new Error("notFound"); } }));
import GamePage from "@/app/[locale]/games/[slug]/page";
import { getHistoryContent } from "@/i18n";

describe("graphics API history", () => {
  it("filters actual title reports without relabelling the Vulkan result", async () => {
    const user = userEvent.setup();
    render(await GamePage({ params: Promise.resolve({ locale: "en", slug: "quake-ii-2023" }) }));
    const filters = within(screen.getByRole("group", { name: "Graphics API" }));
    const header = screen.getByRole("heading", { level: 1 }).closest("header")!;
    expect(within(header).getByText("Vulkan")).toBeInTheDocument();
    expect(within(header).queryByText("DirectX 12")).not.toBeInTheDocument();
    const dxTitle = getHistoryContent("en", "quake2-d3d12-mrt-20261029")!.title;
    const vkTitle = getHistoryContent("en", "quake-rendering")!.title;
    expect(screen.getByRole("heading", { name: dxTitle })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: vkTitle })).toBeInTheDocument();
    await user.click(filters.getByRole("button", { name: /^DirectX 12/ }));
    expect(filters.getByRole("button", { name: /^DirectX 12/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: dxTitle })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: vkTitle })).not.toBeInTheDocument();
    await user.click(filters.getByRole("button", { name: /^Vulkan/ }));
    expect(screen.queryByRole("heading", { name: dxTitle })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: vkTitle })).toBeInTheDocument();
    await user.click(filters.getByRole("button", { name: /^All/ }));
    expect(screen.getByRole("heading", { name: dxTitle })).toBeInTheDocument();
  });

  it("keeps unrecorded APIs separate and provides an empty state and keyboard controls", async () => {
    const user = userEvent.setup();
    render(<RunHistoryFilter labels={historyApiCopy.en} runs={[
      { id: "v", api: "vulkan", content: <li key="v">Vulkan run</li> },
      { id: "u", api: null, content: <li key="u">Module bootstrap</li> },
    ]} />);
    await user.tab();
    await user.tab();
    await user.keyboard("{Enter}");
    expect(screen.getByText("Vulkan run")).toBeInTheDocument();
    expect(screen.queryByText("Module bootstrap")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /^DirectX 12/ }));
    expect(screen.getByText(historyApiCopy.en.empty)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /^API not recorded/ }));
    expect(screen.getByText("Module bootstrap")).toBeInTheDocument();
    expect(screen.queryByText("Vulkan run")).not.toBeInTheDocument();
  });

  it.each(locales)("provides localized labels and an explicit badge in %s", (locale) => {
    const labels = historyApiCopy[locale];
    render(<><RunHistoryFilter runs={[]} labels={labels} /><GraphicsApiBadge api={null} unknownLabel={labels.unknown} /></>);
    expect(screen.getByRole("group", { name: labels.filter })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: `${labels.all} (0)` })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(labels.empty)).toBeInTheDocument();
    expect(screen.getByText(labels.unknown)).toBeInTheDocument();
    if (locale !== "en") expect(labels.empty).not.toBe(historyApiCopy.en.empty);
  });

  it("records APIs explicitly and preserves the known historical boundary", () => {
    expect(history.filter((run) => run.graphicsApi === "d3d12").map((run) => run.id)).toEqual([
      "quake2-d3d12-mrt-20261029", "quake2-d3d12-indirect-bias-20261029",
    ]);
    expect(history.filter((run) => run.graphicsApi === null).map((run) => run.id)).toEqual([
      "propagation-bootstrap", "pistol-whip-modules",
    ]);
    for (const run of history) expect(["vulkan", "d3d12", null]).toContain(run.graphicsApi);
    expect(history.find((run) => run.id === "quake-rendering")?.graphicsApi).toBe("vulkan");
  });
});
