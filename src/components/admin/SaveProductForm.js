import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const sampleProduct = {
    productId: 1,
    categoryId: 1,
    productName: null,
    price: 1000.0,
    description: "description",
    quantity: 1,
    classification: "classification",
    status: true,
    imgUrl: "",
    file: null,
    lastUpdated: null,
    createdDate: null
}

function SaveProductForm(props) {
    const [show, setShow] = useState(false);
    const [product, setProduct] = useState(sampleProduct);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const setName = (val) => {
        setProduct({...product, productName: val.value})
    }

    const setDescription = (val) => {
        setProduct({...product, description: val.value})
    }

    const setImage = (val) => {
        setProduct({...product, imgUrl: val.value})
    }

    const saveProduct = () => {
        props.onSaveProduct(product)
        handleClose();

    }

    const setPrice = (val) => {
        setProduct({...product, price: val.value})
    }
    
    console.log(product);
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                +Add Product
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                value={product.productName}
                                onChange={ (val) => setName(val.target)}
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
                            value={product.description}
                            onChange={ (val) => setDescription(val.target)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Product Image</Form.Label>
                            <Form.Control
                                value={product.imgUrl}
                                onChange={ (val) => setImage(val.target)}
                                type="email"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                value={product.price}
                                onChange={ (val) => setPrice(val.target)}
                                type="number"
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveProduct}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SaveProductForm;