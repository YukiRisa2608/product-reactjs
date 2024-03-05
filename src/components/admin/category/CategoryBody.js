import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaBan, FaPlusCircle } from 'react-icons/fa';
import Table from 'react-bootstrap/Table';
import { faListSquares } from '@fortawesome/free-solid-svg-icons';
import EditCategoryForm from './EditCategoryForm';

function CategoryBody(props) {
    const { categories, onEditCategory } = props;
    const [showEditCategory, setShowEditCategory] = useState(false);
    const [category, setCategory] = useState(null);


    const handleEdit = (category) => {
        setCategory(category);
        setShowEditCategory(true);
    };

    const handleDelete = (id) => {
        //
    };

    const handleBlock = (id, isBlocked) => {
        //
    };

    const handleClose = () => {
        setShowEditCategory(false);
    }

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
                            <td>{category?.status ? "Active" : "Inactive"}</td>
                            <td>
                                <FaEdit style={{ color: 'grey', cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(category)} />
                                <FaTrash style={{ color: 'red', cursor: 'pointer', marginRight: '10px' }} onClick={() => handleDelete(category.id)} />
                                <FaBan style={{ color: category.isBlocked ? 'grey' : 'blue', cursor: 'pointer' }} onClick={() => handleBlock(category.id, category.isBlocked)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>

    );
}

export default CategoryBody;
