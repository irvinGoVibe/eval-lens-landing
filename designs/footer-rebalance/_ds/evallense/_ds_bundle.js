/* @ds-bundle: {"format":3,"namespace":"Evallense_c7d744","components":[{"name":"Button","sourcePath":"components/Button/Button.jsx"},{"name":"Chip","sourcePath":"components/Chip/Chip.jsx"},{"name":"Eyebrow","sourcePath":"components/Eyebrow/Eyebrow.jsx"},{"name":"Tile","sourcePath":"components/Tile/Tile.jsx"}],"sourceHashes":{"components/Button/Button.jsx":"4262d915145b","components/Chip/Chip.jsx":"7f111df6fa53","components/Eyebrow/Eyebrow.jsx":"c42616995c03","components/Tile/Tile.jsx":"ef712b5c4d15"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.Evallense_c7d744 = window.Evallense_c7d744 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/Button/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const React = window.React;

/**
 * EvalLense pill button — the single CTA primitive across the site.
 * Variants: primary (solid violet), ghost (violet hairline), glass (the shared
 * liquid-glass material — for hero/dark/cinematic surfaces), dark (solid ink),
 * gradient (purple→blue filled, for in-app / footer CTAs). Sizes md|sm.
 * Styling lives in tokens/components.css (mirrored verbatim from the live site,
 * including the ::before/::after sheen + bloom layers), so glass and gradient
 * match the homepage exactly. Children are wrapped in .btn-txt so they sit
 * above the gradient/glass overlays.
 */
function Button(props) {
  const {
    variant = "primary",
    size = "md",
    arrow = false,
    href,
    children,
    className,
    ...rest
  } = props;
  const cls = ["ds-btn", `ds-btn-${variant}`, size === "sm" && "ds-btn-sm", className].filter(Boolean).join(" ");
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "btn-txt"
  }, children), arrow && /*#__PURE__*/React.createElement("span", {
    className: "arr",
    "aria-hidden": "true"
  }, "\u2192"));
  if (typeof href === "string") {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      className: cls
    }, rest), inner);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls
  }, rest), inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Button/Button.jsx", error: String((e && e.message) || e) }); }

// components/Chip/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const React = window.React;

/**
 * Pill chip — a tag/selector used for material types, audience segments, filters
 * (e.g. "Pitch deck (PDF)", "VC Funds"). Optional checked state with a lens dot.
 * Renders on light or dark surfaces.
 */
function Chip(props) {
  const {
    children,
    checked = false,
    onDark = false,
    style,
    ...rest
  } = props;
  const surface = onDark ? {
    background: checked ? "rgba(108,76,241,.18)" : "rgba(255,255,255,.05)",
    color: "var(--fg-on-dark)",
    border: `1px solid ${checked ? "rgba(169,155,255,.5)" : "var(--border-on-dark)"}`
  } : {
    background: checked ? "rgba(108,76,241,.08)" : "var(--bg)",
    color: "var(--fg)",
    border: `1px solid ${checked ? "var(--violet)" : "var(--border)"}`
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      fontFamily: "var(--font-text)",
      fontSize: 13,
      lineHeight: 1,
      padding: "8px 13px",
      borderRadius: "var(--r-pill)",
      whiteSpace: "nowrap",
      ...surface,
      ...style
    }
  }, rest), checked && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--lens)"
    }
  }), children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Chip/Chip.jsx", error: String((e && e.message) || e) }); }

// components/Eyebrow/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const React = window.React;

/**
 * Section eyebrow — small uppercase mono label that orients a block.
 * Optional leading lens dot. Optional element (a clean headline can stand alone).
 */
function Eyebrow(props) {
  const {
    children,
    dot = true,
    onDark = false,
    style,
    ...rest
  } = props;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      fontWeight: 400,
      letterSpacing: ".16em",
      textTransform: "uppercase",
      color: onDark ? "var(--lavender)" : "var(--muted)",
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--lens)"
    }
  }), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Eyebrow/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/Tile/Tile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const React = window.React;

/**
 * Bento tile — a content card for the homepage bento and feature grids.
 * Title can carry a lens-gradient accent phrase. Renders light or ink (dark)
 * surface with violet-tinted elevation. Children hold the tile body / visual.
 */
function Tile(props) {
  const {
    eyebrow,
    title,
    titleAccent,
    body,
    surface = "ink",
    children,
    style,
    ...rest
  } = props;
  const isInk = surface === "ink";
  const tileStyle = {
    position: "relative",
    borderRadius: "var(--radius-card)",
    padding: "28px 30px",
    overflow: "hidden",
    background: isInk ? "var(--panel)" : "var(--bg-soft)",
    color: isInk ? "var(--fg-on-dark)" : "var(--fg)",
    border: `1px solid ${isInk ? "var(--border-on-dark-2)" : "var(--border-2)"}`,
    boxShadow: "var(--sh-2)",
    ...style
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: tileStyle
  }, rest), eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: ".14em",
      textTransform: "uppercase",
      color: isInk ? "var(--muted-on-dark)" : "var(--muted)",
      marginBottom: 12
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: 26,
      lineHeight: 1.1,
      letterSpacing: "-.02em",
      margin: 0
    }
  }, title, titleAccent && /*#__PURE__*/React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      background: "var(--lens)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent"
    }
  }, titleAccent))), body && /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 10,
      fontFamily: "var(--font-ui)",
      fontSize: 15,
      lineHeight: 1.5,
      color: isInk ? "var(--body-on-dark)" : "var(--muted)",
      maxWidth: "42ch"
    }
  }, body), children);
}
Object.assign(__ds_scope, { Tile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Tile/Tile.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Tile = __ds_scope.Tile;

})();
