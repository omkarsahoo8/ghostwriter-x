import { useState } from "react";
import { Sparkles, ImagePlus, BarChart3, Smile, Calendar, MapPin, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TweetCard } from "./TweetCard";
import { ViralityMeter } from "./ViralityMeter";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ThreadComposerProps {
  selectedPersona: string;
  selectedTone: string;
  tweetCount: number;
}

export const ThreadComposer = ({ selectedPersona, selectedTone, tweetCount }: ThreadComposerProps) => {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedThread, setGeneratedThread] = useState<string[]>([]);
  const [showViralityMeter, setShowViralityMeter] = useState(false);
  const [typingIndex, setTypingIndex] = useState(-1);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!input.trim()) {
      toast.error("Please enter a topic for your thread");
      return;
    }

    setIsGenerating(true);
    setGeneratedThread([]);
    setShowViralityMeter(false);
    setTypingIndex(-1);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('generate-thread', {
        body: {
          topic: input.trim(),
          persona: selectedPersona,
          tone: selectedTone,
          tweetCount: tweetCount,
        },
      });

      if (fnError) {
        console.error('Edge function error:', fnError);
        throw new Error(fnError.message || 'Failed to generate thread');
      }

      if (data?.error) {
        if (data.message) {
          // Content policy violation
          setError(data.message);
          toast.error("Content policy violation", {
            description: data.message,
          });
        } else {
          throw new Error(data.error);
        }
        setIsGenerating(false);
        return;
      }

      if (!data?.tweets || data.tweets.length === 0) {
        throw new Error('No tweets generated');
      }

      const tweets = data.tweets as string[];

      // Reveal tweets one by one with typing effect
      for (let i = 0; i < tweets.length; i++) {
        setTypingIndex(i);
        await new Promise(resolve => setTimeout(resolve, 300));
        setGeneratedThread(prev => [...prev, tweets[i]]);
        await new Promise(resolve => setTimeout(resolve, 600));
      }

      setTypingIndex(-1);
      setShowViralityMeter(true);
      toast.success(`Generated ${tweets.length} tweets!`);

    } catch (err) {
      console.error('Generation error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate thread';
      setError(errorMessage);
      toast.error("Generation failed", {
        description: errorMessage,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const viralityScore = Math.floor(Math.random() * 30) + 70;
  const hookStrength = Math.floor(Math.random() * 25) + 75;
  const engagementPotential = Math.floor(Math.random() * 20) + 80;

  return (
    <main className="flex-1 max-w-2xl border-r border-border min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border p-4">
        <h1 className="text-xl font-bold">Thread Composer</h1>
        <p className="text-xs text-muted-foreground mt-1">Powered by Gemini AI</p>
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
              disabled={isGenerating}
            />
            
            {/* Error display */}
            {error && (
              <div className="flex items-start gap-2 p-3 mb-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}
            
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
                disabled={isGenerating || !input.trim()}
                className="gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Weaving...
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
            Enter a topic above and let Gemini AI craft a viral-worthy thread tailored to your selected persona and tone.
          </p>
        </div>
      )}
    </main>
  );
};
