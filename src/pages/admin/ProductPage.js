import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductBody from '../../components/admin/ProductBody';
import { Modal } from 'bootstrap';
import SaveProductForm from '../../components/admin/SaveProductForm'


function CategoryPage() {
    
    const [products, setProducts] = useState([]);

    const onSaveProduct = async (data) => {
        const response = await fetch('http://127.0.0.1:8081/api/v1/products', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const myJson = await response.json();
        console.log(myJson)
        fetchProducts()
        
    }

    const fetchProducts = async () => {
        const response = await fetch('/api/v1/products');
        const data = await response.json();
        console.log(data);
        setProducts(data.data || []);
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    return (
        <Container className="mt-5">
            <div className="d-flex justify-content-end mb-4">
                <SaveProductForm onSaveProduct={onSaveProduct} />
            </div>
            <ProductBody products = {products}/>

        </Container>
    );
}

export default CategoryPage;
