import React from "react";

const Type = (props) => {

  let id = 0;
  const types = [
    // will have to integrate id into messages received from the back end
    { type: 'Electrical', id: ++id},
    { type: 'Plumbing', id: ++id},
    { type: 'IT', id: ++id},
    { type: 'Structural', id: ++id},
    { type: 'Cleanup', id: ++id},
    { type: 'Other', id: ++id},
  ]

  const changed = type => {
    props.setTypeState(type);
  }

  return (
    <React.Fragment>
      <section className="col s4">
        <div className="card hoverable">
          <section className="card-margin">
            <span className="card-title">Request Type</span>
            <form action="#" className="type-card">
              {types.map((t) => (
                 <p key={t.id}>
                 <label>
                   <input
                     className="with-gap"
                     name="group1"
                     type="radio"
                     onChange={() => changed(t.type)}
                     required
                   />
                   <span>{t.type}</span>
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

export default Type;
