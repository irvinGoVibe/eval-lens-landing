import { UnicornStage } from "./UnicornStage";
import { Button } from "@/components/ui/Button";

export function FinalUnicorn() {
  return (
    <section
      id="finale"
      data-screen-label="07 Every Batch, Seen Clearly"
      className="relative w-full overflow-hidden bg-black"
    >
      <div className="relative mx-auto flex w-full max-w-[1180px] flex-col items-center px-[var(--gutter)] pb-28 pt-20">
        <UnicornStage />
        <div className="reveal relative z-10 mt-12 flex flex-col items-center gap-7 text-center">
          <h2 className="max-w-[20ch] text-balance font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--fg-on-dark)] md:text-[40px] md:leading-[1.1]">
            Every batch, seen clearly.
          </h2>
          <Button arrow>Book a demo</Button>
        </div>
      </div>
    </section>
  );
}
