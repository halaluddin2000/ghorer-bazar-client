import { products } from "../data/product";

const AllProducts = () => {
  return (
    <div className="container bg-white py-10">
      <h2 className="text-4xl font-semibold mb-6 py-16 text-center">
        ALL PRODUCT
      </h2>

      <div className="grid grid-cols-2 bg-white md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover mb-3"
            />

            <h3 className="font-semibold text-base">{product.name}</h3>
            <p className="text-sm text-gray-600">TK {product.price}</p>

            {/* {product.isBestSeller && (
              <span className="text-xs text-green-600">Best Seller</span>
            )} */}

            {/* {product.isOffer && (
              <span className="text-xs text-red-600 ml-2">Offer</span>
            )} */}
            <br />
            <div className="flex items-center justify-center ">
              <button className="btn-primary w-full">Quick Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
