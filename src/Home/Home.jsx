import React, { useState, useEffect } from "react";
import "./Home.css";
import { FaListCheck } from "react-icons/fa6";
import { GrCompliance } from "react-icons/gr";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteSweep } from "react-icons/md";

const Home = () => {
  let [taskName, setTaskName] = useState("");
  let [tasks, setTasks] = useState([]);
  let [editTaskBox, setEditTaskBox] = useState(false);
  let [css, setCss] = useState(true);
  let [editVal, setEditVal] = useState(null);
  let [indexVal, setIndexVal] = useState(null);

  useEffect(() => {
    let storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  function addTask() {
    if (taskName === "") {
      return alert("Add your task");
    }
    const newTask = {
      id: Date.now(),
      name: taskName,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskName("");
  }

  function updateFun() {
    if (editVal === "") {
      return alert("Cannot pass empty task");
    }
    let updatedTasks = [...tasks];
    updatedTasks[indexVal].name = editVal;

    setTasks(updatedTasks);
    setEditTaskBox(false);
    setCss(true);
    setEditVal("");
    setIndexVal(null);
  }

  function deleteAllTask() {
    setTasks([]);
    localStorage.removeItem("tasks");
  }

  function deleteTask(id) {
    let updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  // function completeFun(id) {
  //   let completeTask = tasks.map((val) => {
  //     if (!val.id == id) {
  //       return tasks;
  //     }
  //     return { ...tasks, completed: true };
  //   });
  //   return setTasks(completeTask);
  // }
  return (
    <div>
      <div className={css ? "parentContainer" : "parentContainer2"}>
        <div className="todoparent">
          <div className="head">
            <h1>
              To-Do-List
              <span>
                <FaListCheck />
              </span>
            </h1>
            <div className="addTask">
              <input
                autoFocus
                type="text"
                placeholder="Write Your Task"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
              <button onClick={addTask}> Add Task</button>
            </div>
          </div>
          <div className="listParent">
            {tasks.map((task, index) => {
              return (
                <div className="listItem" key={task.id}>
                  <span className="compTask">
                    <GrCompliance />
                  </span>
                  <h3>{task.name}</h3>
                  <div className="editOpts">
                    <span
                      className="editTask"
                      onClick={() => {
                        setEditVal(task.name);
                        setIndexVal(index);
                        setEditTaskBox(!editTaskBox);
                        setCss(!css);
                      }}>
                      <RiEdit2Fill />
                    </span>
                    <span
                      className="deleteTask"
                      onClick={() => deleteTask(task.id)}>
                      <MdDeleteSweep />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="deleteAllTask">
            <button onClick={deleteAllTask}>Delete All Tasks</button>
          </div>
        </div>
      </div>

      {editTaskBox && (
        <div className="editParent">
          <div className="editHead">
            <h4>Update Your Task</h4>
          </div>
          <div className="editInput">
            <input
              autoFocus
              value={editVal || ""}
              type="text"
              onChange={(e) => setEditVal(e.target.value)}
            />
          </div>
          <div className="editSaveBtns">
            <button className="updateBtn" onClick={updateFun}>
              Update
            </button>
            <button
              className="clsBtn"
              onClick={() => {
                setEditTaskBox(!editTaskBox);
                setCss(!css);
              }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
