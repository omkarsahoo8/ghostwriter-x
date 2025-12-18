import { useState } from "react";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { ThreadComposer } from "@/components/ThreadComposer";
import { Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Index = () => {
  const [selectedPersona, setSelectedPersona] = useState("professional");
  const [selectedTone, setSelectedTone] = useState("witty");
  const [tweetCount, setTweetCount] = useState(5);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 flex items-center justify-between p-4 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <span className="text-lg font-bold text-gradient-primary">Ghost-Scriber</span>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 p-0">
            <RightSidebar
              selectedPersona={selectedPersona}
              setSelectedPersona={setSelectedPersona}
              selectedTone={selectedTone}
              setSelectedTone={setSelectedTone}
              tweetCount={tweetCount}
              setTweetCount={setTweetCount}
            />
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Layout */}
      <div className="flex justify-center">
        <LeftSidebar />
        <ThreadComposer 
          selectedPersona={selectedPersona} 
          selectedTone={selectedTone}
          tweetCount={tweetCount}
        />
        <RightSidebar
          selectedPersona={selectedPersona}
          setSelectedPersona={setSelectedPersona}
          selectedTone={selectedTone}
          setSelectedTone={setSelectedTone}
          tweetCount={tweetCount}
          setTweetCount={setTweetCount}
        />
      </div>
    </div>
  );
};

export default Index;
