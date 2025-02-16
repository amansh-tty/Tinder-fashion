import { useState } from "react";
import { Heart, User, Menu } from "lucide-react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 px-4 py-3">
        <div className="container mx-auto flex justify-between items-center">
          {/* Brand Name */}
          <a href="/" className="text-xl font-bold">FashionSwipe</a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={24} />
          </button>

          {/* failed ot retrieve rows from table
          invalid input syntax for type integer */}

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <NavItem href="/" text="Discover" />

            <NavItem href="/liked-products" text="Liked" icon={<Heart size={16} />} />
            <NavItem href="/brand-grid" text="Brands" />

            {/* <NavItem href="/stores" text="Stores" icon={<MapPin size={16} />} /> */}
            {/* <NavItem href="/influencers" text="Influencers" icon={<Users size={16} />} /> */}
            <NavItem href="/profile" text="Profile" icon={<User size={16} />} />
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md rounded-lg mt-2">
            <NavItem href="/" text="Discover" isMobile />
            <NavItem href="/liked-products" text="Liked" icon={<Heart size={16} />} isMobile />
            {/* <NavItem href="/stores" text="Stores" icon={<MapPin size={16} />} isMobile /> */}
            {/* <NavItem href="/influencers" text="Influencers" icon={<Users size={16} />} isMobile /> */}
            <NavItem href="/profile" text="Profile" icon={<User size={16} />} isMobile />
          </div>
        )}
      </nav>

      {/* Page Content with margin below the navbar */}
    
    </>
  );
}

/** Reusable NavItem Component **/
function NavItem({
  href,
  text,
  icon,
  isMobile = false,
}: {
  href: string;
  text: string;
  icon?: JSX.Element;
  isMobile?: boolean;
}) {
  return (
    <a
      href={href}
      className={`flex items-center space-x-2 p-3 ${
        isMobile ? "block border-b last:border-none text-center" : "text-gray-700 hover:text-gray-900"
      }`}
    >
      {icon}
      <span>{text}</span>
    </a>
  );
}
