import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function SaveCategoryForm() {
  const [categoryName, setCategoryName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Kiểm tra categoryName không để trống
    console.log('Category name:', categoryName);

    if (!categoryName.trim()) {
      console.log('Category name is blank, showing alert.');
      alert('Category name must not be blank.');
      return;
    }

    try {
      // Sử dụng axios để gửi yêu cầu POST
      const response = await axios.post('/categories/add', {
        name: categoryName
      });

      console.log('Category saved successfully', response.data);
      navigate('/categories'); // Chuyển hướng tới trang category sau khi lưu
    } catch (error) {
      console.error('Failed to save category:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3 w-50">
          <Form.Control
            placeholder="Input Category Name"
            aria-label="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <Button variant="outline-secondary" type="submit" id="button-addon2">
            Save
          </Button>
        </InputGroup>
      </Form>
    </>
  );
}

export default SaveCategoryForm;
