window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const form = document.querySelector('#form');

    const username = localStorage.getItem('username') ||'';
    const submit = localStorage.getItem('submit') || '';

    nameInput.value = username;

    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    })

    
    form.addEventListener('submit', e => {
        e.preventDefault();

        const todo = {
            constant: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        todos.push(todo);

        localStorage.setItem('todos',JSON.stringify(todos));

        e.target.reset();

        DisplayTodos();
    })

    DisplayTodos()
})

function DisplayTodos () {
    const todoList = document.querySelector('#todo_list');

    todoList.innerHTML = '';

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo_item');

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const constent = document.createElement('div');
        const actions  = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('baubble');

        if (todo.category == 'personal') {
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }

        constent.classList.add('todo_content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        constent.innerHTML = '<input type="text" value="${todo_content}" readonly>';
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoItem.appendChild(todoList);

        if (todo.done) {
            todoItem.classList.add('done');
        }

        input.addEventListener('click', e => {
            todo.done =e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todo));

            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }

            DisplayTodos();
        })

        edit.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todo));
                DisplayTodos();
            })
        })

        deleteButton.addEventListener('click', e => {
            todo = todos.filter(t => t !=todo);
            localStorage.setItem('todos', JSON.stringify(todo));
            DisplayTodos();
        })
    })
}
