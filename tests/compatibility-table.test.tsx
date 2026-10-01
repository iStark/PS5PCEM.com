import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/en/compatibility",
}));

import { CompatibilityTable } from "@/components/CompatibilityTable";
import { buildRows } from "@/lib/rows";
import { compatibility, countByTier } from "@/data/compatibility";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

function renderTable(locale: Locale = "en") {
  return render(
    <CompatibilityTable locale={locale} rows={buildRows(locale)} />,
  );
}

const total = compatibility.length;
const playable = countByTier().playable;

describe("<CompatibilityTable />", () => {
  it("lists every title on record by default", () => {
    renderTable();

    expect(
      screen.getByText(`Showing ${total} of ${total} titles.`),
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
      screen.getByRole("heading", { name: "Quake II (2023)" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Pistol Whip" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(`Showing ${playable} of ${total} titles.`),
    ).toBeInTheDocument();
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
      screen.getByText("No title on record matches that search."),
    ).toBeInTheDocument();
  });

  it("keeps full results collapsed until asked for", async () => {
    const user = userEvent.setup();
    renderTable();

    const row = screen
      .getByRole("heading", { name: "Ghost of Yōtei" })
      .closest("li");
    expect(row).not.toBeNull();

    const toggle = within(row as HTMLElement).getByRole("button", {
      name: /Full result and known limits/,
    });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(
      within(row as HTMLElement).getByText(/remains unverified/i),
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

  it("links every row to its own test history", () => {
    renderTable();

    const link = screen.getByRole("heading", { name: "Cat Quest III" })
      .querySelector("a");
    expect(link).toHaveAttribute("href", "/en/games/cat-quest-iii");
  });

  it("gives every capture descriptive alternative text", () => {
    renderTable();

    for (const image of screen.getAllByRole("img")) {
      expect(image.getAttribute("alt")?.length ?? 0).toBeGreaterThan(10);
    }
  });

  it("renders its own chrome in the requested language", () => {
    renderTable("ru");
    const ru = getDictionary("ru");

    expect(
      screen.getByRole("button", { name: new RegExp(ru.compatibility.filterAll) }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(ru.compatibility.searchLabel)).toBeInTheDocument();
    // Title names are proper nouns and stay untranslated.
    expect(
      screen.getByRole("heading", { name: "Cat Quest III" }),
    ).toBeInTheDocument();
  });

  it("points Russian rows at Russian detail pages", () => {
    renderTable("ru");

    const link = screen.getByRole("heading", { name: "Cat Quest III" })
      .querySelector("a");
    expect(link).toHaveAttribute("href", "/ru/games/cat-quest-iii");
  });
});
