export function Workflow() {
  return (
    <section
      className="band"
      id="workflow"
      data-screen-label="03 Launch your entry point"
    >
      <div className="workflow-heading-pin">
        <div className="workflow-heading">
          <h2 className="title">
            <span className="epic-line l1">Launch your</span>
            <span className="epic-line l2">
              <span className="grad">entry point</span>.
            </span>
          </h2>
          <p className="workflow-sub">
            Create one place where teams submit their pitch decks. EvalLense
            collects every application, organizes the full batch, and lets you
            run evaluation when you&apos;re ready.
          </p>
        </div>
      </div>
      <div className="workflow-heading-slot" aria-hidden="true"></div>
      <div className="wrap">
        <div className="head reveal">
          {/* <p className="keymsg">
            You don&apos;t need to chase decks across emails, forms, folders, and
            chats. EvalLense gives you one clean entry hub for collecting startup
            applications and turning them into structured evaluation results.
          </p> */}
        </div>

        <div
          className="stage reveal d1"
          data-media="video"
          data-od-id="entry-stage"
        >
          <span className="media-tag">
            <span className="rec"></span>Hyperrealistic glass-cube render · video
          </span>
          <span className="play">
            <span className="tri"></span>Preview
          </span>
          <div className="stage-pad">
            <div className="cube-stage">
              <div className="cube-wrap" aria-hidden="true">
                <div className="env e1"><span className="fl"></span>Pitch Deck 001</div>
                <div className="env e2"><span className="fl"></span>Pitch Deck 023</div>
                <div className="env e3"><span className="fl"></span>Pitch Deck 067</div>
                <div className="env e4"><span className="fl"></span>Pitch Deck 123</div>
                <div className="cube">
                  <span className="fill-count">collecting · 123 decks</span>
                </div>
              </div>
              <div className="cube-side">
                <div
                  className="stepper"
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    maxWidth: "none",
                  }}
                >
                  <span className="step">
                    <span className="num">1</span>Create one entry point
                  </span>
                  <span className="step">
                    <span className="num">2</span>Share the submission link
                  </span>
                  <span className="step">
                    <span className="num">3</span>Teams upload pitch decks themselves
                  </span>
                  <span className="step">
                    <span className="num">4</span>Applications collect in one hub
                  </span>
                  <span className="step">
                    <span className="num">5</span>Batch becomes ready for evaluation
                  </span>
                  <span className="step">
                    <span className="num">6</span>Organizer launches analysis → structured results
                  </span>
                </div>
              </div>
            </div>
            <div className="caption">
              <span className="ic">◆</span>
              <span>
                <b>Intended render —</b> a transparent glass cube in EvalLense
                colors acts as the entry hub. From above, clean envelopes labeled{" "}
                <i>Pitch Deck 001 · 023 · 067 · 123</i> fall in; the cube
                gradually fills. Minimal, premium, hyperrealistic — not a
                machine, not a mailbox.
              </span>
            </div>
          </div>
        </div>

        <div className="labels reveal d2">
          <span className="chip"><span className="tick"></span>Entry point</span>
          <span className="chip"><span className="tick"></span>Self-upload</span>
          <span className="chip"><span className="tick"></span>Applications collected</span>
          <span className="chip"><span className="tick"></span>Batch ready</span>
        </div>
        <div className="sect-cta reveal d2">
          <button className="btn btn-ghost">
            See workflow&nbsp;<span className="arr">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
