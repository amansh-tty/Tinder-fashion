import { client } from "./api/client"
import { useEffect } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Routes, Route } from "react-router-dom";
import { StoreList } from "./components/store-list";
import { ProductSwiper } from "./components/product-swiper";
import { StoreDetails } from "./components/store-details";
import { Navbar } from "./components/navbar";
import { LikedItems } from "./components/liked-items";
import { InfluencerProfile } from "./components/influencer-profile";
import { UserProfile } from "./components/user-profile";
import { LikedItemsProvider } from "./context/LikedItemsContext";
import { InfluencerList } from "./components/influencer-list";
import { UserResource } from "@clerk/types";

const syncUserToBackend = async (clerkUser: UserResource) => {
  if (!clerkUser) return;

  try {
    const { data } = await client.post("/auth/signin", {
      clerkId: clerkUser.id,
      email: clerkUser.primaryEmailAddress?.emailAddress,
      name: clerkUser.fullName,
    });

    console.log("User synced:", data);
  } catch (error) {
    console.error("Error syncing user:", error);
  }
};

function App() {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      syncUserToBackend(user);
    }
  }, [isSignedIn, user]);

  return (
    <LikedItemsProvider>
      <Navbar />

      <div className="mt-16 px-4">
        {/* If user is NOT signed in, show Sign-In button */}
        <SignedOut>
          <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Welcome to Our Fashion Discovery App</h1>
              <SignInButton />
            </div>
          </div>
        </SignedOut>

        {/* If user is signed in, sync their data and show the app */}
        <SignedIn>
          {/* <div className="flex justify-end p-4">
            <UserButton />
          </div> */}

          <Routes>
            <Route path="/" element={<ProductSwiper />} />
            <Route path="/liked-products" element={<LikedItems />} />
            <Route path="/stores" element={<StoreList />} />
            <Route path="/influencers" element={<InfluencerList />} />
            <Route path="/influencers/:id" element={<InfluencerProfile />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/stores/:id" element={<StoreDetails />} />
          </Routes>
        </SignedIn>
      </div>
    </LikedItemsProvider>
  );
}

export default App;
