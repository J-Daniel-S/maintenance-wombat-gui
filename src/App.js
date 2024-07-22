import React, { useState, useEffect, useRef } from "react";
import Maintainer from "./pages/maintainer";
import Login from "./pages/login";
import Header from "./components/header";
import M from "materialize-css";
import Requester from "./pages/requester";
import "./App.css"
import "materialize-css/dist/css/materialize.css";
import "materialize-css/dist/js/materialize.js";

const Home = () => {
  const TASK_WS_URL = "ws://localhost:8080/maintenance-wombat";
  const WS_URL = "ws://localhost:8080/wombat-users";
  const [loginState, setLoginState] = useState(true);
  const [maintainerState, setMaintainerState] = useState(true);
  const [taskMessageState, setTaskMessageState] = useState([]);
  const [locationState, setLocationState] = useState("");
  const [usernameState, setUsernameState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [userState, setUserState] = useState();
  const [initialMaintenanceRequestState, setMaintenanceInitialRequestState] =
    useState(false);

  const userSocketRef = useRef(null);
  const taskSocketRef = useRef(null);
  const loginButtonRef = useRef(null);
  const hasSocketBeenSetUp = useRef(false);
  const hasTaskSocketBeenSetUp = useRef(false);
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const tasksRef = useRef([]);

  useEffect(() => {
    if (userState) {
      if (userState.userType === "MAINTENANCE") {
        setMaintainerState(true);
      } else {
        setMaintainerState(false);
      }
      setLoginState(false); // Set login state to false after successful login
    }

    if (typeof window !== "undefined") {
      const handleKeyDown = (event) => {
        if (event.key === "Enter" && loginButtonRef.current !== null) {
          loginButtonRef.current.click();
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [userState]);

  const updateUsernameText = (event) => {
    setUsernameState(event.target.value);
  };

  const updatePasswordText = (event) => {
    setPasswordState(event.target.value);
  };

  const setupUsersocket = () => {
    if (!hasSocketBeenSetUp.current) {
      const socket = new WebSocket(WS_URL);
      userSocketRef.current = socket;
      hasSocketBeenSetUp.current = true;

      socket.addEventListener("open", () => {
        console.log("user connection established");
      });

      socket.addEventListener("message", (event) => {
        let response = JSON.parse(event.data);

        console.log("Received - \n" + JSON.stringify(response));

        if (response.message !== "200") {
          if (response.message === "204") {
            let message = `User ` + usernameState + ` does not exist!`;
            M.toast({ html: message });
          } else {
            M.toast({ html: "password incorrect!" });
          }
        } else {
          setUserState(response.user);
          if (response.user.userType === "STANDARD") {
            setupTaskSocket();
          }
        }
      });

      socket.addEventListener("error", (event) => {
        console.error("WebSocket error:", event);
        setTimeout(M.toast({ html: "Error reaching server.  Please contact administration" }), 10000);
      });

      return () => {
        socket.close();
      };
    }
  };

  const sendUser = (user) => {
    document.body.style.cursor = 'default';
    userSocketRef.current.send(JSON.stringify(user));
    console.log(user.userType);
  };

  const login = () => {
    setupUsersocket();
    if (usernameState !== "" && passwordState !== "") {
      let user = {
        name: usernameState,
        password: passwordState,
      };
      if (userSocketRef.current) {
        if (userSocketRef.current.readyState === WebSocket.OPEN) {
          if (userSocketRef) usernameRef.current = usernameState;
          passwordRef.current = passwordState;
          sendUser(user);
        } else {
          userSocketRef.current.addEventListener("open", () => {
            document.body.style.cursor = "wait";
            sendUser(user);
          });
        }
      }
    } else {
      M.toast({ html: "Enter some creds before trying to login!" });
    }
  };

  // Edits the location string to normal formatting
  const fixLocation = (loc) => {
    let string = "";
    for (let c of loc) {
      let ch = c.toLowerCase();
      string += ch;
    }
    // this line of code may need updated if new locations are added
    if (string.charAt(0) === "m" && string.charAt(2) === "a")
      string = "mcAllen";
    return string.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const processTaskMessage = (tasks) => {
    tasks.map((t) => (t.location = fixLocation(t.location)));
    console.log(tasks);
  };

  const setupTaskSocket = () => {
    if (!hasTaskSocketBeenSetUp.current) {
      const socket = new WebSocket(TASK_WS_URL);
      taskSocketRef.current = socket;
      hasTaskSocketBeenSetUp.current = true;

      socket.addEventListener("open", () => {
        console.log("task connection established");
      });

      socket.addEventListener("message", (event) => {
        setTaskMessageState((prevMessages) => [...prevMessages, event.data]);
        let response = JSON.parse(event.data);
        processTaskMessage(response);
        tasksRef.current = [...response];
      });

      socket.addEventListener("error", (event) => {
        console.error("Task Socket Error:", event);
      });

      return () => {
        socket.close();
      };
    }
  };

  const getTasks = () => {
    setupTaskSocket();
    /*
      TODO - update socket on the backend to send a bad request response if an error is thrown
      change response: add 'status' with number and change 'message' to an explanation
    */
    let request = {
      task: {
        name: "request",
        prio: "low",
        location: "san antonio",
        kind: "other",
      },
      type: "getall",
    };

    if (taskSocketRef.current) {
      if (taskSocketRef.current.readyState === WebSocket.OPEN) {
        taskSocketRef.current.send(JSON.stringify(request));
      } else {
        taskSocketRef.current.addEventListener("open", () => {
          taskSocketRef.current.send(JSON.stringify(request));
        });
      }
    }
  };

  const logout = () => {
    setLoginState(true);
    setMaintainerState(true);
    setTaskMessageState([]);
    setLocationState("");
    setUsernameState("");
    setPasswordState("");
    setUserState();
    setMaintenanceInitialRequestState(false);

    hasSocketBeenSetUp.current = false;
    hasTaskSocketBeenSetUp.current = false;
    userSocketRef.current = null;
    taskSocketRef.current = null;
    usernameRef.current = "";
    passwordRef.current = "";
    tasksRef.current = [];
  };

  return (
    <main className="main">
      <Header maintainerState={maintainerState} loginState={loginState} />
      {loginState && (
        <Login
          updateUsernameText={updateUsernameText}
          updatePasswordText={updatePasswordText}
          usernameState={usernameState}
          passwordState={passwordState}
        />
      )}
      {!loginState &&
        (maintainerState ? (
          <Maintainer
            socket={taskSocketRef.current}
            messageState={taskMessageState}
            locationState={locationState}
            getTasks={getTasks}
            tasksState={tasksRef.current}
            initialRequestState={initialMaintenanceRequestState}
            setInitialRequestState={setMaintenanceInitialRequestState}
            userState={userState}
            setLocationState={setLocationState}
          />
        ) : (
          <Requester socket={taskSocketRef.current} userState={userState} />
        ))}
      {loginState && (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          ref={loginButtonRef}
          onClick={() => login()}
          className="waves-effect waves-teal btn-flat logout-button"
        >
          Login
        </a>
      )}
      {!loginState && (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          onClick={() => logout()}
          className="waves-effect waves-teal btn-flat logout-button"
        >
          Logout
        </a>
      )}
    </main>
  );
};

export default Home;
