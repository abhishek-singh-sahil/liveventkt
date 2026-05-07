import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 🔥 TOP SECTION: Newsletter & Branding */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 border-b border-gray-800 pb-12 mb-12">
          
          {/* Brand Info */}
          <div className="lg:w-1/3">
            <Link to='/' className='text-3xl font-bold text-white tracking-tight inline-block mb-4 hover:opacity-90 transition-opacity'>
              Liv<span className='text-purple-500'>Eventkt</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Discover the best tech conferences, late-night music festivals, and unforgettable experiences happening around you.
            </p>
            
            {/* 🔥 Official Social Icons (Pure SVG) */}
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 hover:text-white transition-all duration-300 text-gray-400">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              
              {/* X (Twitter) */}
              <a href="#" aria-label="X (Twitter)" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 text-gray-400">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-[18px] h-[18px]">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.961h-1.96z" />
                </svg>
              </a>
              
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300 text-gray-400">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-all duration-300 text-gray-400">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-[18px] h-[18px]">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Newsletter Subscribe */}
          <div className="lg:w-1/2 w-full bg-white/[0.03] p-6 sm:p-8 rounded-3xl border border-white/5">
            <h3 className="text-white text-xl font-bold mb-2 tracking-tight">Subscribe to our Newsletter</h3>
            <p className="text-gray-400 text-sm mb-6">Get the latest updates on trending events and exclusive offers.</p>
            
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex-1">
                {/* SVG Mail Icon */}
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full bg-[#111111] border border-gray-700/50 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-purple-500 focus:bg-[#1a1a1a] transition-all"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="bg-purple-600 hover:bg-purple-500 active:scale-95 text-white px-8 py-3.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shrink-0 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)]"
              >
                Subscribe
                {/* SVG Right Arrow */}
                <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* 🔥 MIDDLE SECTION: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1 */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">For Attendees</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/events" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">Browse Events</Link></li>
              <li><Link to="/movies" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">Movies & Streams</Link></li>
              <li><Link to="/sports" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">Live Sports</Link></li>
              <li><Link to="/gift-cards" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">Gift Cards</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">For Organizers</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/list-show" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">List Your Show</Link></li>
              <li><Link to="/corporate" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">Corporate Events</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">Pricing & Fees</Link></li>
              <li><Link to="/ticketing" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">Ticketing System</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">Careers</Link></li>
              <li><Link to="/press" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">Press & Media</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">Contact Support</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Helpful Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/my-profile/support" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">Help Center</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">FAQs</Link></li>
              <li><Link to="/refunds" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">Cancellation Policy</Link></li>
              <li><Link to="/sitemap" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all">Sitemap</Link></li>
            </ul>
          </div>

        </div>

        {/* 🔥 BOTTOM SECTION: Legal & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 text-xs text-gray-500 gap-4">
          <p>© {currentYear} LiveEventkt. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookie Preferences</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;