import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Call backend logout
        await api.post("/auth/logout", null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } catch (err) {
        console.error("Logout API error:", err.response?.data || err);
      } finally {
        // Clear local storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Redirect to login
        navigate("/login");
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-medium">Logging out...</p>
    </div>
  );
}

export default Logout;
