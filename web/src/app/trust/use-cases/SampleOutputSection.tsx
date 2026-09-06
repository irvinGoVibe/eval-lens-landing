"use client";

import { MobilePitchReportMock, PitchReportMock } from "./PitchReportMock";

export function SampleOutputSection() {
  return (
    <section id="sample-output" className="band ink uc2-sample" aria-labelledby="uc2-sample-h2">
      <div className="wrap">

        {/* 1. Section head + 2. short explanation */}
        <div className="uc2-sample__head" data-reveal="up">
          <h2 id="uc2-sample-h2">See what one run can produce.</h2>
          <p>
            This is the output EvalLens gives your team before the decision meeting — one real pitch report, from deck review to the human vote.
          </p>
        </div>

        {/* 3. Floating glass report cabinet */}
        <div className="uc2-panel" data-reveal="up">

          {/* Glass shell — defines the panel's size; live content overlays it */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="uc2-panel-frame"
            src="/assets/use-cases/panel-frame.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width={1920}
            height={1166}
          />

          {/* 4. Internal report tabs + 5. default Project Summary view */}
          <div className="uc2-panel-body">
            <div className="uc2-report-desktop">
              <PitchReportMock />
            </div>
            <div className="uc2-report-mobile">
              <MobilePitchReportMock />
            </div>
          </div>
        </div>

        {/* 6. Compact note: same first-read pattern, not fake ready dashboards */}
        <p className="uc2-sample-note" data-reveal="up">
          Built first for pitch-deck review. The same first-read logic can support VC dealflow and hackathon application screening — shown in the workflow section below.
        </p>
      </div>
    </section>
  );
}
