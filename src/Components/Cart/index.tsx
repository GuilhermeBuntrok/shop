import React, { useState } from 'react'
import CartButton from '../CartButton'
import * as Dialog from '@radix-ui/react-dialog'
import { CartClose, CartContent, CartFinalization, CartProduct, CartProductDetails, CartProductImage, FinalizationDetails } from './styles'
import { X } from 'phosphor-react'
import Image from 'next/image'
import { useCart } from '../../hooks/useCart'
import axios from 'axios'


export default function Cart() {

  const { cartItems, removeCartItem, cartTotal } = useCart()
  const cartQuantity = cartItems.length

  const formattedCartTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',

  }).format(cartTotal)

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post("/api/checkout", {
        products: cartItems,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl

    } catch (err) {
      setIsCreatingCheckoutSession(false)
      alert("Falha ao redirecionamento ao checkout!")
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton />
      </Dialog.Trigger>

      <Dialog.Portal>
        <CartContent>
          <CartClose>
            <X size={24} weight="bold" />
          </CartClose>

          <h2>Sacola de compras</h2>

          <div>
            {cartQuantity <= 0 && <p>Parece que seu carrinho esta vazio :( </p>}

            {cartItems.map((cartItems) => (
              <CartProduct key={cartItems.id}>
                <CartProductImage>
                  <Image
                    width={100}
                    height={93}
                    alt=""
                    src={cartItems.imageUrl}
                  />

                </CartProductImage>
                <CartProductDetails>
                  <p>{cartItems.name}</p>
                  <strong>{cartItems.price}</strong>
                  <button onClick={() => removeCartItem(cartItems.id)}>Remover</button>
                </CartProductDetails>

              </CartProduct>
            ))}
          </div >
          <CartFinalization>
            <FinalizationDetails>
              <div>
                <span>Quantidade</span>
                <p>{cartQuantity} {cartQuantity === 1 ? "item" : "itens"}</p>
              </div>
              <div>
                <span>
                  Valor total
                </span>
                <p>{formattedCartTotal}</p>
              </div>
            </FinalizationDetails>
            <button
              onClick={handleCheckout}
              disabled={isCreatingCheckoutSession || cartQuantity <= 0}
            >
              Finalizar Compra
            </button>
          </CartFinalization>
        </CartContent>
      </Dialog.Portal>




    </Dialog.Root>


  )
}
