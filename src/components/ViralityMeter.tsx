import { TrendingUp, Zap, MessageCircle, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface ViralityMeterProps {
  score: number;
  hookStrength: number;
  engagementPotential: number;
}

export const ViralityMeter = ({ score, hookStrength, engagementPotential }: ViralityMeterProps) => {
  const getScoreColor = (value: number) => {
    if (value >= 80) return "text-twitter-retweet";
    if (value >= 60) return "text-primary";
    if (value >= 40) return "text-yellow-500";
    return "text-muted-foreground";
  };

  const getScoreLabel = (value: number) => {
    if (value >= 80) return "🔥 Viral Ready";
    if (value >= 60) return "💪 Strong";
    if (value >= 40) return "👍 Good";
    return "📝 Needs Work";
  };

  const getGradient = (value: number) => {
    if (value >= 80) return "from-twitter-retweet to-primary";
    if (value >= 60) return "from-primary to-blue-400";
    if (value >= 40) return "from-yellow-500 to-orange-400";
    return "from-muted-foreground to-muted";
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-lg">Virality Meter</h3>
        </div>
        <span className={cn("text-sm font-medium", getScoreColor(score))}>
          {getScoreLabel(score)}
        </span>
      </div>

      {/* Main Score */}
      <div className="flex items-center gap-6 mb-6">
        <div className="relative">
          <svg className="w-24 h-24 transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${score * 2.51} 251`}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--twitter-retweet))" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn("text-3xl font-bold", getScoreColor(score))}>{score}</span>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          {/* Hook Strength */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">Hook Strength</span>
              </div>
              <span className="text-sm text-muted-foreground">{hookStrength}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full transition-all duration-1000"
                style={{ width: `${hookStrength}%` }}
              />
            </div>
          </div>

          {/* Engagement Potential */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Engagement Potential</span>
              </div>
              <span className="text-sm text-muted-foreground">{engagementPotential}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-twitter-retweet rounded-full transition-all duration-1000"
                style={{ width: `${engagementPotential}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="flex items-start gap-2 p-3 bg-surface-elevated rounded-lg">
        <Flame className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground font-medium">Boost tip:</span> Add a controversial opinion or surprising statistic to your hook for +15% engagement.
        </p>
      </div>
    </div>
  );
};
