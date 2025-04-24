window.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  // Fetch tasks from the server when the page loads
  async function fetchTasks() {
    try {
      const response = await fetch('http://localhost:5000/tasks');
      const tasks = await response.json();
      tasks.forEach(task => {
        addTaskToList(task._id, task.text); // Assuming task has an id and text
      });
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  }

  // Add a new task to the list
  async function addTaskToList(id, taskText) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = id; // Add task ID to li

    const span = document.createElement('span');
    span.textContent = taskText;
    li.appendChild(span);

    const delBtn = document.createElement('button');
    delBtn.textContent = '❌';
    delBtn.addEventListener('click', async () => {
      try {
        // Send DELETE request to server to delete task
        await fetch(`http://localhost:5000/tasks/${id}`, {
          method: 'DELETE',
        });
        
        // Remove task from the UI
        li.remove();
        updateTaskCount();
      } catch (err) {
        console.error('Failed to delete task:', err);
      }
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
    updateTaskCount();
  }

  // Function to update task count
  function updateTaskCount() {
    const count = document.querySelectorAll('.task-item').length;
    document.getElementById('taskCount').textContent = `Tasks remaining: ${count}`;
  }

  // Check if the task is a duplicate
  async function isDuplicateTask(taskText) {
    try {
      const response = await fetch('http://localhost:5000/tasks');
      const tasks = await response.json();
      const normalizedTaskText = taskText.toLowerCase().trim();
      return tasks.some(task => task.text.toLowerCase().trim() === normalizedTaskText);
    } catch (err) {
      console.error('Error checking for duplicates:', err);
      return false;
    }
  }

  // Add task when button is clicked
  addTaskBtn.addEventListener('click', async () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      if (await isDuplicateTask(taskText)) {
        alert('This task already exists in the list!');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: taskText }),
        });
        const task = await response.json();
        addTaskToList(task._id, task.text);
      } catch (err) {
        console.error('Failed to add task:', err);
      }
      taskInput.value = '';
    }
  });

  // Add task when "Enter" key is pressed
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTaskBtn.click();
    }
  });

  // Initialize the task list when the page loads
  fetchTasks();
});
