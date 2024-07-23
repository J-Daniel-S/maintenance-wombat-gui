import React, { useState, useEffect } from "react";

import Locations from "../components/requester/locations";
import Type from "../components/requester/type";
import Priority from "../components/requester/priority";
import Description from "../components/requester/rDescription";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

const Requester = (props) => {
  const [descriptionState, setDescriptionState] = useState("");
  const [prevDescriptionState, setPrevDescriptionState] = useState("");
  const [typeState, setTypeState] = useState("");
  const [locationState, setLocationState] = useState("");
  const [prioState, setPrioState] = useState("");
  const [buttonState, setButtonState] = useState(false);
  const [initialLengthWarning, setInitialLengthWarning] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined')
      document.body.style.cursor = 'default';
    if (!(prioState === "" || typeState === "" || locationState === "" || descriptionState.length === 0)) {
      setButtonState(true);
    }
  }, [prioState, locationState, typeState, descriptionState]);

  const updateDescriptionText = (event) => {
    if (descriptionState.length <= 50) {
      if (descriptionState.length < 5) 
        setButtonState(false);
      else
        setButtonState(true);
      setPrevDescriptionState(descriptionState);
      setDescriptionState(event.target.value);
    } else {
      setDescriptionState(prevDescriptionState);
      if (initialLengthWarning) {
        try {
          M.toast({ html: 'Max length 50 characters' });
        } catch (e) {

        }
        setInitialLengthWarning(false);
      }
    } 

  };

  const clearAll = () => {
    setTypeState("");
    setLocationState("");
    setPrioState("");
    setDescriptionState("");
  }

  const submit = () => {
    const request = {
      task: {
        name: descriptionState,
        prio: prioState,
        kind: typeState,
        location: locationState,
      },
      type: "addorupdate",
      requestingUser: props.userState.name,
    };

    console.log(JSON.stringify(request));

    props.socket.send(JSON.stringify(request));
    clearAll();
  };

  return (
    <React.Fragment>
      <main className="container">
        <article className="row">
          <Locations setLocationState={setLocationState} />
          <Type setTypeState={setTypeState} />
          <Priority setPrioState={setPrioState} />
        </article>
        <article className="row">
          <Description
            updateDescriptionText={updateDescriptionText}
            description={descriptionState}
            setDescriptionState={setDescriptionState}
            setButtonState={setButtonState}
          />
        </article>
        <article className="row">
          {buttonState ? (
            <button
              className="btn waves-effect waves-light blue hoverable"
              type="submit"
              name="action"
              onClick={() => submit()}
            >
              Submit
            </button>
          ) : (
            <button
              className="btn waves-effect waves-light blue hoverable"
              type="submit"
              name="action"
              onClick={() => submit()}
              disabled
            >
              Submit
            </button>
          )}
        </article>
      </main>
    </React.Fragment>
  );
};

export default Requester;
