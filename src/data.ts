import { Service, Therapist, Review } from './types';
import classicRelaxationImage from './assets/images/classic_relaxation_1779816989108.png';
import thaiFusionImage from './assets/images/thai_fusion_v2_1779817384285.png';
import oceanWaveLomiImage from './assets/images/ocean_wave_lomi_v2_1779828497187.png';
import jackieImage from './assets/images/jackie.jpeg';

export const SERVICES: Service[] = [
  {
    id: 'classic-relaxation',
    name: 'Classic Relaxation',
    description: 'A calming, nervous-system reset using slow, flowing strokes to ease the body into stillness and restore balance.',
    category: 'massage',
    price: 180,
    durations: [60, 90, 120],
    basePriceByDuration: { 60: 140, 90: 180, 120: 240 },
    benefits: ['Balances the central nervous system', 'Alleviates dynamic mental tension', 'Soothes daily muscle fatigue', 'Restores overall somatic harmony'],
    features: ['Slow rhythmic Swedish strokes', 'Custom warm signature oil', 'Heated basalt relaxation accent'],
    imageUrl: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'deep-tissue',
    name: 'Deep Tissue',
    description: 'Deep tissue to break up muscle knots and chronic pain. Please specify where you want it done on the form.',
    category: 'massage',
    price: 180,
    durations: [60, 90, 120],
    basePriceByDuration: { 60: 140, 90: 180, 120: 240 },
    benefits: ['Releases chronic muscle tension', 'Reduces pain and inflammation', 'Improves posture and flexibility', 'Aids in targeted muscle recovery'],
    features: ['Deep localized pressure', 'Arnica cooling friction gel', 'Hot herbal compresses'],
    imageUrl: classicRelaxationImage
  },
  {
    id: 'thai-fusion',
    name: 'THAI FUSION & STRETCHING',
    description: 'A dynamic session with assisted stretching + bodywork to increase flexibility, improve movement, and release stiffness.',
    category: 'massage',
    price: 180,
    durations: [60, 90, 120],
    basePriceByDuration: { 60: 140, 90: 180, 120: 240 },
    benefits: ['Dramatically improves joint flexibility', 'Releases muscle stiffness and lactic acid', 'Improves circulatory flow', 'Enhances active range of motion'],
    features: ['Dynamic assisted block stretching', 'Sen line acupressure work', 'Dry therapy (no oils required)'],
    imageUrl: thaiFusionImage
  },
  {
    id: 'ocean-wave-lomi',
    name: 'Lomi Lomi',
    description: 'Relaxing Hawaiian based massage, using mainly the forearms, mimicking ocean waves.',
    category: 'massage',
    price: 180,
    durations: [60, 90, 120],
    basePriceByDuration: { 60: 140, 90: 180, 120: 240 },
    benefits: ['Rhythmic full-length continuous strokes', 'Drains lymphatic fluid build-up', 'Relieves mental chatter and worries', 'Induces profound deep sleep states'],
    features: ['Long continuous forearm sweeps', 'Warm organic coconut infusion', 'Continuous flow bodywork methodology'],
    imageUrl: oceanWaveLomiImage
  }
];

export const THERAPISTS: Therapist[] = [
  {
    id: 'therapist-jacqueline',
    name: 'Jackie',
    title: 'Licensed Massage Therapist & Founder',
    rating: 5.0,
    reviewsCount: 412,
    specialty: ['Classic Relaxation', 'Deep Tissue', 'THAI FUSION & STRETCHING', 'Lomi Lomi'],
    bio: 'Jackie is the founder and heart of Buddha House. With over 4 years of dedicated restorative somatic practice, she customizes each healing experience, blending fluid Ocean Lomi forearm work, deep tissue myofascial release, and mindful breathwork to guide the nervous system into profound stillness.',
    imageUrl: jackieImage,
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  }
];

export const FOCUS_AREAS = [
  'Neck & Cervical Spine',
  'Shoulders & Rotator Cuff',
  'Upper Back & Rhomboids',
  'Lower Back & Lumbar Region',
  'Glutes & Sciatic Tension',
  'Calves & Swollen Ankles',
  'Hands & Carpals',
  'Feet & Plantar Fascia'
];

export const ADD_ONS = [
  { name: 'Aromatherapy', price: 10, duration: 0, description: 'Infuse your session with pure organic therapeutic-grade essential oils to calm the mind, soothe the senses, and deepen overall somatic relaxation.' },
  { name: 'Suction cups', price: 0, duration: 0, description: 'Local physical suction to separate fascial layers, relieve stubborn knots, and stimulate localized oxygen flow.' },
  { name: 'Scrapping', price: 0, duration: 10, description: 'Gently scrapes targeted fascial areas using jade tools to stimulate circulation and release fascial adhesions.' },
  { name: 'Hot Stones and Towels', price: 0, duration: 0, description: 'Applies heated volcanic stones and steaming towels directly to key pressure points to melt away stress.' }
];

export const SOUNDSCAPES = [
  'Sinking Rainforest Rains (Warm rain, birds, and remote streams)',
  'Oceanside Tides (Slow breaking oceanic waves and gulls)',
  'Enlightened Zen flute (Japanese Shakuhachi, soft temple gongs and singing bowls)',
  'Whispering Himalayan Chimes (Sparse crystal chimes, ambient winds and silence)',
  'True Silence (No artificial acoustics, pure natural quietness)'
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Miranda Vance',
    rating: 5,
    comment: 'The Ocean Wave Lomi massage with Jackie was an absolute dream. The flowing forearm strokes mimicked warm ocean waves and left my mind and body in absolute stillness. Highly recommend and will definitely be back!',
    date: 'May 14, 2026',
    servicePurchased: 'Lomi Lomi'
  },
  {
    id: 'rev-2',
    name: 'Soren Sorensen',
    rating: 5,
    comment: 'Jackie is exceptional. She has a magical understanding of muscular structure and target trigger lines. The Deep Tissue massage with specified focus areas relieved lower back discomfort I had dealt with for months. High-end, premium atmosphere.',
    date: 'Apr 28, 2026',
    servicePurchased: 'Deep Tissue'
  },
  {
    id: 'rev-3',
    name: 'Brandon Holbrook',
    rating: 5,
    comment: 'Jackie is awesome at relieving stress and digging deep into the tissue.  She has strong hands that get the job done.',
    date: 'May 05, 2026',
    servicePurchased: 'Deep Tissue'
  }
];

export const OPERATING_HOURS = {
  everyday: '9:00 AM – 6:00 PM'
};

export const CONTACT_INFO = {
  address: '11230 West Ave, San Antonio, TX 78213',
  phone: '(210) 552-3344',
  email: 'Jackieq34@gmail.com'
};
