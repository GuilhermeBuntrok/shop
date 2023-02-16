import { useContext } from "react"
import { CartContext } from "../Components/context/CartContext"

export function useCart() {
  return useContext(CartContext)
}
