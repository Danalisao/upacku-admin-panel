import { MessageSquare, Mail, Phone } from 'lucide-react';

export const channelIcons = {
  chat: MessageSquare,
  email: Mail,
  phone: Phone
};

export const priorityColors = {
  high: 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/40',
  medium: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/40',
  low: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40'
};

export const chats = [
  {
    id: '1',
    user: {
      name: 'Sophie Martin',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      status: 'online'
    },
    lastMessage: "I haven't received any update about my package yet",
    timestamp: '2 min ago',
    unreadCount: 2,
    priority: 'high',
    channel: 'chat'
  },
  {
    id: '2',
    user: {
      name: 'Thomas Bernard',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      status: 'offline'
    },
    lastMessage: 'Thank you for your help with the refund process',
    timestamp: '1 hour ago',
    unreadCount: 0,
    priority: 'medium',
    channel: 'email'
  },
  {
    id: '3',
    user: {
      name: 'Marie Dubois',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      status: 'online'
    },
    lastMessage: 'How can I become a traveler on your platform?',
    timestamp: '3 hours ago',
    unreadCount: 1,
    priority: 'low',
    channel: 'phone'
  }
] as const;

export const messages = {
  '1': [
    {
      id: '1',
      content: "Hello, I haven't received any update about my package yet. It's been 2 days since the traveler accepted my request.",
      timestamp: '10:30 AM',
      sender: 'user',
      read: true
    },
    {
      id: '2',
      content: "I understand your concern. Let me check the status of your package right away.",
      timestamp: '10:32 AM',
      sender: 'support',
      read: true
    },
    {
      id: '3',
      content: "The traveler has confirmed pickup and is currently en route. You should receive an update within the next hour.",
      timestamp: '10:35 AM',
      sender: 'support',
      read: true
    }
  ]
} as const;