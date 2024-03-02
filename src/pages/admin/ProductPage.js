import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductBody from '../../components/admin/ProductBody';


function CategoryPage() {
    return (
        <Container className="mt-5">
            <div className="d-flex justify-content-end mb-4">
                <Button variant="primary" as={Link} to="/api/v1/products/add">+Add Product</Button>
            </div>
            <ProductBody />
        </Container>
    );
}

export default CategoryPage;
