import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductBody from '../../components/admin/product/ProductBody';
import { Modal } from 'bootstrap';
import SaveProductForm from '../../components/admin/product/SaveProductForm'


function CategoryPage() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const onSaveProduct = async (data) => {
        const response = await fetch('/api/v1/products', {
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

    // Fetches all categories
    const fetchAllCategories = async () => {
        const response = await fetch('/api/v1/categories');
        const data = await response.json();
        console.log(data);
        setCategories(data.data || []);
    }

    // Update product
    const onUpdateProduct = async (product) => {
        const response = await fetch(`/api/v1/products/${product.productId}`, {
            method: 'PUT',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        fetchProducts();
    }

    // Method toggle status of product
    const onToggleStatus = async (productId) => {
        const response = await fetch(`/api/v1/products/toggle-status/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response;
        console.log(data);
        fetchProducts();
    }

    // Method delete product
    const onDeleteProduct = async (productId) => {
        const response = await fetch(`/api/v1/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        fetchProducts();
    }


    useEffect(() => {
        fetchProducts();
        fetchAllCategories();
    }, []);


    return (
        <Container className="mt-5">
            <div className="d-flex justify-content-end mb-4">
                <SaveProductForm onSaveProduct={onSaveProduct} categories={categories} />
            </div>
            <ProductBody
                products={products}
                categories={categories}
                onUpdateProduct={onUpdateProduct}
                onToggleStatus={onToggleStatus}
                onDeleteProduct={onDeleteProduct}
            />

        </Container>
    );
}

export default CategoryPage;
