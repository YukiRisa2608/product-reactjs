import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaBan, FaPlusCircle } from 'react-icons/fa';
import Table from 'react-bootstrap/Table';
import EditProductForm from './EditProductForm';

function ProductBody(props) {
    const { categories, products, onToggleStatus, onDeleteProduct } = props;
    const [productEdit, setProductEdit] = useState(null);

    //Edit
    const handleEdit = (product) => {
        setProductEdit(product);
    };

    //Delete
    const handleDelete = (id) => {
        onDeleteProduct(id)
    };

    const displayCategoryName = (categoryId) => {
        let res = categories.filter(item => item.id === categoryId);
        if (res.length > 0) {
            return res[0].categoryName;
        }

        return "Not Found";
    }

    const handleCloseFormEdit = () => {
        setProductEdit(null);
    }

    return (
        <div>
            {productEdit !== null &&
                <EditProductForm
                    categories={categories}
                    product={productEdit}
                    show={true}
                    onClose={handleCloseFormEdit}
                    onUpdateProduct={props.onUpdateProduct} />
            }

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th class="bg-secondary">Product ID</th>
                        <th class="bg-secondary">Category Name</th>
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
                    {products && products.map((product) => (
                        <tr key={product?.productId}>
                            <td>{product?.productId}</td>
                            <td>{displayCategoryName(product?.categoryId)}</td>
                            <td>
                                {product?.imgUrl ? <img src={product.imgUrl} alt={product.productName} style={{ width: '100px' }} /> : 'No image available'}
                            </td>
                            <td>{product?.productName}</td>
                            <td>{product?.description}</td>
                            <td>{product?.price}</td>
                            <td>{product?.quantity}</td>
                            <td>{product.status ? 'Active' : 'Inactive'}</td>
                            <td>{product?.createdDate}</td>
                            <td>{product?.lastUpdated}</td>
                            <td>
                                <FaEdit style={{ color: 'grey', cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(product)} />
                                <FaTrash style={{ color: 'red', cursor: 'pointer', marginRight: '10px' }} onClick={() => handleDelete(product.productId)} />
                                <FaBan style={{ color: product.isBlocked ? 'grey' : 'blue', cursor: 'pointer' }} onClick={() => onToggleStatus(product.productId)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>

    );
}

export default ProductBody;
