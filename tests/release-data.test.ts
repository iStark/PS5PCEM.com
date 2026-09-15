import { describe, expect, it } from "vitest";
import {
  latestRelease,
  quickStart,
  releaseHistory,
  systemRequirements,
} from "@/data/release";
import { navigation, site } from "@/data/site";
import { formatBytes, formatDate, shortHash } from "@/lib/format";

describe("release data", () => {
  it("points at the current published tag", () => {
    expect(latestRelease.version).toBe("0.3.1-beta.1");
    expect(latestRelease.tag).toBe("v0.3.1-beta.1");
    expect(latestRelease.prerelease).toBe(true);
  });

  it("serves every asset from the matching GitHub release", () => {
    for (const asset of latestRelease.assets) {
      expect(asset.url).toBe(
        `https://github.com/iStark/PS5PCEM/releases/download/${latestRelease.tag}/${asset.fileName}`,
      );
      expect(asset.size).toBeGreaterThan(0);
      expect(asset.description.length).toBeGreaterThan(0);
    }
  });

  it("publishes the portable ZIP and the per-user installer", () => {
    const names = latestRelease.assets.map((asset) => asset.fileName);
    expect(names).toContain(
      "PS5PCEM-0.3.1-beta.1-windows-x64-portable.zip",
    );
    expect(names).toContain("PS5PCEM-0.3.1-beta.1-windows-x64-setup.exe");
    expect(names).toContain("SHA256SUMS.txt");
  });

  it("recommends exactly one asset", () => {
    const primary = latestRelease.assets.filter((asset) => asset.primary);
    expect(primary).toHaveLength(1);
    expect(primary[0].fileName).toMatch(/portable\.zip$/);
  });

  it("carries the published SHA-256 digests for both binaries", () => {
    const byName = new Map(
      latestRelease.assets.map((asset) => [asset.fileName, asset] as const),
    );

    expect(
      byName.get("PS5PCEM-0.3.1-beta.1-windows-x64-portable.zip")!.sha256,
    ).toBe("a33d7b9279db9a027728838ac7e3c3baf8d7523b3c54d91d18fe8bcf20bdc093");
    expect(
      byName.get("PS5PCEM-0.3.1-beta.1-windows-x64-setup.exe")!.sha256,
    ).toBe("e1f7a9390a7969d592ae5df2943c73e328543c065936a806b93acaf9c283e96c");

    for (const asset of latestRelease.assets) {
      if (asset.sha256) {
        expect(asset.sha256).toMatch(/^[0-9a-f]{64}$/);
      }
    }
  });

  it("lists the latest release first in the history, newest to oldest", () => {
    expect(releaseHistory[0].version).toBe(latestRelease.version);

    for (let i = 1; i < releaseHistory.length; i += 1) {
      const newer = new Date(releaseHistory[i - 1].publishedAt).getTime();
      const older = new Date(releaseHistory[i].publishedAt).getTime();
      expect(newer).toBeGreaterThan(older);
    }
  });

  it("states the documented system requirements", () => {
    const text = systemRequirements.map((item) => item.value).join(" ");
    expect(text).toContain("Windows 10 version 2004");
    expect(text).toContain("Vulkan 1.2");
    expect(text).toContain("RTX 3070 Ti");
  });

  it("keeps the quick start to the documented four steps", () => {
    expect(quickStart).toHaveLength(4);
    expect(quickStart[1]).toContain("ps5pcem.exe");
    expect(quickStart.join(" ")).toContain("legally entitled");
  });
});

describe("site links", () => {
  it("uses the official GitHub and YouTube destinations", () => {
    expect(site.links.github).toBe("https://github.com/iStark/PS5PCEM");
    expect(site.links.youtube).toBe("https://www.youtube.com/@PS5PCEM");
  });

  it("keeps every external link on https", () => {
    for (const url of Object.values(site.links)) {
      expect(url.startsWith("https://")).toBe(true);
    }
  });

  it("navigates with root-relative paths only", () => {
    for (const item of navigation) {
      expect(item.href.startsWith("/")).toBe(true);
      expect(item.label.length).toBeGreaterThan(0);
    }
    expect(navigation.map((item) => item.href)).toContain("/download");
    expect(navigation.map((item) => item.href)).toContain("/compatibility");
  });
});

describe("formatting helpers", () => {
  it("formats byte counts", () => {
    expect(formatBytes(0)).toBe("0 B");
    expect(formatBytes(512)).toBe("512 B");
    expect(formatBytes(1024)).toBe("1.0 KB");
    expect(formatBytes(20289889)).toBe("19.3 MB");
    expect(formatBytes(-1)).toBe("—");
  });

  it("formats ISO dates in UTC", () => {
    expect(formatDate("2026-09-15T11:41:55Z")).toBe("September 15, 2026");
    expect(formatDate("not-a-date")).toBe("—");
  });

  it("shortens long hashes but leaves short ones alone", () => {
    const hash =
      "a33d7b9279db9a027728838ac7e3c3baf8d7523b3c54d91d18fe8bcf20bdc093";
    expect(shortHash(hash)).toBe(`${hash.slice(0, 10)}…${hash.slice(-10)}`);
    expect(shortHash(hash, 4)).toBe("a33d…c093");
    expect(shortHash("abc")).toBe("abc");
  });
});
