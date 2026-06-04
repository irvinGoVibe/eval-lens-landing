export function Hero() {
  return (
    <section
      className="band hero"
      id="hero"
      data-screen-label="01 Hero — Lens Your Next Unicorn"
    >
      <div className="hero-media-stack" aria-hidden="true">
        <div className="hero-video-wrap">
          <video
            className="hero-video"
            autoPlay
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            poster="/assets/hero-intro-2-poster.jpg"
          >
            <source src="/assets/hero-intro-2.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="hero-dim" aria-hidden="true"></div>

      <div className="hero-unicorn-wrap" aria-hidden="true">
        <div className="hero-unicorn-gfx">
          <video
            className="hero-unicorn"
            autoPlay
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
          >
            <source
              src="/assets/hero-intro-transed-test.mov?v=1"
              type='video/quicktime; codecs="hvc1"'
            />
            <source
              src="/assets/hero-intro-transed-test.webm?v=1"
              type="video/webm"
            />
          </video>
        </div>
      </div>

      <div className="hero-splashes" aria-hidden="true">
        <svg
          className="hero-splash hero-splash--l1 s1"
          viewBox="0 0 200 240"
          data-depth="0.38"
          data-side="left"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hs-g1" x1="0%" y1="20%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#e8d4ff" stopOpacity=".95" />
              <stop offset="35%" stopColor="#bf5cff" stopOpacity=".88" />
              <stop offset="72%" stopColor="#6c4cf1" stopOpacity=".62" />
              <stop offset="100%" stopColor="#2a1060" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            fill="url(#hs-g1)"
            d="M0 40 L120 -8 L185 55 L140 130 L45 210 L-12 145 Z"
          />
        </svg>
        <svg
          className="hero-splash hero-splash--l2 s2"
          viewBox="0 0 180 200"
          data-depth="0.52"
          data-side="left"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hs-g2" x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#f0e6ff" stopOpacity=".9" />
              <stop offset="40%" stopColor="#a855f7" stopOpacity=".78" />
              <stop offset="100%" stopColor="#4c1d95" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            fill="url(#hs-g2)"
            d="M-5 30 L95 5 L165 70 L130 155 L20 185 L-8 95 Z"
          />
        </svg>
        <svg
          className="hero-splash hero-splash--l3 s3"
          viewBox="0 0 220 260"
          data-depth="0.72"
          data-side="left"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="hs-g3" cx="28%" cy="22%" r="78%">
              <stop offset="0%" stopColor="#fff" stopOpacity=".92" />
              <stop offset="28%" stopColor="#d946ef" stopOpacity=".85" />
              <stop offset="65%" stopColor="#7c3aed" stopOpacity=".55" />
              <stop offset="100%" stopColor="#1e0a3c" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path
            fill="url(#hs-g3)"
            d="M0 80 L80 20 L190 45 L210 140 L150 230 L30 250 L-15 160 Z"
          />
        </svg>
        <svg
          className="hero-splash hero-splash--l1 s4"
          viewBox="0 0 120 140"
          data-depth="0.28"
          data-side="left"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hs-g4" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity=".7" />
              <stop offset="100%" stopColor="#581c87" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            fill="url(#hs-g4)"
            d="M5 10 L90 0 L105 65 L55 120 L0 85 Z"
          />
        </svg>
        <svg
          className="hero-splash hero-splash--l2 s5"
          viewBox="0 0 200 230"
          data-depth="0.44"
          data-side="right"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hs-g5" x1="100%" y1="15%" x2="0%" y2="85%">
              <stop offset="0%" stopColor="#ede9fe" stopOpacity=".92" />
              <stop offset="38%" stopColor="#a78bfa" stopOpacity=".82" />
              <stop offset="100%" stopColor="#312e81" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            fill="url(#hs-g5)"
            d="M200 35 L95 -5 L15 60 L40 145 L130 210 L205 155 Z"
          />
        </svg>
        <svg
          className="hero-splash hero-splash--l3 s6"
          viewBox="0 0 170 190"
          data-depth="0.65"
          data-side="right"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="hs-g6" cx="75%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#faf5ff" stopOpacity=".88" />
              <stop offset="32%" stopColor="#e879f9" stopOpacity=".8" />
              <stop offset="100%" stopColor="#5b21b6" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path
            fill="url(#hs-g6)"
            d="M195 25 L110 0 L25 55 L10 130 L85 185 L190 140 Z"
          />
        </svg>
        <svg
          className="hero-splash hero-splash--l1 s7"
          viewBox="0 0 210 250"
          data-depth="0.58"
          data-side="right"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hs-g7" x1="85%" y1="0%" x2="15%" y2="100%">
              <stop offset="0%" stopColor="#f5d0fe" stopOpacity=".9" />
              <stop offset="45%" stopColor="#9333ea" stopOpacity=".72" />
              <stop offset="100%" stopColor="#1a0533" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            fill="url(#hs-g7)"
            d="M210 70 L130 15 L20 40 L0 150 L70 240 L195 210 Z"
          />
        </svg>
        <svg
          className="hero-splash hero-splash--l2 s8"
          viewBox="0 0 130 150"
          data-depth="0.35"
          data-side="right"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hs-g8" x1="100%" y1="40%" x2="0%" y2="60%">
              <stop offset="0%" stopColor="#ddd6fe" stopOpacity=".75" />
              <stop offset="100%" stopColor="#6d28d9" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            fill="url(#hs-g8)"
            d="M125 15 L45 0 L0 55 L35 115 L115 135 Z"
          />
        </svg>
      </div>

      <div className="hero-content" aria-live="polite">
        <div className="head hero-head">
          <span className="eyebrow hero-fade d1">
            <span className="dot"></span>Batch pitch-deck evaluation
          </span>
          <h1 className="title hero-fade d2">
            Lens Your <span className="grad-word">Next Unicorn</span>
          </h1>
          <p className="sub hero-fade d3">
            Batch-review pitch decks, rank the strongest startups, and give every
            team a clear report.
          </p>
          <div className="cta-row hero-fade d4">
            <button className="btn btn-primary">
              <span className="btn-txt">Book a demo</span>
            </button>
            <button className="btn btn-glass">
              <span className="btn-txt">Try live demo</span>&nbsp;
              <span className="arr">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
