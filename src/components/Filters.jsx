import { stores, genres, conditions } from '../data/vinyls.js'

function Filters({ filters, setFilters }) {
    return (
        <div className="filters">
            <select // composant pour choisir une valeur
                value={filters.store}
                onChange={e => setFilters({ ...filters, store: e.target.value })}
            >
                {stores.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <select
                value={filters.genre}
                onChange={e => setFilters({ ...filters, genre: e.target.value })}
            >
                {genres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>

            <select
                value={filters.condition}
                onChange={e => setFilters({ ...filters, condition: e.target.value})}
            >
                {conditions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
        </div>
    )
}

export default Filters