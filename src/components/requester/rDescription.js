/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";

const Description = (props) => {

  useEffect(() => {
  }, []);

  const clear = () => {
    props.setDescriptionState("");
    props.setButtonState(false);
  }

  return (
    <React.Fragment>
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <textarea id="textarea1" className="materialize-textarea" data-length="50" onChange={props.updateDescriptionText} value={props.description}></textarea>
              <label for="textarea1">Description</label>
            </div>
          </div>
        </form>
        <a className="right clear-button" onClick={clear}>Clear</a>
    </React.Fragment>
  );
};

export default Description;
