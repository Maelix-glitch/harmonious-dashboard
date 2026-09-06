import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell,
  CalendarCheck,
  ChartNoAxesColumn,
  ChevronDown,
  CircleDashed,
  Compass,
  Leaf,
  Plus,
  Quote,
  Search,
  Settings,
  Smile,
  Sparkles,
  Star,
  SquarePen,
  Sun,
  Check,
  ArrowRight,
  ArrowUp,
  Zap,
} from "lucide-react";

import heroAsset from "@/assets/hero_window.jpg.asset.json";
import flowerBranchAsset from "@/assets/flower_branch.jpg.asset.json";
import flowerDetailAsset from "@/assets/flower_detail.jpg.asset.json";
import sideLeavesAsset from "@/assets/side_leaves.jpg.asset.json";
import mountainLakeAsset from "@/assets/mountain_lake.jpg.asset.json";
import bokehAsset from "@/assets/bokeh.jpg.asset.json";
import candleAsset from "@/assets/candle.jpg.asset.json";
import { MOOD_LABELS, MoodBlob, type MoodKey } from "@/components/bloom/MoodBlob";
import { MoodChart } from "@/components/bloom/MoodChart";
import { MoodDonut } from "@/components/bloom/MoodDonut";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bloom — Mood Tracker for a Calmer Mind" },
      {
        name: "description",
        content:
          "Bloom is a gentle mood tracker: log how you feel, see your mood journey, and discover calm patterns in your days.",
      },
      { property: "og:title", content: "Bloom — Mood Tracker for a Calmer Mind" },
      {
        property: "og:description",
        content: "Log your mood, follow your journey, and grow into a kinder you with Bloom.",
      },
      { property: "og:image", content: heroAsset.url },
      { name: "twitter:image", content: heroAsset.url },
    ],
  }),
  component: Index,
});

const MOODS: MoodKey[] = ["happy", "calm", "neutral", "sad", "anxious", "angry"];

const CHART = [
  { label: "Aug 30", value: 0.62, color: "oklch(0.86 0.1 85)" },
  { label: "Aug 31", value: 0.58, color: "oklch(0.76 0.06 145)" },
  { label: "Sep 1", value: 0.4, color: "oklch(0.72 0.06 250)" },
  { label: "Sep 2", value: 0.44, color: "oklch(0.72 0.06 250)" },
  { label: "Sep 3", value: 0.76, color: "oklch(0.71 0.08 30)" },
  { label: "Sep 4", value: 0.66, color: "oklch(0.71 0.08 30)" },
  { label: "Sep 5", value: 0.86, color: "oklch(0.86 0.1 85)" },
];

const SLICES = [
  { label: "Happy", value: 33, color: "oklch(0.78 0.08 150)" },
  { label: "Calm", value: 25, color: "oklch(0.86 0.1 85)" },
  { label: "Neutral", value: 17, color: "oklch(0.72 0.06 300)" },
  { label: "Anxious", value: 17, color: "oklch(0.72 0.08 20)" },
  { label: "Sad", value: 8, color: "oklch(0.74 0.07 250)" },
];

const NAV = [
  { label: "Today", icon: CalendarCheck },
  { label: "Trackers", icon: SquarePen },
  { label: "Cycle", icon: CircleDashed },
  { label: "Mood", icon: Smile },
  { label: "Rewards", icon: Star },
  { label: "Coach", icon: Compass },
];

function Index() {
  const [selected, setSelected] = useState<MoodKey>("happy");

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1 pb-28 lg:pb-16">
          <TopBar />

          <div className="mx-auto w-full max-w-6xl space-y-10 px-5 pt-6 sm:px-8 sm:pt-8 md:space-y-14 lg:px-12">
            <Hero />
            <LogMood selected={selected} onSelect={setSelected} />
            <MoodJourney />
            <MoodDistribution />
            <QuickInsights />
            <Streak />
            <ClosingBanner />
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col justify-between overflow-hidden border-r border-border bg-sidebar lg:flex">
      <div>
        <div className="flex items-center gap-3 px-7 py-8">
          <ArchMark />
          <span className="font-display text-2xl tracking-wide text-foreground">Bloom</span>
        </div>

        <nav className="mt-2 space-y-1.5 px-4">
          {NAV.map(({ label, icon: Icon }) => {
            const active = label === "Mood";
            return (
              <button
                key={label}
                className={`flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-left text-sm transition-colors ${
                  active
                    ? "bg-sidebar-accent text-gold"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                }`}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" strokeWidth={1.5} />
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="relative">
        <img
          src={sideLeavesAsset.url}
          alt="Soft evening light on dark botanical leaves"
          className="pointer-events-none absolute inset-x-0 bottom-40 h-64 w-full object-cover opacity-45"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-40 h-64 veil" />

        <div className="relative px-7">
          <span className="block h-px w-8 bg-gold/50" />
          <p className="mt-5 font-display text-lg italic leading-snug text-gold-soft/90">
            A calmer mind creates a brighter you.
          </p>
          <span className="mt-5 block h-px w-8 bg-gold/50" />
        </div>

        <div className="relative mt-8 flex items-center gap-3 border-t border-sidebar-border px-7 py-6">
          <Settings className="h-4.5 w-4.5 shrink-0 text-muted-foreground" strokeWidth={1.5} />
          <div className="ml-2 flex min-w-0 items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-xs text-foreground/80">
              M
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm text-foreground">Maelix</p>
              <p className="truncate text-xs text-muted-foreground">Keep growing.</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function ArchMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold" aria-hidden="true">
      <path
        d="M3 20V11.5L12 4l9 7.5V20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TopBar() {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 pt-6 sm:px-8 lg:px-12">
      <div className="flex min-w-0 items-center gap-3 lg:hidden">
        <ArchMark />
        <span className="font-display text-xl tracking-wide">Bloom</span>
      </div>
      <div className="hidden lg:block" />

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <IconButton label="Search">
          <Search className="h-4.5 w-4.5" strokeWidth={1.5} />
        </IconButton>
        <IconButton label="Notifications">
          <span className="relative">
            <Bell className="h-4.5 w-4.5" strokeWidth={1.5} />
            <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
        </IconButton>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-xs text-foreground/80">
          M
        </span>
      </div>
    </header>
  );
}

function IconButton({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      {children}
    </button>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[calc(var(--radius)+0.5rem)]">
      <img
        src={heroAsset.url}
        alt="Arched window at golden hour with white flowers, books and a candle on the sill"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

      <div className="relative grid gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:px-12 lg:py-20">
        <div className="max-w-xl">
          <p className="eyebrow">Mood tracker · Sunday, September 6, 2026</p>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            How are you
            <span className="mt-1 block italic text-gold-soft">feeling today?</span>
          </h1>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
            A small check-in. A more mindful you.
          </p>
        </div>

        <div className="lg:pb-2 lg:text-right">
          <p className="font-display text-xl italic leading-relaxed text-gold-soft/90 sm:text-2xl">
            Feel it.
            <br />
            Understand it.
            <br />
            Grow from it.
          </p>
          <span className="mt-5 block h-px w-10 bg-gold/50 lg:ml-auto" />
        </div>
      </div>
    </section>
  );
}

function SectionHead({
  icon: Icon,
  title,
  subtitle,
  action,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3.5">
        <Icon className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
        <div className="min-w-0">
          <h2 className="font-display text-2xl leading-tight text-foreground sm:text-[1.75rem]">{title}</h2>
          {subtitle ? (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

function LogMood({ selected, onSelect }: { selected: MoodKey; onSelect: (m: MoodKey) => void }) {
  return (
    <section className="panel overflow-hidden">
      <div className="p-6 sm:p-9 lg:p-11">
        <SectionHead
          icon={Sparkles}
          title="Log your mood"
          subtitle="Take a moment. Be honest with yourself."
          action={
            <button className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:px-6" style={{ backgroundImage: "var(--gradient-gold)" }}>
              <Plus className="h-4 w-4" strokeWidth={2} />
              <span className="hidden sm:inline">Log an entry</span>
            </button>
          }
        />

        <div className="mt-10 grid grid-cols-3 gap-x-4 gap-y-9 sm:grid-cols-6 sm:gap-x-6 lg:gap-x-8">
          {MOODS.map((mood) => {
            const active = selected === mood;
            return (
              <button
                key={mood}
                onClick={() => onSelect(mood)}
                className="group flex flex-col items-center gap-4"
                aria-pressed={active}
              >
                <MoodBlob mood={mood} active={active} size={80} />
                <span
                  className={`text-sm transition-colors ${active ? "text-gold" : "text-muted-foreground group-hover:text-foreground"}`}
                >
                  {MOOD_LABELS[mood]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-border">
        <img
          src={flowerBranchAsset.url}
          alt="Pale blossoms on a dark branch"
          className="absolute inset-y-0 right-0 h-full w-2/3 object-cover opacity-30"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-surface/55" />

        <div className="relative grid gap-8 p-6 sm:p-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:p-11">
          <div className="flex min-w-0 items-start gap-4">
            <Quote className="mt-1 h-5 w-5 shrink-0 text-gold/60" strokeWidth={1.5} />
            <p className="font-display text-xl leading-relaxed text-foreground sm:text-2xl">
              Every emotion is valid.
              <br />
              It&rsquo;s part of your story.
            </p>
          </div>
          <p className="font-display text-lg italic leading-relaxed text-gold-soft/90 sm:text-xl lg:text-right">
            Same you.
            <br />
            Softer days.
          </p>
        </div>
      </div>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-2.5 text-xs text-foreground/80 transition-colors hover:bg-secondary sm:text-sm">
      {children}
      <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.5} />
    </button>
  );
}

function MoodJourney() {
  return (
    <section className="panel p-6 sm:p-9 lg:p-11">
      <SectionHead
        icon={ChartNoAxesColumn}
        title="Your mood journey"
        subtitle="See how your mood flows over time."
        action={<Pill>Last 7 days</Pill>}
      />

      <div className="mt-10 flex gap-5 sm:gap-8">
        <div className="hidden shrink-0 flex-col justify-between py-4 sm:flex">
          <MoodBlob mood="happy" size={30} active />
          <MoodBlob mood="neutral" size={30} active />
          <MoodBlob mood="sad" size={30} active />
        </div>
        <div className="min-w-0 flex-1">
          <MoodChart data={CHART} />
        </div>
      </div>

      <div className="relative mt-10 overflow-hidden rounded-2xl border border-border">
        <img
          src={flowerDetailAsset.url}
          alt="A single pale flower among dark leaves"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-card via-card/90 to-card/60" />
        <div className="relative grid gap-6 p-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-8">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <Leaf className="h-4.5 w-4.5 shrink-0 text-gold" strokeWidth={1.5} />
              <span className="font-display text-xl text-foreground">A small insight</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/80 sm:text-base">
              You tend to feel calmer in the evenings.
            </p>
            <span className="mt-5 block h-px w-10 bg-gold/50" />
          </div>
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-gold/30 bg-gold/10 sm:justify-self-end">
            <Sun className="h-6 w-6 text-gold" strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </section>
  );
}

function MoodDistribution() {
  return (
    <section className="panel p-6 sm:p-9 lg:p-11">
      <SectionHead
        icon={Sun}
        title="Mood distribution"
        subtitle="Where your days have been landing lately."
        action={<Pill>Last 30 days</Pill>}
      />
      <div className="mt-10 grid gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:gap-14">
        <div className="lg:max-w-md">
          <MoodDonut slices={SLICES} total={12} />
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-border">
          <img
            src={bokehAsset.url}
            alt="Soft golden bokeh lights in a dark garden"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-card/95 to-card/70" />
          <div className="relative p-7 sm:p-9">
            <p className="font-display text-2xl leading-snug text-foreground">
              You feel.
              <br />
              You heal.
              <br />
              You grow.
            </p>
            <span className="mt-6 block h-px w-10 bg-gold/50" />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Calm days are becoming your most common ones — a quarter of this month so far.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const INSIGHTS = [
  {
    icon: ChartNoAxesColumn,
    text: "Your mood has been more stable lately. That's a positive sign.",
  },
  { icon: Leaf, text: "Evening check-ins tend to be your calmest moments of the day." },
  { icon: Sun, text: "Mornings after a walk read a little brighter than the rest." },
];

function QuickInsights() {
  return (
    <section className="panel p-6 sm:p-9 lg:p-11">
      <SectionHead
        icon={Sun}
        title="Quick insights"
        subtitle="Gentle patterns we noticed in your entries."
        action={
          <button className="inline-flex items-center gap-2 text-sm text-gold transition-opacity hover:opacity-80">
            See all
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        }
      />

      <ul className="mt-10 space-y-4">
        {INSIGHTS.map(({ icon: Icon, text }) => (
          <li key={text}>
            <button className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-5 rounded-2xl border border-border bg-card/70 p-5 text-left transition-colors hover:bg-card sm:p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary">
                <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
              </span>
              <span className="min-w-0 text-sm leading-relaxed text-foreground/85 sm:text-base">{text}</span>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-muted-foreground">
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Streak() {
  return (
    <section className="relative overflow-hidden panel">
      <img
        src={candleAsset.url}
        alt="A lit candle glowing in a dark bowl"
        className="absolute inset-y-0 right-0 h-full w-1/2 object-cover opacity-25"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/95 to-surface/60" />

      <div className="relative p-6 sm:p-9 lg:p-11">
        <SectionHead
          icon={Zap}
          title="Streak & consistency"
          subtitle="Small check-ins, kept up gently."
        />

        <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-12 sm:divide-x sm:divide-border">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-6">
            <div>
              <p className="font-display text-6xl leading-none text-gold">5</p>
              <p className="mt-3 text-sm text-muted-foreground">day streak</p>
            </div>
            <div className="flex items-center gap-2.5">
              {[true, true, true, true, false].map((done, i) => (
                <span
                  key={i}
                  className={`grid h-8 w-8 place-items-center rounded-full border ${
                    done ? "border-gold/50 bg-gold/15 text-gold" : "border-border text-transparent"
                  }`}
                >
                  <Check className="h-4 w-4" strokeWidth={2} />
                </span>
              ))}
            </div>
          </div>

          <div className="sm:pl-12">
            <p className="max-w-xs text-sm leading-relaxed text-foreground/85 sm:text-base">
              You&rsquo;ve been more consistent this week.
            </p>
            <div className="mt-6 flex items-center gap-3 text-gold">
              <ArrowUp className="h-4 w-4" strokeWidth={2} />
              <span className="text-sm tabular-nums">12%</span>
              <ChartNoAxesColumn className="ml-2 h-5 w-5" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClosingBanner() {
  return (
    <section className="relative overflow-hidden rounded-[calc(var(--radius)+0.25rem)] border border-border">
      <img
        src={mountainLakeAsset.url}
        alt="Sunset over a still mountain lake"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />

      <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:p-14">
        <div className="min-w-0">
          <p className="font-display text-2xl leading-snug text-foreground sm:text-3xl">
            A calmer mind
            <br />
            creates a brighter you.
          </p>
          <span className="mt-6 block h-px w-10 bg-gold/50" />
        </div>
        <button className="inline-flex items-center justify-center gap-2.5 rounded-full border border-gold/40 px-7 py-4 text-sm text-gold transition-colors hover:bg-gold/10 lg:justify-self-end">
          Explore your insights
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}

function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-sidebar/95 backdrop-blur lg:hidden">
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {NAV.filter((n) => n.label !== "Cycle").map(({ label, icon: Icon }) => {
          const active = label === "Mood";
          return (
            <li key={label}>
              <button
                className={`flex w-full flex-col items-center gap-1.5 py-3.5 text-[0.65rem] ${
                  active ? "text-gold" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={1.5} />
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
