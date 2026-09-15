import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

import HomePage from "@/app/page";
import DownloadPage from "@/app/download/page";
import CompatibilityPage from "@/app/compatibility/page";
import StatusPage from "@/app/status/page";
import MediaPage from "@/app/media/page";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { latestRelease } from "@/data/release";
import { site } from "@/data/site";
import { compatibility, countByTier } from "@/data/compatibility";
import { captures } from "@/data/gallery";
import { subsystems } from "@/data/subsystems";

describe("home page", () => {
  it("leads with the project and its current version", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /PlayStation 5 emulation research/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(new RegExp(latestRelease.version)).length,
    ).toBeGreaterThan(0);
  });

  it("reports the tested-title counts from the dataset", () => {
    render(<HomePage />);
    const counts = countByTier();

    expect(screen.getByText("Titles tested")).toBeInTheDocument();
    const testedStat = screen.getByText("Titles tested").closest("div");
    expect(
      within(testedStat as HTMLElement).getByText(String(compatibility.length)),
    ).toBeInTheDocument();

    const playableStat = screen
      .getByText("Playable and completable")
      .closest("div");
    expect(
      within(playableStat as HTMLElement).getByText(String(counts.playable)),
    ).toBeInTheDocument();
  });

  it("links to the download page, the compatibility page and YouTube", () => {
    render(<HomePage />);

    expect(
      screen.getAllByRole("link", { name: /Download 0\.3\.1-beta\.1/ }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole("link", { name: /See the test results/ }),
    ).toHaveAttribute("href", "/compatibility");
    expect(
      screen.getByRole("link", { name: /Open the YouTube channel/ }),
    ).toHaveAttribute("href", site.links.youtube);
  });

  it("keeps the legal notice on the page", () => {
    render(<HomePage />);
    expect(
      screen.getByText(/Use only content you are legally entitled to use/),
    ).toBeInTheDocument();
  });
});

describe("download page", () => {
  it("offers every published asset with a working GitHub link", () => {
    render(<DownloadPage />);

    for (const asset of latestRelease.assets) {
      // A file name appears on its download card and again in the checksum
      // table, so only its presence is asserted here.
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

  it("publishes the SHA-256 digests for verification", () => {
    render(<DownloadPage />);

    for (const asset of latestRelease.assets) {
      if (asset.sha256) {
        expect(screen.getByText(asset.sha256)).toBeInTheDocument();
      }
    }
  });

  it("states the unsigned-binary warning and the requirements", () => {
    render(<DownloadPage />);

    expect(screen.getByText("The binaries are unsigned")).toBeInTheDocument();
    expect(screen.getByText(/Windows 10 version 2004/)).toBeInTheDocument();
    expect(screen.getByText(/Vulkan 1\.2/)).toBeInTheDocument();
  });

  it("shows the release history with the latest build marked", () => {
    render(<DownloadPage />);

    expect(screen.getByText("Latest")).toBeInTheDocument();
    expect(screen.getByText("0.3.0-alpha.1")).toBeInTheDocument();
  });
});

describe("compatibility page", () => {
  it("frames the results as measured observations, not guarantees", () => {
    render(<CompatibilityPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Game compatibility" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/NVIDIA GeForce RTX 3070 Ti test host/),
    ).toBeInTheDocument();
    expect(screen.getByText("Results change between builds")).toBeInTheDocument();
  });

  it("credits project-status.md as the source", () => {
    render(<CompatibilityPage />);

    expect(
      screen.getByRole("link", { name: "project-status.md" }),
    ).toHaveAttribute("href", site.links.projectStatus);
  });

  it("renders every tested title", () => {
    render(<CompatibilityPage />);

    for (const entry of compatibility) {
      expect(
        screen.getByRole("heading", { name: entry.title }),
      ).toBeInTheDocument();
    }
  });
});

describe("status page", () => {
  it("lists every subsystem with a state", () => {
    render(<StatusPage />);

    for (const subsystem of subsystems) {
      expect(
        screen.getByRole("heading", { name: subsystem.name }),
      ).toBeInTheDocument();
    }
    expect(screen.getByText("VR presentation")).toBeInTheDocument();
    expect(screen.getAllByText("Deferred").length).toBeGreaterThan(0);
  });

  it("says plainly what is not being claimed", () => {
    render(<StatusPage />);
    expect(
      screen.getByText("What is deliberately not claimed"),
    ).toBeInTheDocument();
  });
});

describe("media page", () => {
  it("captions every capture", () => {
    render(<MediaPage />);

    for (const capture of captures) {
      expect(screen.getByText(capture.title)).toBeInTheDocument();
    }
  });

  it("links to the YouTube channel", () => {
    render(<MediaPage />);

    const links = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href") === site.links.youtube);
    expect(links.length).toBeGreaterThan(0);
  });
});

describe("site chrome", () => {
  it("marks the current page in the navigation", () => {
    render(<SiteHeader />);

    const current = screen.getAllByRole("link", { name: "Home" })[0];
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("carries the license and the non-affiliation notice in the footer", () => {
    render(<SiteFooter />);

    expect(screen.getByText(/GNU GPL, version 3 or later/)).toBeInTheDocument();
    expect(
      screen.getByText(/Not affiliated with or endorsed by Sony/),
    ).toBeInTheDocument();
  });

  it("opens external community links safely", () => {
    render(<SiteFooter />);

    const youtube = screen
      .getAllByRole("link", { name: "YouTube" })
      .at(0) as HTMLAnchorElement;
    expect(youtube).toHaveAttribute("href", site.links.youtube);
    expect(youtube).toHaveAttribute("target", "_blank");
    expect(youtube.getAttribute("rel")).toContain("noopener");
  });
});
