import { useEffect, useState } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import logo from './assets/locals_cannabis_transparent.png'
import AgeGate from './components/AgeGate'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import './App.css'

const AGE_GATE_STORAGE_KEY = 'locals-age-verified'

function LegalPage({ title, children }) {
  return (
    <section className="panel legal-page">
      <div className="section-heading">
        <p className="eyebrow">Legal</p>
        <h1>{title}</h1>
      </div>
      <div className="legal-content">{children}</div>
    </section>
  )
}

function App() {
  const [isVerified, setIsVerified] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [mobileNavClosing, setMobileNavClosing] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const stored = window.localStorage.getItem(AGE_GATE_STORAGE_KEY)
    setIsVerified(stored === 'true')
  }, [])

  useEffect(() => {
    document.body.style.overflow = !isVerified || mobileNavOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isVerified, mobileNavOpen])

  useEffect(() => {
    setMobileNavOpen(false)
    setMobileNavClosing(false)
  }, [location.pathname])

  const toggleMobileNav = () => {
    if (mobileNavOpen) {
      setMobileNavClosing(true)
      window.setTimeout(() => {
        setMobileNavOpen(false)
        setMobileNavClosing(false)
      }, 220)
      return
    }

    setMobileNavOpen(true)
    setMobileNavClosing(false)
  }

  const closeMobileNav = () => {
    setMobileNavOpen(false)
    setMobileNavClosing(false)
  }

  const handleVerified = () => {
    window.localStorage.setItem(AGE_GATE_STORAGE_KEY, 'true')
    setIsVerified(true)
  }

  return (
    <div className="site-shell">
      {!isVerified && <AgeGate onVerified={handleVerified} />}
      <header className="topbar">
        <NavLink className="brand" to="/" aria-label="Locals Cannabis home">
          <img src={logo} alt="Locals Cannabis" />
          <div>
            <p className="eyebrow">Locals Cannabis</p>
            <p className="subhead">THCa Hemp Dispensary</p>
          </div>
        </NavLink>
        <button
          className={`menu-toggle ${mobileNavOpen ? 'is-open' : ''}`}
          type="button"
          aria-expanded={mobileNavOpen}
          aria-controls="main-nav"
          aria-label="Toggle menu"
          onClick={toggleMobileNav}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav
          id="main-nav"
          className={`main-nav ${mobileNavOpen ? 'is-open' : ''} ${mobileNavClosing ? 'is-closing' : ''}`}
          aria-label="Main navigation"
        >
          <NavLink to="/" onClick={closeMobileNav}>
            Home
          </NavLink>
          <NavLink to="/products" onClick={closeMobileNav}>
            Products
          </NavLink>
          <NavLink to="/about" onClick={closeMobileNav}>
            About / FAQ
          </NavLink>
          <NavLink to="/contact" onClick={closeMobileNav}>
            Contact
          </NavLink>
        </nav>
        <a className="call-pill" href="tel:+15551234567">
          Call for Availability
        </a>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/privacy"
            element={
              <LegalPage title="Privacy Policy">
                <p>
                  Locals Cannabis limits data collection to what is reasonably
                  necessary to respond to customer inquiries and operate this
                  informational website.
                </p>
                <ul>
                  <li>We do not sell personal information to third parties.</li>
                  <li>
                    Contact details submitted through inquiries are used for
                    customer communication only.
                  </li>
                  <li>
                    Basic analytics may be used to improve site performance and
                    usability.
                  </li>
                  <li>
                    Information may be disclosed when required by law,
                    regulation, or legal process.
                  </li>
                </ul>
                <p>
                  By using this website, you consent to this privacy framework.
                  For questions, contact our team directly.
                </p>
              </LegalPage>
            }
          />
          <Route
            path="/terms"
            element={
              <LegalPage title="Terms">
                <p>
                  This website is provided for informational and menu purposes
                  only. Product listings, availability, and pricing are subject
                  to change without notice.
                </p>
                <ul>
                  <li>All purchases are completed in store only.</li>
                  <li>
                    Valid government-issued photo ID is required for all sales.
                  </li>
                  <li>
                    You are responsible for compliance with local and state law
                    before purchasing or possessing products.
                  </li>
                  <li>
                    Nothing on this site is legal, medical, or professional
                    advice.
                  </li>
                </ul>
                <p>
                  Use of this website indicates acceptance of these terms and
                  any future updates.
                </p>
              </LegalPage>
            }
          />
          <Route
            path="/age-disclaimer"
            element={
              <LegalPage title="Age Disclaimer (21+)">
                <p>
                  Access to products and purchases is strictly limited to adults
                  21 years of age or older.
                </p>
                <ul>
                  <li>
                    A valid government-issued photo ID is required at the time
                    of purchase.
                  </li>
                  <li>Do not use products if you are under 21.</li>
                  <li>
                    Keep all hemp products out of reach of children and pets.
                  </li>
                  <li>
                    Do not drive or operate machinery while impaired after use.
                  </li>
                </ul>
              </LegalPage>
            }
          />
          <Route
            path="/coa"
            element={
              <LegalPage title="Lab Results / COAs">
                <p>
                  Certificates of Analysis (COAs) are available for qualifying
                  products from independent third-party laboratories.
                </p>
                <ul>
                  <li>
                    COAs typically include cannabinoid profile and potency
                    results.
                  </li>
                  <li>
                    Available reports may also include contaminant screening
                    data, depending on vendor testing scope.
                  </li>
                  <li>
                    COA batches can differ from prior inventory as products
                    rotate.
                  </li>
                </ul>
                <p>
                  Ask in store to review current batch documentation before
                  purchase.
                </p>
              </LegalPage>
            }
          />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="footer-links">
          <NavLink to="/privacy">Privacy Policy</NavLink>
          <NavLink to="/terms">Terms</NavLink>
          <NavLink to="/age-disclaimer">Age Disclaimer (21+)</NavLink>
          <NavLink to="/coa">Lab Results / COAs</NavLink>
        </div>
        <p>
          THCa hemp products are intended for adults 21+ only. Keep all
          products out of reach of children and pets. Use responsibly and do not
          drive or operate machinery while impaired.
        </p>
        <p>
          Federal treatment of hemp is based on the 2018 Farm Bill definition of
          hemp, including Delta-9 THC limits by dry weight. State and local
          laws may differ, and customers are responsible for compliance in their
          jurisdiction.
        </p>
      </footer>
    </div>
  )
}

export default App
