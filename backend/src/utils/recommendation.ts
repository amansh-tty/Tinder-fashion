export interface Product {
    id: string;
    tags: string[];
    name:string[];
    imageUrl:string[];
    price:string[]
}

export const getSimilarProducts = (likedProductIds: string[], allProducts: Product[]): Product[] => {
    const likedProducts = allProducts.filter((p) => likedProductIds.includes(p.id));
    const recommendedProducts: Product[] = [];

    likedProducts.forEach((likedProduct) => {
        allProducts.forEach((product) => {
            if (product.id !== likedProduct.id) {
                const commonTags = product.tags.filter((tag) => likedProduct.tags.includes(tag));
                if (commonTags.length > 1) {
                    recommendedProducts.push(product);
                }
            }
        });
    });

    return recommendedProducts;
};
  