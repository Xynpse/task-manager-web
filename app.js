window.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  function updateTaskCount() {
    const count = document.querySelectorAll('.task-item').length;
    document.getElementById('taskCount').textContent = `Tasks remaining: ${count}`;
  }

  function isDuplicateTask(taskText) {
    const taskItems = document.querySelectorAll('.task-item');
    const normalizedTaskText = taskText.toLowerCase().trim();

    for (let taskItem of taskItems) {
      const existingTaskText = taskItem.querySelector('span') ? taskItem.querySelector('span').textContent.toLowerCase().trim() : taskItem.textContent.toLowerCase().trim();
      if (existingTaskText === normalizedTaskText) {
        return true;
      }
    }
    return false;
  }

  function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.task-item span').forEach(span => {
      tasks.push(span.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => {
      const li = document.createElement('li');
      li.className = 'task-item';

      const span = document.createElement('span');
      span.textContent = taskText;
      li.appendChild(span);

      const delBtn = document.createElement('button');
      delBtn.textContent = '❌';
      delBtn.addEventListener('click', () => {
        li.remove();
        saveTasksToLocalStorage();
        updateTaskCount();
      });

      li.appendChild(delBtn);
      taskList.appendChild(li);
    });

    updateTaskCount();
  }

  addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      if (isDuplicateTask(taskText)) {
        alert('This task already exists in the list!');
        return;
      }

      const li = document.createElement('li');
      li.className = 'task-item';

      const span = document.createElement('span');
      span.textContent = taskText;
      li.appendChild(span);

      const delBtn = document.createElement('button');
      delBtn.textContent = '❌';
      delBtn.addEventListener('click', () => {
        li.remove();
        saveTasksToLocalStorage();
        updateTaskCount();
      });

      li.appendChild(delBtn);
      taskList.appendChild(li);

      taskInput.value = '';
      updateTaskCount();
      saveTasksToLocalStorage();
    }
  });

  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTaskBtn.click();
    }
  });

  // Load saved tasks on page load
  loadTasksFromLocalStorage();
});
