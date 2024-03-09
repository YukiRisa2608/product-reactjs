import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';


function HomeBody() {
    // Đặt biến để lưu trữ một mảng sản phẩm vào useState.
    // useState cho phép thêm trạng thái React vào các function component. 
    // Trạng thái này được lưu trữ trong bộ nhớ và có thể thay đổi theo thời gian hoặc do tương tác người dùng.
    // Khi trạng thái thay đổi, React tự động re-render component để phản ánh sự thay đổi đó.
    // Tên products và setProducts trong useState([]) không phải khớp với bất kỳ tên nào trong backend.
    // Nhưng cần phản ánh ý nghĩa và mục đích của dữ liệu
    const [products, setProducts] = useState([]);

    //useEffect(() => {...}, []);: Hook useEffect được sử dụng để thực hiện các tác vụ có phụ thuộc vào vòng đời component, như gọi API để lấy dữ liệu. 
    //Mảng phụ thuộc [] khi để trống nghĩa là useEffect chỉ chạy một lần sau khi component được render lần đầu
    useEffect(() => {
        //fetch('/api/v1/products'): Gọi fetch đến endpoint /api/v1/products để lấy dữ liệu sản phẩm từ server. 
        //fetch trả về một Promise chứa phản hồi từ API. 
        //Pending (Chờ xử lý): Trạng thái ban đầu, không thành công cũng không thất bại.
        //Fulfilled (Hoàn thành): Nghĩa là hoạt động bất đồng bộ đã hoàn thành thành công.
        //Rejected (Từ chối): Nghĩa là hoạt động bất đồng bộ đã thất bại.
        fetch('/api/v1/products')
        //parse dữ liệu JSON từ phản hồi, trả về một Promise mới chứa dữ liệu đã được parse.
            .then(response => response.json())
            //data là dữ liệu JSON đã parse
            .then(data => {
                console.log(data)
                //lưu trữ dữ liệu sản phẩm vào trạng thái products của component.
                setProducts(data.data); // Lưu trữ toàn bộ mảng sản phẩm
            })
            .catch(error => console.error("Error fetching data: ", error));
    }, []);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {/* products là tên biến (state hoặc prop trong component) chứa mảng dữ liệu sản phẩm 
            Nếu products có giá trị (khác null, undefined, hoặc mảng rỗng), thì phần sau && sẽ được thực hiện.
            .map() để lặp qua mỗi phần tử của mảng (products*/}
            {products && products.map(product => (
                // mỗi phần tử trong danh sách có một key duy nhất, 
                //xác định các phần tử nào cần được cập nhật, thêm, hoặc loại bỏ, giảm thiểu việc tái render không cần thiết.
                <Card key={product.id} style={{ width: '18rem', margin: '10px' }}>
                    <Card.Img variant="top" src={product.imgUrl} alt={product.productName} />
                    <Card.Body>
                        <Card.Title>{product.productName}</Card.Title>
                        <Card.Text>Price: ${product.price}</Card.Text>
                        <Button variant="primary">+ Add to Cart</Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default HomeBody;
