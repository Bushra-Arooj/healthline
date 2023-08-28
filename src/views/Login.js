import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import img from "../assets/img/health-line.png";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FormGroup, InputGroupAddon,
  InputGroupText,
  InputGroup,Input} from "reactstrap";
const Login = () => {
  const [Email, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const history = useHistory();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (Email === "") {
      setUsernameError("Username is required");
    }
    if (Password === "") {
      setPasswordError("Password is required");
    }
    // if (username && password) {
    //   history.push("/admin/dashboard");
    // }
    try {

      console.log(JSON.stringify({ Email, Password}));
      const response = await fetch('https://webservice.healthlineweb.com.pk/api/v2/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email, Password }),

      });
  console.log(response);
      if (response.ok) {
        const data = await response.json();
        const loginResult = data?.LoginResult?.ResponseCode;
  console.log(data,loginResult);
        switch (loginResult) {
          case '0000':
            history.push("/admin/dashboard");
            break;
          case '0001':
            alert('Invalid Email.');
            break;
          case '0010':
            alert('Error occurred.');
            break;
          default:
            console.log('Unknown response code:', loginResult);
        }
      } else {
        alert('Failed to log in. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container-fluid background">
      <div className="row vh-100 d-flex justify-content-center align-items-center">
        <div className="col-lg-6 col-md-8 col-xs-12 ">
          <div className="card shadow border-0">
            <div className="card-body">
            <div className="mb-3 mt-md-4 ">
                <div className="mx-auto ">
            <div className="justify-content-center text-center ">
                  <h2 className="fw-bold align-items-center justify-content-center img-fluid"><img src={img} width={250} height={60}/></h2>
                  <p className=" text-muted text-center mt-2 mb-5 ">Please enter your login and password!</p>
                  </div>
                  </div>
                  </div>

              {/* <h3 className="card-title text-center">Login</h3> */}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label>Username</label>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    <FontAwesomeIcon icon={faEnvelope} />
                    </InputGroupText>
                  </InputGroupAddon>
                 
                  <input
                    type="text"
                    className={`form-control ${
                      usernameError ? "is-invalid" : ""
                    }`}
                    value={Email}
                    onChange={handleUsernameChange}
                  />
                  {usernameError && (
                    <div className="invalid-feedback">{usernameError}</div>
                  )}
                  </ InputGroup >
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    <FontAwesomeIcon icon={faLock} />
                    </InputGroupText>
                  </InputGroupAddon>
                  <input
                    type="password"
                    className={`form-control ${
                      passwordError ? "is-invalid" : ""
                    }`}
                    value={Password}
                    onChange={handlePasswordChange}
                  />
                  {passwordError && (
                    <div className="invalid-feedback">{passwordError}</div>
                  )}
                  </InputGroup>
                </div>
                <button type="submit" className="btn btn-primary btn-block my-5">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
