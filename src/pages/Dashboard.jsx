import React, { useState, useEffect } from 'react'
import Loading from '../components/Loader';
import { addProduct } from '../store/slices/Cart';
import { useDispatch } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const [products, setProducts] = useState([])
    const [productCategories, setProductCategories] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const navigate = useNavigate()
    const dispatcher = useDispatch()

    const productsLoader = useLoaderData()

    const getAllCategories = async () => {
        try {
            const resp = await fetch('https://dummyjson.com/products/categories')
            const data = await resp.json()
            if (typeof data === 'object') data.unshift('All')
            return await data
        } catch (error) {
            console.log(error.message)
        }
    }

    const getProductsByCategory = async (e) => {
        try {
            let selected = e.target.value
            if (selected === 'All') return products
            const resp = await fetch(`https://dummyjson.com/products/category/${selected}`)
            const data = await resp.json()
            setSelectedCategory(selected)
            return setProducts(data.products)
        } catch (error) {
            console.log(error.message)
        }
    }

    function addToCartApp(prod) {
        dispatcher(addProduct(prod))
    }

    useEffect(() => {
        setProducts(productsLoader.products)
        let categories = async () => await getAllCategories()
        categories().then(data => setProductCategories(data))
    }, [])

    return (
        <>
            <h3>Products filtered By {selectedCategory === '' ? 'All' : selectedCategory} Category</h3>
            <select onChange={getProductsByCategory} name="category" defaultValue='Filter By Categories' id="selectOptions">
                {
                    productCategories.length > 0 ?
                        productCategories.map((data, idx) => <option key={idx} value={data}>{data}</option>) :
                        (<>
                            <option value="All">All</option>
                            <Loading label={'Categorie'} />
                        </>)
                }
            </select>

            <section id='dashboard'>
                {

                    products.length <= 0 ? <Loading label={'Products'} />
                        :
                        products.map(prod => (
                            <div key={prod.id}>
                                <img style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${prod.id}`)} src={prod.thumbnail} alt={prod.title} />
                                <h4>{prod.title}</h4>
                                <h6>{prod.description}</h6>
                                <p>Price: ${prod.price}</p>
                                <div id='buttons__div'>
                                    <button>Purchase</button>
                                    <button onClick={() => addToCartApp(prod)}>Add to Cart</button>
                                </div>
                            </div>
                        ))
                }
            </section>
        </>
    )
}

export async function productsLoader() {
    try {
        const resp = await fetch('https://dummyjson.com/products')
        const data = await resp.json()
        return data
    } catch (error) {
        console.log(error.message)
    }
}