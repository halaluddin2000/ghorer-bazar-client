import React from "react";
import Hero from "../Components/home/Hero";
import AllProducts from "./AllProducts";

function Home() {
  return (
    <>
      <Hero />
      <div className="pb-20 bg-white">
        <AllProducts />
      </div>
    </>
  );
}

export default Home;
