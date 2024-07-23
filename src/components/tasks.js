/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";

const Tasks = (props) => {
  useEffect(() => {
  }
  , [props.setSelected, props.task]);
  
  const clicked = t => {
    props.setSelected(t);
  };

  

  return (
    <main className="collection">
      {props.tasks.length !== 0 ? props.tasks.map((t) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          key={t.id}
          className={props.selectedTaskId === t.id ? "collection-item a-badge amber lighten-5" : "collection-item a-badge" }
          onClick={() => clicked(t)}
        >
          {t.location} : {t.name} <span className="badge">{t.kind}: Priority {t.prio}</span>
        </a>
      )): <a className= "collection-item a-badge">No tasks meet selected criteria</a>}
    </main>
  );
};

export default Tasks;
