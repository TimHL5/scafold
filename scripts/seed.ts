import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PostData {
  postNumber: number;
  week: string;
  date: string;
  dayOfWeek: string;
  author: string;
  platform: string;
  postType: string;
  hook: string;
  body: string;
  visualDescription: string;
  cta: string;
  hashtags: string;
  postingTime: string;
}

interface IdeaData {
  author: string;
  platform: string;
  concept: string;
  fullDraft: string;
  category: string;
}

const posts: PostData[] = [
  {
    postNumber: 1,
    week: 'Week 0',
    date: 'Feb 22',
    dayOfWeek: 'Saturday',
    author: 'Tim',
    platform: 'LinkedIn',
    postType: 'The Teaser',
    hook: "I've spent 3 years helping 500+ students across 7 countries turn ideas into real products.",
    body: `Zero downloads.

That's what a student I mentored got after spending 3 months building a "smart grocery list" app. Beautiful code. Elegant UI. AI-powered everything.

Nobody wanted it.

He never asked a single person if they needed it. He asked ChatGPT instead. ChatGPT said "great idea." He believed it.

I've spent 3 years helping 500+ students across 7 countries turn ideas into real products. The pattern is always the same:

The idea doesn't kill you. The assumption does.

Every successful product I've seen started the exact same way — someone was genuinely pissed off about something. Not "I think there's a market opportunity." Just: "this is broken and it makes my life worse."

ChatGPT can write your code. Cursor can build your app. Replit can ship it tonight.

But none of them can tell you if anyone actually cares.

We've been working on something for 3 years that can.

More next week.`,
    visualDescription: '',
    cta: 'More next week',
    hashtags: '#buildinpublic #startups #AI',
    postingTime: '7-10 AM ET',
  },
  {
    postNumber: 2,
    week: 'Week 0',
    date: 'Feb 23',
    dayOfWeek: 'Sunday',
    author: 'Dylan',
    platform: 'LinkedIn',
    postType: 'The Co-Founder Tease',
    hook: "I've started 3 companies. Two of them failed.",
    body: `I've started 3 companies. Two of them failed.

Not because the tech was bad. Not because we couldn't ship. Not because we ran out of runway.

They failed because we solved problems that didn't exist.

We'd get excited about an idea. Ask ChatGPT for validation. It would say "promising market opportunity" with a straight face. We'd build for months.

Then we'd launch to silence.

The hardest lesson in startups isn't learning to build. It's learning to listen.

3 years ago, Tim and I decided to stop guessing. We built a system — tested it on 500+ people across 7 countries — that starts with one thing every person on Earth has in common:

Frustration.

Something's coming next week. It starts with one question.`,
    visualDescription: '',
    cta: "Something's coming next week",
    hashtags: '#entrepreneurship #startups #AI',
    postingTime: '7-10 AM ET',
  },
  {
    postNumber: 3,
    week: 'Week 0',
    date: 'Feb 24',
    dayOfWeek: 'Monday',
    author: 'Scafold',
    platform: 'LinkedIn',
    postType: 'The Manifesto',
    hook: "$45 billion invested in AI tools. $0 in helping figure out what's worth building.",
    body: `$45 billion.

That's how much has been invested in AI tools that help you build faster.

Code faster. Design faster. Deploy faster. Ship faster.

$0 has been invested in helping you figure out what's actually worth building.

Think about that.

We have mass-produced the ability to create. We've done nothing about the ability to choose.

AI can build anything.

It can't tell you what's worth building.

That's about to change.

We're Scafold. We have one question for you.

Coming this week.

scafold.ai`,
    visualDescription: '',
    cta: 'Coming this week → scafold.ai',
    hashtags: '',
    postingTime: '7-10 AM ET',
  },
  {
    postNumber: 4,
    week: 'Week 0',
    date: 'Feb 24',
    dayOfWeek: 'Monday',
    author: 'Scafold',
    platform: 'Instagram',
    postType: 'The Manifesto Visual',
    hook: '$45B invested in tools that help you build faster. $0 in what to build.',
    body: `$45B invested in tools that help you build faster. $0 invested in helping you figure out what to build. That changes this week. #WhatBugsYou #scafold #AI #startup`,
    visualDescription: 'Dark background, "AI can build anything." in white, "It can\'t tell you what\'s worth building." in vermillion. Scafold logo.',
    cta: 'That changes this week',
    hashtags: '#WhatBugsYou #scafold #AI #startup',
    postingTime: '9-11 AM or 6-8 PM ET',
  },
  {
    postNumber: 5,
    week: 'Week 0',
    date: 'Feb 25',
    dayOfWeek: 'Tuesday',
    author: 'Tim',
    platform: 'LinkedIn',
    postType: 'The Problem',
    hook: 'A student built a "smart grocery list" app. Launch day: zero downloads.',
    body: `A student I mentored last year built a "smart grocery list" app.

3 months of work. Beautiful UI. AI-powered suggestions. Clean code.

Launch day: zero downloads. Zero.

Not because the product was bad. Because nobody asked for it.

He validated the idea the way most people do — he asked ChatGPT. ChatGPT said "this has strong market potential." It generated a TAM analysis, competitor overview, and go-to-market strategy. All made up. All encouraging.

He built a solution to a problem he imagined.

This happens thousands of times a day. Smart, capable people. Building beautiful products. For markets that don't exist.

The problem isn't building. AI solved building.

The problem is knowing what to build.

That's an entirely different skill. And nobody's built a tool for it.

Until now.

Tomorrow I'll show you what we've been working on.`,
    visualDescription: '',
    cta: "Tomorrow I'll show you what we've been working on",
    hashtags: '',
    postingTime: '7-10 AM ET',
  },
  {
    postNumber: 6,
    week: 'Week 0',
    date: 'Feb 26',
    dayOfWeek: 'Wednesday',
    author: 'Scafold',
    platform: 'LinkedIn',
    postType: 'The Countdown',
    hook: 'Nobody is asking you the most important question.',
    body: `Nobody is asking you the most important question.

Not your professor. Not your investor. Not your AI assistant.

The question:

What bugs you?

Not "what's your startup idea." Not "what market do you want to disrupt." Not "describe your value proposition."

Just: what genuinely frustrates you about your daily life?

Your answer is worth more than you think.

Thursday. scafold.ai.`,
    visualDescription: '',
    cta: 'Thursday → scafold.ai',
    hashtags: '#WhatBugsYou',
    postingTime: '7-10 AM ET',
  },
  {
    postNumber: 7,
    week: 'Week 0',
    date: 'Feb 26',
    dayOfWeek: 'Wednesday',
    author: 'Scafold',
    platform: 'Instagram',
    postType: 'The Countdown Visual',
    hook: 'What bugs you about the world?',
    body: `What bugs you about the world? Your frustration might be worth more than you think. Thursday. Link in bio.`,
    visualDescription: 'Clean dark card — "What bugs you?" in large white text. "Thursday." below in vermillion.',
    cta: 'Thursday → Link in bio',
    hashtags: '#WhatBugsYou #scafold',
    postingTime: '9-11 AM or 6-8 PM ET',
  },
  {
    postNumber: 8,
    week: 'Week 0',
    date: 'Feb 27',
    dayOfWeek: 'Thursday',
    author: 'Dylan',
    platform: 'LinkedIn',
    postType: 'The Data Hook',
    hook: '8 billion people wake up every morning frustrated about something.',
    body: `8 billion people wake up every morning frustrated about something.

74% of Americans report chronic stress about at least one major area — money, health, work, relationships. That's not a survey insight. That's an untapped market of billions.

And yet: no structured way exists to turn that frustration into something useful.

No tool asks: "You're frustrated about X. Let's figure out if it's a real problem, who else has it, what solutions already exist, why they're failing, and what you could actually build."

That tool didn't exist. So Tim and I built it.

3 years. 500+ people. 7 countries. $50K in revenue from a completely manual process.

Tomorrow, we open it to everyone.

scafold.ai — go there tomorrow morning.`,
    visualDescription: '',
    cta: 'scafold.ai — go there tomorrow morning',
    hashtags: '',
    postingTime: '7-10 AM ET',
  },
  {
    postNumber: 9,
    week: 'Week 0',
    date: 'Feb 28',
    dayOfWeek: 'Friday',
    author: 'Tim',
    platform: 'LinkedIn',
    postType: 'The Eve-of-Launch',
    hook: 'Tomorrow morning, we go live. 3 years of work comes down to one question.',
    body: `Tomorrow morning, we go live.

3 years of work comes down to one question.

Not "what's your startup idea?" Not "describe your business model." Not "how big is your TAM?"

Just: what bugs you?

We built a platform that takes your frustration — the real, messy, personal kind — and turns it into something actionable. A validated problem. A real market. A solution blueprint.

500+ people have gone through this process across 7 countries. $50K in revenue. Tomorrow, everyone gets access.

It starts at scafold.ai.

Tell us what bugs you. We'll show you what it's worth.

See you in the morning.`,
    visualDescription: '',
    cta: 'See you in the morning → scafold.ai',
    hashtags: '#WhatBugsYou #scafold #launch #buildinpublic',
    postingTime: '7-10 AM ET',
  },
  {
    postNumber: 10,
    week: 'Week 0',
    date: 'Feb 28',
    dayOfWeek: 'Friday',
    author: 'Scafold',
    platform: 'Instagram',
    postType: 'Launch Eve Visual',
    hook: 'Tomorrow morning. One question.',
    body: `Tomorrow morning. One question. Your answer might be worth more than you think. What bugs you? → scafold.ai`,
    visualDescription: '"Tomorrow." in huge white text on dark background. "What bugs you?" smaller below. scafold.ai at bottom.',
    cta: 'What bugs you? → scafold.ai',
    hashtags: '#WhatBugsYou #scafold #launch',
    postingTime: '9-11 AM or 6-8 PM ET',
  },
  {
    postNumber: 11,
    week: 'Week 1',
    date: 'Mar 1',
    dayOfWeek: 'Saturday',
    author: 'Tim',
    platform: 'LinkedIn',
    postType: 'The Launch',
    hook: "It's live. scafold.ai. Tell us what frustrates you.",
    body: `It's live.

scafold.ai

Here's the deal: go there and tell us what frustrates you. That's it.

Not your startup idea. Not your elevator pitch. Not your business plan.

Just: what bugs you?

"I can't find a therapist who takes my insurance."
"Hiring contractors wastes 40% of my budget."
"My gym app is absolute garbage."
"I spend 3 hours meal prepping and still order DoorDash by Wednesday."

Every frustration is an unsolved problem.
Every unsolved problem is a market.
Every market is a company waiting to be built.

Most people can't see that. Scafold can.

We take your frustration and run it through a structured pipeline — problem identification, target audience, competitive mapping, solution design, execution plan.

You tell us what pisses you off. We tell you what to build.

3 years. 500+ people. 7 countries. $50K in revenue.

Today, we open the door.

→ scafold.ai`,
    visualDescription: '',
    cta: '→ scafold.ai',
    hashtags: '#WhatBugsYou #scafold #launch #startups #AI #buildinpublic',
    postingTime: '8:00 AM ET',
  },
  {
    postNumber: 12,
    week: 'Week 1',
    date: 'Mar 1',
    dayOfWeek: 'Saturday',
    author: 'Dylan',
    platform: 'LinkedIn',
    postType: 'The Product Story',
    hook: 'We just launched Scafold. Here\'s what it does in 30 seconds.',
    body: `We just launched Scafold. Here's what it does in 30 seconds:

1. You tell us what frustrates you
2. We determine if it's a real problem or just a bad day
3. We find who else has this exact pain
4. We map every existing solution and why they're failing
5. We design something better
6. We hand you the blueprint to build it

Most AI tools start at step 6.

We start at step 1.

That's the difference between building fast and building right. Between shipping a product nobody wants and shipping one people are desperate for.

3 years of doing this manually for 500+ people taught us something: the frustration IS the idea. Everything else is execution.

Go tell us what bugs you → scafold.ai`,
    visualDescription: '',
    cta: 'Go tell us what bugs you → scafold.ai',
    hashtags: '#WhatBugsYou #scafold',
    postingTime: '8:30 AM ET',
  },
  {
    postNumber: 13,
    week: 'Week 1',
    date: 'Mar 1',
    dayOfWeek: 'Saturday',
    author: 'Scafold',
    platform: 'LinkedIn',
    postType: 'The Brand Launch',
    hook: "What bugs you? That's all we want to know.",
    body: `What bugs you?

That's all we want to know.

Not your pitch. Not your plan. Not your credentials.

Just: what frustrates you about the world?

Go to scafold.ai and tell us. Takes 30 seconds.

We'll take your frustration and show you what it's worth.

Because here's the thing nobody tells you:

Everyone complains. Nobody gets paid for it.

Until now.

→ scafold.ai`,
    visualDescription: '',
    cta: '→ scafold.ai',
    hashtags: '#WhatBugsYou',
    postingTime: '9:00 AM ET',
  },
  {
    postNumber: 14,
    week: 'Week 1',
    date: 'Mar 1',
    dayOfWeek: 'Saturday',
    author: 'Scafold',
    platform: 'Instagram',
    postType: 'Launch Visual',
    hook: "It's live. Go to scafold.ai. Tell us what frustrates you.",
    body: `It's live. Go to scafold.ai. Tell us what frustrates you about the world. Your complaint might be worth more than you think. Link in bio.`,
    visualDescription: 'Bold "What bugs you?" centered. Dark background. scafold.ai. Clean, editorial.',
    cta: 'Link in bio → scafold.ai',
    hashtags: '#WhatBugsYou #scafold #launch #AI #buildinpublic',
    postingTime: '9-11 AM or 6-8 PM ET',
  },
  {
    postNumber: 15,
    week: 'Week 1',
    date: 'Mar 2',
    dayOfWeek: 'Sunday',
    author: 'Tim',
    platform: 'LinkedIn',
    postType: 'First Results',
    hook: '24 hours ago we launched Scafold. Here\'s what happened.',
    body: `24 hours ago we launched Scafold.

Here's what happened:

→ [X] people told us what bugs them
→ Top frustration category: [real data]
→ Most unexpected submission: [real data]
→ Countries represented: [real data]

But here's what surprised me most: people aren't sharing startup ideas.

They're sharing real pain.

"I can't find a dentist who doesn't try to upsell me on veneers."
"My landlord takes 3 weeks to fix anything."
"Group projects in college are fundamentally broken."

These aren't complaints. They're $100M+ problems hiding in plain sight.

Every single person who complains about something is identifying a market gap they don't know exists.

That's why we built Scafold. Not for founders with decks. For anyone who's ever been frustrated and thought "someone should fix this."

You ARE the someone.

Your turn → scafold.ai`,
    visualDescription: '',
    cta: 'Your turn → scafold.ai',
    hashtags: '#WhatBugsYou #scafold #buildinpublic',
    postingTime: '7-10 AM ET',
  },
  {
    postNumber: 16,
    week: 'Week 1',
    date: 'Mar 2',
    dayOfWeek: 'Sunday',
    author: 'Scafold',
    platform: 'Instagram',
    postType: 'Stats Card',
    hook: '[X] frustrations in 24 hours. Here\'s what\'s bugging people most.',
    body: `24 hours. [X] frustrations submitted. Here's what's bugging people most:

1. [Category]
2. [Category]
3. [Category]

What's bugging you? Link in bio.`,
    visualDescription: 'Stat card — "[X] frustrations in 24 hours" with top 3 categories listed. Dark bg, vermillion accents.',
    cta: "What's bugging you? Link in bio",
    hashtags: '#WhatBugsYou #scafold #data',
    postingTime: '9-11 AM or 6-8 PM ET',
  },
  {
    postNumber: 17,
    week: 'Week 1',
    date: 'Mar 3',
    dayOfWeek: 'Monday',
    author: 'Scafold',
    platform: 'LinkedIn',
    postType: 'Frustration of the Day #1',
    hook: 'I spend 3 hours meal prepping and still order DoorDash by Wednesday.',
    body: `FRUSTRATION OF THE DAY:

"I spend 3 hours every Sunday meal prepping and still end up ordering DoorDash by Wednesday."

You might read that and think: willpower problem.

We read it and see: a $4.2 billion market gap.

Here's what Scafold's pipeline found:

THE PROBLEM: Meal prep is designed for nutrition. Not for the reality that by Wednesday, you're exhausted, your schedule shifted, and chicken breast sounds revolting.

THE OPPORTUNITY: An AI meal system that adapts in real-time — swapping recipes when your schedule changes, your energy drops, or your fridge gets raided.

THE MARKET: 68% of Americans say they want to eat healthier but can't stick to the plan. That's not a niche. That's a generation.

This is what happens when you treat frustration as data instead of noise.

What are you frustrated about?

→ scafold.ai`,
    visualDescription: '',
    cta: 'What are you frustrated about? → scafold.ai',
    hashtags: '#WhatBugsYou #FrustrationOfTheDay #scafold',
    postingTime: '7-10 AM ET',
  },
  {
    postNumber: 18,
    week: 'Week 1',
    date: 'Mar 3',
    dayOfWeek: 'Monday',
    author: 'Tim',
    platform: 'Instagram',
    postType: 'Behind-the-Scenes',
    hook: "Day 3 of launch. Haven't left my desk.",
    body: `Day 3 of launch. Haven't left my desk.

The frustrations coming into scafold.ai are wild. Problems I'd never think to build for. Pain points that are simultaneously deeply personal and universally shared.

This is the data ChatGPT can't generate — real complaints from real people who aren't trying to sound smart. They're just mad about stuff.

That honesty is the whole product.

Building in public. More coming.`,
    visualDescription: 'Behind-the-scenes photo of Tim at his laptop/desk. Casual, real. No filter.',
    cta: 'Building in public. More coming.',
    hashtags: '#buildinpublic #founderslife #scafold #WhatBugsYou',
    postingTime: '9-11 AM or 6-8 PM ET',
  },
  {
    postNumber: 19,
    week: 'Week 1',
    date: 'Mar 4',
    dayOfWeek: 'Tuesday',
    author: 'Dylan',
    platform: 'LinkedIn',
    postType: 'The Data Insight',
    hook: "We've collected [X]+ frustrations in 4 days. Here's what nobody expected.",
    body: `We've collected [X]+ frustrations in 4 days.

Here's what nobody — including us — expected:

The #1 frustration category isn't tech.
It isn't money.
It isn't career.

It's [real data — health/daily routines/relationships].

Why this matters: every VC-backed AI company is building for knowledge workers. Productivity tools. Workflow automation. Enterprise dashboards.

Meanwhile, the things that actually keep people up at night are things nobody's building for.

This is what proprietary data looks like:
→ Not scraped from Reddit
→ Not generated by GPT
→ Not purchased from a data broker

Real frustrations. From real people. Collected by asking one question.

Every data point is a product waiting to be built.

Add yours → scafold.ai`,
    visualDescription: '',
    cta: 'Add yours → scafold.ai',
    hashtags: '#WhatBugsYou #scafold #data',
    postingTime: '7-10 AM ET',
  },
  {
    postNumber: 20,
    week: 'Week 1',
    date: 'Mar 4',
    dayOfWeek: 'Tuesday',
    author: 'Scafold',
    platform: 'Instagram',
    postType: 'Data Visualization',
    hook: '[X]+ frustrations collected. Here\'s what the data says.',
    body: `[X]+ frustrations collected. Here's what the data says:

[X]% — [Category]
[X]% — [Category]
[X]% — [Category]

The pain points nobody's building for. Until now.`,
    visualDescription: 'Data visualization — pie chart or bar chart of top frustration categories. Dark bg, vermillion/blue accents. Clean design.',
    cta: "The pain points nobody's building for. Until now.",
    hashtags: '#WhatBugsYou #scafold #data #AI',
    postingTime: '9-11 AM or 6-8 PM ET',
  },
  {
    postNumber: 21,
    week: 'Week 1',
    date: 'Mar 5',
    dayOfWeek: 'Wednesday',
    author: 'Scafold',
    platform: 'LinkedIn',
    postType: 'Frustration of the Day #2',
    hook: "I can't find a therapist who takes my insurance and has availability within 2 weeks.",
    body: `FRUSTRATION OF THE DAY:

"I can't find a therapist who takes my insurance and has availability within 2 weeks."

47 million Americans need mental health care. The average wait time? 48 days.

Here's what Scafold sees that most people miss:

PROBLEM: Insurance networks, availability calendars, and specialization matching exist in completely separate systems. You have to cross-reference them manually. While in crisis.

OPPORTUNITY: A unified matching engine — real-time cross-referencing of insurance, availability, specialization, patient preferences, and provider quality. One search. Instant results.

MARKET: $280B mental health market growing 5.1% annually. The matching layer alone could be a $2B+ opportunity.

Someone frustrated about finding a therapist just described a billion-dollar company.

What's your frustration hiding?

→ scafold.ai`,
    visualDescription: '',
    cta: "What's your frustration hiding? → scafold.ai",
    hashtags: '#WhatBugsYou #FrustrationOfTheDay #scafold #mentalhealth',
    postingTime: '7-10 AM ET',
  },
  {
    postNumber: 22,
    week: 'Week 1',
    date: 'Mar 5',
    dayOfWeek: 'Wednesday',
    author: 'Tim',
    platform: 'LinkedIn',
    postType: 'Building in Public Update',
    hook: 'Week 1 of Scafold. Real numbers. No vanity metrics.',
    body: `Week 1 of Scafold. Real numbers. No vanity metrics.

[X] frustrations collected
[X] emails on waitlist
[X] countries represented
[X] social impressions

What's working:
→ "What bugs you?" is the strongest hook I've ever tested. People want to share frustrations more than they want to share ideas.
→ LinkedIn is outperforming every other channel by 3x
→ Real frustration data beats generic startup advice for engagement. Always.

What's not working:
→ TikTok format hasn't clicked yet. Testing new approaches this week.
→ Mobile experience on the page needs work. Bounce rate too high.

What's next:
→ "Frustration of the Day" goes daily starting today
→ First weekly trend report drops Friday
→ Campus ambassador program kicks off next week

Building in public means showing you the actual scoreboard. Here it is.`,
    visualDescription: '',
    cta: 'Building in public means showing you the actual scoreboard.',
    hashtags: '#buildinpublic #scafold #WhatBugsYou #startups',
    postingTime: '7-10 AM ET',
  },
  {
    postNumber: 23,
    week: 'Week 1',
    date: 'Mar 6',
    dayOfWeek: 'Thursday',
    author: 'Dylan',
    platform: 'LinkedIn',
    postType: 'The Technical Edge',
    hook: "Every AI company is building copilots. We're building commercial instinct.",
    body: `Every AI company is building copilots.

We're building something fundamentally different: commercial instinct.

Here's the difference:

A copilot executes your instructions faster. It writes code. Generates designs. Automates workflows. It does what you tell it to do.

Commercial instinct tells you whether you should be doing it at all.

It takes a frustration and asks the questions founders forget:
→ Is this a real problem or just a bad Tuesday?
→ How many people have this exact pain, right now?
→ What solutions exist and why are they failing?
→ Is this a company or just a feature?
→ What's the fastest path from pain to product?

You can't prompt-engineer this. It's not a template. It's a pipeline built on 500+ real interactions across 7 countries.

That's Scafold. Not another wrapper. The thing that tells you what's worth wrapping in the first place.

→ scafold.ai`,
    visualDescription: '',
    cta: '→ scafold.ai',
    hashtags: '#scafold #AI #WhatBugsYou',
    postingTime: '7-10 AM ET',
  },
  {
    postNumber: 24,
    week: 'Week 1',
    date: 'Mar 6',
    dayOfWeek: 'Thursday',
    author: 'Scafold',
    platform: 'Instagram',
    postType: 'Comparison Card',
    hook: "AI copilots help you build faster. We help you build the right thing.",
    body: `AI copilots help you build faster. We help you build the right thing. There's a massive difference. And it starts with one question: what bugs you? → Link in bio`,
    visualDescription: 'Side-by-side comparison card. Left side: "AI Copilot — helps you build faster" Right side: "AI Commercial Instinct — tells you what\'s worth building." Scafold logo.',
    cta: 'What bugs you? → Link in bio',
    hashtags: '#WhatBugsYou #scafold #AI',
    postingTime: '9-11 AM or 6-8 PM ET',
  },
  {
    postNumber: 25,
    week: 'Week 1',
    date: 'Mar 7',
    dayOfWeek: 'Friday',
    author: 'Scafold',
    platform: 'LinkedIn',
    postType: 'Week 1 Trend Report',
    hook: "[X]+ frustrations collected this week. Here's what's bugging people.",
    body: `SCAFOLD WEEKLY FRUSTRATION REPORT — Week 1

[X]+ frustrations collected this week. Here's what's bugging people:

TOP 5 CATEGORIES:
1. [Category] — [X]%
2. [Category] — [X]%
3. [Category] — [X]%
4. [Category] — [X]%
5. [Category] — [X]%

MOST SUBMITTED: "[actual submission]"
MOST SURPRISING: "[actual submission]"
BIGGEST UNSOLVED: "[actual submission]"

This data doesn't exist anywhere else.

Not on Reddit. Not in any GPT training set. Not at any research firm.

Real humans. Real frustrations. Collected by asking one question.

Every single entry is a product waiting to be built.

Add your frustration to next week's report → scafold.ai`,
    visualDescription: '',
    cta: "Add your frustration to next week's report → scafold.ai",
    hashtags: '#WhatBugsYou #FrustrationReport #scafold',
    postingTime: '7-10 AM ET',
  },
  {
    postNumber: 26,
    week: 'Week 1',
    date: 'Mar 7',
    dayOfWeek: 'Friday',
    author: 'Tim',
    platform: 'LinkedIn',
    postType: 'Week 1 Reflection',
    hook: 'Week 1 is done. Honest reflection.',
    body: `Week 1 is done. Honest reflection:

What surprised me: People aren't sharing "startup ideas." They're sharing visceral, personal frustrations. Health. Relationships. Boring daily annoyances that slowly ruin their quality of life. The rawness caught me off guard.

What I learned: The distance between "frustration" and "business" is way shorter than anyone thinks. Almost every personal complaint, when you dig two layers deep, reveals a market nobody's serving.

What scares me: We're sitting on the beginning of something with no ceiling. A dataset of structured human pain points that no other company has. No one's even trying to collect this. And we're just starting.

What I know: This is real. The data proves it. The engagement proves it. The submissions prove it.

Week 2 starts Monday. Daily "Frustration of the Day" series. Campus ambassador activation. More data, more signal, more proof.

If you haven't told us what bugs you yet → scafold.ai

See you Monday.`,
    visualDescription: '',
    cta: "If you haven't told us what bugs you yet → scafold.ai",
    hashtags: '#scafold #WhatBugsYou #buildinpublic #week1',
    postingTime: '7-10 AM ET',
  },
  {
    postNumber: 27,
    week: 'Week 2',
    date: 'Mar 8',
    dayOfWeek: 'Monday',
    author: 'Tim',
    platform: 'LinkedIn',
    postType: 'The YC Angle',
    hook: 'I just hit submit on our Y Combinator application.',
    body: `I just hit submit on our Y Combinator application.

The question that took me 3 hours to answer wasn't about metrics or product or team.

It was: "What do you understand that everyone else doesn't?"

Here's what I wrote:

"8 billion people are frustrated about something every single day. The $45B AI tooling market helps them build solutions faster — but nobody helps them figure out which problems are worth solving. We're building the world's first frustration-to-execution pipeline. Not for founders. For everyone. And our dataset of real human frustrations is a moat that gets stronger with every single submission."

Whether YC says yes or no doesn't change what we know:

The frustration is the starting point. Everything else — the idea, the product, the company — follows from there.

→ scafold.ai`,
    visualDescription: '',
    cta: '→ scafold.ai',
    hashtags: '#YCombinator #scafold #WhatBugsYou #startups',
    postingTime: '7-10 AM ET',
  },
  {
    postNumber: 28,
    week: 'Week 2',
    date: 'Mar 8',
    dayOfWeek: 'Monday',
    author: 'Scafold',
    platform: 'LinkedIn',
    postType: 'Frustration of the Day #3',
    hook: 'Group projects in college are the single worst part of my education.',
    body: `FRUSTRATION OF THE DAY:

"Group projects in college are the single worst part of my education."

Every student who's ever carried a team just felt that in their chest.

Here's what Scafold sees:

PROBLEM: Group projects have zero accountability infrastructure. Free riders face no consequences. The person doing 80% of the work gets the same grade as the person doing 5%. Professors know it. Students know it. Nobody's fixing it.

OPPORTUNITY: An academic collaboration platform with built-in contribution tracking, peer accountability scoring, and workload distribution — where the grade reflects the work.

MARKET: 20M+ US college students. $8B EdTech market. Every university has this problem. Zero have a real solution.

One frustrated student just described the next major EdTech company.

What's your frustration worth?

→ scafold.ai`,
    visualDescription: '',
    cta: "What's your frustration worth? → scafold.ai",
    hashtags: '#WhatBugsYou #FrustrationOfTheDay #scafold #college #edtech',
    postingTime: '7-10 AM ET',
  },
  {
    postNumber: 29,
    week: 'Week 2',
    date: 'Mar 9',
    dayOfWeek: 'Tuesday',
    author: 'Dylan',
    platform: 'LinkedIn',
    postType: 'International Perspective',
    hook: 'We tested Scafold in 7 countries before launching in the US.',
    body: `We tested Scafold in 7 countries before launching in the US.

Hong Kong. Vietnam. Singapore. South Korea. And more.

Here's what nobody expected: frustrations don't have a passport.

A student in Ho Chi Minh City and a student in Boston are frustrated about the exact same things:
→ "I can't find a job that matches my actual skills"
→ "Healthcare is confusing and expensive"
→ "I waste hours on things that should be automated"

Different languages. Different economies. Different cultures.

Same pain.

That's why Scafold isn't a vertical tool. Frustration doesn't fit in a category. It doesn't have a demographic. It doesn't need a market segment.

It's just human.

8 billion people. 8 billion frustrations. One platform.

→ scafold.ai`,
    visualDescription: '',
    cta: '→ scafold.ai',
    hashtags: '#scafold #WhatBugsYou #global #startups',
    postingTime: '7-10 AM ET',
  },
  {
    postNumber: 30,
    week: 'Week 2',
    date: 'Mar 10',
    dayOfWeek: 'Wednesday',
    author: 'Scafold',
    platform: 'LinkedIn',
    postType: 'Frustration of the Day #4',
    hook: "I make $85K a year and I genuinely cannot tell you if I'm saving enough to retire.",
    body: `FRUSTRATION OF THE DAY:

"I make $85K a year and I genuinely cannot tell you if I'm saving enough to retire."

The personal finance industry is a $12 billion market. And it's failing the average person.

Here's what Scafold sees:

PROBLEM: Financial tools either oversimplify (save 20% of your income — thanks, very helpful) or drown you in complexity (here's a dashboard with 47 features you'll use twice). Nobody meets you where you actually are: anxious and confused.

OPPORTUNITY: An AI financial companion that starts with your specific anxiety — not a generic risk assessment — and builds an adaptive plan from there.

KEY INSIGHT: The entry point isn't "financial planning." It's "I'm stressed about money." Meet people at the frustration, not the solution.

That's the Scafold thesis. Start with the pain. End with the plan.

→ scafold.ai`,
    visualDescription: '',
    cta: '→ scafold.ai',
    hashtags: '#WhatBugsYou #FrustrationOfTheDay #scafold #fintech #personalfinance',
    postingTime: '7-10 AM ET',
  },
  {
    postNumber: 31,
    week: 'Week 2',
    date: 'Mar 10',
    dayOfWeek: 'Wednesday',
    author: 'Tim',
    platform: 'Instagram',
    postType: 'Campus Life',
    hook: 'Last semester at Boston College. Building an AI company.',
    body: `Last semester at Boston College. Building an AI company. Applying to YC. Incoming at PwC.

People keep asking: "Aren't you scared?"

More scared of not trying.

The data we're collecting at scafold.ai is unlike anything — real frustrations from real people, not generated, not scraped.

What bugs you? Tell us. Link in bio.`,
    visualDescription: 'Tim at BC campus, casual walking shot. No pose.',
    cta: 'What bugs you? Tell us. Link in bio.',
    hashtags: '#founderslife #bostonCollege #scafold #WhatBugsYou #buildinpublic',
    postingTime: '9-11 AM or 6-8 PM ET',
  },
  {
    postNumber: 32,
    week: 'Week 2',
    date: 'Mar 11',
    dayOfWeek: 'Thursday',
    author: 'Tim',
    platform: 'LinkedIn',
    postType: 'The PwC Decision Narrative',
    hook: 'I have a signed offer from PwC Technology Consulting.',
    body: `I have a signed offer from PwC Technology Consulting.

I also have a company with 500+ users, $50K revenue, and a proprietary dataset no competitor can touch.

Here's the decision tree in my head:

Path A: Take PwC. Learn consulting. Build a resume. Start something "eventually." Play it safe.

Path B: Go all-in on Scafold. Apply to YC. Bet on the data. Bet on myself. Risk everything.

Here's what nobody talks about: you don't have to choose.

I'm not dropping out. I'm not burning the PwC bridge. I'm building something real while keeping my floor intact.

And that's actually Scafold's whole philosophy.

We don't tell people to quit their jobs and start companies. We say: what bugs you? Then we figure out if it's worth your time.

Sometimes the answer is "quit everything and build this." Sometimes it's "keep your job, but here's a $500/month side project that solves a real problem."

Both are valid. Both start with the same question.

→ scafold.ai`,
    visualDescription: '',
    cta: '→ scafold.ai',
    hashtags: '#scafold #WhatBugsYou #career #buildinpublic #consulting',
    postingTime: '7-10 AM ET',
  },
  {
    postNumber: 33,
    week: 'Week 2',
    date: 'Mar 12',
    dayOfWeek: 'Friday',
    author: 'Scafold',
    platform: 'LinkedIn',
    postType: 'Weekly Frustration Report',
    hook: "[X]+ total frustrations collected. Here's what's new.",
    body: `SCAFOLD WEEKLY FRUSTRATION REPORT — Week 2

[X]+ total frustrations collected. Here's what's new:

TRENDING UP:
→ [Category] frustrations increased [X]% from last week
→ [Category] cracked the top 5 for the first time

MOST SUBMITTED: "[actual submission]"
MOST BUILDABLE: "[actual submission]" — estimated [X]M addressable market

SIGNALS:
→ [X] new countries represented
→ Average frustration length: [X] words (people are getting more specific)
→ [X]% of submissions reference a product that's already failing them

The dataset gets more valuable every week. Your frustration makes it stronger.

→ scafold.ai`,
    visualDescription: '',
    cta: '→ scafold.ai',
    hashtags: '#WhatBugsYou #FrustrationReport #scafold',
    postingTime: '7-10 AM ET',
  },
  {
    postNumber: 34,
    week: 'Week 3-4',
    date: 'Mar 15-28',
    dayOfWeek: 'TBD',
    author: 'Tim',
    platform: 'LinkedIn',
    postType: 'The Numbers Post',
    hook: '30 days of Scafold. Real numbers.',
    body: `30 days of Scafold. Real numbers:

[X] frustrations collected
[X] waitlist signups
[X] countries
[X] unique problem categories identified
[X]M+ social impressions
[X] campus ambassadors active

But here's what the metrics can't capture:

→ The student who submitted "I can't afford textbooks" — and realized she was describing a $10B problem nobody's solving well
→ The small business owner who said "hiring is broken" — and now has a blueprint for a recruiting tool
→ The 47 separate people who submitted variations of "I can't find a therapist"

When 47 strangers independently describe the same pain, that's not a complaint.

That's a market screaming for a solution.

The data is the moat. And every day it gets deeper.

If you haven't told us what bugs you yet, you're sitting on an insight you don't know you have.

→ scafold.ai`,
    visualDescription: '',
    cta: '→ scafold.ai',
    hashtags: '#scafold #WhatBugsYou #buildinpublic #30days',
    postingTime: '7-10 AM ET',
  },
  {
    postNumber: 35,
    week: 'Week 3-4',
    date: 'Mar 15-28',
    dayOfWeek: 'TBD',
    author: 'Dylan',
    platform: 'LinkedIn',
    postType: 'The Moat Post',
    hook: "Every founder talks about moats. Most don't have one. Here's ours.",
    body: `Every founder talks about moats. Most of them don't have one.

Here's ours:

Day 1: Zero frustrations in our database.
Day 30: [X]+ structured, categorized, real human pain points that no other company on the planet has.

This data can't be:
→ Scraped from Reddit (it doesn't exist there)
→ Generated by GPT (it's not trained on this)
→ Purchased from a broker (nobody collects it)
→ Replicated by a competitor (it took 3 years and earned community trust)

Every new submission makes the dataset smarter. Every smarter dataset makes the AI better. Every better AI makes each submission more valuable.

That's not a product. That's a flywheel.

And it's spinning faster every week.

→ scafold.ai`,
    visualDescription: '',
    cta: '→ scafold.ai',
    hashtags: '#scafold #WhatBugsYou #moat #startups #AI',
    postingTime: '7-10 AM ET',
  },
  {
    postNumber: 36,
    week: 'Week 3-4',
    date: 'Mar 15-28',
    dayOfWeek: 'TBD',
    author: 'Scafold',
    platform: 'LinkedIn',
    postType: 'Challenge Post',
    hook: 'Drop your biggest daily frustration in the comments.',
    body: `Drop your biggest daily frustration in the comments.

Rules: No startup jargon. No "I think there's an opportunity in..." No pitch-speak.

Just: what genuinely annoys you about your everyday life?

We'll pick 3 from the comments and show exactly how Scafold would break each one down — the problem, the market size, the competitive landscape, and the execution blueprint.

Your complaint might be a company.

Let's find out.

(Or submit privately at scafold.ai)`,
    visualDescription: '',
    cta: 'Or submit privately at scafold.ai',
    hashtags: '#WhatBugsYou #scafold',
    postingTime: '7-10 AM ET',
  },
  {
    postNumber: 37,
    week: 'Week 3-4',
    date: 'Mar 15-28',
    dayOfWeek: 'TBD',
    author: 'Tim',
    platform: 'LinkedIn',
    postType: 'The Senior Year Post',
    hook: "Typical BC senior spring: job apps, formals, coasting. My senior spring: applying to YC.",
    body: `Typical BC senior spring: job apps, formals, senior week, coasting to graduation.

My senior spring: applying to Y Combinator, building an AI company, reading frustration data at 2am, and drinking way too much Hillside coffee.

I'm not saying this to flex. I'm saying it because 12 months ago, "entrepreneur" was a line on my resume. Not something I actually was.

What changed: I realized the skills I've been learning for 4 years — financial modeling, market analysis, user research — weren't designed for PowerPoint presentations.

They were designed for this.

Scafold started as an experiment: "can we help people validate ideas?" It became something much bigger: a platform that turns the universal human experience of being frustrated into structured, actionable solutions.

I'm terrified. I'm energized. I'm running on 4 hours of sleep.

I've never been more alive.

If you're in college and you're sitting on an idea: don't wait for the "right time." Start with what bugs you.

→ scafold.ai`,
    visualDescription: '',
    cta: '→ scafold.ai',
    hashtags: '#scafold #WhatBugsYou #college #seniorYear #bostonCollege #buildinpublic',
    postingTime: '7-10 AM ET',
  },
];

const ideas: IdeaData[] = [
  // Scafold Brand Ideas
  {
    author: 'Scafold',
    platform: 'LinkedIn',
    concept: 'Stop asking ChatGPT if your startup idea is good. It will always say yes.',
    fullDraft: `Stop asking ChatGPT if your startup idea is good. It will always say yes. It's a language model optimized for helpfulness, not honesty. It can't tell you if real people have this problem. It can't validate willingness to pay. It can't map the competitive landscape with actual commercial judgment. We built something that can. It starts with one question.`,
    category: 'Contrarian',
  },
  {
    author: 'Scafold',
    platform: 'LinkedIn',
    concept: "We collected 500+ frustrations in 72 hours. Here's what surprised us.",
    fullDraft: `We collected 500+ frustrations from real people in 72 hours. Here's what surprised us: 34% are about work/career (not what we expected). 22% are about health/wellness. 18% are about money. The remaining 26% are things nobody is building for. The data is the moat.`,
    category: 'Data',
  },
  {
    author: 'Scafold',
    platform: 'LinkedIn',
    concept: '8 billion people. Every one has frustrations. Zero have a structured way to use them.',
    fullDraft: `8 billion people on Earth. Every single one of them has frustrations. Zero of them have a structured way to turn those frustrations into solutions. Until now.`,
    category: 'Manifesto',
  },
  {
    author: 'Scafold',
    platform: 'LinkedIn',
    concept: '500+ students. 7 countries. $50K in revenue. Started from our own frustration.',
    fullDraft: `500+ students. 7 countries. $50K in revenue. 3 years. And it started because Tim and I were frustrated that the smartest people we knew had no way to validate if their ideas were real. The irony isn't lost on us.`,
    category: 'Social Proof',
  },
  {
    author: 'Scafold',
    platform: 'LinkedIn',
    concept: 'The Scafold pipeline in 60 seconds.',
    fullDraft: `The Scafold pipeline in 60 seconds: 1. You tell us what bugs you. 2. We identify if it's a real problem. 3. We find who else has it. 4. We map existing solutions (and why they fail). 5. We design something better. 6. We give you the blueprint. Most AI tools start at step 6. We start at step 1.`,
    category: 'Process',
  },
  {
    author: 'Scafold',
    platform: 'LinkedIn',
    concept: 'Reply with one thing that frustrates you. We\'ll analyze 3 from comments.',
    fullDraft: `Reply with one thing that frustrates you about your daily life. We'll pick 3 and show exactly how Scafold would turn each one into a validated business idea. No AI fluff. Real analysis.`,
    category: 'Challenge',
  },
  {
    author: 'Scafold',
    platform: 'LinkedIn',
    concept: '1,000 frustrations collected. Here\'s what Gen Z actually wants built.',
    fullDraft: `1,000 frustrations collected. Here's what the data tells us about what Gen Z actually wants built: [key findings]. The takeaway? Everyone talks about innovation. Nobody talks about listening.`,
    category: 'Milestone',
  },
  // Tim Ideas
  {
    author: 'Tim',
    platform: 'LinkedIn',
    concept: "I'm 22. Signed PwC offer. About to ask YC to let me build something instead.",
    fullDraft: `I'm 22. I have a signed offer from PwC. And I'm about to ask Y Combinator to let me build something instead.`,
    category: 'PwC Tension',
  },
  {
    author: 'Tim',
    platform: 'LinkedIn',
    concept: "Last semester at BC. Everyone's celebrating. I'm analyzing frustration data at 2am.",
    fullDraft: `Last semester at Boston College. Everyone's celebrating. I'm analyzing frustration data at 2am. Here's why I wouldn't trade it.`,
    category: 'Senior Year',
  },
  {
    author: 'Tim',
    platform: 'LinkedIn',
    concept: 'Most people use ChatGPT to get answers. We built something that asks better questions.',
    fullDraft: `Most people use ChatGPT to get answers. We built something that asks better questions. The difference is everything.`,
    category: 'ChatGPT vs Scafold',
  },
  {
    author: 'Tim',
    platform: 'LinkedIn',
    concept: "500 people told us their frustrations. One keeps me up at night about coding bootcamps.",
    fullDraft: `500 people told us their biggest frustrations. One keeps me up at night: "I spent $50K on a coding bootcamp and still can't get hired." That's not a complaint. That's a $10B problem.`,
    category: 'Powerful Frustration',
  },
  {
    author: 'Tim',
    platform: 'LinkedIn',
    concept: "BC taught me business plans. Didn't teach me how to find problems worth solving.",
    fullDraft: `Boston College taught me how to write business plans. It didn't teach me how to find problems worth solving. That's what Scafold fixes.`,
    category: 'BC Insight',
  },
  {
    author: 'Tim',
    platform: 'LinkedIn',
    concept: "Building an AI company without ever taking an AI class.",
    fullDraft: `I'm building an AI company and I've never taken an AI class. Turns out that might be an advantage — I'm not constrained by how it's "supposed" to work.`,
    category: 'No AI Class',
  },
  // Dylan Ideas
  {
    author: 'Dylan',
    platform: 'LinkedIn',
    concept: "3 companies. First two failed because we built the wrong thing.",
    fullDraft: `I've started 3 companies. The first two failed because we built the wrong thing. Scafold exists so nobody else has to make that mistake.`,
    category: '3-Company Arc',
  },
  {
    author: 'Dylan',
    platform: 'LinkedIn',
    concept: "3 years manual guidance for 500+ people. Now automating with AI.",
    fullDraft: `We spent 3 years manually guiding 500+ people through frustration-to-product. Now we're automating it with AI. Here's what we kept human — and what we didn't.`,
    category: 'Manual to Automated',
  },
  {
    author: 'Dylan',
    platform: 'LinkedIn',
    concept: "The most important dataset in AI isn't training data. It's frustration data.",
    fullDraft: `The most important dataset in AI isn't training data. It's frustration data. Here's why.`,
    category: 'Frustration Data as Moat',
  },
  {
    author: 'Dylan',
    platform: 'LinkedIn',
    concept: "From Hong Kong to Singapore — what I learned about universal frustration.",
    fullDraft: `From Hong Kong to Ho Chi Minh City to Singapore — what I learned about universal human frustration by building across 7 countries.`,
    category: 'International Learning',
  },
  {
    author: 'Dylan',
    platform: 'LinkedIn',
    concept: "We stopped asking 'What's your startup idea?' Results improved 10x.",
    fullDraft: `The product decision that changed everything: We stopped asking "What's your startup idea?" and started asking "What bugs you?" Results improved 10x.`,
    category: 'Product Pivot',
  },
  {
    author: 'Dylan',
    platform: 'LinkedIn',
    concept: "How a CEO and CFO actually build an AI company together.",
    fullDraft: `Tim handles the numbers. I handle the product. Here's how a CEO and CFO actually build an AI company together — including the fights.`,
    category: 'CEO + CFO Dynamic',
  },
  {
    author: 'Dylan',
    platform: 'LinkedIn',
    concept: "Everyone's building AI copilots. We're building AI commercial instinct.",
    fullDraft: `Everyone's building AI copilots. We're building AI commercial instinct. One does what you ask. The other tells you what's worth asking.`,
    category: 'Copilot vs Instinct',
  },
  {
    author: 'Dylan',
    platform: 'LinkedIn',
    concept: "Samsung, Stripe, OpenAI speakers came to our events.",
    fullDraft: `Samsung, Stripe, OpenAI — speakers from these companies came to our events. Here's what they said about the problem we're solving.`,
    category: 'Speaker Series',
  },
  // Instagram Ideas
  {
    author: 'Scafold',
    platform: 'Instagram',
    concept: 'Frustration Quote Card — dark navy, vermillion accent, single quote.',
    fullDraft: '',
    category: 'Visual - Quote Card',
  },
  {
    author: 'Scafold',
    platform: 'Instagram',
    concept: 'Data Visualization — pie chart of frustration categories.',
    fullDraft: '',
    category: 'Visual - Data',
  },
  {
    author: 'Scafold',
    platform: 'Instagram',
    concept: '5 Frustrations Hiding Billion-Dollar Companies — carousel.',
    fullDraft: '',
    category: 'Carousel',
  },
  {
    author: 'Scafold',
    platform: 'Instagram',
    concept: 'Founder Quote — "Everyone complains. Nobody gets paid for it. Until now."',
    fullDraft: '',
    category: 'Visual - Quote',
  },
];

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.idea.deleteMany();
  await prisma.post.deleteMany();

  // Insert posts
  for (let i = 0; i < posts.length; i++) {
    const p = posts[i];
    await prisma.post.create({
      data: {
        postNumber: p.postNumber,
        week: p.week,
        date: p.date,
        dayOfWeek: p.dayOfWeek,
        author: p.author,
        platform: p.platform,
        postType: p.postType,
        hook: p.hook,
        body: p.body,
        visualDescription: p.visualDescription,
        cta: p.cta,
        hashtags: p.hashtags,
        postingTime: p.postingTime,
        status: 'not_started',
        notes: '',
        sortOrder: i + 1,
      },
    });
  }

  console.log(`Inserted ${posts.length} posts.`);

  // Insert ideas
  for (const idea of ideas) {
    await prisma.idea.create({
      data: {
        author: idea.author,
        platform: idea.platform,
        concept: idea.concept,
        fullDraft: idea.fullDraft,
        category: idea.category,
        addedToQueue: false,
      },
    });
  }

  console.log(`Inserted ${ideas.length} ideas.`);
  console.log('Seed complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
