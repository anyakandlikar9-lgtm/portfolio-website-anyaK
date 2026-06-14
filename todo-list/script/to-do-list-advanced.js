 const todoList = JSON.parse(localStorage.getItem('todoList')) || [{
    name:'make dinner', 
    dueDate:'2025-07-12' 
    },{
        name:'wash dishes',
        dueDate: '2025-07-12'
     }];

 renderTodoList();

 function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject,index) => {
    const { name, dueDate } = todoObject;
    const html = `
      <div class='todo-item'
        <div>${name}</div>
        <div class='due'>${dueDate}</div>
        <button class="delete-button js-delete-todo-button">Delete</button>    
      </div>
  `;
    todoListHTML += html;
  });
  
  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;

document.querySelectorAll('.js-delete-todo-button')
  .forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todoList.splice(index,1); 
          renderTodoList(); 
    });
  });
}

  document.querySelector('.js-add-todo-button') 
    .addEventListener('click', () => {
      addTodo();
    });

  function addTodo() {
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;

    const dateInputElement = document.querySelector('.js-due-date-input');
    const dueDate = dateInputElement.value;
    
    todoList.push({
        //name: name,
        //dueDate: dueDate,
        name,
        dueDate
    });
    
    inputElement.value = '';

    renderTodoList();

    saveToStorage();
  }

  function saveToStorage(){
    localStorage.setItem('todoList',JSON.stringify(todoList));
  }