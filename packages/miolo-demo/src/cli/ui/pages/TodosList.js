import React, {useState} from 'react'
import { collSort } from 'farrapa-collections'

const TodosList = ({authenticated, todoList, addTodo, toggleTodo, removeTodo, checkLastHour, insertFakeTodo}) => {
  const [inputText, setInputText] = useState('')

  return (
    <div className="todos">
      <div className="todos-header">
        <h1>To Do List</h1>
        <div className="todos-add">
          <div className="input-container">
            <input type="text" 
                  placeholder="Things to be done..." 
                  value={inputText}
                  onChange={(ev) => setInputText(ev.target.value)}/>
          </div>
            
          <div className={`button--primary ${inputText.length==0 ? 'disabled' : ''}`}
                onClick={() => {addTodo(inputText), setInputText('')} }>
                Add
          </div>
        </div>
      </div>
      <div className="todos-body">

        {todoList.length==-100
        ? <div>...</div>
        : <ol className="todos-list"> 
            {collSort(todoList, 'name')
              .map((todo) => 
              <li key={`todo_${todo.id}`} className={"todo"}>
                <div className="todo-text">
                  {todo.name}
                </div>
                {authenticated
                 ? <>
                      <div className={`todo-check ${todo.done ? 'done' : 'undone'}`} onClick={() => toggleTodo(todo.id)}>
                        {todo.done 
                          ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                              <path d="M9.993 19.421 3.286 12.58l1.428-1.401 5.293 5.4 9.286-9.286 1.414 1.414L9.993 19.421z"/>
                            </svg>
                          : <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32">
                              <path d="M22.781 16c4.305-2.729 7.219-7.975 7.219-14 0-0.677-0.037-1.345-0.109-2h-27.783c-0.072 0.655-0.109 1.323-0.109 2 0 6.025 2.914 11.271 7.219 14-4.305 2.729-7.219 7.975-7.219 14 0 0.677 0.037 1.345 0.109 2h27.783c0.072-0.655 0.109-1.323 0.109-2 0-6.025-2.914-11.271-7.219-14zM5 30c0-5.841 2.505-10.794 7-12.428v-3.143c-4.495-1.634-7-6.587-7-12.428v0h22c0 5.841-2.505 10.794-7 12.428v3.143c4.495 1.634 7 6.587 7 12.428h-22zM19.363 20.925c-2.239-1.27-2.363-2.918-2.363-3.918v-2.007c0-1 0.119-2.654 2.367-3.927 1.203-0.699 2.244-1.761 3.033-3.073h-12.799c0.79 1.313 1.832 2.376 3.036 3.075 2.239 1.27 2.363 2.918 2.363 3.918v2.007c0 1-0.119 2.654-2.367 3.927-2.269 1.318-3.961 3.928-4.472 7.073h15.677c-0.511-3.147-2.204-5.758-4.475-7.075z"></path>
                            </svg>
                          
                          }
                      </div>                  
                      <div className="todo-del"
                          onClick={(_ev) => removeTodo(todo.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                              width="24" height="24"
                              viewBox="0 0 48 48">
                                <path d="M 20.5 4 A 1.50015 1.50015 0 0 0 19.066406 6 L 14.640625 6 C 12.803372 6 11.082924 6.9194511 10.064453 8.4492188 L 7.6972656 12 L 7.5 12 A 1.50015 1.50015 0 1 0 7.5 15 L 8.2636719 15 A 1.50015 1.50015 0 0 0 8.6523438 15.007812 L 11.125 38.085938 C 11.423352 40.868277 13.795836 43 16.59375 43 L 31.404297 43 C 34.202211 43 36.574695 40.868277 36.873047 38.085938 L 39.347656 15.007812 A 1.50015 1.50015 0 0 0 39.728516 15 L 40.5 15 A 1.50015 1.50015 0 1 0 40.5 12 L 40.302734 12 L 37.935547 8.4492188 C 36.916254 6.9202798 35.196001 6 33.359375 6 L 28.933594 6 A 1.50015 1.50015 0 0 0 27.5 4 L 20.5 4 z M 14.640625 9 L 33.359375 9 C 34.196749 9 34.974746 9.4162203 35.439453 10.113281 L 36.697266 12 L 11.302734 12 L 12.560547 10.113281 A 1.50015 1.50015 0 0 0 12.5625 10.111328 C 13.025982 9.4151428 13.801878 9 14.640625 9 z M 11.669922 15 L 36.330078 15 L 33.890625 37.765625 C 33.752977 39.049286 32.694383 40 31.404297 40 L 16.59375 40 C 15.303664 40 14.247023 39.049286 14.109375 37.765625 L 11.669922 15 z"></path>
                        </svg>
                      </div>
                   </>
                  : null}
              </li>
            )}
          </ol>
        }
      </div>

      <div className="todos-footer">
        <h3>
          Shortcuts
        </h3>
        <div className="question" onClick={() => checkLastHour()}>
          Tell me how many todos I have added in the last hour
        </div>
        <div className="question" onClick={() => insertFakeTodo()}>
          Insert a fake one
        </div>
      </div>        
    </div>
  )
}

export default TodosList


