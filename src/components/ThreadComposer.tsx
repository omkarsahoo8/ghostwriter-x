import { useState } from "react";
import { Sparkles, ImagePlus, BarChart3, Smile, Calendar, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TweetCard } from "./TweetCard";
import { ViralityMeter } from "./ViralityMeter";

interface ThreadComposerProps {
  selectedPersona: string;
  selectedTone: string;
}

const SAMPLE_THREADS: Record<string, string[]> = {
  "professional-witty": [
    "I've spent 10 years in tech leadership, and here's the uncomfortable truth nobody talks about:\n\nYour fancy productivity tools aren't making you more productive. They're making you feel productive.\n\nThere's a massive difference. 🧵",
    "The average knowledge worker now uses 9.4 apps per day.\n\nEach app promises to \"save time.\"\n\nYet we work more hours than ever.\n\nThe math isn't mathing. Here's why:",
    "Every new tool = new notification channel\nEvery notification = context switch\nEvery context switch = 23 minutes to refocus\n\nYou're not managing work. You're managing interruptions.",
    "The solution isn't fewer tools. It's intentional tool usage.\n\n→ Batch your app usage\n→ Turn off 90% of notifications\n→ Schedule \"deep work\" blocks\n\nYour future self will thank you.",
    "The most productive executives I know?\n\nThey check email twice a day.\nThey have 3 apps maximum.\nThey say \"no\" to 90% of meetings.\n\nSimplicity scales. Complexity kills.\n\n#BuildInPublic #Productivity #TechTwitter"
  ],
  "disruptor-bold": [
    "Hot take: 90% of \"hustle culture\" advice is just trauma disguised as motivation.\n\nLet me explain why your 4 AM wake-up routine might be destroying you. 🧵",
    "The glorification of being \"busy\" is a disease.\n\nI know founders working 80-hour weeks who make less than employees working 40.\n\nBusyness ≠ Productivity\nBusyness ≠ Success\nBusyness = Often just poor planning",
    "The gurus selling you \"no days off\" mentality?\n\nThey have:\n• Teams running their businesses\n• Passive income streams\n• Years of compounding work\n\nYou're comparing your chapter 1 to their chapter 20.",
    "Real success looks boring:\n\n→ 8 hours of sleep\n→ Consistent moderate effort\n→ Strategic rest periods\n→ Saying no to 90% of \"opportunities\"\n\nThe compound effect beats burnout every time.",
    "The hustle bros will hate this.\n\nBut sustainable success > dramatic burnout\n\nWork smart. Rest hard. Play the long game.\n\nYour mental health isn't worth sacrificing for anyone's definition of success.\n\n#SaaS #Startups #AI"
  ],
  "student-curious": [
    "I'm 22 and just realized something about learning that school never taught me:\n\nThe best students aren't the smartest. They're the most curious.\n\nHere's what 4 years of university ACTUALLY taught me 🧵",
    "Grades are a game. Learning is a lifestyle.\n\nI got a 4.0 by optimizing for tests.\nI learned nothing that stuck.\n\nThen I started learning for curiosity, and everything changed.",
    "The framework that transformed my learning:\n\n1. Ask \"why\" 5 times\n2. Teach it to someone else\n3. Apply it to something you care about\n4. Question everything you think you know",
    "The most valuable skills I developed?\n\n• Asking better questions\n• Admitting \"I don't know\"\n• Finding patterns across disciplines\n• Being comfortable with uncertainty\n\nNone of these were graded.",
    "To every student feeling lost:\n\nYour curiosity is your superpower.\nYour questions matter more than answers.\nYour path doesn't need to look like anyone else's.\n\nStay curious. Stay humble. Keep learning.\n\n#BuildInPublic #AI #TechTwitter"
  ],
  "fun-empathetic": [
    "okay so hear me out...\n\nI've been thinking about why adulting is SO hard, and I think I finally cracked the code 🧵✨",
    "Nobody tells you that being an adult means:\n\n• Googling basic life stuff at 2am\n• Calling your parents about taxes\n• Pretending to know what you're doing\n• Being tired ALL the time\n\nWe're all just winging it bestie 😭",
    "The secret everyone's hiding?\n\nThat \"put together\" person at work? Imposter syndrome.\nThat successful friend? Anxious about everything.\nThat confident CEO? Literally Googled \"how to be a good leader\" last week.\n\nWe're ALL figuring it out.",
    "Things that helped me feel less like a disaster:\n\n→ Admitting I don't have answers\n→ Celebrating tiny wins\n→ Being kind to myself on bad days\n→ Remembering everyone's faking it too",
    "So if you're feeling behind or lost or confused...\n\nYou're exactly where you're supposed to be.\nYour timeline is valid.\nYour struggles are shared.\n\nWe're all in this together 💙\n\n#SaaS #Startups #BuildInPublic"
  ],
};

export const ThreadComposer = ({ selectedPersona, selectedTone }: ThreadComposerProps) => {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedThread, setGeneratedThread] = useState<string[]>([]);
  const [showViralityMeter, setShowViralityMeter] = useState(false);
  const [typingIndex, setTypingIndex] = useState(-1);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedThread([]);
    setShowViralityMeter(false);
    setTypingIndex(-1);

    // Simulate AI generation with typing effect
    const threadKey = `${selectedPersona}-${selectedTone}`;
    const thread = SAMPLE_THREADS[threadKey] || SAMPLE_THREADS["professional-witty"];

    // Reveal tweets one by one with delay
    for (let i = 0; i < thread.length; i++) {
      setTypingIndex(i);
      await new Promise(resolve => setTimeout(resolve, 300));
      setGeneratedThread(prev => [...prev, thread[i]]);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    setTypingIndex(-1);
    setIsGenerating(false);
    setShowViralityMeter(true);
  };

  const viralityScore = Math.floor(Math.random() * 30) + 70;
  const hookStrength = Math.floor(Math.random() * 25) + 75;
  const engagementPotential = Math.floor(Math.random() * 20) + 80;

  return (
    <main className="flex-1 max-w-2xl border-r border-border min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border p-4">
        <h1 className="text-xl font-bold">Thread Composer</h1>
      </header>

      {/* Composer */}
      <div className="border-b border-border p-4">
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-primary-foreground font-bold text-lg flex-shrink-0">
            AI
          </div>
          <div className="flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What's on your mind? Describe your thread topic..."
              className="w-full min-h-[120px] bg-transparent text-lg placeholder:text-muted-foreground focus:outline-none resize-none"
            />
            
            {/* Action bar */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="text-primary">
                  <ImagePlus className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-primary">
                  <BarChart3 className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-primary">
                  <Smile className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-primary">
                  <Calendar className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-primary">
                  <MapPin className="w-5 h-5" />
                </Button>
              </div>
              
              <Button 
                variant="twitter" 
                size="lg"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Weave the Thread
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Thread */}
      {generatedThread.length > 0 && (
        <div className="divide-y divide-border">
          <div className="p-4 bg-surface-elevated border-b border-border">
            <p className="text-sm text-muted-foreground">
              <span className="text-primary font-semibold">✨ Generated Thread</span> • {generatedThread.length} tweets • {selectedPersona} • {selectedTone}
            </p>
          </div>
          {generatedThread.map((tweet, index) => (
            <TweetCard
              key={index}
              content={tweet}
              index={index}
              totalTweets={generatedThread.length}
              isTyping={typingIndex === index}
              delay={index * 100}
            />
          ))}
        </div>
      )}

      {/* Virality Meter */}
      {showViralityMeter && (
        <div className="p-4">
          <ViralityMeter
            score={viralityScore}
            hookStrength={hookStrength}
            engagementPotential={engagementPotential}
          />
        </div>
      )}

      {/* Empty state */}
      {generatedThread.length === 0 && !isGenerating && (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold mb-2">Create Your First Thread</h2>
          <p className="text-muted-foreground max-w-sm">
            Enter a topic above and let AI craft a viral-worthy thread tailored to your selected persona and tone.
          </p>
        </div>
      )}
    </main>
  );
};
