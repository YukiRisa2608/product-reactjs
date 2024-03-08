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

    // Add
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

    // Edit
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

    // Delete
    const onDeleteCategory = async (categoryId) => {
        const response = await fetch(`/api/v1/categories/${categoryId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        fetchCategories();
    }

    // toggle status
    const onToggleStatus = async (categoryId) => {
        const response = await fetch(`/api/v1/categories/toggle-status/${categoryId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response;
        console.log(data);
        if (response.ok) { // Kiểm tra nếu yêu cầu thành công
            // Gọi fetchCategories() để cập nhật danh sách các danh mục từ server
            fetchCategories();
        } else {
            console.error('Failed to toggle category status');
        }
    }

    return (
        <Container className="mt-5">

            <SaveCategoryForm handleClose={handleClose} onSaveCategory={onSaveCategory} show={show} />

            <div className="d-flex justify-content-end mb-4">
                <Button variant="primary" onClick={handleClose}>+Add Category</Button>
            </div>
            <CategoryBody 
            categories={categories} 
            onEditCategory={onEditCategory} 
            onToggleStatus={onToggleStatus}
            onDeleteCategory={onDeleteCategory}
            />
        </Container>
    );
}

export default CategoryPage;
