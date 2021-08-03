import React from "react";
import "./List.css";
const List = ({ items, removeTodo, editTodo }) => {
  return (
    <div>
      {items.map((item, index) => {
        const { id, title } = item;
        return (
          <div key={id} className="edit">
              <li>{title}</li>
    
            <button className="btn" onClick={() => editTodo(id)}>
              Edit
            </button>
            <br />
            <button className="btn" onClick={() => removeTodo(id)}>
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default List;
