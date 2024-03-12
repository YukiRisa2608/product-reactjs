import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/admin/categories">Categories</Link></li>
        <li><Link to="/admin/products">Products</Link></li>

      </ul>
    </div>
  );
}

export default Sidebar;
