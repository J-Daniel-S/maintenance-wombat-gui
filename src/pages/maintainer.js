/* eslint-disable jsx-a11y/anchor-is-valid */
"use client";

import React, { useState, useEffect } from "react";
import Tasks from "../components/tasks";
import Description from "../components/maintainer/mDescription";

const Maintainer = (props) => {
  const [taskState, setTask] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedState, setSelectedState] = useState(false);
  const [filteredState, setFilteredState] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined')
      document.body.style.cursor = "default";
    setFilteredState(props.tasksState);

    if (props.locationState !== "") {
      setFilteredState(
        props.tasksState.filter((task) => task.location === props.locationState)
      );
    }

    if (props.categoryState !== "") {
        setFilteredState(filteredState.filter((task) => task.kind === props.categoryState.toUpperCase()));
    }

    if (props.initialRequestState === false) {
      props.getTasks();
      props.setInitialRequestState(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.messageState,
    props.tasksState,
    props.locationState,
    props.categoryState
  ]);

  const taskSelected = (t) => {
    setSelectedState(true);
    setTask(t);
    props.tasksState.forEach((task) => {
      if (task.id === t.id) {
        task.isSelected = true;
      }
    });
    setSelectedTaskId(t.id);
  };

  const clearSelection = () => {
    setSelectedState(false);
    setTask(null);
    const temp = props.tasksState.map((task) => ({ ...task }));
    temp.forEach((t) => {
      t.isSelected = false;
    });
    // props.setTasksState(temp);
    setSelectedTaskId(null);
  };

  const submit = () => {
    let task = {
      task: {
        id: taskState.id,
        name: taskState.name,
        prio: taskState.priority,
        kind: taskState.kind,
        location: taskState.location,
      },
      type: "delete",
      maintenanceUser: props.userState.name,
    };
    const toSend = JSON.stringify(task);
    console.log(toSend);
    // to replace with "receive and update" when connected to backend
    // removeTask();
    props.socket.send(toSend);
  };

  return (
    <React.Fragment>
      <section className="container">
        <br></br>
        <section>
          <Tasks
            setSelected={taskSelected}
            tasks={filteredState}
            task={taskState}
            selectedTaskId={selectedTaskId}
          />
        </section>
        {selectedState && (
          <div className="fade-in">
            <Description description={taskState.description} />
            <a className="right clear-button" onClick={clearSelection}>
              Clear Selection
            </a>
            <br></br>
          </div>
        )}
        {selectedState ? (
          <a onClick={() => submit()} className="btn-large amber">
            Accept Task
          </a>
        ) : (
          <a className="btn-large disabled">Accept Task</a>
        )}
      </section>
    </React.Fragment>
  );
};

export default Maintainer;
