import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users,
  UserCheck,
  Wallet, 
  Ticket,
  Settings,
  HeadphonesIcon, 
  LogOut,
  Package,
  MessageSquare,
  Send
} from 'lucide-react';
import clsx from 'clsx';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: ShoppingCart, label: 'Orders', path: '/orders' },
  { icon: Users, label: 'Clients', path: '/clients' },
  { icon: UserCheck, label: 'Partners', path: '/partners' },
  { icon: Send, label: 'Requests', path: '/requests' },
  { icon: MessageSquare, label: 'Offers', path: '/offers' },
  { icon: Wallet, label: 'Finance', path: '/finance' },
  { icon: Ticket, label: 'Vouchers', path: '/vouchers' },
  { icon: Settings, label: 'Features', path: '/features' },
  { icon: HeadphonesIcon, label: 'Support', path: '/support' },
];

export const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="w-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-r border-gray-200/50 dark:border-gray-700/50 h-screen sticky top-0 flex flex-col p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Package className="text-primary" />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Upacku
          </span>
        </h1>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
                    'hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10',
                    isActive && 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                  )
                }
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 w-full text-gray-600 dark:text-gray-400 hover:text-red-600 
                 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all group mt-4"
      >
        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span>Log Out</span>
      </button>
    </div>
  );
};