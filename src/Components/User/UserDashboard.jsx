const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleUserButton = () => {
    console.log("btton click");
  };

  return (
    <div className=" my-10">
      <div className="container mx-auto flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>

          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded">
            My Orders
          </button>
        </div>
        <div>
          <button onclick={() => handleUserButton()}>User</button>
          <h3>Profile</h3>
          <h3>Stetting</h3>
          <h3>Sing Out</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
