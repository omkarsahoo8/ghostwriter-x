import { Home, Search, Bell, Mail, User, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Search, label: "Explore" },
  { icon: Bell, label: "Notifications" },
  { icon: Mail, label: "Messages" },
  { icon: User, label: "Profile" },
];

const trendingTopics = [
  { hashtag: "#BuildInPublic", tweets: "24.5K" },
  { hashtag: "#SaaS", tweets: "18.2K" },
  { hashtag: "#AI", tweets: "156K" },
  { hashtag: "#Startups", tweets: "45.8K" },
  { hashtag: "#TechTwitter", tweets: "89.3K" },
];

export const LeftSidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 h-screen sticky top-0 border-r border-border bg-sidebar p-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8 px-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <span className="text-xl font-bold text-gradient-primary">Ghost-Scriber</span>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 mb-8">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className={`w-full justify-start gap-4 h-12 text-base ${
              item.active 
                ? "font-bold text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <item.icon className="w-6 h-6" />
            {item.label}
          </Button>
        ))}
      </nav>

      {/* Trending Section */}
      <div className="flex-1 overflow-hidden">
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg">Trending Now</h3>
            </div>
          </div>
          <div className="divide-y divide-border">
            {trendingTopics.map((topic) => (
              <button
                key={topic.hashtag}
                className="w-full p-4 text-left hover:bg-surface-hover transition-colors"
              >
                <p className="font-semibold text-primary">{topic.hashtag}</p>
                <p className="text-sm text-muted-foreground">{topic.tweets} tweets</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
