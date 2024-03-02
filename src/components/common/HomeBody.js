import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function HomeBody() {
    // Cập nhật state để lưu trữ một mảng sản phẩm
    const [products, setProducts] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8081/products')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setProducts(data); // Lưu trữ toàn bộ mảng sản phẩm
            })
            .catch(error => console.error("Error fetching data: ", error));
    }, []);

    return (
        <div>
            {products && products.map(product => (
                <Card key={product.id} style={{ width: '18rem', margin: '10px' }}>
                    <Card.Img variant="top" src={product.imgUrl} alt={product.productName} />
                    <Card.Body>
                        <Card.Title>{product.productName}</Card.Title>
                        <Card.Text>
                            Price: ${product.price}
                        </Card.Text>
                        <Button variant="primary">+ Add to Cart</Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default HomeBody;
