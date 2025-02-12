import { StoreList } from "./components/store-list";
import { ProductSwiper } from "./components/product-swiper";
import { StoreDetails } from "./components/store-details";
import { Navbar } from "./components/navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { LikedItems } from "./components/liked-items";
import { InfluencerProfile } from "./components/influencer-profile";
import { UserProfile } from "./components/user-profile";
import { LikedItemsProvider } from "./context/LikedItemsContext"; // Import the provider
import { InfluencerList } from "./components/influencer-list";

function App() {
  return (
    <Router>
      <LikedItemsProvider>
        <Navbar />
        <div className="mt-16 px-4"> 
          <Routes>
            <Route path="/" element={<ProductSwiper />} />
            <Route path="/liked" element={<LikedItems />} />
            <Route path="/stores" element={<StoreList />} />
            <Route path="/influencers" element={<InfluencerList />} />
            <Route path="/influencers/:id" element={<InfluencerProfile />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/stores/:id" element={<StoreDetails />} />
          </Routes>
        </div>
      </LikedItemsProvider>
    </Router>
  );
}

export default App;
