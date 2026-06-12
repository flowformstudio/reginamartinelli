/* global React */
// Regina Martinelli — Website UI Kit components.
// All components are exposed on `window` so app.jsx can use them
// without a module bundler.

const { useState } = React;

// ---- Asset paths --------------------------------------------------------
// In the bundled standalone build, the host HTML injects window.__resources
// (blob URLs for each <meta name="ext-resource-dependency">). When running
// from disk in dev, window.__resources is missing — fall back to the
// relative paths under ../../assets/.
const __R = (typeof window !== "undefined" && window.__resources) || {};
const _src = (id, fallback) => __R[id] || fallback;
const ASSETS = {
  wordmark:        _src("wordmark",        "../../assets/logo-wordmark.png"),
  wordmarkFooter:  _src("wordmarkFooter",  "../../assets/logo-footer.png"),
  goldMarkLarge:   _src("goldMarkLarge",   "../../assets/logo-mark-large.png"),
  mandala:         _src("mandala",         "../../assets/mandala-gold.png"),
  sacredGeo: {
    "15": _src("sacredGeo15", "../../assets/sacred-geo-15.png"),
    "22": _src("sacredGeo22", "../../assets/sacred-geo-22.png"),
    "23": _src("sacredGeo23", "../../assets/sacred-geo-23.png"),
    "45": _src("sacredGeo45", "../../assets/sacred-geo-45.png"),
    "62": _src("sacredGeo62", "../../assets/sacred-geo-62.png"),
  },
  goldSparkle: _src("goldSparkle", "../../assets/gold-sparkle-sun.png"),
  goldFrame:   _src("goldFrame",   "../../assets/gold-frame.png"),
};

// ============================================================================
// Type primitives
// ============================================================================
function Eyebrow({ children }) {
  return <span className="rm-eyebrow">{children}</span>;
}

function SerifH2({ children, style }) {
  return <h2 style={style}>{children}</h2>;
}

// ============================================================================
// Top navigation
// ============================================================================
function TopNav({ route, onNavigate }) {
  const [open, setOpen] = useState(false);
  const item = (id, label) => (
    <button
      className="rm-nav__link"
      aria-current={route === id ? "true" : "false"}
      onClick={() => { onNavigate(id); setOpen(false); }}
    >{label}</button>
  );
  return (
    <React.Fragment>
      <nav className="rm-nav">
        <button className="rm-nav__brand" onClick={() => onNavigate("home")}>
          Regina&nbsp;Martinelli
        </button>
        <div className="rm-nav__links">
          {item("magical", "Your Magical Self")}
          {item("wealthy", "Your Wealthy Self")}
          {item("regina", "Meet Regina")}
          <button className="rm-nav__cta" onClick={() => onNavigate("home", "optin")}>
            Begin the Work
          </button>
        </div>
        <button className="rm-nav__burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
            <rect width="22" height="1.5" fill="currentColor" />
            <rect y="6.25" width="22" height="1.5" fill="currentColor" />
            <rect y="12.5" width="22" height="1.5" fill="currentColor" />
          </svg>
        </button>
      </nav>
      {open && (
        <div className="rm-mobilemenu">
          <button onClick={() => { onNavigate("magical"); setOpen(false); }}>Your Magical Self</button>
          <button onClick={() => { onNavigate("wealthy"); setOpen(false); }}>Your Wealthy Self</button>
          <button onClick={() => { onNavigate("regina"); setOpen(false); }}>Meet Regina</button>
          <button onClick={() => { onNavigate("home", "optin"); setOpen(false); }}>Begin the Work</button>
        </div>
      )}
    </React.Fragment>
  );
}

// ============================================================================
// Section primitives
// ============================================================================
function SectionWash({ variant = "soft", narrow = false, children, style }) {
  const cls = `rm-section${narrow ? " rm-section--narrow" : ""} wash-${variant}`;
  return (
    <section className={cls} style={style}>
      <div className="rm-container">{children}</div>
    </section>
  );
}

function SectionPlain({ narrow = false, contained = "default", children, style }) {
  const cls = `rm-section${narrow ? " rm-section--narrow" : ""}`;
  const cClass = "rm-container" + (contained === "narrow" ? " rm-container--narrow" : "");
  return (
    <section className={cls} style={style}>
      <div className={cClass}>{children}</div>
    </section>
  );
}

// ============================================================================
// Hero
// ============================================================================
function Hero({ welcome = "Welcome…", name = "I'm Regina", sub, mark = ASSETS.goldMarkLarge }) {
  return (
    <section className="rm-section wash-hero" style={{ padding: 0 }}>
      <div className="rm-hero">
        <div className="rm-hero__welcome">{welcome}</div>
        <h1 className="rm-hero__name"><strong style={{ fontWeight: 500 }}>{name}</strong></h1>
        {mark && <img className="rm-hero__mark" src={mark} alt="" />}
        {sub && <div className="rm-hero__sub">{sub}</div>}
      </div>
    </section>
  );
}

// ============================================================================
// Intro block — photo placeholder + copy + mandala bg
// ============================================================================
function IntroBlock({ eyebrow, title, body, photoLabel = "Portrait of Regina" }) {
  return (
    <SectionPlain>
      <div className="rm-intro">
        <div className="rm-intro__photo">{photoLabel}</div>
        <div className="rm-intro__copy">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <SerifH2>{title}</SerifH2>
          {Array.isArray(body) ? body.map((p, i) => <p key={i}>{p}</p>) : <p>{body}</p>}
        </div>
      </div>
    </SectionPlain>
  );
}

// ============================================================================
// Pull quote
// ============================================================================
function PullQuote({ kicker, children }) {
  return (
    <SectionPlain narrow contained="narrow">
      {kicker && <div className="rm-pullquote__kicker">{kicker}</div>}
      <div className="rm-pullquote">{children}</div>
    </SectionPlain>
  );
}

// ============================================================================
// Principles
// ============================================================================
function PrincipleCard({ mark, title, lead, points }) {
  return (
    <div className="rm-principle">
      {mark && <img className="rm-principle__mark" src={mark} alt="" />}
      <h3>{title}</h3>
      {lead && <p className="rm-principle__lead">{lead}</p>}
      {points && (
        <ul>{points.map((p, i) => <li key={i}>{p}</li>)}</ul>
      )}
    </div>
  );
}

function PrinciplesRow({ items, eyebrow, title }) {
  return (
    <SectionPlain>
      {eyebrow && <div className="rm-center" style={{ marginBottom: 14 }}><Eyebrow>{eyebrow}</Eyebrow></div>}
      {title && <h2 className="rm-center" style={{ marginBottom: 56 }}>{title}</h2>}
      <div className="rm-principles">
        {items.map((it, i) => <PrincipleCard key={i} {...it} />)}
      </div>
    </SectionPlain>
  );
}

// ============================================================================
// Methodology
// ============================================================================
function MethodologySteps({ steps, eyebrow, title }) {
  return (
    <SectionPlain>
      {(eyebrow || title) && (
        <div className="rm-center" style={{ marginBottom: 56 }}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {title && <h2>{title}</h2>}
        </div>
      )}
      <div className="rm-method">
        {steps.map((s, i) => (
          <div key={i} className="rm-method__step">
            <div className="rm-method__numeral">{s.numeral}</div>
            <div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionPlain>
  );
}

// ============================================================================
// Programs two-up
// ============================================================================
function ProgramCard({ kicker, title, sub, body, ctaLabel, onCta, mark }) {
  return (
    <article className="rm-program">
      {mark && <img className="rm-program__mark" src={mark} alt="" />}
      {kicker && <div className="rm-program__kicker">{kicker}</div>}
      <h3>{title}</h3>
      {sub && <div className="rm-program__sub">{sub}</div>}
      {body && <p className="rm-program__body">{body}</p>}
      <button type="button" className="rm-program__cta" onClick={onCta}>{ctaLabel} →</button>
    </article>
  );
}

function ProgramsTwoUp({ eyebrow, title, programs }) {
  return (
    <SectionWash variant="soft">
      <div className="rm-center" style={{ marginBottom: 48 }}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        {title && <h2 style={{ maxWidth: "18ch", margin: "0 auto" }}>{title}</h2>}
      </div>
      <div className="rm-programs">
        {programs.map((p, i) => <ProgramCard key={i} {...p} />)}
      </div>
    </SectionWash>
  );
}

// ============================================================================
// Quote band
// ============================================================================
function QuoteBand({ text, by, markRight = ASSETS.sacredGeo["45"], markLeft = ASSETS.sacredGeo["62"] }) {
  return (
    <section className="rm-quote-band">
      {markRight && <img className="rm-quote-band__mark" src={markRight} alt="" />}
      {markLeft && <img className="rm-quote-band__mark rm-quote-band__mark--left" src={markLeft} alt="" />}
      <div className="rm-quote-band__text">{text}</div>
      <div className="rm-quote-band__by">— {by}</div>
    </section>
  );
}

// ============================================================================
// Sparkle list
// ============================================================================
function SparkleList({ items, eyebrow, title }) {
  return (
    <SectionPlain>
      <div className="rm-center" style={{ marginBottom: 40 }}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        {title && <h2>{title}</h2>}
      </div>
      <ul className="rm-sparkle" style={{ listStyle: "none", padding: 0 }}>
        {items.map((it, i) => (
          <li key={i}>
            <span className="glyph">✨</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </SectionPlain>
  );
}

// ============================================================================
// Signature close
// ============================================================================
function SignatureClose({ intro = "With love & certainty,", name = "Regina", mark = ASSETS.sacredGeo["62"] }) {
  return (
    <SectionPlain narrow>
      <div className="rm-signature">
        <div className="rm-signature__intro">{intro}</div>
        <div className="rm-signature__name">{name}</div>
        {mark && <img className="rm-signature__mark" src={mark} alt="" />}
      </div>
    </SectionPlain>
  );
}

// ============================================================================
// Opt-in form
// ============================================================================
function OptInForm({ id, title = "Begin the Work", body = "Send me the first lesson and I'll walk you through what's actually possible." }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const submit = (e) => { e.preventDefault(); if (email) setSent(true); };
  return (
    <div id={id} className="rm-optin">
      {sent ? (
        <div className="rm-optin__thanks">
          <div className="rm-optin__check">✓</div>
          <h3>You're in.</h3>
          <p>Check your inbox{name ? `, ${name}` : ""}. The first lesson is on its way.</p>
        </div>
      ) : (
        <form onSubmit={submit}>
          <h3>{title}</h3>
          <p>{body}</p>
          <label htmlFor="name">Your Name</label>
          <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Sophia" />
          <label htmlFor="email">Email</label>
          <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          <button type="submit" className="rm-btn rm-btn--primary" style={{ justifyContent: "center" }}>Send Me The First Lesson</button>
        </form>
      )}
    </div>
  );
}

// ============================================================================
// Footer
// ============================================================================
function Footer({ onNavigate }) {
  const social = (label, href) => (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>{label[0]}</a>
  );
  return (
    <footer className="rm-footer">
      <div className="rm-footer__brand">
        <img src={ASSETS.wordmark} alt="Regina Martinelli" />
      </div>
      <div className="rm-footer__links">
        <a onClick={() => onNavigate && onNavigate("magical")} style={{ cursor: "pointer" }}>Programs</a>
        <a onClick={() => onNavigate && onNavigate("regina")} style={{ cursor: "pointer" }}>About</a>
        <a href="#">TV Show</a>
        <a href="#">Let's Talk Money</a>
      </div>
      <div className="rm-footer__socials">
        {social("Instagram", "https://www.instagram.com/yourwealthyself/")}
        {social("YouTube",   "https://www.youtube.com/@reginamartinelli7666")}
        {social("Facebook",  "https://www.facebook.com/reginamartinelli415")}
        {social("LinkedIn",  "https://www.linkedin.com/in/regina-martinelli-785a765/")}
      </div>
      <div className="rm-footer__copy">© Money Beliefs by Design LLC. All Rights Reserved.</div>
    </footer>
  );
}

// ============================================================================
// Export to window so app.jsx can pick them up.
// ============================================================================
Object.assign(window, {
  ASSETS,
  Eyebrow, SerifH2,
  TopNav,
  SectionWash, SectionPlain,
  Hero, IntroBlock, PullQuote,
  PrincipleCard, PrinciplesRow,
  MethodologySteps,
  ProgramCard, ProgramsTwoUp,
  QuoteBand, SparkleList, SignatureClose,
  OptInForm, Footer,
});
