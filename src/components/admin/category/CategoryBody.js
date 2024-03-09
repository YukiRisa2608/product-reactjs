import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaBan } from 'react-icons/fa';
import Table from 'react-bootstrap/Table';
import EditCategoryForm from './EditCategoryForm';

function CategoryBody(props) {
    const { categories, onEditCategory, onDeleteCategory, onToggleStatus } = props;
    const [showEditCategory, setShowEditCategory] = useState(false);
    const [category, setCategory] = useState(null);


    //Delete
    const handleDelete = (id) => {
        onDeleteCategory(id)
    };


    //show edit form 
    const handleClose = () => {
        setShowEditCategory(false);
    }

    //edit
    const handleEdit = (category) => {
        setCategory(category);
        setShowEditCategory(true);
    };

    return (
        <div>
            {showEditCategory && <EditCategoryForm handleClose={handleClose} category={category} onEditCategory={onEditCategory} show={showEditCategory} />}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Category Name</th>
                        <th>Created Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories && categories.map((category) => (
                        <tr key={category?.id}>
                            <td>{category?.id}</td>
                            <td>{category?.categoryName}</td>
                            <td>{category?.createdDate}</td>
                            <td style={{ color: category.status ? 'blue' : 'red' }}>
                                {category?.status ? "Active" : "Inactive"}</td>
                            <td>
                                <FaEdit style={{ color: 'grey', cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(category)} />
                                <FaTrash style={{ color: 'red', cursor: 'pointer', marginRight: '10px' }} onClick={() => handleDelete(category.id)} />
                                <FaBan style={{ color: category?.status === "Active"  ? 'grey' : 'blue', cursor: 'pointer' }} onClick={() => onToggleStatus(category.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>

    );
}

export default CategoryBody;
