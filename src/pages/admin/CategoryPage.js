import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CategoryBody from '../../components/admin/CategoryBody';


function CategoryPage() {
    return (
        <Container className="mt-5">
            <div className="d-flex justify-content-end mb-4">
                <Button variant="primary" as={Link} to="/api/v1/categories/add">+Add Category</Button>
            </div>
            <CategoryBody />
        </Container>
    );
}

export default CategoryPage;
