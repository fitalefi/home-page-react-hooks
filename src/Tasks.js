import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TASKS_STORAGE_KEY = 'TASKS_STORAGE_KEY';

const storeTasks = (taskMap) =>
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(taskMap));

const readStorageTasks = () => {
  const { tasks, completedTasks } = JSON.parse(
    localStorage.getItem(TASKS_STORAGE_KEY)
  );
  return { tasks: tasks || [], completedTasks: completedTasks || [] };
};

const Tasks = () => {
  const [taskText, setTaskText] = useState('');
  const taskMap = readStorageTasks();
  const [tasks, setTasks] = useState(taskMap.tasks);
  const [completedTasks, setCompletedTasks] = useState(taskMap.completedTasks);

  useEffect(() => storeTasks({ tasks, completedTasks }));

  const updateTaskTest = (event) => setTaskText(event.target.value);

  const addTask = () => {
    setTasks([...tasks, { taskText, id: uuidv4() }]);
    setTaskText('');
  };

  const completeTask = (completedTask) => () => {
    setCompletedTasks([...completedTasks, completedTask]);
    setTasks(tasks.filter((task) => task.id !== completedTask.id));
  };

  const deleteTask = (deletedTaskId) => () => {
    setCompletedTasks(completedTasks.filter(({ id }) => id !== deletedTaskId));
  };

  return (
    <div>
      <h3>Tasks</h3>
      <div className='form'>
        <input value={taskText} onChange={updateTaskTest} />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className='task-list'>
        {tasks.map((task) => {
          const { id, taskText } = task;
          return (
            <div key={id} onClick={completeTask(task)}>
              {taskText}
            </div>
          );
        })}
      </div>
      <div className='completed-list'>
        {completedTasks.map((task) => {
          const { id, taskText } = task;
          return (
            <div key={id}>
              {taskText}{' '}
              <span className='delete-task' onClick={deleteTask(id)}>
                x
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tasks;
