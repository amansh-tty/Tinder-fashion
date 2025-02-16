import { useEffect, useState } from "react";
import { getSimilarProducts, Product } from "../../../backend/src/utils/recommendation";
import { getUserLikedProducts } from "../utils/storage";



// Removed redundant Product type definition

type Props = {
  allProducts: Product[];
};

const Recommendations = ({ allProducts }: Props) => {
  const [recommended, setRecommended] = useState<Product[]>([]);

  useEffect(() => {
    const likedProductIds = getUserLikedProducts();
    setRecommended(getSimilarProducts(likedProductIds, allProducts));
  }, [allProducts]);

  return (
    <div>
      <h2>Recommended for You</h2>
      <div className="grid">
        {recommended.map((product) => (
          <div key={product.id} className="card">
            <img src={product.imageUrl[0]} alt="{product.name}" />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
