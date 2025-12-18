import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Content moderation - filter unethical/harmful requests
const BLOCKED_PATTERNS = [
  /hate\s*(speech|crime)/i,
  /discriminat(e|ion|ory)/i,
  /racist|sexist|homophobic/i,
  /violence|harm|kill|attack/i,
  /illegal\s*(activity|drug|weapon)/i,
  /scam|fraud|phishing/i,
  /harassment|bullying|stalk/i,
  /exploit(ation)?|abuse/i,
  /misinformation|fake\s*news/i,
  /self.?harm|suicide/i,
  /terroris(t|m)/i,
  /child\s*(abuse|exploit)/i,
];

const isContentSafe = (text: string): boolean => {
  return !BLOCKED_PATTERNS.some(pattern => pattern.test(text));
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, persona, tone, tweetCount } = await req.json();
    
    // Validate input
    if (!topic || typeof topic !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Topic is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Content safety check
    if (!isContentSafe(topic)) {
      console.log('Blocked unsafe content request:', topic.substring(0, 50));
      return new Response(
        JSON.stringify({ 
          error: 'Content policy violation', 
          message: 'Your request contains content that violates our usage policy. Please rephrase your topic to be constructive and appropriate.' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const XAI_API_KEY = Deno.env.get('XAI_API_KEY');
    if (!XAI_API_KEY) {
      console.error('XAI_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Determine style based on persona
    const isStructured = persona === 'professional' || persona === 'student';
    
    const styleGuide = isStructured 
      ? `Use a structured format with:
         - Clear bullet points (→, •, 1., 2., etc.)
         - Organized sections with headers like "Key insight #1:", "Finding #2:", etc.
         - Professional language with data points when relevant
         - End with actionable takeaways or summary points`
      : `Use a casual, fun format with:
         - Conversational paragraphs (no bullet points)
         - Plenty of emojis throughout (😭, ✨, 💀, 🔥, 💙, etc.)
         - Lowercase casual writing style
         - Relatable, meme-worthy language
         - Words like "bestie", "literally", "lowkey", "ngl", etc.`;

    const toneDescriptions: Record<string, string> = {
      witty: 'clever, humorous, with sharp observations',
      curious: 'questioning, exploratory, seeking to understand',
      bold: 'confident, contrarian, challenging the status quo',
      empathetic: 'understanding, supportive, emotionally aware'
    };

    const personaDescriptions: Record<string, string> = {
      professional: 'a seasoned industry expert sharing insights',
      student: 'a curious learner sharing discoveries and growth',
      fun: 'a relatable friend sharing life observations',
      disruptor: 'a provocative thinker challenging norms'
    };

    const systemPrompt = `You are Ghost-Scriber, an expert Twitter/X thread ghostwriter. Your task is to create viral-worthy threads that follow best practices for engagement.

CRITICAL RULES:
1. Each tweet MUST be under 280 characters
2. Follow the "Hook-Body-CTA" narrative arc
3. First tweet must be a compelling hook that stops scrollers
4. Include 2-3 trending hashtags ONLY in the final tweet
5. NEVER generate harmful, unethical, discriminatory, or misleading content
6. Stay strictly on topic - the thread must be relevant to the user's requested subject
7. Do not include any hate speech, violence, illegal activities, or harmful advice

${styleGuide}

You are writing as ${personaDescriptions[persona] || 'a thought leader'}.
The tone should be ${toneDescriptions[tone] || 'engaging and authentic'}.`;

    const userPrompt = `Create a ${tweetCount}-tweet thread about: "${topic}"

Remember:
- Each tweet under 280 characters
- Strong hook in tweet 1
- Hashtags only in the final tweet
- Stay on topic and be constructive`;

    console.log('Calling Grok API for thread generation:', { persona, tone, tweetCount, topicPreview: topic.substring(0, 30) });

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${XAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-3-latest',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Grok API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Failed to generate thread' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error('No content in Grok response:', data);
      return new Response(
        JSON.stringify({ error: 'No content generated' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse the response into individual tweets
    const tweets = content
      .split(/\n\n+/)
      .map((t: string) => t.trim())
      .filter((t: string) => t.length > 0 && t.length <= 350) // Allow some buffer
      .map((t: string) => t.replace(/^(\d+[.)\/:]\s*|Tweet\s*\d+[.:]\s*)/i, '').trim())
      .filter((t: string) => t.length > 10);

    // Ensure we have the right number of tweets
    const finalTweets = tweets.slice(0, tweetCount);

    console.log('Successfully generated', finalTweets.length, 'tweets');

    return new Response(
      JSON.stringify({ tweets: finalTweets }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-thread function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
