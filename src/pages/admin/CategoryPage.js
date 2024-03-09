import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import CategoryBody from '../../components/admin/category/CategoryBody';
import SaveCategoryForm from '../../components/admin/category/SaveCategoryForm';


function CategoryPage() {
    // Khởi tạo trạng thái 'show' để kiểm soát việc hiển thị của SaveCategoryForm.
    const [show, setShow] = useState(false);
    // Khởi tạo trạng thái 'categories' để lưu trữ danh sách các danh mục được lấy từ API.
    const [categories, setCategories] = useState([]);

    //hàm fetchCategories sẽ được thực thi ngay sau khi component CategoryPage hoàn thành quá trình mount vào DOM (Document Object Model) của trang web.
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        // Gửi request lấy danh sách danh mục từ API 
        const response = await fetch('/api/v1/categories');
        const data = await response.json();
        console.log(data);
        setCategories(data.data || []);
    };

    // Đảo ngược trạng thái của 'show' khi handleClose được gọi.
    //Khi show true, form hiển thị; khi show false, form ẩn đi. 
    const handleClose = () => {
        setShow(!show)
    }

    // Add
    const onSaveCategory = async (categoryName) => {
        const response = await fetch(`/api/v1/categories`, {
            method: 'POST',
            //body là phần nội dung của yêu cầu HTTP
            //chuyển đổi đối tượng JavaScript thành một chuỗi JSON
            // vì các API yêu cầu dữ liệu được gửi dưới dạng chuỗi JSON.
            body: JSON.stringify({
                categoryName
            }),
            //headers là một phần của yêu cầu HTTP, có thể gửi các thông tin bổ sung về yêu cầu của mình tới server.
            headers: {
                //'Content-Type': 'application/json' là một header thông báo cho server dữ liệu đang gửi đi là dạng JSON
                'Content-Type': 'application/json'
            }
        });
        // Đóng form sau khi lưu.
        handleClose()
        // Cập nhật lại danh sách danh mục.
        fetchCategories();
    }

    // Edit
    // Khi một hàm được đánh dấu là async, có thể sử dụng từ khóa await bên trong hàm đó để "đợi" một Promise được giải quyết mà không chặn sự thực thi của chương trình.
    const onEditCategory = async (category) => {
    // Đợi fetch hoàn thành và trả về phản hồi
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
        // Hiển thị cửa sổ xác nhận
        const isConfirmed = window.confirm('Do you want to delete this category?');
        // Kiểm tra xem người dùng có chọn OK không
        if (isConfirmed) {
            // Tiếp tục thực hiện yêu cầu xóa nếu người dùng xác nhận
            const response = await fetch(`/api/v1/categories/${categoryId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // Gọi hàm fetchCategories để cập nhật lại danh sách sau khi xóa
            fetchCategories();
        }
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
        if (response.ok) { 
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
