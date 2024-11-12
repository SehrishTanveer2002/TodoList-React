import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;

    const newTask = {
      id: Date.now(),
      name: newTodo,
    };
    setTodos([newTask, ...todos]); //spread operator
    setNewTodo("");
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id, name) => {
    setEditId(id);
    setNewTodo(name);
  };

  const handleSaveEdit = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editId ? { ...todo, name: newTodo } : todo
      )
    );
    setEditId(null);
    setNewTodo("");
  };

  return (
    <div className="flex flex-col min-h-screen p-4 bg-[#ff6666]">
      <h1 className="text-4xl font-semibold mb-2 text-white mx-10 lg:text-center">Todo List</h1>
      <h6 className="text-base font-normal mb-4 text-white  mx-9 lg:text-center">A Simple React Todo List App</h6>
     
      <hr className="w-full max-w-md border-t-2 border-white mb-10 py-2 opacity-35 mx-auto" />

      <ul className="w-full max-w-md mx-auto">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center p-5 mb-1 rounded bg-[#f48484]"
          >
            <span className="text-white">{todo.name}</span>
            <div>
              <button
                onClick={() => handleEditTodo(todo.id, todo.name)}
                className="text-white mr-4"
              >
                <FontAwesomeIcon icon={faEdit} className="text-white" />
              </button>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-white"
              >
                <FontAwesomeIcon icon={faTrash} className="text-white" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      
      <h1 className="text-2xl font-semibold mt-10 mb-2 text-white mx-10 lg:text-center">New todo</h1>
      <div className="flex mb-4 w-full max-w-md mx-auto">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New Todo"
          className="px-3 py-2 mr-2 w-80 text-gray-800 focus:outline-none focus:border-transparent"
        />
        <button
          onClick={editId ? handleSaveEdit : handleAddTodo}
          className="px-9 py-2 border-2 border-white text-white whitespace-nowrap"
        >
          {editId ? "Save" : "Add Todo"}
        </button>
      </div>
    </div>
  );
}

export default App;




