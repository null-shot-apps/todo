'use client';

import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim() === '') return;
    
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };
    
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-6">
      <div className="max-w-2xl mx-auto mt-12">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            My Todo List
          </h1>
          
          {/* Input Section */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-800"
            />
            <button
              onClick={addTodo}
              className="px-6 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors"
            >
              Add
            </button>
          </div>

          {/* Todo List */}
          <div className="space-y-3">
            {todos.length === 0 ? (
              <p className="text-center text-gray-400 py-8">
                No tasks yet. Add one to get started!
              </p>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-5 h-5 cursor-pointer accent-purple-500"
                  />
                  <span
                    className={`flex-1 text-lg ${
                      todo.completed
                        ? 'line-through text-gray-400'
                        : 'text-gray-800'
                    }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Stats */}
          {todos.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 text-center text-gray-600">
              <p>
                {todos.filter(t => t.completed).length} of {todos.length} tasks completed
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

