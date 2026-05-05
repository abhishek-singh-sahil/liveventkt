import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 🔥 TOP SECTION: Newsletter & Branding */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 border-b border-gray-800 pb-12 mb-12">
          
          {/* Brand Info */}
          <div className="lg:w-1/3">
            <Link to='/' className='text-3xl font-bold text-white tracking-tight inline-block mb-4'>
              Liv<span className='text-purple-500'>Eventkt</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Discover the best tech conferences, late-night music festivals, and unforgettable experiences happening around you.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all duration-300">
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all duration-300">
                
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all duration-300">
                f
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all duration-300">
                
              </a>
            </div>
          </div>

          {/* Newsletter Subscribe */}
          <div className="lg:w-1/2 w-full bg-white/5 p-6 rounded-2xl border border-white/10">
            <h3 className="text-white text-lg font-semibold mb-2">Subscribe to our Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Get the latest updates on trending events and exclusive offers.</p>
            
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full bg-[#111111] border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shrink-0"
              >
                Subscribe <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* 🔥 MIDDLE SECTION: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1 */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">For Attendees</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/events" className="text-gray-400 hover:text-purple-400 transition-colors">Browse Events</Link></li>
              <li><Link to="/movies" className="text-gray-400 hover:text-purple-400 transition-colors">Movies & Streams</Link></li>
              <li><Link to="/sports" className="text-gray-400 hover:text-purple-400 transition-colors">Live Sports</Link></li>
              <li><Link to="/gift-cards" className="text-gray-400 hover:text-purple-400 transition-colors">Gift Cards</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">For Organizers</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/list-show" className="text-gray-400 hover:text-purple-400 transition-colors">List Your Show</Link></li>
              <li><Link to="/corporate" className="text-gray-400 hover:text-purple-400 transition-colors">Corporate Events</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-purple-400 transition-colors">Pricing & Fees</Link></li>
              <li><Link to="/ticketing" className="text-gray-400 hover:text-purple-400 transition-colors">Ticketing System</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-gray-400 hover:text-purple-400 transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-purple-400 transition-colors">Careers</Link></li>
              <li><Link to="/press" className="text-gray-400 hover:text-purple-400 transition-colors">Press & Media</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-purple-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Helpful Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/my-profile/support" className="text-gray-400 hover:text-purple-400 transition-colors">Help Center</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-purple-400 transition-colors">FAQs</Link></li>
              <li><Link to="/refunds" className="text-gray-400 hover:text-purple-400 transition-colors">Cancellation Policy</Link></li>
              <li><Link to="/sitemap" className="text-gray-400 hover:text-purple-400 transition-colors">Sitemap</Link></li>
            </ul>
          </div>

        </div>

        {/* 🔥 BOTTOM SECTION: Legal & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 text-xs text-gray-500 gap-4">
          <p>© {currentYear} LiveEventkt. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-gray-300 transition-colors">Cookie Preferences</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;