const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleUserButton = () => {
    console.log("btton click");
  };

  return (
    <div className="container mx-auto flex justify-between my-10">
      <div>
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>

        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded">
          My Orders
        </button>
      </div>
      <div>
        <button onclick={() => handleUserButton()}>User</button>
        <h2>Profile</h2>
        <h2>Stetting</h2>
        <h2>Sing Out</h2>
      </div>
    </div>
  );
};

export default Dashboard;
