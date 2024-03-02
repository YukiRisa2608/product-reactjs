import React, { useState } from 'react';
import axios from 'axios'; // thư viện thay cho fetch thuần
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function SaveCategoryForm() {
  const [categoryName, setCategoryName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
      // Sử dụng axios để gửi yêu cầu POST
      const response = await axios.post('/api/v1/categories/add', {
        categoryName: categoryName
      });
      console.log('Category saved successfully', response.data);
      navigate('/api/v1/categories'); // Chuyển hướng tới trang category sau khi lưu
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
