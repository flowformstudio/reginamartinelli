/* global React, ReactDOM */
const { useState, useEffect } = React;

const {
  TopNav, Hero, IntroBlock, PullQuote, PrinciplesRow, MethodologySteps,
  ProgramsTwoUp, QuoteBand, SparkleList, SignatureClose, OptInForm, Footer,
  SectionPlain, SectionWash, Eyebrow, ASSETS,
} = window;

// ---------------------------------------------------------------------------
// Page: Home
// ---------------------------------------------------------------------------
function HomePage({ navigate, scrollTo }) {
  return (
    <React.Fragment>
      <Hero
        welcome="Welcome…"
        name="I'm Regina"
        sub="A transformational coach for the woman who's tired of holding herself back."
        mark={ASSETS.goldMarkLarge}
      />

      <IntroBlock
        eyebrow="What I Do"
        title={<>I help <span className="rm-script">you</span> transform the deep patterns keeping you stuck.</>}
        body={[
          "Whether they show up as money blocks, self-doubt, or that exhausting need to prove you're worth something — we go to the source.",
          "Twenty-five years of practice. Hundreds of women. The work is precise, somatic, and grounded — not therapy, not coaching, something else entirely."
        ]}
      />

      <PullQuote kicker="A question that cracked me open">
        "How good can you stand it?"
      </PullQuote>

      <PrinciplesRow
        eyebrow="The Foundation of My Work"
        title="Three truths I'd stake the next 25 years on."
        items={[
          {
            mark: ASSETS.sacredGeo["15"],
            title: "Your Worth Is Your Superpower",
            lead: "We don't allow more than we believe we deserve subconsciously.",
            points: [
              "That's why you work so hard yet still feel empty.",
              "Why money slips through your fingers.",
              "Why you sabotage right when things get good."
            ]
          },
          {
            mark: ASSETS.sacredGeo["22"],
            title: "The Patterns Live in Your Body",
            lead: "The survival strategies you developed at three are still running your nervous system at forty-three.",
            points: [
              "No amount of positive thinking touches them.",
              "They need to be transformed at the source."
            ]
          },
          {
            mark: ASSETS.sacredGeo["23"],
            title: "Money Tells the Truth",
            lead: "Money is a spiritual highlighter.",
            points: [
              "It reveals every place you're not aligned with your worth.",
              "Heal your relationship with money and everything else follows."
            ]
          }
        ]}
      />

      <SectionWash variant="dark" narrow>
        <MethodologySteps
          eyebrow="How My Process Works"
          title="Three movements. Sourced, transformed, integrated."
          steps={[
            { numeral: "I.",  title: "First we find the original wound.",     body: "The moment your three-year-old self decided what she had to do to survive. Maybe she learned to shrink. Maybe she learned to perform. Maybe she learned that needing something was dangerous." },
            { numeral: "II.", title: "Then we transform it at the root.",     body: "Not through force or endless processing. Through precise, somatic rewiring that tells your nervous system: that was then. This is now. You're safe." },
            { numeral: "III.",title: "Finally, we integrate.",                body: "Your system might freak out as it adjusts to a new place of expansion instead of constant contraction. I hold you through this until your new way of being becomes as natural as breathing." }
          ]}
        />
      </SectionWash>

      <ProgramsTwoUp
        eyebrow="Two Paths"
        title="Two Paths to Your Transformation"
        programs={[
          {
            kicker: "8-Week Journey",
            title: "Your Magical Self",
            sub: "When chaos has become your normal",
            body: "Transform patterns of overwhelm, people-pleasing, and self-doubt into unshakeable inner knowing. Stop surviving. Start creating.",
            ctaLabel: "Discover Your Magical Self",
            mark: ASSETS.sacredGeo["22"],
            onCta: () => navigate("magical")
          },
          {
            kicker: "8-Week Journey",
            title: "Your Wealthy Self",
            sub: "When money feels like a constant struggle",
            body: "We only receive what we believe we deserve. Use money as the lens to transform the patterns keeping you struggling. When you feel worthy, everything changes.",
            ctaLabel: "Explore Your Wealthy Self",
            mark: ASSETS.sacredGeo["23"],
            onCta: () => navigate("wealthy")
          }
        ]}
      />

      <QuoteBand
        text={`"The world is a mirror, forever reflecting what you are doing within yourself."`}
        by="Neville Goddard"
      />

      <SparkleList
        eyebrow="On The Other Side"
        title="What becomes available, in your bones."
        items={[
          <><strong>Money</strong> becomes your ally instead of your stress</>,
          <>Decisions flow from your <strong>inner knowing</strong>, not from polling everyone</>,
          <><strong>Boundaries</strong> happen clean, without guilt or explanation</>,
          <><strong>Peace</strong> lives in your bones, even in uncertainty</>,
          <><strong>Joy</strong> becomes your baseline, not what you're chasing</>
        ]}
      />

      <SectionWash variant="soft" narrow>
        <OptInForm id="optin" />
      </SectionWash>

      <SignatureClose />
    </React.Fragment>
  );
}

// ---------------------------------------------------------------------------
// Page: Your Magical Self
// ---------------------------------------------------------------------------
function MagicalPage({ navigate }) {
  return (
    <React.Fragment>
      <SectionWash variant="hero" narrow>
        <div className="rm-center" style={{ paddingTop: 30 }}>
          <Eyebrow>8-Week Journey</Eyebrow>
          <h1 style={{ maxWidth: "16ch", margin: "12px auto 18px" }}>Your Magical Self</h1>
          <div className="rm-hero__sub" style={{ margin: "0 auto" }}>
            For the woman whose normal has quietly become chaos.
          </div>
        </div>
      </SectionWash>

      <IntroBlock
        eyebrow="What This Is"
        title="Eight weeks of precise, somatic pattern transformation."
        body={[
          "We meet weekly, one to one. No homework. No journaling assignments. No more affirmations slapped over deep wounds.",
          "Each week we locate one survival strategy — people-pleasing, overworking, scanning every room — and update it at the nervous-system level."
        ]}
      />

      <SectionWash variant="cream">
        <PrinciplesRow
          eyebrow="What Shifts"
          title="Three places the work lands first."
          items={[
            { mark: ASSETS.sacredGeo["22"], title: "Your nervous system relaxes", lead: "You stop scanning. You stop bracing.", points: ["Sleep deepens.", "Conflict stops feeling like the end of the world."] },
            { mark: ASSETS.sacredGeo["15"], title: "Your 'no' arrives clean",     lead: "Without the three-day guilt hangover.",        points: ["You stop over-explaining.", "People around you re-pattern in response."] },
            { mark: ASSETS.sacredGeo["45"], title: "Your inner voice grows louder", lead: "You stop polling everyone for permission.", points: ["You start trusting your gut.", "Decisions get faster and quieter."] }
          ]}
        />
      </SectionWash>

      <PullQuote kicker="What a recent client said">
        "I didn't realise how exhausted I was until I stopped."
      </PullQuote>

      <SectionWash variant="soft" narrow>
        <OptInForm
          title="Begin Your Magical Self"
          body="Tell me a little about yourself and I'll send you the orientation materials and a link to book a free 30-minute discovery call."
        />
      </SectionWash>

      <SignatureClose intro="I can't wait to meet you," name="Regina" />
    </React.Fragment>
  );
}

// ---------------------------------------------------------------------------
// Page: Your Wealthy Self
// ---------------------------------------------------------------------------
function WealthyPage({ navigate }) {
  return (
    <React.Fragment>
      <SectionWash variant="hero" narrow>
        <div className="rm-center" style={{ paddingTop: 30 }}>
          <Eyebrow>8-Week Journey</Eyebrow>
          <h1 style={{ maxWidth: "16ch", margin: "12px auto 18px" }}>Your Wealthy Self</h1>
          <div className="rm-hero__sub" style={{ margin: "0 auto" }}>
            Money is a spiritual highlighter. Let's read what it's been telling you.
          </div>
        </div>
      </SectionWash>

      <IntroBlock
        eyebrow="What This Is"
        title="The same deep work, with money as the entry point."
        body={[
          "We only receive what we believe we deserve. Over eight weeks we use your relationship with money — earning, spending, hoarding, sabotaging — as the precise lens for transformation.",
          "By week four most clients notice money is moving differently. By week eight, the patterns that drove the chaos are gone."
        ]}
      />

      <SectionWash variant="dark">
        <SparkleList
          eyebrow="On The Other Side"
          title="What becomes true."
          items={[
            <>You stop performing for money and start <strong>receiving</strong> it</>,
            <>Pricing your work stops feeling like a fight with yourself</>,
            <>You make decisions about money from your <strong>inner knowing</strong>, not from fear</>,
            <>The shame loop around earning, spending, or saving quietly ends</>
          ]}
        />
      </SectionWash>

      <QuoteBand
        text={`"You don't have a money problem. You have an unhealed agreement about your worth."`}
        by="Regina"
      />

      <SectionWash variant="soft" narrow>
        <OptInForm
          title="Begin Your Wealthy Self"
          body="I'll send you the first lesson plus a link to a free 30-minute discovery call so we can see if this is the right fit."
        />
      </SectionWash>

      <SignatureClose />
    </React.Fragment>
  );
}

// ---------------------------------------------------------------------------
// Page: Meet Regina
// ---------------------------------------------------------------------------
function ReginaPage() {
  return (
    <React.Fragment>
      <SectionWash variant="hero" narrow>
        <div className="rm-center" style={{ paddingTop: 30 }}>
          <Eyebrow>Meet Regina</Eyebrow>
          <h1 style={{ maxWidth: "16ch", margin: "12px auto 18px" }}>A Journey Back to Myself</h1>
        </div>
      </SectionWash>

      <IntroBlock
        eyebrow="Where I Come From"
        title="Five generations of farmers, and a six-year-old in the fields."
        body={[
          "Work hard wasn't advice in my family — it was survival. So when good things came too easily my nervous system hit the panic button: who am I to have it easier than my ancestors who struggled so much?",
          "I read every self-help book. Got certified in everything — Master's in Change Management, transformational NLP, Family Constellations. Led seminars. Coached others. And still had a short leash on my own life."
        ]}
      />

      <PullQuote kicker="What changed">
        "I didn't fight or shame her. I updated her software."
      </PullQuote>

      <SectionWash variant="cream" narrow>
        <SparkleList
          eyebrow="My Life Today"
          title="Quiet, unforced, mine."
          items={[
            <>My grape buyer went bankrupt, threatening everything I'd built. <strong>I sleep like a baby.</strong></>,
            <>I say no without the three-day guilt hangover.</>,
            <>My six-year-old gets the present mama he deserves, not the anxious ghost I used to be.</>,
            <>Money flows because I finally feel worthy of receiving it.</>
          ]}
        />
      </SectionWash>

      <SignatureClose />
    </React.Fragment>
  );
}

// ---------------------------------------------------------------------------
// App shell — route switch
// ---------------------------------------------------------------------------
function App() {
  const [route, setRoute] = useState("home");

  const navigate = (id, anchor) => {
    setRoute(id);
    // scroll back to top on route change, then if there's an anchor, scroll there.
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      if (anchor) {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 0);
  };

  let page;
  if (route === "magical") page = <MagicalPage navigate={navigate} />;
  else if (route === "wealthy") page = <WealthyPage navigate={navigate} />;
  else if (route === "regina") page = <ReginaPage />;
  else page = <HomePage navigate={navigate} />;

  return (
    <React.Fragment>
      <TopNav route={route} onNavigate={navigate} />
      <main>{page}</main>
      <Footer onNavigate={navigate} />
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
