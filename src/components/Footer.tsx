import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/30 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">ONLINE SHOPPING</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/products?category=men" className="hover:text-foreground transition-colors">Men</Link></li>
              <li><Link to="/products?category=women" className="hover:text-foreground transition-colors">Women</Link></li>
              <li><Link to="/products?category=kids" className="hover:text-foreground transition-colors">Kids</Link></li>
              <li><Link to="/products?category=home" className="hover:text-foreground transition-colors">Home & Living</Link></li>
              <li><Link to="/products?category=beauty" className="hover:text-foreground transition-colors">Beauty</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">CUSTOMER POLICIES</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Terms & Conditions</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Return Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">USEFUL LINKS</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Site Map</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Corporate Information</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">KEEP IN TOUCH</h3>
            <div className="flex gap-4 mb-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Get the latest updates on new products and upcoming sales
            </p>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 FashionStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
