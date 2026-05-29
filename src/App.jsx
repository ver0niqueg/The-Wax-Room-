import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { vinyls } from './data/vinyls.js'
import VinylCard from './components/VinylCard.jsx'
import Filters from './components/Filters.jsx'
import VinylDetail from './components/VinylDetail.jsx'
import { useCart } from './context/CartContext.jsx'

function App() {
  const [filters, setFilters] = useState({ store: 'All', genre: 'All', condition: 'All'})
  const [search, setSearch] = useState('')
  const [showCart, setShowCart] = useState(false)
  const { cart, removeFromCart, total } = useCart()
  const [sort, setSort] = useState('default')

  const filtered = vinyls.filter(v => {
    return (
      (filters.store === 'All' || v.store === filters.store) &&
      (filters.genre === 'All' || v.genre === filters.genre) &&
      (filters.condition === 'All' || v.condition === filters.condition) &&
      (search === '' || v.title.toLowerCase().includes(search.toLowerCase()) || v.artist.toLowerCase().includes(search.toLowerCase()))
    )
  }).sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    return 0
  })

  return (
    <Routes>
      <Route path="/" element={
        <div>
          <header className="header">
            <div>
              <h1>The Wax Room</h1>
              <div className="header-sub">Independant Vinyl Marketplace</div>
            </div>
            <button className="cart-btn" onClick={() => setShowCart(!showCart)}>
              🛒 Cart {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </button>
          </header>

          {/* CART DROPDOWN */}
          {showCart && (
            <div className="cart-dropdown">
              {cart.length === 0
                ? <div className="cart-empty">Your cart is empty</div>
                : <>
                    {cart.map(item => (
                      <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.title} />
                        <div className="cart-item-info">
                          <div className="cart-item-title">{item.title}</div>
                          <div className="cart-item-artist">{item.artist}</div>
                        </div>
                        <div className="cart-item-price">{item.price}€</div>
                        <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>X</button>
                      </div>
                    ))}
                    <div className="cart-total">
                      <span>Total</span>
                      <span>{total.toFixed(2)}€</span>
                    </div>
                  </>
            }
          </div>
        )}

          <div className="controls">
            <input className="search-input"
              type="text"
              placeholder="Search by title or artist..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Filters filters={filters} setFilters={setFilters} />
            <select valut={sort} onChange={e => setSort(e.target.value)}>
                <option value='default'>Sort by</option>
                <option value='price-asc'>Price ↑</option>
                <option value='price-desc'>Price ↓</option>
            </select>
          </div>

          <div className="main">
            <div className="results-info">{filtered.length} result{filtered.length !== 1 ? 's' : ''} found</div>
            {filtered.length === 0
              ? <div className="no-results">No records found</div>
              : <div className="vinyl-grid">
                  {filtered.map(vinyl => (
                  <VinylCard key={vinyl.id} vinyl={vinyl} />
                ))}
              </div>

            }
          </div>
        </div>
      } />
      <Route path="/vinyl/:id" element={<VinylDetail />} />
    </Routes>
  )
}

export default App
