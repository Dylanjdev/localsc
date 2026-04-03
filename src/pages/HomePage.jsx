import { Link } from 'react-router-dom'
import { featuredProducts, storeInfo } from '../data/storeData'

function HomePage() {
  return (
    <>
      <section className="hero-wrap">
        <div className="hero-copy">
          <p className="hero-kicker">Asheville, NC</p>
          <p className="eyebrow">Premium Hemp Products</p>
          <h1>Locals Cannabis</h1>
          <p>
            Locals Cannabis is a neighborhood THCa hemp store focused on quality
            flower, concentrates, pre-rolls, vapes, and edibles. Everything is
            lab tested and clearly labeled.
          </p>
          <div className="cta-row">
            <Link to="/contact">Visit us in store</Link>
            <Link to="/products">See our products</Link>
            <a href="tel:+15551234567">Call for availability</a>
          </div>
          <p className="notice">21+ only. Valid government-issued ID required.</p>
        </div>
        <div className="hero-card">
          <p className="mini-label">THCa Guide</p>
          <h2>What is THCa?</h2>
          <p>
            THCa is the non-intoxicating precursor to THC found in legal hemp.
            Under the 2018 Farm Bill, hemp products are federally legal when
            Delta-9 THC remains below 0.3% by dry weight.
          </p>
          <p>
            We keep certificates of analysis available in store and explain
            products clearly before purchase.
          </p>
          <p className="legal-line">Hemp compliant and lab verified.</p>
        </div>
      </section>

      <section className="info-strip">
        <div>
          <h3>Store Hours</h3>
          {storeInfo.hours.map((hoursLine) => (
            <p key={hoursLine}>{hoursLine}</p>
          ))}
        </div>
        <div>
          <h3>Address</h3>
          <p>{storeInfo.addressLine1}</p>
          <p>{storeInfo.addressLine2}</p>
          <p>{storeInfo.parking}</p>
        </div>
        <div>
          <h3>Map</h3>
          <iframe
            title="Locals Cannabis map"
            src={`https://www.google.com/maps?q=${storeInfo.mapEmbedQuery}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <section className="panel" aria-labelledby="featured-heading">
        <div className="section-heading">
          <p className="eyebrow">Home</p>
          <h2 id="featured-heading">Featured Products</h2>
        </div>
        <div className="featured-grid shelf-view">
          {featuredProducts.map((item, index) => (
            <article
              key={item.name}
              className="product-card"
              style={{ '--tilt': `${(index - 1) * 1.6}deg` }}
            >
              <div className="product-photo" aria-hidden="true">
                Ask In Store
              </div>
              <p className="tag">{item.category}</p>
              <h3>{item.name}</h3>
              <p>{item.price}</p>
              <p>{item.potency}</p>
              <p className="in-store">In store only</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default HomePage
