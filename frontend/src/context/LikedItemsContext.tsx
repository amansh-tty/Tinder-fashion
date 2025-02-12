import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface LikedItemsContextType {
  likedItems: number[];
  toggleLike: (id: number) => void;
}

const LikedItemsContext = createContext<LikedItemsContextType | undefined>(undefined);

export function LikedItemsProvider({ children }: { children: ReactNode }) {
  const [likedItems, setLikedItems] = useState<number[]>([]);

  useEffect(() => {
    const storedLikedItems = localStorage.getItem("likedItems");
    if (storedLikedItems) {
      setLikedItems(JSON.parse(storedLikedItems));
    }
  }, []);

  const toggleLike = (id: number) => {
    setLikedItems((prevLiked) => {
      const newLikedItems = prevLiked.includes(id) ? prevLiked.filter((item) => item !== id) : [...prevLiked, id];
      localStorage.setItem("likedItems", JSON.stringify(newLikedItems));
      return newLikedItems;
    });
  };

  return <LikedItemsContext.Provider value={{ likedItems, toggleLike }}>{children}</LikedItemsContext.Provider>;
}

export function useLikedItems() {
  const context = useContext(LikedItemsContext);
  if (!context) {
    throw new Error("useLikedItems must be used within a LikedItemsProvider");
  }
  return context;
}
