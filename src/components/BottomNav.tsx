import React from 'react';
import { Home, CalendarDays, Timer, BookOpen, Wallet, LucideIcon } from 'lucide-react';

export type TabId = 'home' | 'timetable' | 'focus' | 'learn' | 'budget' | 'friends' | 'companion' | 'profile';

interface NavItem {
  id: TabId;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'timetable', label: 'Schedule', icon: CalendarDays },
  { id: 'focus', label: 'Focus', icon: Timer },
  { id: 'learn', label: 'Learn', icon: BookOpen },
  { id: 'budget', label: 'Budget', icon: Wallet },
];

interface BottomNavProps {
  activeTab: TabId;
  onChangeTab: (tab: TabId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  return (
    <nav className="sticky bottom-0 z-30 border-t border-edge bg-surface/95 backdrop-blur-md pb-safe">
      <div className="flex items-stretch justify-around px-2 py-1.5 max-w-[430px] mx-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onChangeTab(item.id)}
              className="relative flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 transition active:scale-95 group"
            >
              <div
                className={`p-1 rounded-xl transition ${
                  isActive ? 'bg-saddle/10 text-saddle' : 'text-coffee-muted group-hover:text-coffee'
                }`}
              >
                <Icon size={19} strokeWidth={isActive ? 2.5 : 2} />
              </div>

              <span
                className={`text-[10px] font-semibold tracking-tight transition ${
                  isActive ? 'text-saddle' : 'text-coffee-muted'
                }`}
              >
                {item.label}
              </span>

              {isActive && (
                <span className="absolute bottom-0 h-0.5 w-4 rounded-full bg-saddle" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
