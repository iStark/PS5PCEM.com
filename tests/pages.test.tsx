import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/en",
  notFound: () => {
    throw new Error("notFound() called");
  },
}));

import HomePage from "@/app/[locale]/page";
import DownloadPage from "@/app/[locale]/download/page";
import CompatibilityPage from "@/app/[locale]/compatibility/page";
import StatusPage from "@/app/[locale]/status/page";
import MediaPage from "@/app/[locale]/media/page";
import ExtractPage from "@/app/[locale]/extract/page";
import GamePage from "@/app/[locale]/games/[slug]/page";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { latestRelease } from "@/data/release";
import { site } from "@/data/site";
import { compatibility, countByTier } from "@/data/compatibility";
import { historyFor } from "@/data/history";
import { subsystems } from "@/data/subsystems";
import { getDictionary, getGameContent, getHistoryContent } from "@/i18n";
import type { Locale } from "@/i18n/config";

/** Server components are async; render the resolved element. */
async function renderPage(
  Page: (props: {
    params: Promise<{ locale: string }>;
  }) => Promise<React.ReactElement>,
  locale: Locale = "en",
) {
  return render(await Page({ params: Promise.resolve({ locale }) }));
}

async function renderGame(slug: string, locale: Locale = "en") {
  return render(
    await GamePage({ params: Promise.resolve({ locale, slug }) }),
  );
}

describe("home page", () => {
  it("leads with the project and its current version", async () => {
    await renderPage(HomePage);
    const t = getDictionary("en");

    expect(
      screen.getByRole("heading", { level: 1, name: t.home.heading }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(new RegExp(latestRelease.version)).length,
    ).toBeGreaterThan(0);
  });

  it("reports the counts from the dataset", async () => {
    await renderPage(HomePage);
    const t = getDictionary("en");
    const counts = countByTier();

    const tested = screen.getByText(t.home.statTested).closest("div");
    expect(
      within(tested as HTMLElement).getByText(String(compatibility.length)),
    ).toBeInTheDocument();

    const done = screen.getByText(t.home.statPlayable).closest("div");
    expect(
      within(done as HTMLElement).getByText(String(counts.playable)),
    ).toBeInTheDocument();
  });

  it("links to localized pages and to YouTube", async () => {
    await renderPage(HomePage);
    const t = getDictionary("en");

    expect(
      screen.getByRole("link", { name: t.home.ctaResults }),
    ).toHaveAttribute("href", "/en/compatibility");
    expect(
      screen.getByRole("link", { name: t.home.youtubeCta }),
    ).toHaveAttribute("href", site.links.youtube);
  });

  it("keeps the legal notice on the page", async () => {
    await renderPage(HomePage);
    expect(
      screen.getByText(getDictionary("en").home.legalTitle),
    ).toBeInTheDocument();
  });

  it("renders in Russian at /ru", async () => {
    await renderPage(HomePage, "ru");
    const ru = getDictionary("ru");

    expect(
      screen.getByRole("heading", { level: 1, name: ru.home.heading }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: ru.home.ctaResults }),
    ).toHaveAttribute("href", "/ru/compatibility");
  });
});

describe("download page", () => {
  it("offers every published asset with a working GitHub link", async () => {
    await renderPage(DownloadPage);

    for (const asset of latestRelease.assets) {
      expect(screen.getAllByText(asset.fileName).length).toBeGreaterThan(0);
    }

    const downloads = screen.getAllByRole("link", { name: "Download" });
    expect(downloads).toHaveLength(latestRelease.assets.length);
    for (const link of downloads) {
      expect(link.getAttribute("href")).toContain(
        `releases/download/${latestRelease.tag}/`,
      );
      expect(link).toHaveAttribute("target", "_blank");
      expect(link.getAttribute("rel")).toContain("noopener");
    }
  });

  it("publishes the SHA-256 digests for verification", async () => {
    await renderPage(DownloadPage);

    for (const asset of latestRelease.assets) {
      if (asset.sha256) {
        expect(screen.getByText(asset.sha256)).toBeInTheDocument();
      }
    }
  });

  it("explains the code signature", async () => {
    await renderPage(DownloadPage);
    expect(
      screen.getByText(getDictionary("en").download.signingTitle),
    ).toBeInTheDocument();
  });

  it("shows the release history with the latest build marked", async () => {
    await renderPage(DownloadPage);
    expect(screen.getByText("Latest")).toBeInTheDocument();
  });

  it("translates its chrome", async () => {
    await renderPage(DownloadPage, "de");
    const de = getDictionary("de");
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: de.download.requirementsHeading,
      }),
    ).toBeInTheDocument();
  });
});

describe("compatibility page", () => {
  it("frames results as observations, not guarantees", async () => {
    await renderPage(CompatibilityPage);
    const t = getDictionary("en");

    expect(
      screen.getByRole("heading", { level: 1, name: t.compatibility.heading }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/NVIDIA GeForce RTX 3070 Ti/),
    ).toBeInTheDocument();
    expect(screen.getByText(t.compatibility.noticeTitle)).toBeInTheDocument();
  });

  it("credits the emulator's status document as the source", async () => {
    await renderPage(CompatibilityPage);
    expect(
      screen.getByRole("link", {
        name: getDictionary("en").compatibility.sourceLabel,
      }),
    ).toHaveAttribute("href", site.links.projectStatus);
  });

  it("renders every title on record", async () => {
    await renderPage(CompatibilityPage);
    for (const entry of compatibility) {
      expect(
        screen.getByRole("heading", { name: entry.title }),
      ).toBeInTheDocument();
    }
  });
});

describe("title detail page", () => {
  it("shows the result, both lists and the measured timings", async () => {
    await renderGame("ghost-of-yotei");
    const t = getDictionary("en");
    const content = getGameContent("en", "ghost-of-yotei");

    expect(
      screen.getByRole("heading", { level: 1, name: "Ghost of Yōtei" }),
    ).toBeInTheDocument();
    expect(screen.getByText(content.status)).toBeInTheDocument();
    expect(screen.getByText(t.game.strengthsHeading)).toBeInTheDocument();
    expect(screen.getByText(t.game.limitsHeading)).toBeInTheDocument();
    expect(screen.getByText(content.performance!)).toBeInTheDocument();
  });

  it("lists every recorded run, newest first, with its build label", async () => {
    await renderGame("ghost-of-yotei");
    const runs = historyFor("ghost-of-yotei");

    expect(runs.length).toBeGreaterThanOrEqual(5);
    for (const run of runs) {
      const text = getHistoryContent("en", run.id);
      expect(
        screen.getByRole("heading", { name: text.title }),
      ).toBeInTheDocument();
    }

    // The newest run is dated October 5 and was never released.
    expect(runs[0].date).toBe("2026-10-05");
    expect(
      screen.getAllByText(getDictionary("en").common.developmentBuild).length,
    ).toBeGreaterThan(0);
  });

  it("links each run to the report that backs it", async () => {
    await renderGame("subnautica-below-zero");
    const t = getDictionary("en");

    const reports = screen.getAllByRole("link", {
      name: new RegExp(t.common.readReport),
    });
    expect(reports.length).toBeGreaterThan(0);
    for (const link of reports) {
      expect(link.getAttribute("href")).toContain("github.com/iStark/PS5PCEM");
      expect(link).toHaveAttribute("target", "_blank");
    }
  });

  it("renders a capture gallery from the runs that published one", async () => {
    await renderGame("big-helmet-heroes");
    // The section eyebrow reads "Captures" too, so match the heading itself.
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: getDictionary("en").game.capturesHeading,
      }),
    ).toBeInTheDocument();

    for (const image of screen.getAllByRole("img")) {
      expect(image.getAttribute("alt")?.length ?? 0).toBeGreaterThan(10);
    }
  });

  it("offers a way back to the full list", async () => {
    await renderGame("reanimal");
    const link = screen.getByRole("link", {
      name: new RegExp(getDictionary("en").game.backToList),
    });
    expect(link).toHaveAttribute("href", "/en/compatibility");
  });

  it("renders a title with no capture of its own", async () => {
    await renderGame("pistol-whip");
    expect(
      screen.getByRole("heading", { level: 1, name: "Pistol Whip" }),
    ).toBeInTheDocument();
  });

  it("renders in Russian with Russian prose and links", async () => {
    await renderGame("ghost-of-yotei", "ru");
    const ru = getDictionary("ru");

    expect(screen.getByText(ru.game.strengthsHeading)).toBeInTheDocument();
    expect(
      screen.getByText(getGameContent("ru", "ghost-of-yotei").status),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: new RegExp(ru.game.backToList) }),
    ).toHaveAttribute("href", "/ru/compatibility");
  });

  it("calls notFound() for a slug that is not on record", async () => {
    await expect(
      GamePage({ params: Promise.resolve({ locale: "en", slug: "bloodborne" }) }),
    ).rejects.toThrow("notFound() called");
  });
});

describe("status page", () => {
  it("lists every subsystem with a state", async () => {
    await renderPage(StatusPage);

    for (const subsystem of subsystems) {
      expect(
        screen.getByRole("heading", { name: subsystem.name }),
      ).toBeInTheDocument();
    }
    expect(
      screen.getAllByText(getDictionary("en").status.stateDeferred).length,
    ).toBeGreaterThan(0);
  });

  it("says plainly what is not claimed", async () => {
    await renderPage(StatusPage);
    expect(
      screen.getByText(getDictionary("en").status.notClaimedTitle),
    ).toBeInTheDocument();
  });
});

describe("media page", () => {
  it("captions runs and links them to their title", async () => {
    await renderPage(MediaPage);
    const t = getDictionary("en");

    expect(screen.getByText(t.media.timelineHeading)).toBeInTheDocument();
    expect(screen.getByText(t.media.galleryHeading)).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link")
        .some((link) => link.getAttribute("href")?.startsWith("/en/games/")),
    ).toBe(true);
  });

  it("links to the YouTube channel", async () => {
    await renderPage(MediaPage);
    expect(
      screen
        .getAllByRole("link")
        .filter((link) => link.getAttribute("href") === site.links.youtube)
        .length,
    ).toBeGreaterThan(0);
  });
});

describe("extract page", () => {
  it("states that retail packages are out of scope", async () => {
    await renderPage(ExtractPage);
    const t = getDictionary("en");
    expect(screen.getByText(t.extract.noticeTitle)).toBeInTheDocument();
    expect(screen.getByText(t.extract.noticeBody)).toBeInTheDocument();
  });
});

describe("site chrome", () => {
  it("marks the current page in the navigation", () => {
    render(<SiteHeader locale="en" />);
    const home = screen.getAllByRole("link", {
      name: getDictionary("en").nav.home,
    })[0];
    expect(home).toHaveAttribute("aria-current", "page");
  });

  it("offers all eight languages, pointing at the same page", async () => {
    const user = userEvent.setup();
    render(<SiteHeader locale="en" />);

    // The header renders a switcher for desktop and one for narrow screens;
    // open the first and read only its menu.
    const trigger = screen.getAllByRole("button", {
      name: getDictionary("en").common.chooseLanguage,
    })[0];
    await user.click(trigger);

    const menu = screen.getAllByRole("menu")[0];
    const items = within(menu).getAllByRole("menuitem");
    expect(items).toHaveLength(8);
    expect(items.map((item) => item.getAttribute("href"))).toEqual([
      "/en",
      "/ru",
      "/de",
      "/fr",
      "/zh",
      "/es",
      "/ar",
      "/pt",
    ]);
  });

  it("navigates within the active locale", () => {
    render(<SiteHeader locale="ru" />);
    const ru = getDictionary("ru");
    expect(
      screen.getAllByRole("link", { name: ru.nav.compatibility })[0],
    ).toHaveAttribute("href", "/ru/compatibility");
  });

  it("carries the license and non-affiliation notice in the footer", () => {
    render(<SiteFooter locale="en" />);
    const t = getDictionary("en");
    expect(screen.getByText(t.footer.licenseLink)).toBeInTheDocument();
    expect(screen.getByText(t.footer.notAffiliated)).toBeInTheDocument();
  });

  it("opens external community links safely", () => {
    render(<SiteFooter locale="en" />);
    const youtube = screen
      .getAllByRole("link", { name: getDictionary("en").common.youtube })
      .at(0) as HTMLAnchorElement;
    expect(youtube).toHaveAttribute("href", site.links.youtube);
    expect(youtube).toHaveAttribute("target", "_blank");
    expect(youtube.getAttribute("rel")).toContain("noopener");
  });

  it("translates the footer", () => {
    render(<SiteFooter locale="ar" />);
    const ar = getDictionary("ar");
    expect(screen.getByText(ar.footer.notAffiliated)).toBeInTheDocument();
  });
});
