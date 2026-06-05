import { useParams, useNavigate } from 'react-router-dom'
import { vinyls } from '../data/vinyls.js'
import { useCart } from '../context/CartContext.jsx'
import './VinylDetail.css'

function VinylDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addToCart, cart } = useCart()

    const vinyl = vinyls.find(v => v.id === parseInt(id))

    if (!vinyl) return <div className="not-found">Record not found</div>

    const isInCart = cart.find(item => item.id === vinyl.id)

    return (
        <div className="detail-page">
            <button className="back-btn" onClick={() => navigate(-1)}>
                ← Back to marketplace
            </button>

            <div className="detail-container">
                <div className="detail-image">
                    <img src={vinyl.image} alt={vinyl.title} />
                </div>

                <div className="detail-info">
                    <div className="detail-tags">
                        <span className="tag genre">{vinyl.genre}</span>
                        <span className="tag condition">{vinyl.condition}</span>
                    </div>

                    <h1>{vinyl.title}</h1>
                    <h2>{vinyl.artist}</h2>

                    <div className="detail-meta">
                        <div className="meta-row">
                            <span className="meta-label">Year</span>
                            <span className="meta-value">{vinyl.year}</span> 
                        </div>

                        <div className="meta-row">
                            <span className="meta-label">Store</span>
                            <span className="meta-value">{vinyl.store}</span>
                        </div>

                        <div className="meta-row">
                            <span className="meta-label">Condition</span>
                            <span className="meta-value">{vinyl.condition}</span>
                        </div>

                        <div className="meta-row">
                            <span className="meta-label">Genre</span>
                            <span className="meta-value">{vinyl.genre}</span>
                        </div>
                    </div>

                    <div className="detail-price">{vinyl.price}€</div>

                    <button 
                        className={`add-to-cart ${isInCart ? 'in-cart' : ''}`}
                        onClick={() => addToCart(vinyl)}
                        disabled={isInCart}
                    >
                        {isInCart ? '✓ Added to cart' : 'Add to cart 🛒'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VinylDetail