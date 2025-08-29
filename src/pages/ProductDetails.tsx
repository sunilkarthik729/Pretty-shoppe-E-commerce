import { useParams } from "react-router-dom";
import products from "../data/products.json";

interface ProductDetailsProps{
        theme: "light" | "dark";
}

const ProductDetails: React.FC<ProductDetailsProps> = ({theme}) => {
  const { id } = useParams();
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return (
      <p className="text-center text-red-500 mt-10 text-lg font-semibold">
        ❌ Product not found
      </p>
    );
  }

  return (
       <div className={theme === "dark" ? "bg-black text-white" : "bg-white text-black"}>
        <div className="p-8 md:p-16 bg-gray-50 min-h-screen">
      <div className="grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-xl p-8">
        {/* Product Image */}
        <div className="flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="rounded-xl shadow-lg max-h-[450px] object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Category + Best Seller */}
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
                {product.category}
              </span>
              {product.bestSeller && (
                <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
                  ⭐ Best Seller
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>

            {/* Rating */}
            <p className="text-yellow-500 font-medium mt-2">
              {"⭐".repeat(Math.floor(product.rating))}{" "}
              <span className="text-gray-600 text-sm">
                ({product.rating.toFixed(1)})
              </span>
            </p>

            {/* Description */}
            <p className="text-gray-600 mt-4 leading-relaxed">
              {product.description}
            </p>

            {/* Pricing */}
            <div className="mt-6">
              <p className="text-2xl font-bold text-green-600">
                ₹{product.finalPrice}
              </p>
              <p className="text-sm text-gray-500 line-through">
                ₹{product.price}
              </p>
              <p className="text-sm text-red-500 font-semibold">
                {product.discount}% OFF
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
              Add to Cart
            </button>
            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Extra Content */}
      <div className="mt-12 bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Why choose this {product.type}?
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Premium quality fabric for lasting comfort.</li>
          <li>Perfect for {product.category === "Women" ? "daily wear and festive occasions" : "casual and office wear"}.</li>
          <li>Rated {product.rating}/5 by our happy customers.</li>
          <li>Now available at {product.discount}% discount (Save ₹{product.price - product.finalPrice}).</li>
        </ul>
      </div>
    </div>
       </div>
    
  );
}

export default ProductDetails;










