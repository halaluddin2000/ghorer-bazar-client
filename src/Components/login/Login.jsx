import { Link } from "react-router-dom";
import "./login.css";
function Login() {
  const handleLogin = (e) => {
    e.preventDefault();
    const target = e.target;
    const loginData = {
      name: target.email.value,
      password: target.password.value,
    };
    console.log(loginData);
  };

  return (
    <div className="flex bg-white items-center justify-center mx-auto mb-10 ">
      <div className="form-container bg-slate-200">
        <div className="form">
          <h2 className="text-center my-6">Login Now</h2>
          <form onSubmit={() => handleLogin()}>
            <span className="grid space-y-4">
              <input type="email" name="email" placeholder="Enter Your Email" />
              <input type="password" name="password" placeholder="Password" />
            </span>
            <input
              type="submit"
              value="Login"
              id="button"
              className="mt-4 text-xl"
            />
          </form>
        </div>
        <p>
          Are you New? Please Sing Up{" "}
          <a>
            <Link to="/singUp">Sing Up</Link>
          </a>{" "}
        </p>
      </div>
    </div>
  );
}

export default Login;
