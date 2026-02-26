import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Map,
  Sparkles,
  CheckCircle2,
  Users,
  MessageCircle,
  Video,
  Send,
  Calendar,
  Heart,
  GraduationCap,
  BadgeCheck,
} from "lucide-react";

/**
 * Hope Map – React single-file page
 * Tailwind classes are used for styling.
 * Replace placeholder images/avatars with real assets as needed.
 */

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

type PropsWithChildren = { children: React.ReactNode };

type SectionTitleProps = {
  kicker?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
};

type CardProps = {
  className?: string;
  children: React.ReactNode;
};

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

type StatProps = {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
};

type TimelineItem = { title: string; note?: string };
type TimelineProps = { items: TimelineItem[] };

type AvatarProps = { name: string; subtitle?: string; badge?: string };


function Pill({ children }: PropsWithChildren) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#E6E6F2] bg-[var(--hm-surface)]/80 px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm backdrop-blur">
      {children}
    </span>
  );
}

function SectionTitle({ kicker, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {kicker ? (
        <div className="mb-3 flex items-center justify-center gap-2">
          <Pill>{kicker}</Pill>
        </div>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-pretty text-base leading-7 text-[#4B5563] sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function Card({ className = "", children }: CardProps) {
  return (
    <div
      className={
        "rounded-2xl border border-[var(--hm-border)] bg-[var(--hm-surface)] shadow-sm " +
        "hover:shadow-md transition-shadow " +
        className
      }
    >
      {children}
    </div>
  );
}



function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition active:scale-[0.99]";

    const styles =
    variant === "primary"
      ? "bg-[#4F46E5] text-white hover:bg-[#4338CA]"
      : variant === "secondary"
        ? "bg-[var(--hm-surface-2)] text-zinc-900 hover:bg-zinc-200"
        : variant === "outline"
          ? "border border-[var(--hm-border)] bg-[var(--hm-surface)] text-zinc-900 hover:bg-[var(--hm-surface-2)]"
          : "bg-transparent text-zinc-900 hover:bg-[var(--hm-surface-2)]";

  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}

function Stat({ label, value, icon: Icon }: StatProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[var(--hm-border)] bg-[var(--hm-surface)]/70 px-4 py-3 shadow-sm backdrop-blur">
      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--hm-primary)] text-white">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-sm font-semibold text-zinc-900">{value}</div>
        <div className="text-xs text-[var(--hm-muted)]">{label}</div>
      </div>
    </div>
  );
}

function Timeline({ items }: TimelineProps) {
  
  return (
    <div className="relative">
      <div className="absolute left-4 top-1.5 h-[calc(100%-12px)] w-px bg-zinc-200" />
      <ul className="space-y-3">
        {items.map((t, idx) => (
          <li key={idx} className="relative pl-12">
            <div className="absolute left-2 top-1.5 h-4 w-4 rounded-full border-2 border-zinc-900 bg-[var(--hm-surface)]" />
            <div className="rounded-2xl border border-[var(--hm-border)] bg-[var(--hm-surface)] px-4 py-3">
              <div className="text-sm font-semibold text-zinc-900">{t.title}</div>
              {t.note ? (
                <div className="mt-1 text-xs leading-5 text-[var(--hm-muted)]">{t.note}</div>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Avatar({ name, subtitle, badge }: AvatarProps) {
  const initials = useMemo(() => {
    const parts = name.split(" ").filter(Boolean);
    return parts
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join("");
  }, [name]);

  return (
    <div className="flex items-start gap-3">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--hm-primary)] text-white">
        <span className="text-sm font-bold">{initials}</span>
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <div className="truncate text-sm font-semibold text-zinc-900">{name}</div>
          {badge ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--hm-primary)] px-2 py-0.5 text-[11px] font-semibold text-white">
              <BadgeCheck className="h-3.5 w-3.5" />
              {badge}
            </span>
          ) : null}
        </div>
        {subtitle ? <div className="text-xs text-[var(--hm-muted)]">{subtitle}</div> : null}
      </div>
    </div>
  );
}


export default function App() {
  const [query, setQuery] = useState("");
  const [concern, setConcern] = useState("Speech & Language");
  const [childAge, setChildAge] = useState("2 years 3 months");
  const [diagnosisAge, setDiagnosisAge] = useState("No Diagnosis");
  const [language, setLanguage] = useState("English & Spanish");
  const [zip, setZip] = useState("95112");

  const demoProfiles = [
    {
      name: "Kathy",
      meta: [
        "Child Age: 2 years 3 months",
        "Age of Diagnosis: No Diagnosis",
        "Language: English & Spanish",
        "Lives in: San Jose",
      ],
      focus: "Speech & Language",
      track: {
        title: "Autism Screening for Toddlers",
        bullets: [
          "Roadmap for seeking autism diagnosis",
          "Early intervention is key",
        ],
      },
    },
    {
      name: "Rose",
      meta: [
        "Child Age: 5 years 3 months",
        "Age of Diagnosis: 2 years old",
        "Language: English",
        "Lives in: San Ramon",
      ],
      focus: "Behavior",
      track: {
        title: "Set up a successful IEP team",
        bullets: [
          "School support for behavioral challenges",
          "Find the right behavioral therapists",
          "Coordinate care",
        ],
      },
    },
    {
      name: "Ming",
      meta: [
        "Child Age: 12 years 5 months",
        "Age of Diagnosis: 5 years old",
        "Language: English & Chinese",
        "Lives in: New York, NY",
      ],
      focus: "Social Skills",
      track: {
        title: "All You Need to Know for Teens",
        bullets: [
          "Teens with autism",
          "Spot signs of bullying",
          "Sex education for boys",
        ],
      },
    },
  ];

  const trackItems = [
    { title: "Pediatrician visit" },
    { title: "Contact Regional Centers" },
    { title: "Find mentors & professionals" },
    { title: "Find funding sources" },
    { title: "Learn how to observe your child at home" },
    { title: "Track progress" },
  ];

  const mentors = [
    {
      name: "Selina Gomez",
      status: "Online",
      blurb:
        "Hi, I'm a proud mom of two sons, Mateo & Gio. Mateo was diagnosed with ASD at 3. Happy to chat!",
      location: "San Jose",
      childrenAges: "13 & 7",
      expertise: ["language delay", "sensory issue", "IEP advocate"],
      availability: ["Today", "Saturday"],
    },
    {
      name: "Mila Phong",
      status: "Growing heart",
      blurb:
        "Let me tell you how I found Luis the best speech therapist and BCBA. Let's connect.",
      location: "Online",
      childrenAges: "6",
      expertise: ["speech therapy", "navigating services"],
      availability: ["This week"],
    },
    {
      name: "Rigo Cruz",
      status: "FEDA hero",
      blurb: "You're not alone. I'm here to help you at your toughest moments.",
      location: "Online",
      childrenAges: "10",
      expertise: ["care coordination", "support"],
      availability: ["Today"],
    },
  ];

  const pros = [
    {
      name: "Carly Ferris",
      role: "Speech & language pathologist",
      badge: "ASHA certified",
      blurb:
        "Expertise in speech delay and socialization for children with autism.",
      status: "Online now",
      actions: [
        { label: "Chat", icon: MessageCircle },
        { label: "Video", icon: Video },
      ],
    },
    {
      name: "Dr. Kian Graham",
      role: "Psychologist",
      badge: "Specialist",
      blurb:
        "Specialized in autism diagnosis and intervention for children and teens with autism, ADHD, and anxiety.",
      status: "Available tomorrow",
      actions: [{ label: "Message", icon: Send }],
    },
  ];

  const communities = [
    {
      title: "Sensory issues",
      prompt:
        "My son, Tio (5), is very sensitive to light and squints outside frequently. But he hates sunglasses. Help!",
      author: "Maria K.",
    },
    { title: "Tribe for Single Moms", members: "1.6k members" },
    { title: "East Bay Indian Parents", members: "280 members" },
  ];

  const nav = [
    { label: "Our Mission", href: "#mission" },
    { label: "How It Works", href: "#how" },
    { label: "Mentors", href: "#mentors" },
    { label: "Professional Help", href: "#pros" },
    { label: "Community", href: "#community" },
    { label: "Resources", href: "#resources" },
  ];

  return (
    <div className="min-h-screen bg-[var(--hm-bg)] text-[var(--hm-text)]">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-[var(--hm-border)]/70 bg-[var(--hm-surface)]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#" className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--hm-primary)] text-white">
              <Map className="h-5 w-5" />
            </span>
            <span className="text-sm font-extrabold tracking-tight">Hope Map</span>
          </a>

          <nav className="hidden items-center gap-5 md:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm font-medium text-[var(--hm-muted)] hover:text-zinc-900"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button>Join Hope Map</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -left-28 -top-28 h-72 w-72 rounded-full bg-zinc-200/70 blur-3xl" />
          <div className="absolute -right-28 top-10 h-72 w-72 rounded-full bg-zinc-300/60 blur-3xl" />
        </div>


        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            animate="show"
            className="grid items-center gap-10 lg:grid-cols-2"
          >
            <motion.div variants={fadeUp}>
              <div className="flex flex-wrap items-center gap-2">
                <Pill>Learn and grow with help from parent mentors and experts</Pill>
                <Pill>
                  <Sparkles className="h-3.5 w-3.5" />
                  Personalized roadmaps
                </Pill>
              </div>
              <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Your journey of parenting children with autism is no longer alone.
              </h1>
              <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-[var(--hm-muted)] sm:text-lg">
                Search by areas of concern, answer a few quick questions, and get a tailored plan—plus real people
                you can talk to.
              </p>

              <div className="mt-7 rounded-2xl border border-[var(--hm-border)] bg-[var(--hm-surface)] p-3 shadow-sm">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search by areas of concern"
                      className="w-full rounded-2xl border border-[var(--hm-border)] bg-[var(--hm-surface-2)] px-10 py-3 text-sm outline-none focus:border-zinc-400"
                    />
                  </div>
                  <Button className="px-5 py-3">Search</Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Speech & Language", "Behavior", "Social Skills", "Sensory", "IEP", "Sleep"].map(
                    (t) => (
                      <button
                        key={t}
                        onClick={() => setQuery(t)}
                        className="rounded-full border border-[var(--hm-border)] bg-[var(--hm-surface)] px-3 py-1 text-xs font-medium text-zinc-700 hover:bg-[var(--hm-surface-2)]"
                      >
                        {t}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Stat label="Mentors" value="Parent mentors" icon={Users} />
                <Stat label="Experts" value="Professional advice" icon={GraduationCap} />
                <Stat label="Plans" value="Guided roadmaps" icon={CheckCircle2} />
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="lg:pl-6">
              <Card className="overflow-hidden">
                <div className="border-b border-[var(--hm-border)] bg-[var(--hm-surface-2)] px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="grid h-9 w-9 place-items-center rounded-2xl bg-[var(--hm-primary)] text-white">
                        <Map className="h-4.5 w-4.5" />
                      </span>
                      <div>
                        <div className="text-sm font-semibold">my hope map</div>
                        <div className="text-xs text-[var(--hm-muted)]">Glad you’re here!</div>
                      </div>
                    </div>
                    <Pill>Recommended Track</Pill>
                  </div>
                </div>
                <div className="p-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-zinc-700">Concern</label>
                      <select
                        value={concern}
                        onChange={(e) => setConcern(e.target.value)}
                        className="mt-1 w-full rounded-2xl border border-[var(--hm-border)] bg-[var(--hm-surface)] px-3 py-2 text-sm outline-none focus:border-zinc-400"
                      >
                        {[
                          "Speech & Language",
                          "Behavior",
                          "Social Skills",
                          "Sensory",
                          "IEP",
                          "Sleep",
                        ].map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-zinc-700">Language</label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="mt-1 w-full rounded-2xl border border-[var(--hm-border)] bg-[var(--hm-surface)] px-3 py-2 text-sm outline-none focus:border-zinc-400"
                      >
                        {["English", "English & Spanish", "English & Chinese"].map((l) => (
                          <option key={l} value={l}>
                            {l}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-zinc-700">Your child’s age</label>
                      <select
                        value={childAge}
                        onChange={(e) => setChildAge(e.target.value)}
                        className="mt-1 w-full rounded-2xl border border-[var(--hm-border)] bg-[var(--hm-surface)] px-3 py-2 text-sm outline-none focus:border-zinc-400"
                      >
                        {["2 years 3 months", "5 years 3 months", "12 years 5 months"].map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-zinc-700">Age at diagnosis</label>
                      <select
                        value={diagnosisAge}
                        onChange={(e) => setDiagnosisAge(e.target.value)}
                        className="mt-1 w-full rounded-2xl border border-[var(--hm-border)] bg-[var(--hm-surface)] px-3 py-2 text-sm outline-none focus:border-zinc-400"
                      >
                        {["No Diagnosis", "2 years old", "5 years old"].map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-zinc-700">Zip Code</label>
                      <input
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        className="mt-1 w-full rounded-2xl border border-[var(--hm-border)] bg-[var(--hm-surface)] px-3 py-2 text-sm outline-none focus:border-zinc-400"
                        placeholder="Zip Code"
                      />
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-[var(--hm-border)] bg-[var(--hm-surface-2)] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold">Autism Screening for Toddlers</div>
                        <ul className="mt-2 space-y-1 text-xs text-[var(--hm-muted)]">
                          <li>• Roadmap for seeking autism diagnosis</li>
                          <li>• Early intervention is key</li>
                        </ul>
                      </div>
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--hm-surface)] shadow-sm">
                        <CheckCircle2 className="h-5 w-5" />
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button variant="secondary">Autism awareness</Button>
                      <Button>Join Hope Map</Button>
                      <Button variant="outline">Seek help & support</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="border-t border-[var(--hm-border)] bg-[var(--hm-surface)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionTitle
            kicker="Our Mission"
            title="All you need for parenting children with autism in one place"
            subtitle="Hope Map brings guidance, people, and resources together—so you can move forward with clarity and support."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {["Personalized tracks", "Parent mentors", "Professional support"].map((t, i) => (
              <motion.div
                key={t}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--hm-primary)] text-white">
                      {i === 0 ? (
                        <Sparkles className="h-5 w-5" />
                      ) : i === 1 ? (
                        <Users className="h-5 w-5" />
                      ) : (
                        <GraduationCap className="h-5 w-5" />
                      )}
                    </span>
                    <div className="text-base font-semibold">{t}</div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--hm-muted)]">
                    {i === 0
                      ? "Answer 5 quick questions and get recommendations tailored to your child."
                      : i === 1
                        ? "Talk to parents who’ve been there and can share practical strategies."
                        : "Get expert guidance—chat, video, or messaging when you need it."}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-[var(--hm-border)] bg-[var(--hm-surface-2)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionTitle
            kicker="How Hope Map Works"
            title="A simple path to personalized support"
            subtitle="Tell us about your child, get a plan, and grow into a mentor for others when you’re ready."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                step: "Step 1",
                title: "Tell us about your unique child",
                body: "Answer 5 simple questions so we can understand your needs.",
                icon: Sparkles,
              },
              {
                step: "Step 2",
                title: "Get personalized recommendations",
                body: "Roadmaps, parent mentors, professional advice, and local resources.",
                icon: CheckCircle2,
              },
              {
                step: "Step 3",
                title: "Grow with the community",
                body: "Be a mentee today. Become a mentor tomorrow.",
                icon: Users,
              },
            ].map((s, idx) => (
              <motion.div
                key={s.step}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="h-full p-6">
                  <div className="flex items-start justify-between">
                    <Pill>{s.step}</Pill>
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--hm-primary)] text-white">
                      <s.icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="mt-4 text-lg font-semibold">{s.title}</div>
                  <p className="mt-2 text-sm leading-6 text-[var(--hm-muted)]">{s.body}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Personalized recommendations */}
      <section className="border-t border-[var(--hm-border)] bg-[var(--hm-surface)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionTitle
            kicker="Personalized recommendations for you"
            title="Examples of what a Hope Map can look like"
            subtitle="Below are sample profiles and recommended tracks based on common concerns."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {demoProfiles.map((p, idx) => (
              <motion.div
                key={p.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="h-full overflow-hidden">
                  <div className="border-b border-[var(--hm-border)] bg-[var(--hm-surface-2)] px-5 py-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">{p.name}</div>
                      <Pill>my hope map</Pill>
                    </div>
                    <div className="mt-2 text-xs text-[var(--hm-muted)]">
                      I have questions about my child’s <span className="font-semibold">{p.focus}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <ul className="space-y-1 text-xs text-zinc-700">
                      {p.meta.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>

                    <div className="mt-4 rounded-2xl border border-[var(--hm-border)] bg-[var(--hm-surface)] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold">Recommended Track</div>
                          <div className="mt-2 text-sm font-semibold text-zinc-900">{p.track.title}</div>
                          <ul className="mt-2 space-y-1 text-xs text-[var(--hm-muted)]">
                            {p.track.bullets.map((b) => (
                              <li key={b}>• {b}</li>
                            ))}
                          </ul>
                        </div>
                        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--hm-primary)] text-white">
                          <Map className="h-5 w-5" />
                        </span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button variant="secondary" className="text-xs">
                          Autism awareness
                        </Button>
                        <Button className="text-xs">Join Hope Map</Button>
                        <Button variant="outline" className="text-xs">
                          Seek help & support
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card className="p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">You’re on track!</div>
                  <div className="mt-1 text-lg font-semibold">Autism Screening for Toddlers</div>
                  <p className="mt-2 text-sm text-[var(--hm-muted)]">
                    Roadmap for seeking autism diagnosis • Early intervention is key
                  </p>
                </div>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--hm-primary)] text-white">
                  <CheckCircle2 className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="text-sm font-semibold">Other tracks you may like</div>
                  <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                    <li>• Calm your toddler in a tantrum</li>
                    <li>• What’s next after an ASD diagnosis?</li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-semibold">Recommended steps</div>
                  <div className="mt-3">
                    <Timeline items={trackItems} />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Quick start</div>
                <Pill>5 questions</Pill>
              </div>
              <p className="mt-2 text-sm text-[var(--hm-muted)]">
                Want something tailored? Start your Hope Map and we’ll suggest tracks, mentors, and resources.
              </p>
              <div className="mt-6 grid gap-3">
                {["Choose concern", "Add age + language", "Add location", "Review recommendations", "Connect"].map(
                  (t, i) => (
                    <div
                      key={t}
                      className="flex items-center gap-3 rounded-2xl border border-[var(--hm-border)] bg-[var(--hm-surface-2)] px-4 py-3"
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-2xl bg-[var(--hm-primary)] text-white">
                        <span className="text-xs font-bold">{i + 1}</span>
                      </span>
                      <div className="text-sm font-medium text-zinc-800">{t}</div>
                    </div>
                  )
                )}
              </div>
              <div className="mt-6">
                <Button className="w-full">Create my Hope Map</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section id="mentors" className="border-t border-[var(--hm-border)] bg-[var(--hm-surface-2)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionTitle
            kicker="Meet your parent mentors"
            title="Real parents. Real support."
            subtitle="Connect with mentors who can share what worked for their family—when you need it."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {mentors.map((m, idx) => (
              <motion.div
                key={m.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="h-full p-6">
                  <div className="flex items-center justify-between gap-3">
                    <Avatar name={m.name} subtitle={m.location} badge={m.status} />
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--hm-primary)] text-white">
                      <Heart className="h-5 w-5" />
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-[var(--hm-muted)]">{m.blurb}</p>

                  <div className="mt-5 grid gap-3">
                    <div className="rounded-2xl border border-[var(--hm-border)] bg-[var(--hm-surface)] p-4">
                      <div className="text-xs font-semibold text-zinc-700">Age of children</div>
                      <div className="mt-1 text-sm font-medium">{m.childrenAges}</div>
                    </div>

                    <div className="rounded-2xl border border-[var(--hm-border)] bg-[var(--hm-surface)] p-4">
                      <div className="text-xs font-semibold text-zinc-700">Areas of knowledge</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {m.expertise.map((e) => (
                          <Pill key={e}>{e}</Pill>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[var(--hm-border)] bg-[var(--hm-surface)] p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-semibold text-zinc-700">Availability</div>
                        <Calendar className="h-4 w-4 text-zinc-500" />
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {m.availability.map((a) => (
                          <span
                            key={a}
                            className="rounded-full bg-[var(--hm-primary)] px-3 py-1 text-xs font-semibold text-white"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Button className="w-full">Connect</Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professionals */}
      <section id="pros" className="border-t border-[var(--hm-border)] bg-[var(--hm-surface)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionTitle
            kicker="Professional help"
            title="Just a click away"
            subtitle="Chat, video, or message with vetted professionals when you need extra support."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {pros.map((p, idx) => (
              <motion.div
                key={p.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <Avatar name={p.name} subtitle={p.role} badge={p.badge} />
                    <Pill>{p.status}</Pill>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-[var(--hm-muted)]">{p.blurb}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.actions.map((a) => (
                      <Button
                        key={a.label}
                        variant={a.label === "Message" ? "primary" : "secondary"}
                      >
                        <a.icon className="h-4 w-4" />
                        {a.label}
                      </Button>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl border border-[var(--hm-border)] bg-[var(--hm-surface-2)] p-4">
                    <div className="text-xs font-semibold text-zinc-700">Availability</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {["Today", "Saturday", "Tomorrow"].slice(0, idx === 0 ? 2 : 1).map((d) => (
                        <span
                          key={d}
                          className="rounded-full border border-[var(--hm-border)] bg-[var(--hm-surface)] px-3 py-1 text-xs font-medium text-zinc-700"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section id="community" className="border-t border-[var(--hm-border)] bg-[var(--hm-surface-2)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionTitle
            kicker="Community"
            title="It takes a village. Find yours."
            subtitle="Ask questions, join groups, and share what you’re learning with others." 
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-2"
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">Topic</div>
                  <Pill>Sensory issues</Pill>
                </div>
                <p className="mt-4 text-sm leading-6 text-zinc-700">
                  {communities[0].prompt}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--hm-primary)] text-white">
                      <Users className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold">{communities[0].author}</div>
                      <div className="text-xs text-[var(--hm-muted)]">Posted just now</div>
                    </div>
                  </div>
                  <Button variant="secondary">Reply</Button>
                </div>
              </Card>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              <div className="space-y-6">
                {communities.slice(1).map((g) => (
                  <Card key={g.title} className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold">{g.title}</div>
                        <div className="mt-1 text-xs text-[var(--hm-muted)]">{g.members}</div>
                      </div>
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--hm-primary)] text-white">
                        <Users className="h-5 w-5" />
                      </span>
                    </div>
                    <div className="mt-4">
                      <Button className="w-full">Join group</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="border-t border-[var(--hm-border)] bg-[var(--hm-surface)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionTitle
            kicker="Resources"
            title="Places to go, learning resources, events, and more"
            subtitle="Curated links and local options to help you take the next step—at your pace." 
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {["Local services", "Learning", "Events"].map((t, idx) => (
              <motion.div
                key={t}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold">{t}</div>
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--hm-primary)] text-white">
                      {idx === 0 ? (
                        <Map className="h-5 w-5" />
                      ) : idx === 1 ? (
                        <GraduationCap className="h-5 w-5" />
                      ) : (
                        <Calendar className="h-5 w-5" />
                      )}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--hm-muted)]">
                    {idx === 0
                      ? "Discover nearby programs, therapists, and community services by zip code."
                      : idx === 1
                        ? "Articles, toolkits, and guides across speech, behavior, and social skills."
                        : "Find parent meetups, webinars, and local happenings—online or in-person."}
                  </p>
                  <div className="mt-5">
                    <Button variant="secondary" className="w-full">
                      Explore {t.toLowerCase()}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-[var(--hm-border)] bg-[var(--hm-surface-2)] p-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="text-lg font-semibold">Ready to start?</div>
                <p className="mt-1 text-sm text-[var(--hm-muted)]">
                  Create your Hope Map in under 2 minutes and get your first recommendations.
                </p>
              </div>
              <div className="flex w-full gap-2 sm:w-auto">
                <Button className="w-full sm:w-auto">
                  <Sparkles className="h-4 w-4" />
                  Create my Hope Map
                </Button>
                <Button variant="outline" className="w-full sm:w-auto">
                  Talk to a mentor
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--hm-border)] bg-[var(--hm-surface)]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--hm-primary)] text-white">
                <Map className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-extrabold tracking-tight">Hope Map</div>
                <div className="text-xs text-[var(--hm-muted)]">Support for parents of children with autism</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="text-sm font-medium text-[var(--hm-muted)] hover:text-zinc-900"
                >
                  {n.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-[var(--hm-border)] pt-6 text-xs text-[var(--hm-muted)] sm:flex-row sm:items-center sm:justify-between">
            <div>© {new Date().getFullYear()} Hope Map. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-zinc-900">Privacy</a>
              <a href="#" className="hover:text-zinc-900">Terms</a>
              <a href="#" className="hover:text-zinc-900">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
