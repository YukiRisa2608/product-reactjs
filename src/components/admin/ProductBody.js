import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaBan, FaPlusCircle  } from 'react-icons/fa';
import Table from 'react-bootstrap/Table';

function ProductBody(props) {
      
    const handleEdit = (id) => {
        //
    };

    const handleDelete = (id) => {
        //
    };

    const handleBlock = (id, isBlocked) => {
        //
    };

    return (
        <div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th class="bg-secondary">Product ID</th>
                    <th class="bg-secondary">Category ID</th>
                    <th class="bg-secondary">Image</th>
                    <th class="bg-secondary">Product Name</th>
                    <th class="bg-secondary">Description</th>
                    <th class="bg-secondary">Price</th>
                    <th class="bg-secondary">Quantity</th>
                    <th class="bg-secondary">Status</th>
                    <th class="bg-secondary">Created Date</th>
                    <th class="bg-secondary">Last Update</th>
                    <th class="bg-secondary">Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.products && props.products.map((product) => (
                    <tr key={product?.id}>
                        <td>{product?.id}</td>
                        <td>{product?.categoryId}</td>
                        <td>
                            {product?.imgUrl ? <img src={product.imgUrl} alt={product.productName} style={{width: '100px'}} /> : 'No image available'}
                        </td>
                        <td>{product?.productName}</td>
                        <td>{product?.description}</td>
                        <td>{product?.price}</td>
                        <td>{product?.quantity}</td>
                        <td>{product?.status}</td>
                        <td>{product?.createdDate}</td>
                        <td>{product?.lastUpdated}</td>
                        <td>
                            <FaEdit style={{ color: 'grey', cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(product.id)} />
                            <FaTrash style={{ color: 'red', cursor: 'pointer', marginRight: '10px' }} onClick={() => handleDelete(product.id)} />
                            <FaBan style={{ color: product.isBlocked ? 'grey' : 'blue', cursor: 'pointer' }} onClick={() => handleBlock(product.id, product.isBlocked)} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>
        
    );
}

export default ProductBody;
