import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "EvalLense — Lens Your Next Unicorn",
  description:
    "Batch-review pitch decks, rank the strongest startups, and give every team a clear report.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
    <html lang="en">
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
      </head>
      <body>{children}</body>
    </html>
  );
}
