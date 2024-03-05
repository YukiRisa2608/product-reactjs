import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CategoryBody from '../../components/admin/category/CategoryBody';
import SaveCategoryForm from '../../components/admin/category/SaveCategoryForm';


function CategoryPage() {
    const [show, setShow] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await fetch('/api/v1/categories');
        const data = await response.json();
        console.log(data);
        setCategories(data.data || []);
    };

    const handleClose = () => {
        setShow(!show)
    }

    const onSaveCategory = async (categoryName) => {

        const response = await fetch(`/api/v1/categories`, {
            method: 'POST',
            body: JSON.stringify({
                categoryName
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        handleClose()

        fetchCategories();
    }

    const onEditCategory = async (category) => {

        const response = await fetch(`/api/v1/categories/${category.id}`, {
            method: 'PUT',
            body: JSON.stringify(category),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        fetchCategories();
    }

    return (
        <Container className="mt-5">

            <SaveCategoryForm handleClose={handleClose} onSaveCategory={onSaveCategory} show={show} />

            <div className="d-flex justify-content-end mb-4">
                <Button variant="primary" onClick={handleClose}>+Add Category</Button>
            </div>
            <CategoryBody categories={categories} onEditCategory={onEditCategory} />
        </Container>
    );
}

export default CategoryPage;
