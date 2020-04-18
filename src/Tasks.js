import React, { useState } from 'react';

const Tasks = () => {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const updateTaskTest = (event) => setTaskText(event.target.value);

  const addTask = () => {
    setTasks([...tasks, taskText]);
    setTaskText('');
  };

  console.log(tasks);

  return (
    <div>
      <h3>Tasks</h3>
      <div className='form'>
        <input value={taskText} onChange={updateTaskTest} />
        <button onClick={addTask}>Add Task</button>
      </div>
    </div>
  );
};

export default Tasks;
