import React from 'react'
import { useSelector } from 'react-redux'
import CartItems from './Wishlist/CartItems'

const Wishlist = () => {
    const {totalItems} = useSelector((state) => state.cart)
  return (
    <section>
        <div className='w-[90%] mx-auto px-4 space-y-12 text-white'>
            <h1 className='text-[1.875rem] text-richblack-5 font-medium'>My Wishlist</h1>

            <div className='pb-3 border-b border-richblack-700'>
                {totalItems} Course(s) in Wishlist
            </div>

            <div>
                <CartItems/>
            </div>

        </div>
    </section>
  )
}

export default Wishlist