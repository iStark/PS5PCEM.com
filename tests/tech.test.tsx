import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/tech",
  notFound: () => {
    throw new Error("notFound() called");
  },
}));

import TechIndexPage from "@/app/[locale]/tech/page";
import TechArticlePage from "@/app/[locale]/tech/[slug]/page";
import {
  technologies,
  technologySlugs,
  type TechSlug,
} from "@/data/technologies";
import { locales, localePath, type Locale } from "@/i18n/config";
import { getDictionary, getTechArticle, getTechCopy } from "@/i18n";
import enTech from "@/i18n/tech/en";

async function renderIndex(locale: Locale = "en") {
  return render(
    await TechIndexPage({ params: Promise.resolve({ locale }) }),
  );
}

async function renderArticle(slug: string, locale: Locale = "en") {
  return render(
    await TechArticlePage({
      params: Promise.resolve({ locale, slug }),
    }),
  );
}

describe("technology catalog", () => {
  it("gives every article to every language, with the English shape", () => {
    for (const code of locales) {
      const copy = getTechCopy(code);
      expect(Object.keys(copy).sort(), code).toEqual(
        technologySlugs().sort(),
      );
      for (const slug of technologySlugs()) {
        const article = copy[slug];
        const reference = enTech[slug];
        expect(article.title.trim().length, `${code}/${slug}`).toBeGreaterThan(0);
        expect(article.summary.trim().length, `${code}/${slug}`).toBeGreaterThan(40);
        expect(article.sections.length, `${code}/${slug} sections`).toBe(
          reference.sections.length,
        );
        expect(article.works.length, `${code}/${slug} works`).toBe(
          reference.works.length,
        );
        expect(article.gaps.length, `${code}/${slug} gaps`).toBe(
          reference.gaps.length,
        );
        article.sections.forEach((section, index) => {
          expect(section.heading.trim().length, `${code}/${slug}#${index}`).toBeGreaterThan(0);
          expect(section.paragraphs.length, `${code}/${slug}#${index}`).toBe(
            reference.sections[index].paragraphs.length,
          );
          for (const paragraph of section.paragraphs) {
            expect(paragraph.trim().length).toBeGreaterThan(20);
          }
        });
      }
    }
  });

  it("only relates pages that exist", () => {
    const slugs = new Set(technologySlugs());
    for (const entry of technologies) {
      for (const related of entry.related) {
        expect(slugs.has(related as TechSlug), `${entry.slug} -> ${related}`).toBe(true);
        expect(related, entry.slug).not.toBe(entry.slug);
      }
    }
  });
});

describe("technology pages", () => {
  it("lists every mechanism in English and links to its page", async () => {
    await renderIndex("en");
    const copy = getTechCopy("en");
    for (const slug of technologySlugs()) {
      const links = screen.getAllByRole("link", { name: copy[slug].title });
      expect(links[0]).toHaveAttribute("href", `/tech/${slug}`);
    }
  });

  it("translates the index and keeps the locale in the links", async () => {
    await renderIndex("ru");
    const t = getDictionary("ru");
    expect(
      screen.getByRole("heading", { level: 1, name: t.tech.heading }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: getTechCopy("ru").hle.title })).toHaveAttribute(
      "href",
      "/ru/tech/hle",
    );
  });

  it("renders an article with its sections, limits and related pages", async () => {
    await renderArticle("acm");
    const article = getTechArticle("en", "acm");
    expect(article).toBeTruthy();
    expect(
      screen.getByRole("heading", { level: 1, name: article!.title }),
    ).toBeInTheDocument();
    for (const section of article!.sections) {
      expect(
        screen.getByRole("heading", { level: 2, name: section.heading }),
      ).toBeInTheDocument();
    }
    expect(screen.getByText(article!.gaps[0])).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: getTechCopy("en").audio.title }),
    ).toHaveAttribute("href", "/tech/audio");
  });

  it("renders the same article in Arabic with a locale prefix", async () => {
    await renderArticle("msaa", "ar");
    const article = getTechArticle("ar", "msaa");
    expect(
      screen.getByRole("heading", { level: 1, name: article!.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: getDictionary("ar").nav.tech }),
    ).toHaveAttribute("href", localePath("ar", "/tech"));
  });

  it("rejects an unknown slug", async () => {
    await expect(renderArticle("not-a-technology")).rejects.toThrow(
      "notFound() called",
    );
  });
});
