type Product = {
    id: string;
    name: string;
  };
  
  const ShareProduct = ({ product }: { product: Product }) => {
    const handleShare = () => {
      if (navigator.share) {
        navigator
          .share({
            title: product.name,
            text: `Check out this ${product.name}!`,
            url: `https://fashionnext.com/product/${product.id}`,
          })
          .then(() => console.log("Shared successfully"))
          .catch((error) => console.log("Error sharing", error));
      } else {
        alert("Sharing not supported on this device.");
      }
    };
  
    return <button onClick={handleShare}>Share</button>;
  };
  
  export default ShareProduct;
  