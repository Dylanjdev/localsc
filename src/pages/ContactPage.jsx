import { storeInfo } from '../data/storeData'

function ContactPage() {
  return (
    <section className="panel" aria-labelledby="contact-heading">
      <div className="section-heading">
        <p className="eyebrow">Contact / Location</p>
        <h1 id="contact-heading">Visit Locals Cannabis</h1>
      </div>
      <div className="contact-grid">
        <article>
          <h3>Address</h3>
          <p>{storeInfo.addressLine1}</p>
          <p>{storeInfo.addressLine2}</p>
          <p>{storeInfo.parking}</p>
        </article>
        <article>
          <h3>Phone</h3>
          <p>(555) 123-4567</p>
          <h3>Email</h3>
          <p>hello@localscannabis.com</p>
        </article>
        <article>
          <h3>Hours</h3>
          {storeInfo.hours.map((hoursLine) => (
            <p key={hoursLine}>{hoursLine}</p>
          ))}
        </article>
        <article>
          <h3>Directions</h3>
          <p>{storeInfo.directions}</p>
          <h3>Social Media</h3>
          <p>{storeInfo.social}</p>
        </article>
      </div>
      <iframe
        className="contact-map"
        title="Locals Cannabis location"
        src={`https://www.google.com/maps?q=${storeInfo.fullMapEmbedQuery}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  )
}

export default ContactPage
