import React, { useState } from 'react';
import { Check, Trash2, Plus, Bone, CircleQuestionMark, Bomb, RefreshCw } from 'lucide-react';

const throwAnError = () => { 
  const obj= {}
  const _foo = obj.foo.bar
}

const TodosList = ({
  authType,
  authenticated,
  todoList = [],
  addTodo,
  toggleTodo,
  removeTodo,
  checkLastHours,
  insertFakeTodo,
  refreshTodoList
}) => {
  const [inputText, setInputText] = useState('');
  const [hours, setHours] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      addTodo(inputText);
      setInputText('');
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        My Todo List
      </h1>

      {/* Add Todo Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={(authType!=='credentials' || authenticated) ? "Things to be done..." : "LogIn in order to be able to add todos :/"}
            disabled={!(authType!=='credentials' || authenticated)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            disabled={!(authType!=='credentials' || authenticated)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Plus size={18} />
            Add
          </button>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={refreshTodoList}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
          <button
            onClick={() => insertFakeTodo()}
            disabled={!(authType!=='credentials' || authenticated)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Bone size={18} />
            Insert fake
          </button>

          <button
            onClick={() => checkLastHours({hours})}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <CircleQuestionMark size={18} />
            {`How many todos I have added in the last ${hours} hours?`}  
          </button>   
          <button
            onClick={() => throwAnError()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Bomb size={18} />
            {`Throw an JS error`}  
          </button>          
        </div>
      </form>

      {/* Todo List */}
      <div className="space-y-3">
        {todoList.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No todos yet. Add one above!
          </p>
        ) : (
          <ul className="space-y-2">
            {todoList.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    disabled={!(authType!=='credentials' || authenticated)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      todo.done
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 dark:border-gray-500 hover:border-blue-500'
                    }`}
                    aria-label={todo.done ? 'Mark as not done' : 'Mark as done'}
                  >
                    {todo.done && <Check size={16} />}
                  </button>
                  <span
                    className={`text-lg ${
                      todo.done
                        ? 'line-through text-gray-500 dark:text-gray-400'
                        : 'text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    {todo.name}
                  </span>
                </div>
                <button
                  onClick={() => removeTodo(todo.id)}
                  disabled={!(authType!=='credentials' || authenticated)}
                  className="p-1.5 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-red-50 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Delete todo"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodosList;

