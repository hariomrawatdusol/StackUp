export const AVATARS = [
  'https://images.unsplash.com/photo-1674278882093-3870ef98e826?w=400&auto=format&fit=crop&q=80',
  'https://images.pexels.com/photos/4307869/pexels-photo-4307869.jpeg?w=400&auto=compress',
  'https://images.unsplash.com/photo-1649433658557-54cf58577c68?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1584367034980-8ba72c175f4f?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/flagged/photo-1551854716-8b811be39e7e?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1624610806703-99c0852c31c0?w=400&auto=format&fit=crop&q=80',
  'https://images.pexels.com/photos/32815515/pexels-photo-32815515.jpeg?w=400&auto=compress',
  'https://images.unsplash.com/photo-1622782045716-a05bcc4f5ae8?w=400&auto=format&fit=crop&q=80',
]

export const PORTFOLIO = [
  'https://images.pexels.com/photos/6621400/pexels-photo-6621400.jpeg?w=600&auto=compress',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80',
  'https://images.pexels.com/photos/7315755/pexels-photo-7315755.jpeg?w=600&auto=compress',
  'https://images.unsplash.com/photo-1662532577856-e8ee8b138a8b?w=600&auto=format&fit=crop&q=80',
]

export const ALL_SKILLS = [
  'Video Editing','Modeling','UGC','Design','Motion','Photography','Copywriting','Influencer','Podcasting','3D','Illustration','Reels'
]

export const creators = [
  { id: 'riya', name: 'Riya Sharma', handle: '@riyaedits', college: 'JMC', skills: ['Video Editing','Modeling','UGC'], rate: 2000, earned: 45000, avatar: AVATARS[0], online: true, bio: 'Editor by day, model by golden hour ✨' },
  { id: 'aryan', name: 'Aryan Gupta', handle: '@aryan.mov', college: 'DU', skills: ['Design','Video Editing','Motion'], rate: 3000, earned: 62000, avatar: AVATARS[1], online: true, bio: 'Motion designer stacking bread with keyframes.' },
  { id: 'zoya', name: 'Zoya Khan', handle: '@zoya.ugc', college: 'IP', skills: ['UGC','Modeling','Copywriting'], rate: 2500, earned: 38000, avatar: AVATARS[2], online: false, bio: 'UGC that actually converts, no cap.' },
  { id: 'kabir', name: 'Kabir Mehta', handle: '@kabirshoots', college: 'DU', skills: ['Photography','Modeling','Reels'], rate: 3500, earned: 71000, avatar: AVATARS[3], online: true, bio: 'Golden hour is my office.' },
  { id: 'ananya', name: 'Ananya Iyer', handle: '@ananya.designs', college: 'JMC', skills: ['Design','Illustration','Copywriting'], rate: 2800, earned: 54000, avatar: AVATARS[4], online: true, bio: 'Brand identities that slap.' },
  { id: 'dev', name: 'Dev Patel', handle: '@devcuts', college: 'IP', skills: ['Video Editing','Motion','3D'], rate: 4000, earned: 89000, avatar: AVATARS[5], online: false, bio: 'Editor of viral reels. 12M views last month.' },
  { id: 'ishaan', name: 'Ishaan Roy', handle: '@ishaan.reels', college: 'DU', skills: ['Reels','Influencer','UGC'], rate: 5000, earned: 120000, avatar: AVATARS[6], online: true, bio: '350k on Insta. I talk, brands sell.' },
  { id: 'meera', name: 'Meera Nair', handle: '@meeramoves', college: 'JMC', skills: ['Modeling','UGC','Photography'], rate: 2200, earned: 31000, avatar: AVATARS[7], online: true, bio: 'Face + skills that pay bills.' },
  { id: 'raghav', name: 'Raghav Bhatia', handle: '@raghavdraws', college: 'DU', skills: ['Illustration','Design','Motion'], rate: 2600, earned: 47000, avatar: AVATARS[0], online: false },
  { id: 'sanya', name: 'Sanya Kapoor', handle: '@sanya.copy', college: 'IP', skills: ['Copywriting','UGC','Influencer'], rate: 3200, earned: 58000, avatar: AVATARS[1], online: true },
  { id: 'vihaan', name: 'Vihaan Sethi', handle: '@vihaan3d', college: 'DU', skills: ['3D','Motion','Design'], rate: 3800, earned: 66000, avatar: AVATARS[2], online: true },
  { id: 'tara', name: 'Tara Menon', handle: '@tara.model', college: 'JMC', skills: ['Modeling','Photography','Reels'], rate: 2400, earned: 42000, avatar: AVATARS[3], online: false },
  { id: 'arjun', name: 'Arjun Rao', handle: '@arjun.pod', college: 'IP', skills: ['Podcasting','Copywriting','Influencer'], rate: 3000, earned: 51000, avatar: AVATARS[4], online: true },
  { id: 'nikita', name: 'Nikita Verma', handle: '@nikitaedits', college: 'DU', skills: ['Video Editing','UGC','Modeling'], rate: 2300, earned: 39000, avatar: AVATARS[5], online: true },
  { id: 'omar', name: 'Omar Ali', handle: '@omar.snaps', college: 'JMC', skills: ['Photography','Design','Motion'], rate: 3400, earned: 60000, avatar: AVATARS[6], online: false },
  { id: 'priya', name: 'Priya Deshmukh', handle: '@priya.ugc', college: 'IP', skills: ['UGC','Reels','Copywriting'], rate: 2100, earned: 34000, avatar: AVATARS[7], online: true },
  { id: 'yash', name: 'Yash Malhotra', handle: '@yashmotion', college: 'DU', skills: ['Motion','3D','Video Editing'], rate: 4200, earned: 78000, avatar: AVATARS[0], online: true },
  { id: 'kiara', name: 'Kiara Singh', handle: '@kiara.brand', college: 'JMC', skills: ['Design','Illustration','UGC'], rate: 2700, earned: 44000, avatar: AVATARS[1], online: false },
  { id: 'rohan', name: 'Rohan Jain', handle: '@rohanreels', college: 'IP', skills: ['Reels','Video Editing','Motion'], rate: 3600, earned: 69000, avatar: AVATARS[2], online: true },
  { id: 'aisha', name: 'Aisha Bose', handle: '@aisha.shoots', college: 'DU', skills: ['Photography','Modeling','UGC'], rate: 2500, earned: 40000, avatar: AVATARS[3], online: true },
]

export const brandLogos = [
  { name: 'Boat', color: '#FF6B00' },
  { name: 'Sugar', color: '#FF2E7E' },
  { name: 'Myntra', color: '#FF3E6C' },
  { name: 'Zomato', color: '#E23744' },
  { name: 'CRED', color: '#00FFA3' },
  { name: 'Nykaa', color: '#FC2779' },
  { name: 'Mamaearth', color: '#7B2FFF' },
  { name: 'boAt', color: '#FF6B00' },
]

export const seedProjects = [
  { id: 'p1', brand: 'Boat', brandColor: '#FF6B00', title: 'Founder Reel + Product Shoot', skills: ['Video Editing','Modeling'], budget: 3000, escrow: 3000, brief: 'Need a 30s reel with founder POV + 5 product hero shots. Deliver in 5 days.', applicants: ['riya','nikita'], status: 'open' },
  { id: 'p2', brand: 'Sugar', brandColor: '#FF2E7E', title: 'UGC Bundle x 5 for Lipstick Drop', skills: ['UGC','Modeling','Copywriting'], budget: 5500, escrow: 5500, brief: 'Vertical 15s UGCs, on-camera, with witty caption ideas.', applicants: ['zoya','sanya','meera'], status: 'open' },
  { id: 'p3', brand: 'Myntra', brandColor: '#FF3E6C', title: 'Fashion Week Backstage Edit', skills: ['Video Editing','Motion','Photography'], budget: 12000, escrow: 12000, brief: 'Long-form vlog 3 min + reels cutdowns.', applicants: ['dev','yash'], status: 'open' },
  { id: 'p4', brand: 'CRED', brandColor: '#00FFA3', title: 'Brand Identity Refresh', skills: ['Design','Illustration','Motion'], budget: 20000, escrow: 20000, brief: 'Logo lockups + motion sting for social.', applicants: ['ananya','raghav','vihaan'], status: 'open' },
  { id: 'p5', brand: 'Zomato', brandColor: '#E23744', title: 'Influencer Series - Late Night Cravings', skills: ['Influencer','UGC','Reels'], budget: 8000, escrow: 8000, brief: '3 episodes, POV storytelling, food.', applicants: ['ishaan','priya'], status: 'open' },
  { id: 'p6', brand: 'Nykaa', brandColor: '#FC2779', title: 'Skincare Reel + Copy Deck', skills: ['UGC','Copywriting','Modeling'], budget: 4500, escrow: 4500, brief: 'One reel, 10 caption variants.', applicants: ['sanya','zoya'], status: 'open' },
  { id: 'p7', brand: 'Mamaearth', brandColor: '#7B2FFF', title: '3D Product Explainer', skills: ['3D','Motion','Design'], budget: 15000, escrow: 15000, brief: '20s explainer, hero product spin.', applicants: ['vihaan','yash'], status: 'open' },
  { id: 'p8', brand: 'Boat', brandColor: '#FF6B00', title: 'Podcast Cover + Trailer', skills: ['Podcasting','Design','Copywriting'], budget: 3500, escrow: 3500, brief: 'Cover art + 45s trailer script.', applicants: ['arjun','ananya'], status: 'open' },
  { id: 'p9', brand: 'Sugar', brandColor: '#FF2E7E', title: 'Golden Hour Product Photography', skills: ['Photography','Modeling'], budget: 6000, escrow: 6000, brief: '20 lifestyle stills, outdoor.', applicants: ['kabir','tara','omar'], status: 'open' },
  { id: 'p10', brand: 'Myntra', brandColor: '#FF3E6C', title: 'Reels Series - Fit Check', skills: ['Reels','Modeling','Video Editing'], budget: 5000, escrow: 5000, brief: '5 reels, GRWM format.', applicants: ['rohan','aisha','riya'], status: 'open' },
]

// Skill overlap %
export function matchPercent(needed, has) {
  if (!needed || !needed.length) return 0
  const hit = needed.filter(s => has.includes(s)).length
  return Math.round((hit / needed.length) * 100)
}

export function getCreator(id) { return creators.find(c => c.id === id) }
