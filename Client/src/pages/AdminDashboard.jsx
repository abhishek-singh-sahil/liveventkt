import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios'; // 🔥 Your Axios instance
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, CalendarDays, Ticket, Users, Settings, LogOut, 
  Plus, Search, Bell, TrendingUp, Edit, Trash2, Loader2
} from 'lucide-react';

const AdminPanel = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  // 🔥 REAL STATE VARIABLES
  const [stats, setStats] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [events, setEvents] = useState([]);
  const [usersList, setUsersList] = useState([]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // 🔥 FETCH DATA BASED ON ACTIVE TAB
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'dashboard') {
        const { data } = await api.get('/admin/dashboard-stats');
        setStats([
          { label: "Total Revenue", value: `₹${data.totalRevenue?.toLocaleString('en-IN') || 0}`, increase: "Live", icon: TrendingUp, color: "from-emerald-400 to-emerald-600" },
          { label: "Tickets Sold", value: data.totalTickets || 0, increase: "Live", icon: Ticket, color: "from-purple-400 to-purple-600" },
          { label: "Active Events", value: data.totalEvents || 0, increase: "Live", icon: CalendarDays, color: "from-blue-400 to-blue-600" },
          { label: "Total Users", value: data.totalUsers || 0, increase: "Live", icon: Users, color: "from-orange-400 to-orange-600" },
        ]);
        setRecentBookings(data.recentBookings || []);
      } 
      else if (activeTab === 'events') {
        const { data } = await api.get('/events/allevent?limit=50');
        setEvents(data.events || []);
      }
      else if (activeTab === 'users') {
        const { data } = await api.get('/admin/users');
        setUsersList(data.users || []);
      }
      else if (activeTab === 'bookings') {
        const { data } = await api.get('/admin/all-bookings');
        setRecentBookings(data.bookings || []);
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 DELETE EVENT HANDLER
  const handleDeleteEvent = async (id) => {
    if(window.confirm("Are you sure you want to delete this event?")) {
      try {
        await api.delete(`/events/delete/${id}`); 
        setEvents(events.filter(e => e._id !== id));
      } catch (error) {
        console.error("Failed to delete", error);
      }
    }
  };

  // ==========================================
  // RENDERERS
  // ==========================================

  const renderDashboard = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity`}></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-md`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 uppercase`}>
                {stat.increase}
              </span>
            </div>
            <div className="relative z-10">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">{stat.label}</h3>
              <p className="text-3xl font-black text-gray-900 tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* RECENT BOOKINGS */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
            <button onClick={() => setActiveTab('bookings')} className="text-sm font-bold text-purple-600 hover:text-purple-700">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="pb-3">Booking ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentBookings.map((booking) => (
                  <tr key={booking._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 font-mono text-gray-500">{booking._id.slice(-6).toUpperCase()}</td>
                    {/* 🔥 FIXED: Pulls name from userId object or contact object */}
                    <td className="py-4 font-semibold text-gray-900">
                      {booking.userId?.name || booking.contact?.firstName || 'Guest'}
                    </td>
                    {/* 🔥 FIXED: Uses 'amount' instead of 'totalAmount' */}
                    <td className="py-4 font-bold text-gray-900">
                      ₹{booking.amount?.toLocaleString('en-IN') || 0}
                    </td>
                    <td className="py-4">
                      {/* 🔥 FIXED: Uses 'Bookingstatus' instead of 'status' */}
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${booking.Bookingstatus === 'confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                        {booking.Bookingstatus || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderEvents = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Event Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage, edit, and track your active experiences.</p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-purple-600/20 transition-all flex items-center gap-2">
          <Plus size={16} /> Add Event
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-gray-50/50">
              <th className="p-4 rounded-tl-xl">Event Details</th>
              <th className="p-4">Price</th>
              <th className="p-4">Capacity</th>
              <th className="p-4 rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {events.map((event) => {
              const total = event.totalSeats || 1;
              const available = event.availableSeats || 0;
              const sold = total - available;
              const percentSold = (sold / total) * 100;
              
              return (
                <tr key={event._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">{new Date(event.date).toLocaleDateString()}</p>
                  </td>
                  <td className="p-4 font-semibold text-gray-900">₹{event.price}</td>
                  <td className="p-4">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-gray-900">{sold} Sold</span>
                      <span className="text-gray-400">{total} Total</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className={`h-full rounded-full ${percentSold >= 100 ? 'bg-rose-500' : 'bg-purple-500'}`} style={{ width: `${percentSold}%` }}></div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg"><Edit size={16} /></button>
                      <button onClick={() => handleDeleteEvent(event._id)} className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#eef1f5] flex text-gray-900 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0a0a0a] text-gray-400 flex flex-col fixed h-full z-20 hidden lg:flex shadow-2xl">
        <div className="p-6 border-b border-gray-800">
          <span className="text-2xl font-extrabold text-white tracking-tighter">
            Liv<span className="text-purple-500">Eventkt</span>
            <span className="text-[10px] ml-2 font-bold uppercase tracking-widest text-gray-500 border border-gray-700 px-2 py-0.5 rounded-md relative -top-1">Admin</span>
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <SidebarLink icon={LayoutDashboard} label="Dashboard" isActive={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarLink icon={CalendarDays} label="Manage Events" isActive={activeTab === 'events'} onClick={() => setActiveTab('events')} />
          <SidebarLink icon={Ticket} label="All Bookings" isActive={activeTab === 'bookings'} onClick={() => setActiveTab('bookings')} />
          <SidebarLink icon={Users} label="Users & Guests" isActive={activeTab === 'users'} onClick={() => setActiveTab('users')} />
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-rose-500/10 hover:text-rose-500 font-semibold text-sm">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200/60 flex items-center justify-between px-6 sm:px-10 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4 font-bold text-xl capitalize text-gray-900">{activeTab.replace('-', ' ')}</div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900">{user?.name || "Admin"}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-purple-600">Superadmin</p>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-10">
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
              <p className="mt-4 text-gray-500 font-medium animate-pulse">Syncing with server...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' && <motion.div key="dash" exit={{ opacity: 0 }}>{renderDashboard()}</motion.div>}
              {activeTab === 'events' && <motion.div key="events" exit={{ opacity: 0 }}>{renderEvents()}</motion.div>}
              {['bookings', 'users'].includes(activeTab) && (
                <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-64 bg-white rounded-3xl border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 capitalize">{activeTab} List (To be implemented)</h2>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </main>
      </div>
    </div>
  );
};

const SidebarLink = ({ icon: Icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold
      ${isActive ? "bg-purple-600 text-white shadow-lg" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
  >
    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} /> {label}
  </button>
);

export default AdminPanel;