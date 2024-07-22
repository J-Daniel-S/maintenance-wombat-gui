import React from "react";

const Priority = (props) => {

  let id = 0;
  const prios = [
    { prio: 'High', id: ++id},
    { prio: 'Medium', id: ++id},
    { prio: 'Low', id: ++id},
  ]

  const onChange = prio => {
    props.setPrioState(prio);
  }

  return (
    <React.Fragment>
      <section className="col s4">
        <div className="card hoverable">
          <section className="card-margin">
            <span className="card-title">Priority</span>
            <form action="#" className="priority-card">
              {prios.map((p) => (
                 <p key={p.id}>
                 <label>
                   <input
                     className="with-gap"
                     name="group1"
                     tag="radios"
                     type="radio"
                     onChange={() => onChange(p.prio)}
                     required
                   />
                   <span>{p.prio}</span>
                 </label>
               </p>
              ))}
            </form>
          </section>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Priority;
