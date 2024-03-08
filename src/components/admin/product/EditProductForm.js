import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const sampleProduct = {
    // productId: 1,
    categoryId: 1,
    productName: null,
    price: 1000.0,
    description: "",
    quantity: 1,
    classification: "classification",
    status: true,
    imgUrl: "",
    file: null,
    lastUpdated: null,
    createdDate: null
}


function EditProductForm(props) {
    const [product, setProduct] = useState(props.product);
    const [categorySelected, setCategorySelected] = useState(null);

    useEffect(() => {
        if (product && product?.categoryId) {
            setCategorySelected(props.categories.filter(c => c.id === product?.categoryId)[0]);
        }
    }, [])

    const setName = (val) => {
        setProduct({ ...product, productName: val.value })
    }

    const setDescription = (val) => {
        setProduct({ ...product, description: val.value })
    }

    const setImage = (val) => {
        setProduct({ ...product, imgUrl: val.value })
    }

    const setCategoryId = (val) => {
        setProduct({ ...product, categoryId: val })
    }

    const onUpdateProduct = () => {
        props.onUpdateProduct(product);
        props.onClose();
    }

    const setPrice = (val) => {
        setProduct({ ...product, price: val.value })
    }

    const setQuantity = (val) => {
        setProduct({ ...product, quantity: val.value })
    }

    console.log(product);
    return (
        <>
            <Modal show={product !== null} onHide={props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                {
                                    categorySelected === null ? "Chọn category" : categorySelected.categoryName
                                }
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {props.categories.map((category) => (
                                    <Dropdown.Item onClick={() => {
                                        setCategorySelected(category);
                                        // Update categoryId to product
                                        setCategoryId(category.id);
                                    }} key={category.id} value={category.id}>
                                        {category.categoryName}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                value={product?.productName}
                                onChange={(val) => setName(val.target)}
                                type="email"
                                placeholder="Product name"
                                autoFocus
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                value={product?.description}
                                onChange={(val) => setDescription(val.target)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Product Image</Form.Label>
                            <Form.Control
                                value={product?.imgUrl}
                                onChange={(val) => setImage(val.target)}
                                type="email"
                                autoFocus
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                value={product?.price}
                                onChange={(val) => setPrice(val.target)}
                                type="number"
                                autoFocus
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                value={product?.quantity}
                                onChange={(val) => setQuantity(val.target)}
                                type="number"
                                autoFocus
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onUpdateProduct}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditProductForm;