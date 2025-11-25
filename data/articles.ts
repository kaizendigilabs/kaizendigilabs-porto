export type ArticleAuthor = {
  name: string
  role: string
  avatar: string
  bio: string
  socials: { label: string; href: string }[]
}

export type ArticleOutlineItem = {
  id: string
  title: string
  level?: 1 | 2
}

export type ArticleContentBlock =
  | { type: 'heading'; id: string; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'image'; src: string; alt: string; caption?: string }

export type ArticleRecord = {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string // ISO string
  created_at?: string // From Supabase
  dateLabel: string
  readTime: string
  views: number
  likes: number
  comments: number
  imageURL?: string
  heroImage: string
  tags: string[]
  outline: ArticleOutlineItem[]
  authorInfo: ArticleAuthor
  content: ArticleContentBlock[]
}

const articleAuthors: Record<string, ArticleAuthor> = {
  samantha: {
    name: 'Samantha Carter',
    role: 'Brand Strategist',
    avatar: '/images/avatars/samantha.jpg',
    bio: 'Samantha helps early-stage founders uncover the story, tone, and rituals that make their brand memorable.',
    socials: [
      { label: 'LinkedIn', href: '#' },
      { label: 'X', href: '#' },
    ],
  },
  michael: {
    name: 'Michael Lee',
    role: 'Social Media Strategist',
    avatar: '/images/avatars/michael.jpg',
    bio: 'Michael designs social ecosystems that feel like communities, not billboards.',
    socials: [
      { label: 'LinkedIn', href: '#' },
      { label: 'X', href: '#' },
    ],
  },
  alicia: {
    name: 'Alicia Gomez',
    role: 'Creative Director',
    avatar: '/images/avatars/alicia.jpg',
    bio: 'Alicia blends narrative structure with visual direction to create campaigns that stick.',
    socials: [
      { label: 'Dribbble', href: '#' },
      { label: 'Behance', href: '#' },
    ],
  },
  sarah: {
    name: 'Sarah Miller',
    role: 'UX Research Lead',
    avatar: '/images/avatars/sarah.jpg',
    bio: 'Sarah turns messy qualitative insights into crisp, prioritized product decisions.',
    socials: [{ label: 'LinkedIn', href: '#' }],
  },
  maya: {
    name: 'Maya Stevens',
    role: 'Brand Designer',
    avatar: '/images/avatars/maya.jpg',
    bio: 'Maya builds visual systems that scale from pitch decks all the way to billboards.',
    socials: [{ label: 'Dribbble', href: '#' }],
  },
  jessica: {
    name: 'Jessica Parker',
    role: 'SEO & Content Strategist',
    avatar: '/images/avatars/jessica.jpg',
    bio: 'Jessica helps brands show up where it matters in search results that real humans actually click.',
    socials: [{ label: 'LinkedIn', href: '#' }],
  },
  rafael: {
    name: 'Rafael Johnson',
    role: 'Lifecycle Marketer',
    avatar: '/images/avatars/rafael.jpg',
    bio: 'Rafael designs lifecycle programs that quietly compound into serious revenue.',
    socials: [
      { label: 'LinkedIn', href: '#' },
      { label: 'X', href: '#' },
    ],
  },
  alex: {
    name: 'Alex Rivera',
    role: 'Product Designer',
    avatar: '/images/avatars/alex.jpg',
    bio: 'Alex works where product, brand, and interface design overlap.',
    socials: [
      { label: 'Dribbble', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
  },
}

export const articles: ArticleRecord[] = [
  {
    slug: 'personal-branding-2023',
    title: 'The Power of Personal Branding in The 2023 Digital Age',
    excerpt:
      'Personal branding is no longer a vanity project. It is the operating system behind the opportunities, rooms, and relationships you get access to.',
    category: 'Branding & Identity',
    author: 'Samantha Carter',
    date: '2023-03-15',
    dateLabel: 'Mar 15, 2023',
    readTime: '8 min read',
    views: 18450,
    likes: 1320,
    comments: 244,
    imageURL: '/images/articles/personal-branding-hero.jpg',
    heroImage: '/images/articles/personal-branding-hero.jpg',
    tags: ['Branding & Identity', 'Strategy'],
    outline: [
      { id: 'signal', title: 'Turn Your Experience into a Signal', level: 1 },
      { id: 'systems', title: 'Build Simple Personal Brand Systems', level: 2 },
      { id: 'consistency', title: 'Consistency Beats Viral Moments', level: 1 },
    ],
    authorInfo: articleAuthors.samantha,
    content: [
      {
        type: 'heading',
        id: 'signal',
        text: 'Turn Your Experience into a Signal',
      },
      {
        type: 'paragraph',
        text: 'The internet collapses geography. Instead of waiting for the right people to stumble into your orbit, you can design a signal that quietly attracts them.',
      },
      {
        type: 'heading',
        id: 'systems',
        text: 'Build Simple Personal Brand Systems',
      },
      {
        type: 'paragraph',
        text: 'Personal brands fall apart when they depend on motivation. Systems survive the weeks where you feel busy, tired, or unsure.',
      },
      {
        type: 'heading',
        id: 'consistency',
        text: 'Consistency Beats Viral Moments',
      },
      {
        type: 'paragraph',
        text: 'Viral posts introduce you to strangers. Consistent publishing turns strangers into people who trust you enough to buy, hire, or refer.',
      },
    ],
  },
  {
    slug: 'social-media-engagement',
    title: 'Social Media Engagement Tactics That Actually Build Community',
    excerpt:
      'Most brands chase likes. The ones that win design rituals, recognition, and spaces where people feel seen.',
    category: 'Social Media Marketing',
    author: 'Michael Lee',
    date: '2023-01-09',
    dateLabel: 'Jan 9, 2023',
    readTime: '7 min read',
    views: 13210,
    likes: 980,
    comments: 188,
    imageURL: '/images/articles/social-engagement-hero.jpg',
    heroImage: '/images/articles/social-engagement-hero.jpg',
    tags: ['Social Media Marketing', 'Community'],
    outline: [
      { id: 'rituals', title: 'Design Tiny Rituals', level: 1 },
      { id: 'recognition', title: 'Use Recognition Loops', level: 2 },
      { id: 'platforms', title: 'Respect Platform Intent', level: 1 },
    ],
    authorInfo: articleAuthors.michael,
    content: [
      {
        type: 'heading',
        id: 'rituals',
        text: 'Design Tiny Rituals',
      },
      {
        type: 'paragraph',
        text: 'Healthy communities are built on repeated, shared moments. Think weekly prompts, monthly recaps, or recurring spotlights.',
      },
      {
        type: 'heading',
        id: 'recognition',
        text: 'Use Recognition Loops',
      },
      {
        type: 'paragraph',
        text: 'When people contribute, respond in a way that makes them want to come back. Recognition is more scalable than rewards.',
      },
      {
        type: 'heading',
        id: 'platforms',
        text: 'Respect Platform Intent',
      },
      {
        type: 'paragraph',
        text: 'People open each platform for a specific emotional job. Design your content to meet that job instead of fighting it.',
      },
    ],
  },
  {
    slug: 'storytelling-campaigns',
    title: 'Designing Campaigns with Visual Storytelling at the Core',
    excerpt:
      'Before you pick fonts or color palettes, you need a sequence of emotional beats you want your audience to walk through.',
    category: 'Content Marketing',
    author: 'Alicia Gomez',
    date: '2022-11-28',
    dateLabel: 'Nov 28, 2022',
    readTime: '9 min read',
    views: 10120,
    likes: 730,
    comments: 164,
    imageURL: '/images/articles/storytelling-hero.jpg',
    heroImage: '/images/articles/storytelling-hero.jpg',
    tags: ['Content Marketing', 'Campaigns'],
    outline: [
      { id: 'beats', title: 'Map the Emotional Beats First', level: 1 },
      { id: 'frames', title: 'Think in Frames, Not Screens', level: 2 },
      { id: 'coherence', title: 'Maintain Visual Coherence', level: 1 },
    ],
    authorInfo: articleAuthors.alicia,
    content: [
      {
        type: 'heading',
        id: 'beats',
        text: 'Map the Emotional Beats First',
      },
      {
        type: 'paragraph',
        text: 'Great campaigns feel like stories, not slideshows. Start by writing the emotional beats your audience should experience.',
      },
      {
        type: 'heading',
        id: 'frames',
        text: 'Think in Frames, Not Screens',
      },
      {
        type: 'paragraph',
        text: 'When you storyboard frames, it becomes easier to adapt the same story across platforms, ratios, and placements.',
      },
      {
        type: 'heading',
        id: 'coherence',
        text: 'Maintain Visual Coherence',
      },
      {
        type: 'paragraph',
        text: 'Your audience should be able to recognize you instantly, even when your logo is nowhere on screen.',
      },
    ],
  },
  {
    slug: 'ai-bubble-2025',
    title: 'The AI Bubble Is About to Burst, But the Next Wave Is Already Growing',
    excerpt:
      'Hype cycles end. The real opportunity is in the durable workflows that quietly survive the crash.',
    category: 'Tech & Trends',
    author: 'Michael Lee',
    date: '2025-09-15',
    dateLabel: 'Sep 15, 2025',
    readTime: '8 min read',
    views: 17500,
    likes: 1120,
    comments: 263,
    imageURL: '/images/articles/ai-bubble-hero.jpg',
    heroImage: '/images/articles/ai-bubble-hero.jpg',
    tags: ['AI', 'Trends'],
    outline: [
      { id: 'cycle', title: 'Understand the Hype Cycle', level: 1 },
      { id: 'infra', title: 'Invest in Infrastructure, Not Fads', level: 2 },
    ],
    authorInfo: articleAuthors.michael,
    content: [
      {
        type: 'heading',
        id: 'cycle',
        text: 'Understand the Hype Cycle',
      },
      {
        type: 'paragraph',
        text: 'Bubbles are a feature, not a bug. They overfund exploration, then punish anything that was only surface-level.',
      },
      {
        type: 'heading',
        id: 'infra',
        text: 'Invest in Infrastructure, Not Fads',
      },
      {
        type: 'paragraph',
        text: 'The tools that survive are usually quiet internal automations, boring workflows, and invisible improvements to operations.',
      },
    ],
  },
  {
    slug: 'design-sameness-2025',
    title: 'Why Everything Looks the Same in 2025',
    excerpt:
      'From SaaS dashboards to landing pages, design has converged. Here is how to deliberately stand out without being loud.',
    category: 'Design',
    author: 'Alicia Gomez',
    date: '2025-09-24',
    dateLabel: 'Sep 24, 2025',
    readTime: '6 min read',
    views: 9200,
    likes: 640,
    comments: 118,
    imageURL: '/images/articles/design-sameness-thumb.jpg',
    heroImage: '/images/articles/design-sameness-thumb.jpg',
    tags: ['UI Design', 'Branding & Identity'],
    outline: [
      { id: 'templates', title: 'Template Culture', level: 1 },
      { id: 'edges', title: 'Find Your Edges Again', level: 1 },
    ],
    authorInfo: articleAuthors.alicia,
    content: [
      {
        type: 'heading',
        id: 'templates',
        text: 'Template Culture',
      },
      {
        type: 'paragraph',
        text: 'Design tools made it easy to ship. They also made it easy to accidentally look like everyone else.',
      },
      {
        type: 'heading',
        id: 'edges',
        text: 'Find Your Edges Again',
      },
      {
        type: 'paragraph',
        text: 'Distinctive choices often live in typography, pacing, and language rather than only in color palettes.',
      },
    ],
  },
  {
    slug: 'prompt-like-a-pro',
    title: 'You Are Using AI Tools Wrong. Here Is How to Prompt Like a Pro',
    excerpt:
      'Better prompts lead to clearer concepts, faster iterations, and stronger creative work. You do not need magic, just structure.',
    category: 'Content Creation',
    author: 'Jessica Parker',
    date: '2025-06-05',
    dateLabel: 'Jun 5, 2025',
    readTime: '10 min read',
    views: 9300,
    likes: 840,
    comments: 172,
    imageURL: '/images/articles/prompt-like-pro-hero.jpg',
    heroImage: '/images/articles/prompt-like-pro-hero.jpg',
    tags: ['AI', 'Copywriting', 'Productivity'],
    outline: [
      { id: 'mental-model', title: 'A Better Mental Model for Prompts', level: 1 },
      { id: 'constraints', title: 'Use Constraints as a Creative Lever', level: 1 },
      { id: 'workflow', title: 'Turn Prompts into Reusable Workflows', level: 2 },
    ],
    authorInfo: articleAuthors.jessica,
    content: [
      {
        type: 'heading',
        id: 'mental-model',
        text: 'A Better Mental Model for Prompts',
      },
      {
        type: 'paragraph',
        text: 'Treat a prompt like a brief, not a spell. The clearer the intent and constraints, the more reliable the output becomes.',
      },
      {
        type: 'heading',
        id: 'constraints',
        text: 'Use Constraints as a Creative Lever',
      },
      {
        type: 'paragraph',
        text: 'Instead of asking AI to create from nothing, give it boundaries. Tone, length, audience, and format are all powerful constraints.',
      },
      {
        type: 'heading',
        id: 'workflow',
        text: 'Turn Prompts into Reusable Workflows',
      },
      {
        type: 'paragraph',
        text: 'Save prompts that work and link them into a repeatable flow so your best thinking compounds over time.',
      },
    ],
  },
  {
    slug: 'ux-research-playbook',
    title: 'A Simple UX Research Playbook for Busy Teams',
    excerpt:
      'You do not need a full lab to run meaningful research. You only need a rhythm, a few good questions, and the discipline to listen.',
    category: 'UX Research',
    author: 'Sarah Miller',
    date: '2024-11-18',
    dateLabel: 'Nov 18, 2024',
    readTime: '7 min read',
    views: 6400,
    likes: 520,
    comments: 96,
    imageURL: '/images/articles/ux-research-thumb.jpg',
    heroImage: '/images/articles/ux-research-thumb.jpg',
    tags: ['UX', 'Product Design'],
    outline: [
      { id: 'rhythm', title: 'Create a Research Rhythm', level: 1 },
      { id: 'questions', title: 'Ask Smaller, Better Questions', level: 2 },
      { id: 'share', title: 'Share Insights Where Work Happens', level: 1 },
    ],
    authorInfo: articleAuthors.sarah,
    content: [
      {
        type: 'heading',
        id: 'rhythm',
        text: 'Create a Research Rhythm',
      },
      {
        type: 'paragraph',
        text: 'One interview every week beats a massive project once a year. Lightweight research keeps reality close to the roadmap.',
      },
      {
        type: 'heading',
        id: 'questions',
        text: 'Ask Smaller, Better Questions',
      },
      {
        type: 'paragraph',
        text: 'Good research questions are specific and testable. You are trying to learn one thing at a time, not everything at once.',
      },
      {
        type: 'heading',
        id: 'share',
        text: 'Share Insights Where Work Happens',
      },
      {
        type: 'paragraph',
        text: 'Find ways to bring quotes, clips, and examples into design critiques, planning docs, and feature specs.',
      },
    ],
  },
  {
    slug: 'social-proof-systems',
    title: 'Designing Social Proof Systems That Actually Feel Honest',
    excerpt:
      'Metrics, testimonials, and case studies can build trust or quietly break it. The difference is in framing and context.',
    category: 'Product Marketing',
    author: 'Rafael Johnson',
    date: '2024-08-04',
    dateLabel: 'Aug 4, 2024',
    readTime: '5 min read',
    views: 4800,
    likes: 390,
    comments: 62,
    imageURL: '/images/articles/social-proof-thumb.jpg',
    heroImage: '/images/articles/social-proof-thumb.jpg',
    tags: ['Marketing Tips', 'Content Marketing'],
    outline: [
      { id: 'signals', title: 'Choose the Right Signals', level: 1 },
      { id: 'context', title: 'Add Context, Not Hype', level: 2 },
    ],
    authorInfo: articleAuthors.rafael,
    content: [
      {
        type: 'heading',
        id: 'signals',
        text: 'Choose the Right Signals',
      },
      {
        type: 'paragraph',
        text: 'Not every number builds trust. Pick metrics that tie directly to outcomes your audience already cares about.',
      },
      {
        type: 'heading',
        id: 'context',
        text: 'Add Context, Not Hype',
      },
      {
        type: 'paragraph',
        text: 'Short stories about how a result was achieved often do more work than a big isolated number.',
      },
    ],
  },
  {
    slug: 'brand-refresh-checklist',
    title: 'A Practical Checklist for Your Next Brand Refresh',
    excerpt:
      'Before you touch the logo, align on the story. A calm, structured checklist keeps egos out and decisions clear.',
    category: 'Branding & Identity',
    author: 'Maya Stevens',
    date: '2024-05-12',
    dateLabel: 'May 12, 2024',
    readTime: '9 min read',
    views: 7100,
    likes: 610,
    comments: 104,
    imageURL: '/images/articles/brand-refresh-thumb.jpg',
    heroImage: '/images/articles/brand-refresh-thumb.jpg',
    tags: ['Branding & Identity', 'Strategy'],
    outline: [
      { id: 'alignment', title: 'Start With Internal Alignment', level: 1 },
      { id: 'audit', title: 'Run a Simple Brand Audit', level: 2 },
      { id: 'rollout', title: 'Plan the Rollout Before You Design', level: 1 },
    ],
    authorInfo: articleAuthors.maya,
    content: [
      {
        type: 'heading',
        id: 'alignment',
        text: 'Start With Internal Alignment',
      },
      {
        type: 'paragraph',
        text: 'A refresh is dangerous when leaders have different mental pictures. Begin by writing a one page intent document.',
      },
      {
        type: 'heading',
        id: 'audit',
        text: 'Run a Simple Brand Audit',
      },
      {
        type: 'paragraph',
        text: 'Collect key touchpoints and look at them together. Inconsistencies are easier to see side by side.',
      },
      {
        type: 'heading',
        id: 'rollout',
        text: 'Plan the Rollout Before You Design',
      },
      {
        type: 'paragraph',
        text: 'Think through how new assets move into decks, sales materials, and product surfaces before you push pixels.',
      },
    ],
  },
  {
    slug: 'seo-trends-2024',
    title: 'SEO in 2024: What Actually Matters for Human Readers',
    excerpt:
      'Algorithms keep changing, but the fundamentals of clear, helpful content remain surprisingly stable.',
    category: 'SEO & Ads',
    author: 'Jessica Parker',
    date: '2024-03-03',
    dateLabel: 'Mar 3, 2024',
    readTime: '11 min read',
    views: 12800,
    likes: 990,
    comments: 210,
    imageURL: '/images/articles/seo-trends-thumb.jpg',
    heroImage: '/images/articles/seo-trends-thumb.jpg',
    tags: ['SEO', 'Digital Marketing'],
    outline: [
      { id: 'intent', title: 'Write for Intent, Not Keywords', level: 1 },
      { id: 'structure', title: 'Structure Content for Skimming', level: 2 },
      { id: 'signals', title: 'Use Human Signals as a Compass', level: 1 },
    ],
    authorInfo: articleAuthors.jessica,
    content: [
      {
        type: 'heading',
        id: 'intent',
        text: 'Write for Intent, Not Keywords',
      },
      {
        type: 'paragraph',
        text: 'Behind every query is a job the reader wants to get done. Matching that job is more powerful than repeating phrases.',
      },
      {
        type: 'heading',
        id: 'structure',
        text: 'Structure Content for Skimming',
      },
      {
        type: 'paragraph',
        text: 'Use headings, summaries, and clear paragraphs so scanners can still get value without reading every word.',
      },
      {
        type: 'heading',
        id: 'signals',
        text: 'Use Human Signals as a Compass',
      },
      {
        type: 'paragraph',
        text: 'When people share, bookmark, and return to your content, algorithms usually follow.',
      },
    ],
  },
  {
    slug: 'newsletter-flywheel',
    title: 'Turn Your Newsletter into a Content Flywheel',
    excerpt:
      'Newsletters do not need to be a separate channel. With the right system they can power your entire content engine.',
    category: 'Email Marketing',
    author: 'Rafael Johnson',
    date: '2023-12-19',
    dateLabel: 'Dec 19, 2023',
    readTime: '8 min read',
    views: 5600,
    likes: 430,
    comments: 88,
    imageURL: '/images/articles/newsletter-thumb.jpg',
    heroImage: '/images/articles/newsletter-thumb.jpg',
    tags: ['Content Marketing', 'Marketing Tips'],
    outline: [
      { id: 'core', title: 'Treat the Newsletter as the Core', level: 1 },
      { id: 'repurpose', title: 'Repurpose With Intention', level: 2 },
    ],
    authorInfo: articleAuthors.rafael,
    content: [
      {
        type: 'heading',
        id: 'core',
        text: 'Treat the Newsletter as the Core',
      },
      {
        type: 'paragraph',
        text: 'If you write one strong newsletter a week, you can spin out posts, clips, and ideas across every other channel.',
      },
      {
        type: 'heading',
        id: 'repurpose',
        text: 'Repurpose With Intention',
      },
      {
        type: 'paragraph',
        text: 'Different platforms need different cuts of the same idea. Adjust format without diluting the message.',
      },
    ],
  },
  {
    slug: 'designer-linkedin',
    title: 'How Designers Can Actually Enjoy Being on LinkedIn',
    excerpt:
      'Treat LinkedIn like a studio wall, not a job board. Share work in progress, not just polished case studies.',
    category: 'Career',
    author: 'Alex Rivera',
    date: '2023-10-01',
    dateLabel: 'Oct 1, 2023',
    readTime: '6 min read',
    views: 4300,
    likes: 370,
    comments: 64,
    imageURL: '/images/articles/designer-linkedin-thumb.jpg',
    heroImage: '/images/articles/designer-linkedin-thumb.jpg',
    tags: ['Career', 'Digital Business'],
    outline: [
      { id: 'reframe', title: 'Reframe the Platform', level: 1 },
      { id: 'cadence', title: 'Pick a Sustainable Posting Cadence', level: 2 },
    ],
    authorInfo: articleAuthors.alex,
    content: [
      {
        type: 'heading',
        id: 'reframe',
        text: 'Reframe the Platform',
      },
      {
        type: 'paragraph',
        text: 'If you treat LinkedIn as a place to share experiments, it becomes less about performance and more about practice.',
      },
      {
        type: 'heading',
        id: 'cadence',
        text: 'Pick a Sustainable Posting Cadence',
      },
      {
        type: 'paragraph',
        text: 'Once a week is plenty. Focus on showing one small thing you learned or shipped.',
      },
    ],
  },
  {
    slug: 'landing-page-audit',
    title: 'A Calm Framework for Auditing Your Landing Page',
    excerpt:
      'Most landing pages try to say too much. A simple audit pass can reveal where to remove friction and add clarity.',
    category: 'Conversion Design',
    author: 'Alex Rivera',
    date: '2024-02-10',
    dateLabel: 'Feb 10, 2024',
    readTime: '7 min read',
    views: 5900,
    likes: 410,
    comments: 73,
    imageURL: '/images/articles/landing-audit-thumb.jpg',
    heroImage: '/images/articles/landing-audit-thumb.jpg',
    tags: ['UI Design', 'Marketing'],
    outline: [
      { id: 'promise', title: 'Clarify the Core Promise', level: 1 },
      { id: 'hierarchy', title: 'Fix Visual Hierarchy First', level: 2 },
      { id: 'friction', title: 'Remove Conversion Friction', level: 1 },
    ],
    authorInfo: articleAuthors.alex,
    content: [
      {
        type: 'heading',
        id: 'promise',
        text: 'Clarify the Core Promise',
      },
      {
        type: 'paragraph',
        text: 'If a visitor cannot explain what you offer in one sentence, the rest of the page is already working too hard.',
      },
      {
        type: 'heading',
        id: 'hierarchy',
        text: 'Fix Visual Hierarchy First',
      },
      {
        type: 'paragraph',
        text: 'Use size, contrast, and spacing to guide the eye from promise to proof to action.',
      },
      {
        type: 'heading',
        id: 'friction',
        text: 'Remove Conversion Friction',
      },
      {
        type: 'paragraph',
        text: 'Look for extra fields, confusing microcopy, and distracting elements around your main call to action.',
      },
    ],
  },
  {
    slug: 'onboarding-flow-ux',
    title: 'Designing Onboarding Flows That Do Not Feel Like Homework',
    excerpt:
      'New users are already doing something hard. Your onboarding should feel like a gentle guide, not an exam.',
    category: 'Product Design',
    author: 'Sarah Miller',
    date: '2024-06-22',
    dateLabel: 'Jun 22, 2024',
    readTime: '9 min read',
    views: 6100,
    likes: 520,
    comments: 81,
    imageURL: '/images/articles/onboarding-flow-thumb.jpg',
    heroImage: '/images/articles/onboarding-flow-thumb.jpg',
    tags: ['UX', 'Product Design'],
    outline: [
      { id: 'jobs', title: 'Understand the First Session Job', level: 1 },
      { id: 'progress', title: 'Show Clear Progress', level: 2 },
    ],
    authorInfo: articleAuthors.sarah,
    content: [
      {
        type: 'heading',
        id: 'jobs',
        text: 'Understand the First Session Job',
      },
      {
        type: 'paragraph',
        text: 'Onboarding should help users achieve one meaningful outcome as quickly as possible, not teach every feature.',
      },
      {
        type: 'heading',
        id: 'progress',
        text: 'Show Clear Progress',
      },
      {
        type: 'paragraph',
        text: 'Use checklists, steps, and small rewards so users feel momentum rather than fatigue.',
      },
    ],
  },
  {
    slug: 'content-repurpose-framework',
    title: 'A Simple Framework for Repurposing Content Without Feeling Repetitive',
    excerpt:
      'Repurposing is not copy and paste. It is translation for different contexts and attention spans.',
    category: 'Content Marketing',
    author: 'Rafael Johnson',
    date: '2023-09-07',
    dateLabel: 'Sep 7, 2023',
    readTime: '7 min read',
    views: 4700,
    likes: 360,
    comments: 59,
    imageURL: '/images/articles/repurpose-framework-thumb.jpg',
    heroImage: '/images/articles/repurpose-framework-thumb.jpg',
    tags: ['Content Marketing', 'Productivity'],
    outline: [
      { id: 'core-idea', title: 'Protect the Core Idea', level: 1 },
      { id: 'formats', title: 'Match Format to Channel', level: 2 },
    ],
    authorInfo: articleAuthors.rafael,
    content: [
      {
        type: 'heading',
        id: 'core-idea',
        text: 'Protect the Core Idea',
      },
      {
        type: 'paragraph',
        text: 'Good repurposing keeps the main insight intact while changing how it is delivered.',
      },
      {
        type: 'heading',
        id: 'formats',
        text: 'Match Format to Channel',
      },
      {
        type: 'paragraph',
        text: 'Long form essays, carousels, threads, and videos all reward different levels of depth and pacing.',
      },
    ],
  },
  {
    slug: 'design-systems-small-teams',
    title: 'Design Systems for Small Teams That Still Ship Fast',
    excerpt:
      'A design system does not need to be a massive project. It can start as a tiny library that protects your focus.',
    category: 'Design Systems',
    author: 'Alicia Gomez',
    date: '2023-06-30',
    dateLabel: 'Jun 30, 2023',
    readTime: '10 min read',
    views: 5200,
    likes: 410,
    comments: 77,
    imageURL: '/images/articles/design-systems-small-thumb.jpg',
    heroImage: '/images/articles/design-systems-small-thumb.jpg',
    tags: ['Design Systems', 'Product Design'],
    outline: [
      { id: 'starter-kit', title: 'Start With a Starter Kit', level: 1 },
      { id: 'governance', title: 'Keep Governance Lightweight', level: 2 },
    ],
    authorInfo: articleAuthors.alicia,
    content: [
      {
        type: 'heading',
        id: 'starter-kit',
        text: 'Start With a Starter Kit',
      },
      {
        type: 'paragraph',
        text: 'Buttons, forms, and typography tokens are usually enough to remove most design thrash.',
      },
      {
        type: 'heading',
        id: 'governance',
        text: 'Keep Governance Lightweight',
      },
      {
        type: 'paragraph',
        text: 'When change is expensive, people avoid using the system. Make it easy to suggest and ship improvements.',
      },
    ],
  },
  {
    slug: 'microcopy-that-converts',
    title: 'Microcopy That Converts Without Feeling Pushy',
    excerpt:
      'Tiny bits of interface copy often decide whether someone continues or bounces. They deserve more attention.',
    category: 'UX Writing',
    author: 'Jessica Parker',
    date: '2023-04-18',
    dateLabel: 'Apr 18, 2023',
    readTime: '6 min read',
    views: 3900,
    likes: 320,
    comments: 51,
    imageURL: '/images/articles/microcopy-thumb.jpg',
    heroImage: '/images/articles/microcopy-thumb.jpg',
    tags: ['Copywriting', 'UX'],
    outline: [
      { id: 'moments', title: 'Identify Critical Moments', level: 1 },
      { id: 'tone', title: 'Choose a Calm, Clear Tone', level: 2 },
    ],
    authorInfo: articleAuthors.jessica,
    content: [
      {
        type: 'heading',
        id: 'moments',
        text: 'Identify Critical Moments',
      },
      {
        type: 'paragraph',
        text: 'Error states, confirmations, and empty states are places where words carry extra weight.',
      },
      {
        type: 'heading',
        id: 'tone',
        text: 'Choose a Calm, Clear Tone',
      },
      {
        type: 'paragraph',
        text: 'Friendly is good, but clarity is non negotiable. Aim for language that is kind, simple, and specific.',
      },
    ],
  },
  {
    slug: 'analytics-for-creatives',
    title: 'Analytics for Creatives Who Avoid Dashboards',
    excerpt:
      'You do not need to love spreadsheets to make data useful. You only need a few questions and two or three simple views.',
    category: 'Measurement',
    author: 'Rafael Johnson',
    date: '2022-12-05',
    dateLabel: 'Dec 5, 2022',
    readTime: '8 min read',
    views: 3500,
    likes: 280,
    comments: 44,
    imageURL: '/images/articles/analytics-creatives-thumb.jpg',
    heroImage: '/images/articles/analytics-creatives-thumb.jpg',
    tags: ['Analytics', 'Marketing'],
    outline: [
      { id: 'questions', title: 'Start With Better Questions', level: 1 },
      { id: 'minimal', title: 'Keep Your Stack Minimal', level: 2 },
    ],
    authorInfo: articleAuthors.rafael,
    content: [
      {
        type: 'heading',
        id: 'questions',
        text: 'Start With Better Questions',
      },
      {
        type: 'paragraph',
        text: 'Instead of tracking everything, decide what progress means and measure only that.',
      },
      {
        type: 'heading',
        id: 'minimal',
        text: 'Keep Your Stack Minimal',
      },
      {
        type: 'paragraph',
        text: 'One analytics tool you check is better than three that you ignore.',
      },
    ],
  },
  {
    slug: 'brand-strategy-workshop',
    title: 'Running Brand Strategy Workshops Without Chaos',
    excerpt:
      'Workshops can clarify or confuse. A little structure goes a long way in turning opinions into decisions.',
    category: 'Branding & Identity',
    author: 'Samantha Carter',
    date: '2022-09-21',
    dateLabel: 'Sep 21, 2022',
    readTime: '9 min read',
    views: 4100,
    likes: 330,
    comments: 57,
    imageURL: '/images/articles/brand-workshop-thumb.jpg',
    heroImage: '/images/articles/brand-workshop-thumb.jpg',
    tags: ['Branding & Identity', 'Strategy'],
    outline: [
      { id: 'prep', title: 'Prepare the Room and the Questions', level: 1 },
      { id: 'synthesis', title: 'Synthesize in Real Time', level: 2 },
    ],
    authorInfo: articleAuthors.samantha,
    content: [
      {
        type: 'heading',
        id: 'prep',
        text: 'Prepare the Room and the Questions',
      },
      {
        type: 'paragraph',
        text: 'Send prompts in advance so people arrive thinking about the brand rather than starting from zero.',
      },
      {
        type: 'heading',
        id: 'synthesis',
        text: 'Synthesize in Real Time',
      },
      {
        type: 'paragraph',
        text: 'Capturing themes on a visible canvas keeps the group moving toward a shared picture.',
      },
    ],
  },
  {
    slug: 'social-media-calendar',
    title: 'Building a Social Media Calendar You Can Actually Stick To',
    excerpt:
      'Most calendars fail because they fight reality. The best ones respect constraints and energy levels.',
    category: 'Social Media Marketing',
    author: 'Michael Lee',
    date: '2022-07-11',
    dateLabel: 'Jul 11, 2022',
    readTime: '7 min read',
    views: 3300,
    likes: 270,
    comments: 46,
    imageURL: '/images/articles/social-calendar-thumb.jpg',
    heroImage: '/images/articles/social-calendar-thumb.jpg',
    tags: ['Social Media Marketing', 'Productivity'],
    outline: [
      { id: 'constraints', title: 'Design Around Constraints', level: 1 },
      { id: 'themes', title: 'Use Themes Instead of Random Topics', level: 2 },
    ],
    authorInfo: articleAuthors.michael,
    content: [
      {
        type: 'heading',
        id: 'constraints',
        text: 'Design Around Constraints',
      },
      {
        type: 'paragraph',
        text: 'Be honest about how many posts you can make each week and which formats you can keep up with.',
      },
      {
        type: 'heading',
        id: 'themes',
        text: 'Use Themes Instead of Random Topics',
      },
      {
        type: 'paragraph',
        text: 'Three or four recurring themes make planning easier and help your audience know what to expect.',
      },
    ],
  },
  {
    slug: 'accessibility-basics',
    title: 'Accessibility Basics for Small Design Teams',
    excerpt:
      'Inclusive design is easier when you bake it into your process instead of treating it as a final checklist.',
    category: 'UX',
    author: 'Sarah Miller',
    date: '2022-05-03',
    dateLabel: 'May 3, 2022',
    readTime: '8 min read',
    views: 3600,
    likes: 300,
    comments: 52,
    imageURL: '/images/articles/accessibility-thumb.jpg',
    heroImage: '/images/articles/accessibility-thumb.jpg',
    tags: ['UX', 'Product Design'],
    outline: [
      { id: 'color', title: 'Start With Color and Contrast', level: 1 },
      { id: 'inputs', title: 'Design Better Inputs and States', level: 2 },
    ],
    authorInfo: articleAuthors.sarah,
    content: [
      {
        type: 'heading',
        id: 'color',
        text: 'Start With Color and Contrast',
      },
      {
        type: 'paragraph',
        text: 'Good contrast helps everyone, not just people with visual impairments. It makes interfaces calmer and easier to scan.',
      },
      {
        type: 'heading',
        id: 'inputs',
        text: 'Design Better Inputs and States',
      },
      {
        type: 'paragraph',
        text: 'Clear focus states, labels, and error messages are small details that have an outsized impact.',
      },
    ],
  },
  {
    slug: 'motion-design-in-product',
    title: 'Using Motion Design in Product Without Overdoing It',
    excerpt:
      'Motion can guide attention and express personality. The risk is turning every interaction into a performance.',
    category: 'Interaction Design',
    author: 'Alex Rivera',
    date: '2022-03-19',
    dateLabel: 'Mar 19, 2022',
    readTime: '7 min read',
    views: 3150,
    likes: 260,
    comments: 39,
    imageURL: '/images/articles/motion-design-thumb.jpg',
    heroImage: '/images/articles/motion-design-thumb.jpg',
    tags: ['UI Design', 'Interaction'],
    outline: [
      { id: 'purpose', title: 'Give Motion a Clear Purpose', level: 1 },
      { id: 'timing', title: 'Dial in Timing and Easing', level: 2 },
    ],
    authorInfo: articleAuthors.alex,
    content: [
      {
        type: 'heading',
        id: 'purpose',
        text: 'Give Motion a Clear Purpose',
      },
      {
        type: 'paragraph',
        text: 'Use motion to explain spatial relationships, provide feedback, or gently reward interaction.',
      },
      {
        type: 'heading',
        id: 'timing',
        text: 'Dial in Timing and Easing',
      },
      {
        type: 'paragraph',
        text: 'Short, subtle animations usually feel more premium than long, bouncy ones.',
      },
    ],
  },
  {
    slug: 'building-case-studies',
    title: 'Building Case Studies That Clients Actually Read',
    excerpt:
      'A good case study is a decision making tool, not a victory lap. It should help prospects imagine working with you.',
    category: 'Business Development',
    author: 'Maya Stevens',
    date: '2022-01-27',
    dateLabel: 'Jan 27, 2022',
    readTime: '9 min read',
    views: 3400,
    likes: 295,
    comments: 48,
    imageURL: '/images/articles/case-studies-thumb.jpg',
    heroImage: '/images/articles/case-studies-thumb.jpg',
    tags: ['Marketing', 'Strategy'],
    outline: [
      { id: 'narrative', title: 'Focus on the Narrative, Not Every Detail', level: 1 },
      { id: 'proof', title: 'Show Concrete Proof, Not Hype', level: 2 },
    ],
    authorInfo: articleAuthors.maya,
    content: [
      {
        type: 'heading',
        id: 'narrative',
        text: 'Focus on the Narrative, Not Every Detail',
      },
      {
        type: 'paragraph',
        text: 'Highlight the problem, the constraints, the choices you made, and the outcomes. Anything more is optional.',
      },
      {
        type: 'heading',
        id: 'proof',
        text: 'Show Concrete Proof, Not Hype',
      },
      {
        type: 'paragraph',
        text: 'Use numbers, quotes, and before and after visuals to show what changed.',
      },
    ],
  },
  {
    slug: 'experiment-led-growth',
    title: 'Experiment Led Growth for Creative Teams',
    excerpt:
      'Growth experiments do not need to feel like a separate track. They can be part of how you approach everyday work.',
    category: 'Growth',
    author: 'Rafael Johnson',
    date: '2021-11-09',
    dateLabel: 'Nov 9, 2021',
    readTime: '8 min read',
    views: 2980,
    likes: 240,
    comments: 37,
    imageURL: '/images/articles/experiment-growth-thumb.jpg',
    heroImage: '/images/articles/experiment-growth-thumb.jpg',
    tags: ['Growth', 'Marketing'],
    outline: [
      { id: 'hypothesis', title: 'Write Simple Hypotheses', level: 1 },
      { id: 'scope', title: 'Keep Scope Small on Purpose', level: 2 },
    ],
    authorInfo: articleAuthors.rafael,
    content: [
      {
        type: 'heading',
        id: 'hypothesis',
        text: 'Write Simple Hypotheses',
      },
      {
        type: 'paragraph',
        text: 'A clear hypothesis makes it easier to decide whether an experiment worked and what to do next.',
      },
      {
        type: 'heading',
        id: 'scope',
        text: 'Keep Scope Small on Purpose',
      },
      {
        type: 'paragraph',
        text: 'Small, frequent experiments are easier to run and less emotionally loaded than giant bets.',
      },
    ],
  },
  {
    slug: 'kaizen-principles-digital',
    title: 'Applying Kaizen Principles to Your Digital Presence',
    excerpt:
      'Continuous improvement works just as well for websites and campaigns as it does for factories.',
    category: 'Digital Strategy',
    author: 'Samantha Carter',
    date: '2021-09-14',
    dateLabel: 'Sep 14, 2021',
    readTime: '10 min read',
    views: 3200,
    likes: 280,
    comments: 49,
    imageURL: '/images/articles/kaizen-digital-thumb.jpg',
    heroImage: '/images/articles/kaizen-digital-thumb.jpg',
    tags: ['Strategy', 'Digital Business'],
    outline: [
      { id: 'small-wins', title: 'Look for Small Wins First', level: 1 },
      { id: 'loops', title: 'Create Feedback Loops With Real Users', level: 2 },
    ],
    authorInfo: articleAuthors.samantha,
    content: [
      {
        type: 'heading',
        id: 'small-wins',
        text: 'Look for Small Wins First',
      },
      {
        type: 'paragraph',
        text: 'Rather than rebuild your site, start by improving one flow, one page, or one message at a time.',
      },
      {
        type: 'heading',
        id: 'loops',
        text: 'Create Feedback Loops With Real Users',
      },
      {
        type: 'paragraph',
        text: 'Short cycles of change and observation help your digital presence stay aligned with reality.',
      },
    ],
  },
]

export const articlesBySlug = new Map(articles.map((article) => [article.slug, article]))

export const getArticleBySlug = (slug: string) => articlesBySlug.get(slug)
