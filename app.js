window.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
  
    // Update task count display
    function updateTaskCount() {
      const count = document.querySelectorAll('.task-item').length;
      document.getElementById('taskCount').textContent = `Tasks remaining: ${count}`;
    }
  
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
  
      if (taskText !== '') {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.textContent = taskText;
  
        const delBtn = document.createElement('button');
        delBtn.textContent = '❌';
        delBtn.addEventListener('click', () => {
          li.remove();
          updateTaskCount(); 
        });
  
        li.appendChild(delBtn);
        taskList.appendChild(li);
  
        taskInput.value = '';
  

        updateTaskCount();
      }
    });
  

    taskInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        addTaskBtn.click();
      }
    });
  

    updateTaskCount();
  });
  