import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Accessibility,
  BarChart3,
  Bell,
  Bookmark,
  ChevronRight,
  CirclePlay,
  Clock,
  Eye,
  ExternalLink,
  FileText,
  LayoutGrid,
  Search,
  Target,
  User,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { CourseCard } from "@/components/cards/course-card";
import { LessonCard } from "@/components/cards/lesson-card";
import { LessonVideoCard } from "@/components/cards/lesson-video-card";
import { ResourceCard } from "@/components/cards/resource-card";
import { Breadcrumbs } from "@/components/nav/breadcrumbs";
import { Navbar } from "@/components/nav/navbar";
import { Pagination } from "@/components/nav/pagination";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Design System · Vertex",
  description:
    "The Poster Studio design language behind Vertex: cobalt and ink on paper, Archivo, hard edges, rules instead of shadows.",
};

/* ---------------------------------------------------------------- layout */

function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <section className={cn("rounded-none border border-neutral-900 bg-surface p-6", className)}>
      {children}
    </section>
  );
}

function PanelTitle({ number, title }: { number: string; title: string }) {
  return (
    <h2 className="mb-6 flex items-center gap-4">
      <span className="bg-neutral-900 px-2 py-1 text-[12px] leading-4 font-semibold tabular-nums text-white">
        {number}
      </span>
      <span className="text-body font-semibold tracking-[0.08em] text-neutral-900 uppercase">
        {title}
      </span>
    </h2>
  );
}

function GroupLabel({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-body-lg font-semibold text-neutral-900">{children}</p>;
}

function Caption({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-body text-neutral-500">{children}</p>;
}

/* ------------------------------------------------------------------ data */

const cobaltColors = [
  { name: "Cobalt 600", hex: "#1230C8", className: "bg-primary-600" },
  { name: "Cobalt 500", hex: "#1B45F5", className: "bg-primary-500" },
  { name: "Cobalt 400", hex: "#4A6FF8", className: "bg-primary-400" },
  { name: "Cobalt 300", hex: "#8AA3FB", className: "bg-primary-300" },
  { name: "Cobalt 200", hex: "#C7D2FD", className: "bg-primary-200" },
  { name: "Cobalt 100", hex: "#E8EDFE", className: "bg-primary-100" },
];

const neutralColors = [
  { name: "Ink 900", hex: "#121212", className: "bg-neutral-900" },
  { name: "Ink 700", hex: "#3D3D3D", className: "bg-neutral-700" },
  { name: "Ink 500", hex: "#6E6E6E", className: "bg-neutral-500" },
  { name: "Ink 300", hex: "#B8B8B8", className: "bg-neutral-300" },
  { name: "Ink 200", hex: "#DEDEDE", className: "bg-neutral-200" },
  { name: "Ink 100", hex: "#EFEFEF", className: "bg-neutral-100" },
  { name: "Ink 50", hex: "#F5F5F5", className: "bg-neutral-50 border border-neutral-200" },
  { name: "Paper", hex: "#FAFAF8", className: "bg-canvas border border-neutral-200" },
  { name: "White", hex: "#FFFFFF", className: "bg-surface border border-neutral-200" },
];

const statusColors = [
  { name: "Success", hex: "#16A34A", className: "bg-success", use: "Completed" },
  { name: "Warning", hex: "#D97706", className: "bg-warning", use: "In progress" },
];

const typeScale = [
  { style: "Display 0", font: "Archivo", size: "66 / 68", weight: "800 · wdth 125", use: "Hero" },
  { style: "Display 1", font: "Archivo", size: "53 / 56", weight: "800 · wdth 125", use: "Page titles" },
  { style: "Display 2", font: "Archivo", size: "43 / 48", weight: "800 · wdth 125", use: "Section titles" },
  { style: "Heading 1", font: "Archivo", size: "34 / 40", weight: "800 · wdth 118", use: "Page headings" },
  { style: "Heading 2", font: "Archivo", size: "27 / 34", weight: "800 · wdth 112", use: "Sub sections" },
  { style: "Heading 3", font: "Archivo", size: "22 / 30", weight: "600", use: "Card titles" },
  { style: "Body Large", font: "Archivo", size: "17 / 26", weight: "400", use: "Lead copy" },
  { style: "Body", font: "Archivo", size: "14 / 21", weight: "400", use: "Supporting text" },
  { style: "Small", font: "Archivo", size: "12 / 16", weight: "400", use: "Captions, meta" },
];

const spacingScale = [4, 8, 12, 16, 24, 32, 40, 48, 64];

const icons = [
  { Icon: Bell, fillable: true },
  { Icon: Search, fillable: true },
  { Icon: CirclePlay, fillable: true },
  { Icon: FileText, fillable: true },
  { Icon: Bookmark, fillable: true },
  { Icon: BarChart3, fillable: true },
  { Icon: Clock, fillable: true },
  { Icon: User, fillable: true },
  { Icon: ChevronRight, fillable: false },
];

const principles = [
  { Icon: Eye, title: "Clarity First", copy: "Every element should communicate clearly." },
  {
    Icon: LayoutGrid,
    title: "Consistency",
    copy: "Use components and patterns consistently across the platform.",
  },
  { Icon: Target, title: "Hard Edges", copy: "Zero radius, zero shadow. Rules and blocks carry structure." },
  {
    Icon: Accessibility,
    title: "Accessible",
    copy: "Design with accessibility and inclusivity in mind.",
  },
];

const buttonRows = [
  { state: "Default", hovered: false, disabled: false },
  { state: "Hover", hovered: true, disabled: false },
  { state: "Disabled", hovered: false, disabled: true },
];

/* ------------------------------------------------------------------ page */

export default function DesignSystemPage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Intro */}
        <Panel className="lg:col-span-4">
          <Logo size={32} />
          <h1 className="mt-8 text-display-1 text-neutral-900">Design System</h1>
          <p className="mt-4 max-w-sm text-body-lg text-neutral-700">
            Poster Studio: paper and ink, one cobalt accent, oversized Archivo, and hard-edged
            color blocks. Separation comes from 1px rules — never from curvature or blur.
          </p>
          <p className="mt-8 text-small tracking-[0.08em] text-neutral-500 uppercase">
            Version 2.0 &nbsp;•&nbsp; Poster Studio
          </p>
        </Panel>

        {/* 01 Colors */}
        <Panel className="lg:col-span-8">
          <PanelTitle number="01" title="Colors" />
          <GroupLabel>Cobalt — the one accent</GroupLabel>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {cobaltColors.map((color) => (
              <li key={color.name}>
                <div className={cn("h-16 rounded-none", color.className)} />
                <p className="mt-2 text-body text-neutral-900">{color.name}</p>
                <p className="text-body tabular-nums text-neutral-500">{color.hex}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <GroupLabel>Ink neutrals — true gray</GroupLabel>
            <ul className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-9">
              {neutralColors.map((color) => (
                <li key={color.name}>
                  <div className={cn("h-16 rounded-none", color.className)} />
                  <p className="mt-2 text-body text-neutral-900">{color.name}</p>
                  <p className="text-body tabular-nums text-neutral-500">{color.hex}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
            <GroupLabel>Status — functional only</GroupLabel>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {statusColors.map((color) => (
                <li key={color.name}>
                  <div className={cn("h-16 rounded-none", color.className)} />
                  <p className="mt-2 text-body text-neutral-900">
                    {color.name} <span className="text-neutral-500">· {color.use}</span>
                  </p>
                  <p className="text-body tabular-nums text-neutral-500">{color.hex}</p>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        {/* 02 Typography */}
        <Panel className="lg:col-span-5">
          <PanelTitle number="02" title="Typography" />
          <div className="flex items-center gap-8">
            <span className="text-[64px] leading-none font-extrabold text-neutral-900 [font-stretch:125%]">
              Ag
            </span>
            <div>
              <p className="text-heading-2 text-neutral-900">Archivo</p>
              <p className="mt-1 text-body text-neutral-700">
                Variable width 62–125 · one family for the whole site
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 border border-neutral-200 p-4">
            {[
              { stretch: "62%", weight: "400", label: "Condensed" },
              { stretch: "100%", weight: "600", label: "Normal" },
              { stretch: "125%", weight: "800", label: "Expanded" },
            ].map((spec) => (
              <div key={spec.label} className="text-center">
                <p
                  className="text-[28px] leading-8 text-neutral-900"
                  style={{ fontStretch: spec.stretch, fontWeight: spec.weight }}
                >
                  Aa
                </p>
                <p className="mt-2 text-small text-neutral-500">{spec.label}</p>
                <p className="text-small tabular-nums text-neutral-500">{spec.weight}</p>
              </div>
            ))}
          </div>
        </Panel>

        {/* 03 Type scale */}
        <Panel className="lg:col-span-7">
          <PanelTitle number="03" title="Type Scale" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left">
              <thead>
                <tr className="border-b border-neutral-900">
                  {["Style", "Font", "Size / Line Height", "Weight", "Use"].map((heading) => (
                    <th key={heading} className="pb-3 text-body font-normal text-neutral-500">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {typeScale.map((row) => (
                  <tr key={row.style} className="border-b border-neutral-200 last:border-b-0">
                    <td className="py-2 text-body font-semibold text-neutral-900">{row.style}</td>
                    <td className="py-2 text-body text-neutral-500">{row.font}</td>
                    <td className="py-2 text-body tabular-nums text-neutral-500">{row.size}</td>
                    <td className="py-2 text-body tabular-nums text-neutral-500">{row.weight}</td>
                    <td className="py-2 text-body text-neutral-500">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* 04 Spacing */}
        <Panel className="lg:col-span-7">
          <PanelTitle number="04" title="Spacing System" />
          <GroupLabel>Base unit: 4px</GroupLabel>
          <ul className="mt-6 flex items-end gap-6 overflow-x-auto pb-1">
            {spacingScale.map((step) => (
              <li key={step} className="flex shrink-0 flex-col items-center gap-3">
                <span
                  className="block rounded-none bg-primary-500"
                  style={{ width: step, height: step }}
                />
                <span className="text-body tabular-nums text-neutral-900">{step}</span>
                <span className="text-small tabular-nums text-neutral-500">({step / 16}rem)</span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* 05 Radius and shadows */}
        <Panel className="lg:col-span-5">
          <PanelTitle number="05" title="Radius & Shadows" />
          <GroupLabel>Radius — 0, deliberately</GroupLabel>
          <div className="flex items-center gap-5">
            <span className="block size-16 border border-neutral-900 bg-surface" />
            <div>
              <p className="text-heading-3 tabular-nums text-neutral-900">0px</p>
              <p className="mt-1 text-body text-neutral-500">
                Every surface is a rectangle. Structure comes from 1px ink rules.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <GroupLabel>Shadows — none</GroupLabel>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {["Sm", "Md", "Lg", "Xl"].map((name) => (
                <li key={name} className="rounded-none border border-neutral-900 bg-surface p-4">
                  <p className="text-heading-3 text-neutral-900">{name}</p>
                  <p className="mt-2 text-[11px] leading-4 text-neutral-500">none</p>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        {/* 06 Icons */}
        <Panel className="lg:col-span-3">
          <PanelTitle number="06" title="Icons" />
          <Caption>Outline Style</Caption>
          <ul className="flex items-center justify-between">
            {icons.map(({ Icon }, index) => (
              <li key={`outline-${index}`}>
                <Icon className="size-6 text-neutral-900" strokeWidth={2} aria-hidden />
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Caption>Filled Style</Caption>
            <ul className="flex items-center justify-between">
              {icons.map(({ Icon, fillable }, index) => (
                <li key={`filled-${index}`}>
                  <Icon
                    className="size-6 text-neutral-900"
                    strokeWidth={fillable ? 2 : 3}
                    fill={fillable ? "currentColor" : "none"}
                    stroke={fillable ? "var(--color-surface)" : "currentColor"}
                    aria-hidden
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
            <GroupLabel>Icon Specs</GroupLabel>
            <ul className="list-disc space-y-1 pl-5 text-body text-neutral-500 marker:text-neutral-900">
              <li>24x24px grid</li>
              <li>2px stroke width (outline)</li>
              <li>Rounded line caps</li>
              <li>Consistent optical balance</li>
            </ul>
          </div>
        </Panel>

        {/* 07 Buttons */}
        <Panel className="lg:col-span-6">
          <PanelTitle number="07" title="Buttons" />
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-[72px_repeat(4,auto)] items-center gap-3">
                <span />
                {["Primary", "Secondary", "Tertiary", "Text"].map((label) => (
                  <span key={label} className="text-body text-neutral-500">
                    {label}
                  </span>
                ))}
              </div>
              {buttonRows.map((row) => (
                <div
                  key={row.state}
                  className="mt-4 grid grid-cols-[72px_repeat(4,auto)] items-center gap-3"
                >
                  <span className="text-body text-neutral-900">{row.state}</span>
                  <Button variant="primary" size="md" hovered={row.hovered} disabled={row.disabled}>
                    Get Started
                  </Button>
                  <Button variant="secondary" size="md" hovered={row.hovered} disabled={row.disabled}>
                    Explore Courses
                  </Button>
                  <Button
                    variant="tertiary"
                    size="md"
                    hovered={row.hovered}
                    disabled={row.disabled}
                    icon={<ExternalLink className="size-4" strokeWidth={2} aria-hidden />}
                  >
                    View Lesson
                  </Button>
                  <Button
                    variant="text"
                    size="md"
                    hovered={row.hovered}
                    disabled={row.disabled}
                    icon={<CirclePlay className="size-5" strokeWidth={2} aria-hidden />}
                  >
                    Watch Video
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <GroupLabel>Button Specs</GroupLabel>
            <ul className="list-disc space-y-1 pl-5 text-body text-neutral-500 marker:text-neutral-900">
              <li>Height: 44px (default)</li>
              <li>Padding: 0 16px (lg), 0 12px (md)</li>
              <li>Radius: 0</li>
              <li>Font: Archivo Semibold (14–16px)</li>
            </ul>
          </div>
        </Panel>

        {/* 08 Inputs */}
        <Panel className="lg:col-span-3">
          <PanelTitle number="08" title="Inputs" />
          <Caption>Search / Text Input</Caption>
          <SearchInput id="design-system-search" />
          <div className="mt-6">
            <Caption>Select</Caption>
            <Select
              id="design-system-sort"
              label="Sort results"
              defaultValue="relevant"
              options={[
                { value: "relevant", label: "Most Relevant" },
                { value: "recent", label: "Most Recent" },
                { value: "duration", label: "Shortest First" },
              ]}
            />
          </div>
          <div className="mt-8">
            <GroupLabel>Field Specs</GroupLabel>
            <ul className="list-disc space-y-1 pl-5 text-body text-neutral-500 marker:text-neutral-900">
              <li>Height: 44px</li>
              <li>Radius: 0</li>
              <li>Border: 1px solid #121212</li>
              <li>Padding: 0 16px</li>
              <li>Focus: border #1B45F5</li>
            </ul>
          </div>
        </Panel>

        {/* 09 Badges */}
        <Panel className="lg:col-span-4">
          <PanelTitle number="09" title="Badges / Tags" />
          <div className="flex flex-wrap items-start gap-10">
            <div>
              <Caption>Video</Caption>
              <Badge variant="video">Video</Badge>
            </div>
            <div>
              <Caption>Lesson</Caption>
              <Badge variant="lesson">Lesson</Badge>
            </div>
            <div>
              <Caption>Popular</Caption>
              <Badge variant="popular">Popular</Badge>
            </div>
          </div>
          <p className="mt-5 text-body text-neutral-500">
            Solid rectangles with tracked uppercase labels. No pills.
          </p>
        </Panel>

        {/* 10 Status */}
        <Panel className="lg:col-span-4">
          <PanelTitle number="10" title="Status / Indicators" />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <StatusIndicator status="in-progress" />
            <StatusIndicator status="completed" />
            <StatusIndicator status="now-playing" />
            <StatusIndicator status="locked" />
          </div>
        </Panel>

        {/* 11 Progress */}
        <Panel className="lg:col-span-4">
          <PanelTitle number="11" title="Progress Bar" />
          <ProgressBar value={35} />
        </Panel>

        {/* 12 Cards */}
        <Panel className="lg:col-span-12">
          <PanelTitle number="12" title="Cards" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <Caption>Course Card</Caption>
              <CourseCard
                title="Next.js for Production"
                description="Build scalable, high-performance web applications with Next.js."
                level="Intermediate"
                duration="18h 24m"
                modules="12 modules"
                logo={
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-none bg-neutral-900 text-[22px] leading-none font-extrabold text-white [font-stretch:112%]">
                    N
                  </span>
                }
              />
            </div>
            <div>
              <Caption>Lesson Card (Video)</Caption>
              <LessonVideoCard
                title="Data Fetching in Server Components"
                description="Learn how to fetch data on the server using async/await and Next.js best practices."
                lessonLabel="Lesson 5.1"
                timestamp="12:45"
                href="#"
              />
            </div>
            <div>
              <Caption>Lesson Card (Lesson)</Caption>
              <LessonCard
                title="Data Fetching & Caching"
                description="Explore different data fetching methods in Next.js and how to cache and revalidate data for optimal performance."
                moduleLabel="Module 5"
                href="#"
              />
            </div>
            <div>
              <Caption>Resource Card</Caption>
              <ResourceCard
                title="Caching and Revalidation Guide"
                description="Deep dive into Next.js caching strategies."
                type="PDF"
                size="1.2 MB"
                href="#"
              />
            </div>
          </div>
        </Panel>

        {/* 13 Navigation */}
        <Panel className="lg:col-span-12">
          <PanelTitle number="13" title="Navigation" />
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[auto_1fr_auto]">
            <Navbar activeHref="/courses" />
            <div>
              <Caption>Breadcrumbs</Caption>
              <Breadcrumbs
                items={[
                  { label: "All Courses", href: "#" },
                  { label: "Next.js for Production", href: "#" },
                  { label: "Data Fetching & Caching" },
                ]}
              />
            </div>
            <div>
              <Caption>Pagination</Caption>
              <Pagination currentPage={1} totalPages={8} buildHref={(page) => `?page=${page}`} />
            </div>
          </div>
        </Panel>

        {/* 14 Principles */}
        <Panel className="lg:col-span-12">
          <PanelTitle number="14" title="Principles" />
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {principles.map(({ Icon, title, copy }) => (
              <li key={title} className="flex items-start gap-4">
                <Icon className="size-8 shrink-0 text-primary-500" strokeWidth={2} aria-hidden />
                <div>
                  <p className="text-heading-3 text-neutral-900">{title}</p>
                  <p className="mt-1 text-body text-neutral-700">{copy}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </main>
  );
}
