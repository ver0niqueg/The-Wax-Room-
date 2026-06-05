import { createContext, useContext, useState } from 'react'
import VinylDetail from '../components/VinylDetail'

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])

    const addToCart = (vinyl) => {
        setCart(prev => {
            if (prev.find(item => item.id === vinyl.id))
                return prev
            return [...prev, vinyl]
        })
    }

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id))
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0)

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, total }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}
