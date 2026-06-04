export function SiteHeader() {
  return (
    <header className="site-header" id="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#top" aria-label="EvalLense home">
          <span className="mark" aria-hidden="true"></span>
          EvalLense
        </a>
        <nav className="site-header__nav" aria-label="Primary">
          <a className="site-header__link" href="#workflow">Product</a>
          <a className="site-header__link" href="#problem">Block</a>
          <a className="site-header__link" href="#results">Pricing</a>
          <a className="site-header__link" href="#trust">Information</a>
        </nav>
        <a className="btn site-header__cta" href="#demo">
          <span className="btn-txt">Book a demo</span>
          <span className="arr" aria-hidden="true">→</span>
        </a>
      </div>
    </header>
  );
}
