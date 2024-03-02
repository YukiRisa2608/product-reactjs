import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaBan, FaPlusCircle  } from 'react-icons/fa';
import Table from 'react-bootstrap/Table';

function CategoryBody() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await fetch('http://localhost:8081/categories');
        const data = await response.json();
        console.log(data);
        setCategories(data.data || []);
    };
      
    const handleEdit = (id) => {
        console.log(`Editing category ${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
            console.log(`Deleting category ${id}`);
        }
    };

    const handleBlock = (id, isBlocked) => {
        console.log(`${isBlocked ? 'Unblocking' : 'Blocking'} category ${id}`);
    };

    return (
        <div>
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
                        <td>{category?.status}</td>
                        <td>
                            <FaEdit style={{ color: 'grey', cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(category.id)} />
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
