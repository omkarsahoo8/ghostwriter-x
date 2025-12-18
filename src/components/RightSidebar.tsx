import { User, Briefcase, GraduationCap, Smile, Zap, MessageCircle, Lightbulb, Heart, Flame, Hash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

interface PersonaCardProps {
  icon: React.ElementType;
  label: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

const PersonaCard = ({ icon: Icon, label, description, selected, onClick }: PersonaCardProps) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full p-4 rounded-xl border transition-all duration-200 text-left",
      selected
        ? "border-primary bg-primary/10 glow-primary"
        : "border-border bg-card hover:border-muted-foreground/30 hover:bg-surface-hover"
    )}
  >
    <div className="flex items-center gap-3">
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center",
        selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
      )}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className={cn("font-semibold", selected && "text-primary")}>{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  </button>
);

interface ToneChipProps {
  icon: React.ElementType;
  label: string;
  selected: boolean;
  onClick: () => void;
}

const ToneChip = ({ icon: Icon, label, selected, onClick }: ToneChipProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-200",
      selected
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border bg-card hover:border-muted-foreground/30 hover:bg-surface-hover"
    )}
  >
    <Icon className="w-4 h-4" />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

interface RightSidebarProps {
  selectedPersona: string;
  setSelectedPersona: (persona: string) => void;
  selectedTone: string;
  setSelectedTone: (tone: string) => void;
  tweetCount: number;
  setTweetCount: (count: number) => void;
}

const personas = [
  { id: "professional", icon: Briefcase, label: "Professional", description: "Corporate & thought leadership" },
  { id: "student", icon: GraduationCap, label: "Student", description: "Learning & growth focused" },
  { id: "fun", icon: Smile, label: "Fun", description: "Casual & entertaining" },
  { id: "disruptor", icon: Zap, label: "Disruptor", description: "Bold & contrarian takes" },
];

const tones = [
  { id: "witty", icon: MessageCircle, label: "Witty" },
  { id: "curious", icon: Lightbulb, label: "Curious" },
  { id: "bold", icon: Flame, label: "Bold" },
  { id: "empathetic", icon: Heart, label: "Empathetic" },
];

export const RightSidebar = ({
  selectedPersona,
  setSelectedPersona,
  selectedTone,
  setSelectedTone,
  tweetCount,
  setTweetCount,
}: RightSidebarProps) => {
  return (
    <aside className="hidden xl:flex flex-col w-80 h-screen sticky top-0 border-l border-border bg-sidebar p-6 overflow-y-auto">
      {/* Voice & Style Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <User className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold">Voice & Style</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Choose your persona and tone to shape your thread's personality.
        </p>
      </div>

      {/* Personas Section */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          User Persona
        </h3>
        <div className="space-y-3">
          {personas.map((persona) => (
            <PersonaCard
              key={persona.id}
              icon={persona.icon}
              label={persona.label}
              description={persona.description}
              selected={selectedPersona === persona.id}
              onClick={() => setSelectedPersona(persona.id)}
            />
          ))}
        </div>
      </div>

      {/* Tones Section */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Tone
        </h3>
        <div className="flex flex-wrap gap-2">
          {tones.map((tone) => (
            <ToneChip
              key={tone.id}
              icon={tone.icon}
              label={tone.label}
              selected={selectedTone === tone.id}
              onClick={() => setSelectedTone(tone.id)}
            />
          ))}
        </div>
      </div>

      {/* Tweet Count Slider */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4" />
            Thread Length
          </div>
        </h3>
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-muted-foreground">Number of tweets</span>
            <span className="text-2xl font-bold text-primary">{tweetCount}</span>
          </div>
          <Slider
            value={[tweetCount]}
            onValueChange={(value) => setTweetCount(value[0])}
            min={1}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>1</span>
            <span>10</span>
          </div>
        </div>
      </div>

      {/* Pro Tips */}
      <div className="mt-8 p-4 rounded-xl bg-card border border-border">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-primary" />
          Pro Tip
        </h4>
        <p className="text-sm text-muted-foreground">
          Combine "Disruptor" persona with "Bold" tone for maximum engagement and viral potential.
        </p>
      </div>
    </aside>
  );
};
