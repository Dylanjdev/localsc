function AboutPage() {
  return (
    <section className="panel split" aria-labelledby="about-heading">
      <article>
        <div className="section-heading">
          <p className="eyebrow">About</p>
          <h1 id="about-heading">About Locals Cannabis</h1>
        </div>
        <p>
          Locals Cannabis is an adult-only hemp retailer focused on compliant
          THCa products, transparent labeling, and responsible in-store service.
          We prioritize education first so customers understand product type,
          potency, and intended use before purchase.
        </p>
        <p>
          Every product we carry is sourced from vetted vendors and reviewed for
          required documentation before it reaches shelves, including current
          certificates of analysis where applicable.
        </p>

        <h2>Store Compliance Standards</h2>
        <ul className="policy-list">
          <li>21+ entry and purchase policy with valid government-issued photo ID.</li>
          <li>In-store sales only. No online sales or shipping from this website.</li>
          <li>Product documentation reviewed for hemp compliance and labeling.</li>
          <li>No on-site consumption. Keep all products sealed until off premises.</li>
          <li>No medical claims, diagnosis, treatment, or cure claims.</li>
          <li>All sales final unless required otherwise by applicable law.</li>
        </ul>

        <p className="compliance-note">
          Compliance is reviewed continuously, but laws change. Customers are
          responsible for understanding state and local rules in their area.
        </p>
      </article>

      <article>
        <div className="section-heading">
          <p className="eyebrow">FAQ</p>
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="faq-list">
          <details>
            <summary>What is THCa?</summary>
            <p>
              THCa is tetrahydrocannabinolic acid, a naturally occurring
              cannabinoid in raw hemp. It is different from Delta-9 THC in its
              raw form and is typically listed separately on lab reports.
            </p>
          </details>
          <details>
            <summary>Is THCa legal?</summary>
            <p>
              Hemp-derived products are federally legal under the 2018 Farm Bill
              when Delta-9 THC is below 0.3% dry weight. State and local laws
              can vary and may change. We do not guarantee legality in every
              jurisdiction.
            </p>
          </details>
          <details>
            <summary>Do I need an ID?</summary>
            <p>
              Yes. A valid, government-issued photo ID is required. Sales are
              limited to adults 21+.
            </p>
          </details>
          <details>
            <summary>What payment types are accepted?</summary>
            <p>
              We accept cash and debit cards. Card options may vary by provider
              and state guidelines.
            </p>
          </details>
          <details>
            <summary>Do you ship or offer online ordering?</summary>
            <p>
              No. This site is informational and menu-based only. Purchases are
              completed in store after age verification.
            </p>
          </details>
          <details>
            <summary>Are products lab tested?</summary>
            <p>
              Yes. We maintain third-party lab reports for compliance, potency,
              and safety screening.
            </p>
          </details>
          <details>
            <summary>Can you provide COAs?</summary>
            <p>
              Yes. Available certificates of analysis can be reviewed in store,
              and staff can help explain cannabinoid and potency values.
            </p>
          </details>
          <details>
            <summary>Store policies</summary>
            <p>
              All sales are final. No consumption on premises. Please keep
              products away from children and pets. Use responsibly and do not
              drive or operate machinery after use.
            </p>
          </details>
          <details>
            <summary>Is this legal or medical advice?</summary>
            <p>
              No. Information on this page is educational only and is not legal
              or medical advice. For legal guidance, consult a licensed attorney
              in your state.
            </p>
          </details>
        </div>
      </article>
    </section>
  )
}

export default AboutPage
