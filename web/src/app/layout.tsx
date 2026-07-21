import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import "@/components/ds/ds.css";
import { DevInspector } from "@/components/DevInspector";
import { PartnerAccessModal } from "@/components/PartnerAccessModal";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  // Absolute base for OG/Twitter images and canonical URLs on Vercel.
  metadataBase: new URL(SITE_URL),
  title: "EvalLens — Lens Your Next Unicorn",
  description:
    "Batch-review pitch decks, rank the strongest startups, and give every team a clear report.",
};

/** Organization JSON-LD — sitewide, rendered once in the root layout. */
const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EvalLens",
  url: SITE_URL,
  logo: `${SITE_URL}/icons/icon-512.png`,
  sameAs: [
    "https://x.com/EvalLensio",
    "https://www.instagram.com/evallens/",
    "https://t.me/evallens",
    "https://medium.com/@evallens",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // Keep Safari's top/bottom browser surfaces aligned with the black landing
  // canvas instead of falling back to the default white browser chrome.
  themeColor: "#000000",
};

const sandboxShim = `(function(){
  function makeStore(){
    var data = {};
    var api = {
      getItem: function(k){ return Object.prototype.hasOwnProperty.call(data, k) ? data[k] : null; },
      setItem: function(k, v){ data[k] = String(v); },
      removeItem: function(k){ delete data[k]; },
      clear: function(){ data = {}; },
      key: function(i){ return Object.keys(data)[i] || null; }
    };
    Object.defineProperty(api, 'length', { get: function(){ return Object.keys(data).length; } });
    return api;
  }
  function tryShim(name){
    var works = false;
    try { works = !!window[name] && typeof window[name].getItem === 'function'; void window[name].length; }
    catch (_) { works = false; }
    if (works) return;
    try { Object.defineProperty(window, name, { configurable: true, value: makeStore() }); }
    catch (_) { try { window[name] = makeStore(); } catch (__) {} }
  }
  tryShim('localStorage');
  tryShim('sessionStorage');
})();`;

const safariDetect = `(function(){
  var ua = navigator.userAgent;
  var webkit = /AppleWebKit/i.test(ua);
  var notChromium = !/Chrom|CriOS|Edg|OPR|FxiOS/i.test(ua);
  var safari = (webkit && notChromium) || !!window.safari;
  if(safari) document.documentElement.classList.add('ua-safari');
})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <Script
          id="sandbox-shim"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: sandboxShim }}
        />
        <Script
          id="safari-detect"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: safariDetect }}
        />
        {/* No-JS fallback: reveal/pin elements never receive `.is-in` without
            ScrollFX, so force them visible and unanimated when JS is off. Keeps
            all key copy readable (and indexable) without JavaScript. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}[data-pin-step]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
        {children}
        <PartnerAccessModal />
        {process.env.NODE_ENV !== "production" && <DevInspector />}
      </body>
    </html>
  );
}
