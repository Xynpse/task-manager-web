window.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
  
    loadTasks();
  

    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        addTaskToDOM(taskText);
        saveTasks();
        taskInput.value = '';
      }
    });


    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTaskToDOM(taskText);
            saveTasks();
            taskInput.value = '';
        }
        }
    });
  

    function addTaskToDOM(taskText) {
      const li = document.createElement('li');
      li.className = 'task-item';
      li.textContent = taskText;
  
      const delBtn = document.createElement('button');
      delBtn.textContent = '❌';
      delBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
      });
  
      li.appendChild(delBtn);
      taskList.appendChild(li);
    }
  

    function saveTasks() {
      const tasks = [];
      document.querySelectorAll('.task-item').forEach(item => {
        tasks.push(item.firstChild.textContent.trim());
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(taskText => {
        addTaskToDOM(taskText);
      });
    }
  });
  