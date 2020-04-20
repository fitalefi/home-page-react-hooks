import React, { useState, useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

const initialTasksState = {
  tasks: [],
  completedTasks: [],
};

const TYPES = {
  ADD_TASK: 'ADD_TASK',
  COMPLETE_TASK: 'COMPLETE_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

const taskReducer = (state, action) => {
  console.log('state', state, 'action', action);
  const { type } = action;
  switch (type) {
    case TYPES.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.task],
      };
    case TYPES.COMPLETE_TASK:
      const { completedTask } = action;
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== completedTask.id),
        completedTasks: [...state.completedTasks, completedTask],
      };
    case TYPES.DELETE_TASK:
      return {
        ...state,
        completedTasks: state.completedTasks.filter(
          (t) => t.id !== action.deletedTaskId
        ),
      };
    default:
      return state;
  }
};

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
  const [state, dispatch] = useReducer(taskReducer, taskMap);
  const { tasks, completedTasks } = state;

  useEffect(() => storeTasks({ tasks, completedTasks }));

  const updateTaskTest = (event) => setTaskText(event.target.value);

  const addTask = () => {
    dispatch({ type: TYPES.ADD_TASK, task: { taskText, id: uuidv4() } });
    setTaskText('');
  };

  const completeTask = (completedTask) => () =>
    dispatch({ type: TYPES.COMPLETE_TASK, completedTask });

  const deleteTask = (deletedTaskId) => () =>
    dispatch({ type: TYPES.DELETE_TASK, deletedTaskId });

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
