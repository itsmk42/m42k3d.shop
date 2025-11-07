"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import "@/styles/home-mockups.css";

export default function HomeMockupsPage() {
  const [scheme, setScheme] = useState<"midnight"|"quartz"|"forest">("quartz");
  const [theme, setTheme] = useState<"light"|"dark">("light");
  const [device, setDevice] = useState<"mobile"|"tablet"|"desktop">("desktop");

  const rootAttrs = useMemo(() => ({
    "data-scheme": scheme,
    "data-theme": theme,
  }), [scheme, theme]);

  return (
    <main className="mock-root" {...rootAttrs}>
      <div className="mock-container">
        <nav className="mock-nav" aria-label="Primary">
          <div className="mock-brand">
            <span className="mock-brand-badge" aria-hidden="true" />
            <span>Modern Shop</span>
          </div>
          <div className="mock-nav-links">
            <a className="mock-nav-link" href="#features">Features</a>
            <a className="mock-nav-link" href="#products">Products</a>
            <a className="mock-nav-link" href="#about">About</a>
            <a className="mock-nav-link" href="#contact">Contact</a>
          </div>
          <div className="mock-controls">
            <select
              aria-label="Color scheme"
              className="mock-select"
              value={scheme}
              onChange={(e) => setScheme(e.target.value as any)}
            >
              <option value="quartz">Quartz (Light)</option>
              <option value="midnight">Midnight (Dark)</option>
              <option value="forest">Forest (Neutral)</option>
            </select>
            <select
              aria-label="Theme"
              className="mock-select"
              value={theme}
              onChange={(e) => setTheme(e.target.value as any)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
            <select
              aria-label="Device"
              className="mock-select"
              value={device}
              onChange={(e) => setDevice(e.target.value as any)}
            >
              <option value="mobile">Mobile</option>
              <option value="tablet">Tablet</option>
              <option value="desktop">Desktop</option>
            </select>
          </div>
        </nav>

        <div className={`device-frame ${device}`} role="region" aria-label={`${device} preview`}>
          <section className="mock-hero" aria-labelledby="hero-title">
            <div>
              <h1 id="hero-title" className="mock-hero-title">
                Elevate Your Space with Modern Lighting
              </h1>
              <p className="mock-hero-sub">
                Premium design, sustainable materials, and smart performance. Explore our curated collection.
              </p>
              <div className="mock-hero-actions">
                <button className="mock-btn-primary" aria-label="Shop now CTA">
                  Shop Now
                </button>
                <button className="mock-btn-secondary" aria-label="Learn more CTA">
                  Learn More
                </button>
              </div>
            </div>
            <div className="mock-hero-media" aria-hidden="true">
              <Image
                src="/products/placeholder.jpg"
                alt="Hero showcase"
                width={920}
                height={640}
                priority
              />
            </div>
          </section>

          <section id="features" className="mock-section" aria-labelledby="features-title">
            <h2 id="features-title" className="mock-section-title">Why Choose Us</h2>
            <div className="mock-card-grid">
              {[
                { t: "Premium Materials", d: "Crafted with sustainably sourced metals, woods, and glass." },
                { t: "Smart Performance", d: "Energy-efficient designs and smart home integrations." },
                { t: "Design-Forward", d: "Timeless aesthetics with modern micro-interactions and details." },
              ].map((f, i) => (
                <article key={i} className="mock-card" role="article">
                  <div className="mock-card-icon" aria-hidden="true" />
                  <div className="mock-card-title">{f.t}</div>
                  <p className="mock-card-text">{f.d}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="products" className="mock-section" aria-labelledby="products-title">
            <h2 id="products-title" className="mock-section-title">Featured Products</h2>
            <div className="mock-card-grid">
              {[1,2,3].map((n) => (
                <article key={n} className="mock-card" role="article">
                  <div className="mock-card-icon" aria-hidden="true" />
                  <div className="mock-card-title">Signature Lamp {n}</div>
                  <p className="mock-card-text">A refined silhouette with seamless dimming and warm glow.</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mock-info" aria-label="Information">
            <div className="mock-info-item">
              <h4>Free Shipping & Returns</h4>
              <p>We offer fast, free delivery and 30-day returns. No hassle.</p>
            </div>
            <div className="mock-info-item">
              <h4>Sustainability</h4>
              <p>Designed for longevity with responsibly sourced materials.</p>
            </div>
            <div className="mock-info-item">
              <h4>Support</h4>
              <p>Real humans, helpful answers. Reach us anytime.</p>
            </div>
          </section>

          <footer className="mock-footer" aria-label="Footer">
            © {new Date().getFullYear()} Modern Shop. All rights reserved.
          </footer>
        </div>
      </div>
    </main>
  );
}

