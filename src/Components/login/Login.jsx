import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;

    const data = {
      phone: form.phone.value,
      password: form.password.value,
    };

    try {
      const res = await api.post("/auth/login", data);

      if (res.data.result === true) {
        //  token save
        localStorage.setItem("token", res.data.access_token);

        //  user save
        localStorage.setItem("user", JSON.stringify(res.data.user));

        //  dashboard redirect
        navigate("/user-dashboard");
      }
    } catch (err) {
      alert("Invalid phone or password");
      console.log(err.response?.data);
    }
  };

  return (
    <div className="flex bg-white items-center justify-center mx-auto mb-10">
      <div className="form-container bg-slate-200">
        <div className="form">
          <h2 className="text-center my-6">Login Now</h2>

          <form className="form" onSubmit={handleLogin}>
            <input name="phone" placeholder="Phone" />
            <input name="password" type="password" placeholder="Password" />

            <button className="button mt-4" type="submit">
              Login
            </button>
          </form>
        </div>

        <p className="mt-3 text-center">
          Are you New?{" "}
          <Link className="text-blue-500 font-medium" to="/singUp">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
