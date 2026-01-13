import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./singup.css";

function SingUp() {
  const navigate = useNavigate();

  const handleSingUp = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData();
    formData.append("name", form.name.value);
    formData.append("phone", form.phone.value);
    formData.append("password", form.password.value);
    formData.append("password_confirmation", form.password.value);

    try {
      const res = await api.post("/auth/signup", formData);

      console.log("Signup:", res.data);

      if (res.data.result === true) {
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/user-dashboard");
      } else {
        alert(res.data.message.join(", "));
      }
    } catch (err) {
      console.log(err.response?.data);
      alert("Signup failed");
    }
  };

  return (
    <div className="flex bg-white items-center justify-center mx-auto mb-8">
      <div className="form-container bg-slate-200">
        <h2 className="text-center my-6">Sign Up</h2>

        <form className="form" onSubmit={handleSingUp}>
          <input name="name" placeholder="Name" required />
          <input name="phone" placeholder="017xxxxxxxx" required />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <button className="button" type="submit">
            Sign Up
          </button>
        </form>

        <p className="mt-4 font-medium text-center">
          Your are already registered?
          <Link to="/login" className="text-blue-500 ml-2 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SingUp;
