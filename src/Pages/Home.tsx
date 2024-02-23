import React, { useState, ChangeEvent, useEffect } from "react";
import { TaskData } from "Helpers/Interfaces";

const Home = () => {
  const [taskNumber, setTaskNumber] = useState<number>(0);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskList, setTaskList] = useState<TaskData[]>([]);

  const changeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "task") {
      setTaskTitle(String(event.target.value));
    } else {
      setTaskNumber(Number(event.target.value));
    }
  };

  const addTaskHandler = () => {
    const newtask = {
      id: taskNumber,
      taskTitle,
    };

    const newTaskList = [...taskList, newtask];
    setTaskList(newTaskList);
    setTaskNumber(0);
    setTaskTitle("");

    localStorage.setItem("storedTasks", JSON.stringify(newTaskList));
  };

  // Function to delete an item from the list
  const deleteTaskHandler = (taskToDelete: TaskData) => {
    const updatedTasks = taskList.filter((task) => task.id !== taskToDelete.id);
    setTaskList(updatedTasks);
    localStorage.setItem("storedTasks", JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    const tasks = localStorage.getItem("storedTasks");
    if (tasks) {
      const getTasks = JSON.parse(tasks) || [];
      setTaskList(getTasks);
    }
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">To App</h1>
      <div className="d-flex align-items-center gap-2 my-4">
        <input
          className="form-control w-25"
          placeholder="Enter Serial Number"
          type="number"
          value={taskNumber}
          onChange={changeInputHandler}
          name="numb"
        />
        <input
          name="task"
          className="form-control"
          placeholder="Enter title"
          type="text"
          value={taskTitle}
          onChange={changeInputHandler}
        />
        <button className="btn btn-primary w-25" onClick={addTaskHandler}>
          Add Task
        </button>
      </div>
      <table className="table table-success table-striped">
        <thead>
          <tr>
            <th>Sl</th>
            <th>task</th>
            <th>Opration</th>
          </tr>
        </thead>
        <tbody>
          {taskList.map((task: TaskData, index: number) => {
            return (
              <tr key={index}>
                <td>{task.id}</td>
                <td>{task.taskTitle}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteTaskHandler(task);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
