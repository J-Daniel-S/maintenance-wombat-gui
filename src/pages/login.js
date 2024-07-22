import React, { useEffect, useRef } from "react";

const Login = (props) => {
 const loginRef = useRef(null);
  
  useEffect(() => {
    const ele = loginRef.current;
    if (ele) 
      ele.focus();
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
                ref={loginRef}
                placeholder="some-email@company.com"
                id="username"
                type="text"
                className="validate"
                onChange={props.updateUsernameText}
                value={props.usernameState}
              />
              <label htmlFor="first_name">Username</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="password"
                type="password"
                className="validate"
                placeholder="McGillicudy"
                onChange={props.updatePasswordText}
                value={props.passwordState}
              />
              <label htmlFor="last_name">Password</label>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
