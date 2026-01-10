import { Link } from "react-router-dom";
import "./singup.css";

function SingUp() {
  const handleSingUp = (e) => {
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
          <h2 className="text-center my-6">Sing Up</h2>
          <form onSubmit={() => handleSingUp()}>
            <span className="grid space-y-4">
              <input type="email" name="email" placeholder="Enter Your Email" />
              <input type="password" name="password" placeholder="Password" />
              <input
                type="password"
                name="password"
                placeholder="Confirm Password"
              />
            </span>
            <input
              type="submit"
              value="Sing Up"
              id="button"
              className="mt-4 text-xl"
            />
          </form>
        </div>
        <p>
          Are you Registration? Please Login Now{" "}
          <Link to="/login">Login Now</Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default SingUp;
