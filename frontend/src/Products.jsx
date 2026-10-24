import { useEffect, useState } from 'react'
import { request } from './api'

const emptyProduct = { name: '', description: '', price: '' }

function Products({ token, username, onLogout }) {
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState(emptyProduct)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')

  async function refresh() {
    setProducts(await request('/products/', { token }))
  }

  useEffect(() => {
    request('/products/', { token })
      .then(setProducts)
      .catch((err) => setError(err.message))
  }, [token])

  async function run(action) {
    try {
      await action()
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  async function save(event) {
    event.preventDefault()
    await run(async () => {
      await request(editingId ? `/products/${editingId}/` : '/products/', {
        method: editingId ? 'PUT' : 'POST',
        token,
        body: JSON.stringify(product),
      })
      setProduct(emptyProduct)
      setEditingId(null)
      await refresh()
    })
  }

  function edit(item) {
    setEditingId(item.id)
    setProduct({ name: item.name, description: item.description, price: item.price })
  }

  function cancel() {
    setEditingId(null)
    setProduct(emptyProduct)
  }

  return (
    <>
      <p>Logged in as {username} <button onClick={onLogout}>Log out</button></p>
      {error && <p className="error">{error}</p>}

      <section>
        <h2>{editingId ? 'Edit product' : 'Add product'}</h2>
        <form onSubmit={save}>
          <input required placeholder="Product name" value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })} />
          <textarea placeholder="Description" value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })} />
          <input required type="number" min="0" step="0.01" placeholder="Price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })} />
          <button>{editingId ? 'Save changes' : 'Add product'}</button>
          {editingId && <button type="button" onClick={cancel}>Cancel</button>}
        </form>
      </section>

      <section>
        <h2>Products</h2>
        {products.length === 0 && <p>No products yet.</p>}
        {products.map((item) => (
          <article className="product" key={item.id}>
            <h3>{item.name} — ${item.price}</h3>
            <p>{item.description}</p>
            <p>Seller: {item.owner}</p>
            {item.owner === username && <>
              <button onClick={() => edit(item)}>Edit</button>
              <button onClick={() => window.confirm('Delete this product?') &&
                run(async () => {
                  await request(`/products/${item.id}/`, { method: 'DELETE', token })
                  await refresh()
                })}>Delete</button>
            </>}
          </article>
        ))}
      </section>
    </>
  )
}

export default Products
