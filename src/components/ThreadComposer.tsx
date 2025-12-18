import { useState } from "react";
import { Sparkles, ImagePlus, BarChart3, Smile, Calendar, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TweetCard } from "./TweetCard";
import { ViralityMeter } from "./ViralityMeter";

interface ThreadComposerProps {
  selectedPersona: string;
  selectedTone: string;
  tweetCount: number;
}

// Structured format for Professional/Student (bullet points, clear structure)
const STRUCTURED_THREADS: Record<string, string[]> = {
  "professional-witty": [
    "I've spent 10 years in tech leadership, and here's what I've learned about productivity:\n\n→ The tools aren't the problem\n→ Your habits are\n\nLet me break this down. 🧵",
    "Key insight #1:\n\n• The average worker uses 9.4 apps daily\n• Each app promises time savings\n• Yet work hours keep increasing\n\nThe math doesn't add up.",
    "Key insight #2:\n\n• Every new tool = new notification channel\n• Every notification = context switch\n• Every context switch = 23 min to refocus\n\nYou're managing interruptions, not work.",
    "The solution framework:\n\n1. Batch your app usage\n2. Turn off 90% of notifications\n3. Schedule deep work blocks\n4. Set communication windows\n\nYour future self will thank you.",
    "Final thoughts:\n\n• Simplicity scales\n• Complexity kills\n• Intentionality wins\n\nApply these principles and watch your productivity soar.\n\n#BuildInPublic #Productivity #TechTwitter"
  ],
  "professional-curious": [
    "I've been researching a fascinating question:\n\nWhy do smart companies make terrible decisions?\n\nHere's what the data reveals. 🧵",
    "Finding #1: The Groupthink Effect\n\n• 73% of meetings favor consensus\n• Dissenting opinions rarely surface\n• Innovation dies in committee\n\nThe cure? Assigned devil's advocates.",
    "Finding #2: Data Paralysis\n\n• More data ≠ better decisions\n• Analysis becomes procrastination\n• Perfect information is a myth\n\nThe fix? Set decision deadlines with 80% data.",
    "Finding #3: Sunk Cost Fallacy\n\n• Past investment clouds judgment\n• Failing projects get more funding\n• Ego protects bad bets\n\nThe solution? Pre-commit to kill criteria.",
    "Action items for your organization:\n\n1. Encourage constructive dissent\n2. Set decision timeframes\n3. Define failure metrics upfront\n4. Celebrate course corrections\n\nBetter decisions await.\n\n#Leadership #Strategy #AI"
  ],
  "student-curious": [
    "I'm 22 and just discovered something school never taught me:\n\nThe best learners aren't the smartest—they're the most curious.\n\nHere's my framework. 🧵",
    "Lesson #1: Grades vs Learning\n\n• 4.0 GPA from test optimization\n• Retained almost nothing\n• Curiosity changed everything\n\nKey insight: Grades measure compliance, not competence.",
    "Lesson #2: The Learning Framework\n\n1. Ask \"why\" 5 times\n2. Teach it to someone else\n3. Apply it to personal projects\n4. Question your assumptions\n\nThis beats memorization every time.",
    "Lesson #3: Skills That Matter\n\n• Asking better questions\n• Admitting \"I don't know\"\n• Finding cross-discipline patterns\n• Embracing uncertainty\n\nNone of these were graded.",
    "To every student feeling lost:\n\n→ Your curiosity is your superpower\n→ Questions > answers\n→ Your path is uniquely yours\n\nStay curious. Stay humble. Keep learning.\n\n#BuildInPublic #Learning #TechTwitter"
  ],
  "student-empathetic": [
    "Real talk for students struggling right now:\n\nYou're not alone, and it's okay to feel overwhelmed.\n\nHere's what I wish someone told me. 🧵",
    "Truth #1: Comparison is the thief of joy\n\n• Everyone's highlight reel looks perfect\n• Behind the scenes? We're all struggling\n• Your timeline is valid\n\nFocus on YOUR progress.",
    "Truth #2: Asking for help is strength\n\n• Mental health matters\n• Academic support exists for a reason\n• Your struggles don't define you\n\nReach out. People want to help.",
    "Truth #3: Grades don't define your worth\n\n• Many successful people failed courses\n• Skills matter more than scores\n• Learning continues forever\n\nOne bad grade isn't the end.",
    "Reminders for tough days:\n\n→ Take breaks without guilt\n→ Celebrate small wins\n→ Your worth isn't your productivity\n→ Tomorrow is a fresh start\n\nYou've got this. 💙\n\n#MentalHealth #StudentLife #AI"
  ],
};

// Fun format for Fun/Disruptor (paragraphs, emojis, casual)
const FUN_THREADS: Record<string, string[]> = {
  "fun-witty": [
    "okay so i just realized that adulting is basically just googling stuff until you die and honestly? i feel seen 😭✨\n\nlet me share my chaotic wisdom with you besties 🧵",
    "like nobody warned me that being an adult means calling your mom about taxes at 11pm while simultaneously googling \"how to boil water\" and pretending you have your life together at work the next day 💀\n\nwe're all frauds and that's VALID",
    "the confidence i had at 18 vs the anxiety i have now doing literally anything is ASTRONOMICAL and i need everyone to know that if you feel like an imposter... congrats you're normal!! 🎉\n\neven that put-together person at work? imposter syndrome bestie",
    "here's the thing nobody tells you: every single \"successful\" adult is just winging it with slightly better coping mechanisms and a nicer planner 📔✨\n\nthe secret sauce is literally just showing up and pretending until it works",
    "so if you're reading this feeling behind or confused or like everyone else has it figured out... they don't!! we're all just vibing and trying our best 💖\n\nyou're doing amazing sweetie\n\n#Adulting #Relatable #BuildInPublic"
  ],
  "fun-empathetic": [
    "can we talk about how exhausting it is to be a human being sometimes?? like existence requires SO much maintenance 😮‍💨💕\n\nhere's your permission slip to rest 🧵",
    "society: wake up early! exercise! eat healthy! socialize! be productive! practice self-care! maintain hobbies! sleep 8 hours!\n\nme: *exists* \n\nlike when are we supposed to do all this?? in what economy?? 😭",
    "the thing is... you don't have to be optimized 24/7. you're a person, not a productivity app 📱❌\n\nsome days just surviving is the biggest W and that's completely okay bestie",
    "revolutionary concept: you are inherently worthy of rest and joy even when you haven't \"earned\" it through suffering or productivity ✨🌸\n\nlet that sink in",
    "so here's your reminder today: drink water, take your meds if you have them, and be gentle with yourself 💙\n\nyou're doing better than you think\n\n#SelfCare #MentalHealth #SaaS"
  ],
  "disruptor-bold": [
    "HOT TAKE: 90% of hustle culture advice is just trauma disguised as motivation and i'm tired of pretending otherwise 🔥\n\nlet me explain why your 4am wake-up routine might be destroying you 🧵",
    "the people selling you \"no days off\" mentality have entire TEAMS running their businesses, passive income flowing in, and years of compounding work behind them 💀\n\nyou're comparing your chapter 1 to their chapter 20 and that's INSANE",
    "here's what actual sustainable success looks like and it's BORING:\n\n→ sleeping 8 hours (revolutionary i know)\n→ consistent moderate effort\n→ strategic rest periods\n→ saying no to 90% of \"opportunities\"\n\nthe compound effect DESTROYS burnout every single time 📈",
    "the hustle bros will absolutely HATE this but i'll say it anyway: your mental health isn't worth sacrificing for anyone's definition of success 🗣️\n\nand if a business model requires you to be miserable? the business model is broken, not you",
    "work smart. rest hard. play the long game. 🎯\n\nthe overnight success you're chasing took 10 years and therapy to build. be patient with yourself.\n\n#Startups #HustleCulture #AI"
  ],
  "disruptor-curious": [
    "i've been thinking about something that might make people uncomfortable: what if everything we know about work is based on outdated factory models?? 🤔🔥\n\nlet me break this down 🧵",
    "like we're literally using schedules designed for ASSEMBLY LINES in the knowledge economy 💀\n\n8 hours of sitting = productivity?? says WHO?? the same people who thought asbestos was fine probably",
    "the research is WILD: most knowledge workers are actually productive for about 4 focused hours per day. the rest? meetings nobody wanted, emails nobody needed, and looking busy for no reason 📊\n\nwe're all just performing productivity theater",
    "what if instead of measuring hours, we measured OUTCOMES?? revolutionary concept i know 🙃\n\npeople finishing work early should be rewarded not punished with more work. this isn't complicated.",
    "the future of work isn't about doing MORE, it's about doing BETTER with LESS ⚡\n\nthe companies that figure this out first are gonna dominate. the rest will keep wondering why everyone keeps quitting.\n\n#FutureOfWork #RemoteWork #BuildInPublic"
  ],
};

const getThreadForPersona = (persona: string, tone: string, count: number): string[] => {
  const isStructured = persona === "professional" || persona === "student";
  const threadPool = isStructured ? STRUCTURED_THREADS : FUN_THREADS;
  const key = `${persona}-${tone}`;
  
  // Get matching thread or fallback
  let thread = threadPool[key];
  if (!thread) {
    // Fallback to first available in the pool
    thread = Object.values(threadPool)[0];
  }
  
  // Return requested number of tweets (cycle if needed)
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(thread[i % thread.length]);
  }
  return result;
};

export const ThreadComposer = ({ selectedPersona, selectedTone, tweetCount }: ThreadComposerProps) => {
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

    // Get thread based on persona style and count
    const thread = getThreadForPersona(selectedPersona, selectedTone, tweetCount);

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
