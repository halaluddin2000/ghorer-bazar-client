import ComboProducts from "../Components/ComboProducts";
import Hero from "../Components/home/Hero";
import AllProducts from "./AllProducts";

function Home() {
  return (
    <>
      <Hero />
      <div className="pb-20 bg-white">
        <AllProducts />
        <ComboProducts />
      </div>
    </>
  );
}

export default Home;
