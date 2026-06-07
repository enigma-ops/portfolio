"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── Scroll-aware navbar hook ────────────────────────────────────────────────
function useScrollNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const nearBottom = scrollY + winHeight >= docHeight - 200;
      setVisible(scrollY > 80 && !nearBottom);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return visible;
}

// ─── Intersection Observer hook ──────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    document
      .querySelectorAll(".section-reveal, .reveal")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

// ─── Components ──────────────────────────────────────────────────────────────

function Navbar() {
  const visible = useScrollNav();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backdropFilter: "blur(16px)",
        backgroundColor: "rgba(17,17,17,0.9)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.3s ease, opacity 0.3s ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-14 flex items-center justify-between">
        <span
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: "#cbff00" }}
        >
          DL
        </span>
        <div className="flex items-center gap-8">
          {["Research", "Work", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs tracking-widest uppercase link-line"
              style={{ color: "#666666", transition: "color 0.2s ease" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#ffffff")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#666666")
              }
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex flex-col justify-between overflow-hidden"
      style={{
        minHeight: "100svh",
        backgroundColor: "#111111",
        paddingTop: "6rem",
        paddingBottom: "3rem",
      }}
    >
      {/* Reading progress */}
      <div className="progress-bar" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Volt glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          left: "-5%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(203,255,0,0.07) 0%, transparent 70%)",
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full flex-1 flex flex-col justify-center"
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-8 h-px"
            style={{ backgroundColor: "#cbff00" }}
          />
          <span
            className="text-xs tracking-widest uppercase font-medium"
            style={{ color: "#cbff00" }}
          >
            Pasadena, California
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="flicker font-black uppercase leading-none tracking-tighter"
          style={{
            fontSize: "clamp(4rem, 18vw, 18rem)",
            color: "#ffffff",
            marginBottom: "0.1em",
          }}
        >
          DECLAN
        </h1>
        <h1
          className="font-black uppercase leading-none tracking-tighter"
          style={{
            fontSize: "clamp(4rem, 18vw, 18rem)",
            color: "#cbff00",
            marginBottom: "2rem",
          }}
        >
          LI
        </h1>

        {/* Descriptor pills */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {[
            { label: "Research Intern", color: "#ff6100" },
            { label: "Caltech / USDA", color: "#4b92db" },
            { label: "Biophysics", color: "#e5002d" },
            { label: "Agriculture", color: "#cbff00" },
          ].map(({ label, color }) => (
            <span
              key={label}
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color }}
            >
              {label}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div
          className="flex items-end justify-between pt-6"
          style={{ borderTop: "1px solid #222222" }}
        >
          <p
            className="text-sm leading-relaxed max-w-sm"
            style={{ color: "#666666" }}
          >
            Engineering sustainable alternatives to chemical fertilizers.
            <br />
            Building technology that brings about genuine progress.
          </p>
          <a
            href="#research"
            className="flex items-center gap-2 text-xs tracking-widest uppercase font-medium"
            style={{ color: "#cbff00" }}
          >
            <span>Scroll</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    { text: "BIOPHYSICS", color: "#cbff00" },
    { text: "CALTECH", color: "#ffffff" },
    { text: "QUANTUM SYSTEMS", color: "#ff6100" },
    { text: "SUSTAINABLE AG", color: "#4b92db" },
    { text: "RHIZOBACTERIA", color: "#e5002d" },
    { text: "MUSIC", color: "#ff1493" },
    { text: "AZOTOBACTER", color: "#cbff00" },
    { text: "USDA FUNDED", color: "#ffffff" },
    { text: "BRACHYPODIUM", color: "#ff6100" },
    { text: "BIOFERTILIZER", color: "#4b92db" },
  ];

  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden py-4"
      style={{
        backgroundColor: "#0a0a0a",
        borderTop: "1px solid #222",
        borderBottom: "1px solid #222",
      }}
    >
      <div className="marquee-track">
        {doubled.map(({ text, color }, i) => (
          <span
            key={i}
            className="text-xs font-bold tracking-widest uppercase mx-8 whitespace-nowrap"
            style={{ color }}
          >
            {text}
            <span className="mx-8" style={{ color: "#333" }}>
              /
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Research() {
  return (
    <section id="research" className="py-32" style={{ backgroundColor: "#111111" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16 section-reveal">
          <div className="w-8 h-px" style={{ backgroundColor: "#ff6100" }} />
          <span
            className="text-xs tracking-widest uppercase font-bold"
            style={{ color: "#ff6100" }}
          >
            Featured Work
          </span>
        </div>

        {/* Big feature card */}
        <div
          className="section-reveal rounded-2xl overflow-hidden mb-8"
          style={{
            backgroundColor: "#161616",
            border: "1px solid #2a2a2a",
          }}
        >
          {/* Gradient accent bar */}
          <div
            className="h-1 w-full"
            style={{
              background:
                "linear-gradient(90deg, #ff6100, #e5002d, #ff1493, #4b92db)",
            }}
          />

          <div className="p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
                    style={{
                      backgroundColor: "rgba(255,97,0,0.1)",
                      color: "#ff6100",
                      border: "1px solid rgba(255,97,0,0.2)",
                    }}
                  >
                    Active Research
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
                    style={{
                      backgroundColor: "rgba(75,146,219,0.1)",
                      color: "#4b92db",
                      border: "1px solid rgba(75,146,219,0.2)",
                    }}
                  >
                    USDA Funded
                  </span>
                </div>

                <h2
                  className="font-black uppercase leading-tight tracking-tight mb-6"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#ffffff" }}
                >
                  SUSTAINABLE
                  <br />
                  <span style={{ color: "#ff6100" }}>BIOFERTILIZER</span>
                  <br />
                  RESEARCH
                </h2>

                <p className="text-base leading-relaxed mb-8" style={{ color: "#888888" }}>
                  At Caltech&apos;s Demirer Laboratory, engineering
                  sustainable alternatives to chemical fertilizers. Optimizing{" "}
                  <em>Azotobacter vinelandii</em> biofertilizer and chemical nitrogen in
                  floating cultures of <em>Brachypodium distachyon</em>, exploring the
                  potential of beneficial rhizobacteria to minimize agricultural
                  environmental footprints.
                </p>

                <div className="flex flex-wrap gap-3">
                  {[
                    "Azotobacter vinelandii",
                    "Brachypodium distachyon",
                    "Rhizobacteria",
                    "Nitrogen Fixation",
                    "Floating Cultures",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{
                        backgroundColor: "#1e1e1e",
                        color: "#888888",
                        border: "1px solid #2a2a2a",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    num: "01",
                    color: "#cbff00",
                    title: "Nitrogen Optimization",
                    desc: "Comparing biofertilizer and chemical nitrogen inputs to identify optimal ratios for plant growth without environmental cost.",
                  },
                  {
                    num: "02",
                    color: "#ff6100",
                    title: "Floating Culture Systems",
                    desc: "Developing hydroponic floating culture platforms for controlled, reproducible experiments with Brachypodium distachyon.",
                  },
                  {
                    num: "03",
                    color: "#4b92db",
                    title: "Rhizobacterial Analysis",
                    desc: "Profiling beneficial soil bacteria and their interactions with root systems to reduce reliance on synthetic fertilizers.",
                  },
                  {
                    num: "04",
                    color: "#e5002d",
                    title: "Environmental Impact",
                    desc: "Measuring and minimizing the agricultural environmental footprint across full plant lifecycle studies.",
                  },
                ].map(({ num, color, title, desc }) => (
                  <div
                    key={num}
                    className="p-5 rounded-xl"
                    style={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid #252525",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className="text-xs font-black font-mono mt-0.5 shrink-0"
                        style={{ color }}
                      >
                        {num}
                      </span>
                      <div>
                        <div
                          className="text-sm font-bold mb-1 uppercase tracking-wide"
                          style={{ color: "#ffffff" }}
                        >
                          {title}
                        </div>
                        <div className="text-xs leading-relaxed" style={{ color: "#666" }}>
                          {desc}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom metadata */}
          <div
            className="px-8 lg:px-12 py-5 flex items-center justify-between"
            style={{ borderTop: "1px solid #1e1e1e" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#cbff00" }}
              />
              <span
                className="text-xs tracking-widest uppercase font-bold"
                style={{ color: "#666" }}
              >
                Caltech Demirer Lab
              </span>
            </div>
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "#444" }}
            >
              June 2025 &mdash; Present
            </span>
          </div>
        </div>

        {/* Interests grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Biophysics",
              color: "#cbff00",
              desc: "Exploring the physical principles underlying biological systems, from molecular machines to cellular mechanics.",
            },
            {
              title: "Quantum Systems",
              color: "#4b92db",
              desc: "Fascinated by quantum phenomena and their potential applications in sensing, computing, and materials science.",
            },
            {
              title: "Philosophy",
              color: "#ff1493",
              desc: "The philosophy of authentic purpose: what it means to build something real, work that points toward something beyond itself.",
            },
          ].map(({ title, color, desc }, i) => (
            <div
              key={title}
              className="section-reveal p-6 rounded-xl"
              style={{
                backgroundColor: "#161616",
                border: "1px solid #222",
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <div
                className="text-sm font-black uppercase tracking-widest mb-3"
                style={{ color }}
              >
                {title}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      className="py-32 overflow-hidden"
      style={{ backgroundColor: "#111111" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-4 mb-10 section-reveal">
              <div className="w-8 h-px" style={{ backgroundColor: "#e5002d" }} />
              <span
                className="text-xs tracking-widest uppercase font-bold"
                style={{ color: "#e5002d" }}
              >
                About
              </span>
            </div>

            <h2
              className="font-black uppercase leading-none tracking-tight mb-8 section-reveal"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                color: "#ffffff",
              }}
            >
              BUILDING
              <br />
              <span style={{ color: "#e5002d" }}>SOMETHING</span>
              <br />
              REAL
            </h2>

            <p
              className="text-base leading-relaxed mb-6 section-reveal"
              style={{ color: "#888" }}
            >
              I&apos;m a researcher and student based in Pasadena, California, currently
              working at Caltech&apos;s Demirer Laboratory on USDA-funded research into
              sustainable agriculture. My work sits at the intersection of biology,
              chemistry, and environmental science.
            </p>
            <p
              className="text-base leading-relaxed section-reveal"
              style={{ color: "#888" }}
            >
              Outside the lab, I&apos;m a co-founder of San Marino High School&apos;s Tri-M Music
              Honor Society, where I believe leadership and creativity are inseparable. I&apos;m
              drawn to questions that matter: how do we feed the world without destroying
              it? What does authentic progress actually look like?
            </p>
          </div>

          <div className="section-reveal space-y-4">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "2025", label: "Caltech research start", color: "#ff6100" },
                { num: "USDA", label: "Research funder", color: "#cbff00" },
                { num: "2027", label: "Expected graduation", color: "#4b92db" },
                { num: "3+", label: "Leadership roles", color: "#ff1493" },
              ].map(({ num, label, color }) => (
                <div
                  key={label}
                  className="p-6 rounded-xl"
                  style={{
                    backgroundColor: "#161616",
                    border: "1px solid #222",
                  }}
                >
                  <div
                    className="text-4xl font-black uppercase tracking-tight mb-2"
                    style={{ color }}
                  >
                    {num}
                  </div>
                  <div className="text-xs tracking-wide uppercase" style={{ color: "#555" }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "#0d0d0d",
                border: "1px solid #1a1a1a",
                borderLeft: "3px solid #cbff00",
              }}
            >
              <p className="text-sm leading-relaxed italic" style={{ color: "#666" }}>
                &quot;Passionate about biophysics, quantum systems, and the philosophy
                of authentic purpose. Dedicated to building technology that brings
                about genuine progress.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Work() {
  const experiences = [
    {
      company: "Caltech",
      role: "Research Intern",
      period: "June 2025 — Present",
      location: "Pasadena, CA",
      color: "#ff6100",
      tags: ["USDA Funded", "Biofertilizer", "Plant Science"],
      desc: "Demirer Laboratory. Engineering sustainable alternatives to chemical fertilizers in USDA-funded research.",
    },
    {
      company: "Investmore",
      role: "Vice President",
      period: "June 2025 — Present",
      location: "San Marino, CA",
      color: "#cbff00",
      tags: ["Finance", "Leadership"],
      desc: "VP of Investmore, previously serving as Secretary for 11 months. Leading investment analysis and strategy.",
    },
    {
      company: "Tri-M Music Honor Society",
      role: "Co-Founder & Vice President",
      period: "November 2024 — Present",
      location: "San Marino High School",
      color: "#ff1493",
      tags: ["Music", "Leadership", "Community"],
      desc: "Co-founded SMHS chapter. Building confidence, creativity, and leadership through performance and community service.",
    },
  ];

  return (
    <section id="work" className="py-32" style={{ backgroundColor: "#0d0d0d" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-16 section-reveal">
          <div className="w-8 h-px" style={{ backgroundColor: "#cbff00" }} />
          <span
            className="text-xs tracking-widest uppercase font-bold"
            style={{ color: "#cbff00" }}
          >
            Experience
          </span>
        </div>

        <h2
          className="font-black uppercase leading-none tracking-tight mb-16 section-reveal"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 7rem)",
            color: "#ffffff",
          }}
        >
          WORK &amp;
          <br />
          <span style={{ color: "#cbff00" }}>LEADERSHIP</span>
        </h2>

        <div className="space-y-4">
          {experiences.map(({ company, role, period, location, color, tags, desc }, i) => (
            <div
              key={company}
              className="section-reveal group p-6 lg:p-8 rounded-2xl cursor-default"
              style={{
                backgroundColor: "#131313",
                border: "1px solid #1e1e1e",
                transitionDelay: `${i * 0.1}s`,
                transition:
                  "border-color 0.3s ease, background-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = color;
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "#161616";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#1e1e1e";
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "#131313";
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span
                      className="text-xs font-bold tracking-widest uppercase"
                      style={{ color }}
                    >
                      {company}
                    </span>
                  </div>
                  <h3
                    className="text-xl lg:text-2xl font-black uppercase tracking-tight mb-3"
                    style={{ color: "#ffffff" }}
                  >
                    {role}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: "#777" }}
                  >
                    {desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${color}15`,
                          color,
                          border: `1px solid ${color}30`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div
                    className="text-sm font-medium mb-1"
                    style={{ color: "#555" }}
                  >
                    {period}
                  </div>
                  <div
                    className="text-xs tracking-wide"
                    style={{ color: "#444" }}
                  >
                    {location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div
          className="section-reveal mt-16 p-8 rounded-2xl"
          style={{
            backgroundColor: "#111",
            border: "1px solid #1e1e1e",
          }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-6 h-px" style={{ backgroundColor: "#4b92db" }} />
            <span
              className="text-xs tracking-widest uppercase font-bold"
              style={{ color: "#4b92db" }}
            >
              Education
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                school: "San Marino High School",
                degree: "High School Diploma",
                period: "2023 — 2027",
                color: "#4b92db",
              },
              {
                school: "Pasadena City College",
                degree: "Dual Enrollment, Health",
                period: "2023 — 2027",
                color: "#ff1493",
              },
            ].map(({ school, degree, period, color }) => (
              <div key={school} className="flex items-start gap-4">
                <div
                  className="w-1 self-stretch rounded-full shrink-0"
                  style={{ backgroundColor: color, minHeight: "4rem" }}
                />
                <div>
                  <div
                    className="font-black uppercase tracking-tight text-lg mb-1"
                    style={{ color: "#ffffff" }}
                  >
                    {school}
                  </div>
                  <div className="text-sm mb-1" style={{ color: "#777" }}>
                    {degree}
                  </div>
                  <div
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "#444" }}
                  >
                    {period}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="py-32"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-8 section-reveal">
            <div className="w-8 h-px" style={{ backgroundColor: "#4b92db" }} />
            <span
              className="text-xs tracking-widest uppercase font-bold"
              style={{ color: "#4b92db" }}
            >
              Get in touch
            </span>
            <div className="w-8 h-px" style={{ backgroundColor: "#4b92db" }} />
          </div>

          <h2
            className="font-black uppercase leading-none tracking-tight mb-6 section-reveal"
            style={{
              fontSize: "clamp(3rem, 10vw, 9rem)",
              color: "#ffffff",
            }}
          >
            LET&apos;S
            <br />
            <span style={{ color: "#4b92db" }}>CONNECT</span>
          </h2>

          <p
            className="text-base max-w-md mx-auto leading-relaxed mb-12 section-reveal"
            style={{ color: "#666" }}
          >
            Interested in research, collaboration, or just want to talk science,
            music, or ideas? Reach out.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 section-reveal">
            <a
              href="mailto:declanli5@icloud.com"
              className="px-8 py-4 rounded-xl text-sm font-black uppercase tracking-widest"
              style={{
                backgroundColor: "#cbff00",
                color: "#111111",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "#d4ff33")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "#cbff00")
              }
            >
              declanli5@icloud.com
            </a>
            <a
              href="https://www.linkedin.com/in/declanli-2a8213248"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl text-sm font-black uppercase tracking-widest"
              style={{
                backgroundColor: "transparent",
                color: "#ffffff",
                border: "1px solid #333",
                transition: "border-color 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#4b92db";
                (e.currentTarget as HTMLElement).style.color = "#4b92db";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#333";
                (e.currentTarget as HTMLElement).style.color = "#ffffff";
              }}
            >
              LinkedIn
            </a>
            <a
              href="mailto:declanli@caltech.edu"
              className="px-8 py-4 rounded-xl text-sm font-black uppercase tracking-widest"
              style={{
                backgroundColor: "transparent",
                color: "#ffffff",
                border: "1px solid #333",
                transition: "border-color 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#ff6100";
                (e.currentTarget as HTMLElement).style.color = "#ff6100";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#333";
                (e.currentTarget as HTMLElement).style.color = "#ffffff";
              }}
            >
              Caltech Email
            </a>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4"
          style={{ borderTop: "1px solid #1a1a1a" }}
        >
          <span
            className="text-xs font-black tracking-widest uppercase"
            style={{ color: "#cbff00" }}
          >
            DECLAN LI
          </span>
          <span className="text-xs" style={{ color: "#333" }}>
            Pasadena, California &bull; (626) 689-6348
          </span>
          <span className="text-xs" style={{ color: "#333" }}>
            Built with D1 Vibe Coding
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Page() {
  useReveal();

  return (
    <main>
      <Navbar />
      <Hero />
      <Marquee />
      <Research />
      <About />
      <Work />
      <Contact />
    </main>
  );
}
