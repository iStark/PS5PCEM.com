import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CompatibilityTable } from "@/components/CompatibilityTable";
import { sortedCompatibility } from "@/data/compatibility";

function renderTable() {
  return render(<CompatibilityTable entries={sortedCompatibility()} />);
}

describe("<CompatibilityTable />", () => {
  it("lists every tested title by default", () => {
    renderTable();
    const entries = sortedCompatibility();

    expect(
      screen.getByText(`Showing ${entries.length} of ${entries.length} tested titles.`),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Cat Quest III" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Pistol Whip" }),
    ).toBeInTheDocument();
  });

  it("filters down to the completable titles", async () => {
    const user = userEvent.setup();
    renderTable();

    await user.click(screen.getByRole("button", { name: /^Playable/ }));

    expect(
      screen.getByRole("heading", { name: "Terminator 2D: No Fate" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Pistol Whip" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText(/Showing 6 of 14 tested titles\./)).toBeInTheDocument();
  });

  it("marks the active filter as pressed", async () => {
    const user = userEvent.setup();
    renderTable();

    const all = screen.getByRole("button", { name: /^All titles/ });
    const inGame = screen.getByRole("button", { name: /^In-game/ });

    expect(all).toHaveAttribute("aria-pressed", "true");
    await user.click(inGame);
    expect(inGame).toHaveAttribute("aria-pressed", "true");
    expect(all).toHaveAttribute("aria-pressed", "false");
  });

  it("searches by title", async () => {
    const user = userEvent.setup();
    renderTable();

    await user.type(screen.getByLabelText("Search titles"), "precinct");

    expect(
      screen.getByRole("heading", { name: "The Precinct" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Cat Quest III" }),
    ).not.toBeInTheDocument();
  });

  it("explains an empty search rather than showing nothing", async () => {
    const user = userEvent.setup();
    renderTable();

    await user.type(screen.getByLabelText("Search titles"), "bloodborne");

    expect(
      screen.getByText("No tested title matches that search."),
    ).toBeInTheDocument();
  });

  it("keeps full results collapsed until asked for", async () => {
    const user = userEvent.setup();
    renderTable();

    const yotei = screen
      .getByRole("heading", { name: "Ghost of Yōtei" })
      .closest("li");
    expect(yotei).not.toBeNull();

    const toggle = within(yotei as HTMLElement).getByRole("button", {
      name: /Full result and known limits/,
    });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(
      within(yotei as HTMLElement).getByText(/Gameplay itself/),
    ).toBeVisible();
  });

  it("shows only one expanded result at a time", async () => {
    const user = userEvent.setup();
    renderTable();

    const toggles = screen.getAllByRole("button", {
      name: /Full result and known limits/,
    });

    await user.click(toggles[0]);
    expect(toggles[0]).toHaveAttribute("aria-expanded", "true");

    await user.click(toggles[1]);
    expect(toggles[1]).toHaveAttribute("aria-expanded", "true");
    expect(toggles[0]).toHaveAttribute("aria-expanded", "false");
  });

  it("gives every screenshot descriptive alternative text", () => {
    renderTable();

    for (const image of screen.getAllByRole("img")) {
      expect(image.getAttribute("alt")?.length ?? 0).toBeGreaterThan(10);
    }
  });
});
