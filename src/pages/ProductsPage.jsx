import { menuCategories } from '../data/storeData'

function ProductsPage() {
  return (
    <section className="panel" aria-labelledby="products-heading">
      <div className="section-heading">
        <p className="eyebrow">Products / Menu</p>
        <h1 id="products-heading">Current Menu</h1>
        <p>
          Selection rotates often. Call ahead for daily inventory and strain
          availability.
        </p>
      </div>
      <div className="menu-grid board-view">
        {menuCategories.map((category) => (
          <article key={category.title} className="menu-card">
            <div className="product-photo" aria-hidden="true">
              Fresh Drop
            </div>
            <h3>{category.title}</h3>
            {category.items.map((item) => (
              <div key={item.name} className="menu-item">
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{item.potency}</p>
                <p className="in-store">In store only</p>
              </div>
            ))}
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProductsPage
