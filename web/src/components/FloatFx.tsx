/**
 * FloatFx — gentle "floating in air" motion for standalone SECTION images.
 *
 * The float CSS (`@keyframes ev-float-a/-b` + `.ev-float`/`--b`/`--c` rules +
 * reduced-motion guard) now lives in `src/app/globals.css`, so the `.ev-float*`
 * classes are available site-wide without mounting anything. This component is
 * kept as a no-op so existing `<FloatFx/>` mounts and imports keep working.
 *
 * Tag a media element (or a wrapper that sits BETWEEN the `data-reveal` element
 * and the `<img>`) with `ev-float` (+ `ev-float--b` / `ev-float--c` to desync
 * neighbours). Reduced-motion safe.
 */
export function FloatFx(): null {
  return null;
}
