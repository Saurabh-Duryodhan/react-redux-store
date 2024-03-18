import React, { useState } from 'react'
import Loading from '../components/Loader'
import { useLoaderData } from 'react-router-dom'

const productuct = () => {
    const product = useLoaderData()
    console.log(product, "productuct")
    return (
        <>
            <h1>productuct Detail</h1>
            <img style={{ height: '60px', width: '100px' }} src={product['images'][0]} alt={product.title} />
            <h3>productuctuct ID: {product.id}</h3>
            <h2>{product.title}</h2>
            <h4>Description: {product.description}</h4>
            <p>Rating: {product.rating}</p>

            {/* {
                productuct.length > 0 ?
                    productuct.map(product => <div key={product.id}>
                   
                    </div>) : <Loading label={"productuct"} />
            } */}
        </>
    )
}
export default productuct;

export async function loader({ request, params }) {
    try {
        const { productId } = params
        const response = await fetch(`https://dummyjson.com/products/${productId}`)
        const product = await response.json()
        return product
    } catch (error) {
        console.log(error.message)
    }
}