/* eslint-disable jsx-a11y/anchor-is-valid */
"use client";

import React, { useState, useEffect } from "react";
import Tasks from "../components/tasks";
import Description from "../components/maintainer/mDescription";

const Maintainer = (props) => {
  const [textState, setTextState] = useState("");
  const [taskState, setTask] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedState, setSelectedState] = useState(false);
  const [prevTasksState, setPrevState] = useState([]);
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

    if (props.initialRequestState === false) {
      props.getTasks();
      props.setInitialRequestState(true);
    }
  }, [
    props.messageState,
    props.tasksState,
    props.locationState,
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

  let id = 0;
  const locations = [
    // will have to integrate id into messages received from the back end
    { location: "All", id: ++id },
    { location: "San Antonio", id: ++id },
    { location: "Fort Worth", id: ++id },
    { location: "Abilene", id: ++id },
    { location: "Lubbock", id: ++id },
    { location: "Amarillo", id: ++id },
    { location: "McAllen", id: ++id },
    { location: "Sugarland", id: ++id },
  ];

  const changed = location => {
    if (location !== "All")
      props.setLocationState(location);
    else
      props.setLocationState("");
  };

  return (
    <React.Fragment>
      <section className="container">
        <br></br>
        <div className="row">
          <div className="card">
            <div className="card-content">
              <span className="card-title">Select Location</span>
              <form action="#">
                {locations.map((l) => (
                  <p key={l.id}>
                    <label>
                      <input
                        className="with-gap"
                        name="group1"
                        tag="radios"
                        type="radio"
                        onChange={() => changed(l.location)}
                        required
                      />
                      <span>{l.location}</span>
                    </label>
                  </p>
                ))}
              </form>
            </div>
          </div>
        </div>
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
