const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>

      <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded">
        My Orders
      </button>
    </div>
  );
};

export default Dashboard;
