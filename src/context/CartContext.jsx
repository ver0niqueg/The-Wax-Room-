import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])

    const addToCart = (vinyl) => {
        setCart(prev => {
            const exists = prev.find(item =>item.id === vinyl.id)
            if (exists) return prev // déjà dans le panier
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