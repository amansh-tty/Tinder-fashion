import { useEffect, useState } from "react";
import { getTrendingProducts } from "../utils/storage";

type Product = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
};

type Props = {
  allProducts: Product[];
};

const TrendingProducts = ({ allProducts }: Props) => {
  const [trending, setTrending] = useState<Product[]>([]);

  useEffect(() => {
    setTrending(getTrendingProducts(allProducts));
  }, [allProducts]);

  return (
    <div>
      <h2>Trending Now</h2>
      <div className="grid">
        {trending.map((product) => (
          <div key={product.id} className="card">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
