import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Upload, 
  FileSearch, 
  Network, 
  Shield, 
  Code, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Upload, label: "Firmware Upload", path: "/upload" },
  { icon: FileSearch, label: "Analysis Results", path: "/results" },
  { icon: Network, label: "Protocol Mapping", path: "/protocol" },
  { icon: Shield, label: "Risk & Compliance", path: "/compliance" },
  { icon: Code, label: "API Integration", path: "/api" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen border-r border-sidebar-border transition-all duration-300 z-50 bg-gradient-sidebar",
        collapsed ? "w-16" : "w-64"
      )}
      style={{
        background: 'linear-gradient(180deg, hsl(263 90% 44% / 0.05) 0%, hsl(220 20% 5%) 30%, hsl(220 20% 5%) 100%)'
      }}
    >
      <div className="flex flex-col h-full relative">
        {/* Logo with gradient glow */}
        <div className="p-6 border-b border-sidebar-border flex items-center justify-between relative">
          <div className="absolute inset-0 bg-gradient-primary opacity-5" />
          {!collapsed && (
            <div className="flex items-center gap-2 relative z-10">
              <div className="p-1.5 rounded-lg bg-gradient-primary">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="font-inter text-lg font-semibold text-gradient-primary">BlackBox AI</span>
            </div>
          )}
          {collapsed && (
            <div className="p-1.5 rounded-lg bg-gradient-primary mx-auto">
              <Activity className="h-5 w-5 text-white" />
            </div>
          )}
        </div>

        {/* Navigation with gradient accents */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative group",
                  isActive && "text-white",
                  !isActive && "text-text-secondary hover:text-white"
                )}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-xl" />
                )}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-primary rounded-r-full" />
                )}
                <Icon className={cn(
                  "h-5 w-5 flex-shrink-0 relative z-10",
                  isActive && "drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
                )} />
                {!collapsed && <span className="font-medium relative z-10">{item.label}</span>}
                
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-xl transition-opacity" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle with gradient */}
        <div className="p-4 border-t border-sidebar-border relative">
          <div className="absolute inset-0 bg-gradient-secondary opacity-5" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full justify-center hover:bg-white/5 relative z-10"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 mr-2" />
                <span>Collapse</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </aside>
  );
};
