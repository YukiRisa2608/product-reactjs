import React from 'react';
import { FaPlusCircle, FaSearch, FaEdit, FaTrashAlt, FaBan } from 'react-icons/fa';

function ActionIcons({ onAdd, onSearch, onEdit, onDelete, isBlocked, onBlock }) {
  return (
    <div>
      <FaPlusCircle style={{ color: 'green', cursor: 'pointer' }} onClick={onAdd} title="Add" />
      <FaSearch style={{ color: 'blue', cursor: 'pointer' }} onClick={onSearch} title="Search" />
      <FaEdit style={{ color: 'yellow', cursor: 'pointer' }} onClick={onEdit} title="Edit" />
      <FaTrashAlt style={{ color: 'red', cursor: 'pointer' }} onClick={() => window.confirm("Are you sure to delete?") && onDelete()} title="Xóa" />
      <FaBan style={{ color: isBlocked ? 'grey' : 'blue', cursor: 'pointer' }} onClick={onBlock} title={isBlocked ? "Unblock" : "Block"} />
    </div>
  );
}

export default ActionIcons;
