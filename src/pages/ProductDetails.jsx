import { useParams } from "react-router-dom";
import { products } from "../data/product";
import Navbar from "../Components/Common/Navbar";

function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <p>Product not found</p>;
  return (
    <div>
      <Navbar />
      <div className="flex mx-auto bg-white">
        <div>
          <img src={product.image} alt="" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl my-4">৳ {product.price}</p>
          <p className="mb-6">Category: {product.category}</p>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
