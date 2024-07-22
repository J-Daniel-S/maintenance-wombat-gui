import React from "react";

const Locations = (props) => {

  let id = 0;
  const locations = [
    // will have to integrate id into messages received from the back end
    { location: 'San Antonio', id: ++id},
    { location: 'Fort Worth', id: ++id},
    { location: 'Abilene', id: ++id},
    { location: 'Lubbock', id: ++id},
    { location: 'Amarillo', id: ++id},
    { location: 'McAllen', id: ++id},
    { location: 'Sugarland', id: ++id},
  ]

  const changed = location => {
    props.setLocationState(location);
  }

  return (
    <React.Fragment>
      <section className="col s4">
        <div className="card hoverable">
          <section className="card-margin">
            <span className="card-title">Locations</span>
            <form action="#" className="location-card">
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
          </section>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Locations;
