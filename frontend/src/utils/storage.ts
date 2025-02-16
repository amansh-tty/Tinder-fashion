export const getUserLikedProducts = (): string[] => {
    return JSON.parse(localStorage.getItem("likedProducts") || "[]");
  };
  
  export const storeUserPreference = (productId: string) => {
    const likedProducts = getUserLikedProducts();
    if (!likedProducts.includes(productId)) {
      likedProducts.push(productId);
      localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
    }
  };
  
  export const storeQuizAnswers = (answers: Record<string, string | number | boolean>) => {
    localStorage.setItem("userProfile", JSON.stringify(answers));
  };
  
  export const getTrendingProducts = (allProducts: { id: string }[]) => {
    const productLikes = JSON.parse(localStorage.getItem("productLikes") || "{}");
    return allProducts
      .filter((product) => productLikes[product.id] > 5)
      .sort((a, b) => productLikes[b.id] - productLikes[a.id])
      .slice(0, 10);
  };
  