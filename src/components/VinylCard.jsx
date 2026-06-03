import { useNavigate } from 'react-router-dom'
import './VinylCard.css'

function VinylCard({ vinyl }) {
    const navigate = useNavigate()

    return (
        <div className="vinyl-card" onClick={() => navigate(`/vinyl/${vinyl.id}`)}>
            <img src={vinyl.image} alt={vinyl.title} />
            <div className="vinyl-info">
                <h3>{vinyl.title}</h3>
                <p className="artist">{vinyl.artist}</p>
                <div className="vinyl-tags">
                    <span className="tag genre">{vinyl.genre} </span>
                    <span className="tag condition">{vinyl.condition}</span>
                </div>
                <div className="vinyl-footer">
                    <div>
                        <span className="store">{vinyl.store} | </span>
                        <span className="year">{vinyl.year}</span>
                    </div>
                    <span className="price">{vinyl.price}€</span>
                </div>
            </div>
        </div>
    )
}

export default VinylCard