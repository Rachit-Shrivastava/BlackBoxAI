import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 glass-effect border-b border-border/50 z-40 px-6">
      <div className="absolute inset-0 bg-gradient-hero opacity-30" />
      <div className="flex items-center justify-between h-full relative z-10">
        {/* Search with gradient accent */}
        <div className="flex-1 max-w-xl">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search firmware, protocols, or analysis..." 
              className="pl-10 bg-surface/50 border-border-muted focus:border-primary focus:ring-1 focus:ring-primary/20 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Actions with gradient elements */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative hover:bg-white/5 group">
            <Bell className="h-5 w-5 group-hover:text-primary transition-colors" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-gradient-primary rounded-full animate-pulse"></span>
          </Button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-border-muted/50">
            <div className="text-right">
              <p className="text-sm font-medium">Security Admin</p>
              <p className="text-xs text-muted-foreground">admin@blackbox.ai</p>
            </div>
            <div className="p-[2px] rounded-full bg-gradient-primary">
              <Button variant="ghost" size="icon" className="rounded-full bg-surface hover:bg-surface/80">
                <User className="h-5 w-5 text-primary" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
