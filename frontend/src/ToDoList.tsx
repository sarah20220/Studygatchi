import { useState } from "react";
import "./App.css";

export default function ToDoList() {
  const [items, setItems] = useState([
    "Lock in time",
    "Read Chapters 2-3",
    "Write new Draft",
  ]);
  const [newItem, setNewItem] = useState("");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    () =>
      items.reduce((acc, item) => {
        acc[item] = false;
        return acc;
      }, {} as Record<string, boolean>)
  );

  const addItem = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newItem.trim()) return;

    setItems((prev) => [...prev, newItem]);
    setCheckedItems((prev) => ({ ...prev, [newItem]: false }));
    setNewItem("");
  };

  const checkItem = (item: string) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const removeItem = (item: string) => {
    setItems((prev) => prev.filter((i) => i !== item));
    setCheckedItems((prev) => {
      const copy = { ...prev };
      delete copy[item];
      return copy;
    });
    confirmTaskDeletion(null);
  };

  const [taskToDelete, confirmTaskDeletion] = useState<string | null>(null);

  return (
    <div>
      <div className="todolist-logo">
        <h1>Goober To Do List</h1>
      </div>

      <form className="Add-item" onSubmit={addItem}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button className="todolist-addItem" type="submit">
          Add
        </button>
      </form>

      <ul
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          listStyleType: "none",
          padding: 0,
        }}
      >
        {items.map((item) => (
          <li key={item} className="todolist-item">
            <div className="wrapper">
              <input
                type="checkbox"
                id={`checkbox-${item}`}
                name={item}
                checked={checkedItems[item]}
                onChange={() => checkItem(item)}
              />
              <label htmlFor={`checkbox-${item}`}>{item}</label>
            </div>
            <button
              className="todolist-trashbutton"
              onClick={() => confirmTaskDeletion(item)}
            >
              Del
            </button>
          </li>
        ))}
      </ul>

      {taskToDelete !== null && (
        <div className = "popup-overlay">
          <div className = "popup-content">
            <h3 id = "confirm-delete-title">
              Delete Task?
            </h3>
            <p>
              Are you sure you want to delete "{taskToDelete}"?
            </p>
            <button id = "popup-button" onClick={() => removeItem(taskToDelete)}>
              Delete
            </button>
            <button id = "popup-button" onClick={() => confirmTaskDeletion(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
