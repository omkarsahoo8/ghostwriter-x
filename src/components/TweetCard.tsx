import { MessageCircle, Repeat2, Heart, Share, MoreHorizontal, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TweetCardProps {
  content: string;
  index: number;
  totalTweets: number;
  isTyping?: boolean;
  delay?: number;
}

export const TweetCard = ({ content, index, totalTweets, isTyping = false, delay = 0 }: TweetCardProps) => {
  const [liked, setLiked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);

  const randomEngagement = {
    replies: Math.floor(Math.random() * 50) + 5,
    retweets: Math.floor(Math.random() * 200) + 10,
    likes: Math.floor(Math.random() * 500) + 50,
  };

  return (
    <article
      className="animate-fade-in-up border-b border-border p-4 hover:bg-surface-hover/50 transition-colors"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-primary-foreground font-bold text-lg">
            AI
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1">
              <span className="font-bold hover:underline cursor-pointer">ThreadAI Writer</span>
              <BadgeCheck className="w-5 h-5 text-verified fill-verified" />
              <span className="text-muted-foreground">@threadai_ghost</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground text-sm">just now</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>

          {/* Thread indicator */}
          <p className="text-xs text-primary mb-2 font-medium">
            Tweet {index + 1} of {totalTweets}
          </p>

          {/* Tweet content */}
          <p className={cn(
            "text-[15px] leading-relaxed whitespace-pre-wrap mb-3",
            isTyping && "typing-cursor"
          )}>
            {content}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between max-w-md -ml-2">
            <Button variant="icon-reply" size="icon" className="h-9 w-9 group">
              <MessageCircle className="w-5 h-5 text-muted-foreground group-hover:text-twitter-reply" />
              <span className="sr-only">Reply</span>
            </Button>
            <div className="flex items-center gap-1">
              <Button 
                variant="icon-retweet" 
                size="icon" 
                className="h-9 w-9 group"
                onClick={() => setRetweeted(!retweeted)}
              >
                <Repeat2 className={cn(
                  "w-5 h-5",
                  retweeted ? "text-twitter-retweet" : "text-muted-foreground group-hover:text-twitter-retweet"
                )} />
              </Button>
              <span className={cn(
                "text-sm",
                retweeted ? "text-twitter-retweet" : "text-muted-foreground"
              )}>
                {randomEngagement.retweets + (retweeted ? 1 : 0)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="icon-like" 
                size="icon" 
                className="h-9 w-9 group"
                onClick={() => setLiked(!liked)}
              >
                <Heart className={cn(
                  "w-5 h-5 transition-all",
                  liked ? "text-twitter-like fill-twitter-like scale-110" : "text-muted-foreground group-hover:text-twitter-like"
                )} />
              </Button>
              <span className={cn(
                "text-sm",
                liked ? "text-twitter-like" : "text-muted-foreground"
              )}>
                {randomEngagement.likes + (liked ? 1 : 0)}
              </span>
            </div>
            <Button variant="icon" size="icon" className="h-9 w-9 group">
              <Share className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};
