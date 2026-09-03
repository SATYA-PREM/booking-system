export const CATEGORIES = [
  "All",
  "Events",
  "Travel",
  "Salon",
  "Photography",
  "Fitness",
  "Home Services"
];

export const SERVICES = [
  {
    id: "serv-photography",
    title: "Professional Event & Portrait Photography",
    shortTitle: "Photography",
    category: "Photography",
    price: 2000,
    priceUnit: "session",
    rating: 4.8,
    reviewsCount: 142,
    duration: "2 Hours",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    description: "Capture life's most precious milestones with cinematic precision. Whether it is a corporate gala, family celebration, wedding prelude, or personal portfolio shoot, our master photographers bring top-tier Sony Alpha glass and studio-grade lighting.",
    highlights: [
      "2-hour dedicated shoot with senior lead photographer",
      "50+ color-graded high-resolution digital copies",
      "Online private cloud gallery with 1-year backup",
      "Includes portrait, candid, and wide venue captures"
    ],
    included: [
      "Full frame 4K camera gear & portable lighting",
      "Fast 48-hour delivery preview",
      "Touch-up and skin tone optimization",
      "Unlimited outfit changes within time window"
    ],
    availableTimeSlots: [
      "09:00 AM",
      "11:30 AM",
      "02:00 PM",
      "04:30 PM",
      "06:30 PM"
    ],
    badge: "Popular"
  },
  {
    id: "serv-salon",
    title: "Luxury Hair Styling & Spa Makeover",
    shortTitle: "Salon & Spa",
    category: "Salon",
    price: 800,
    priceUnit: "person",
    rating: 4.9,
    reviewsCount: 218,
    duration: "1.5 Hours",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
    description: "Indulge in a premium personal pampering session. Experience organic Moroccan oil hair spa therapy, precision scalp wash, haircut custom tailored to your facial geometry, and relaxing aromatherapy.",
    highlights: [
      "Custom consultation with certified hair stylist",
      "Deep moisture infusion & keratin wash",
      "Blow dry with heat protective finish",
      "Complimentary herbal head and shoulder massage"
    ],
    included: [
      "Premium organic salon products",
      "Detox tea or beverage during treatment",
      "Hair health diagnostic sheet"
    ],
    availableTimeSlots: [
      "10:00 AM",
      "11:30 AM",
      "01:00 PM",
      "03:00 PM",
      "05:00 PM",
      "07:00 PM"
    ],
    badge: "Best Value"
  },
  {
    id: "serv-conference",
    title: "Modern Conference & Banquet Space Booking",
    shortTitle: "Conference Hall",
    category: "Events",
    price: 1500,
    priceUnit: "hour",
    rating: 4.7,
    reviewsCount: 89,
    duration: "Custom (Min 2 Hrs)",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    description: "Fully-equipped tech enabled conference and seminar spaces with ultra-wide 4K laser projection, surround acoustic microphones, high-speed fiber Wi-Fi, and modular ergonomic seating.",
    highlights: [
      "Acoustically treated conference room with seating for 30-100",
      "Dual presentation screens & wireless HDMI streaming",
      "Dedicated on-site IT support technician",
      "Coffee, tea & refreshment corner"
    ],
    included: [
      "Podium, handheld and lapel wireless mics",
      "Whiteboard, flipcharts and marker kits",
      "Air conditioning and adjustable mood lighting"
    ],
    availableTimeSlots: [
      "09:00 AM",
      "11:00 AM",
      "02:00 PM",
      "04:00 PM",
      "06:00 PM"
    ],
    badge: "Corporate"
  },
  {
    id: "serv-travel",
    title: "Guided Heritage City Walk & Cultural Tour",
    shortTitle: "Heritage City Tour",
    category: "Travel",
    price: 1200,
    priceUnit: "person",
    rating: 4.9,
    reviewsCount: 310,
    duration: "3 Hours",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",
    description: "Unearth rich history, hidden architectural gems, ancient monuments, and stories from folklore led by an expert historian. Includes authentic local food tasting and curated photo spots.",
    highlights: [
      "Small groups for an engaging, immersive storytelling experience",
      "Entry passes to 3 iconic monuments included",
      "Tasting of famous local sweets & snacks",
      "Audio headsets for crystal clear listening"
    ],
    included: [
      "Licensed government certified tour guide",
      "Bottle of mineral water & souvenir postcard",
      "Digital cultural guide booklet"
    ],
    availableTimeSlots: [
      "07:30 AM",
      "10:00 AM",
      "03:30 PM",
      "05:00 PM"
    ],
    badge: "Top Rated"
  },
  {
    id: "serv-dj-sound",
    title: "Live Acoustic & DJ Night Entertainment",
    shortTitle: "DJ & Live Sound",
    category: "Events",
    price: 3500,
    priceUnit: "session",
    rating: 4.8,
    reviewsCount: 74,
    duration: "4 Hours",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    description: "Electrify your party, wedding reception, or milestone birthday with an energetic DJ setup, moving head beam lights, haze machine, and custom customized playlist curated to your vibe.",
    highlights: [
      "Pro audio JBL/RCF 2000W sound output system",
      "DMX controlled laser and wash lighting",
      "Genre customized sets: Bollywood, EDM, Retro, House",
      "Dedicated sound engineer and DJ console"
    ],
    included: [
      "DJ console, wireless microphones & subwoofers",
      "Pre-event music request alignment",
      "Complete on-time setup and teardown"
    ],
    availableTimeSlots: [
      "04:00 PM",
      "06:30 PM",
      "08:00 PM"
    ],
    badge: "Trending"
  },
  {
    id: "serv-yoga-fitness",
    title: "1-on-1 Personalized Yoga & Breathwork Coaching",
    shortTitle: "Yoga & Breathwork",
    category: "Fitness",
    price: 950,
    priceUnit: "session",
    rating: 4.9,
    reviewsCount: 165,
    duration: "1 Hour",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    description: "Harmonize mind, posture, and energy through customized Hatha and Vinyasa yoga sessions. Includes Pranayama breathwork to relieve stress, boost flexibility, and sharpen mental focus.",
    highlights: [
      "Individual posture alignment and mobility assessment",
      "Customized sequence suited for beginners or advanced",
      "Tibetan singing bowl sound relaxation finale",
      "Posture correction tips and home routine PDF"
    ],
    included: [
      "Eco-friendly cork yoga mat provided",
      "Herbal detox tea after session",
      "Personalized wellness scorecard"
    ],
    availableTimeSlots: [
      "06:30 AM",
      "08:00 AM",
      "09:30 AM",
      "05:00 PM",
      "06:30 PM"
    ],
    badge: "Wellness"
  },
  {
    id: "serv-home-deep-clean",
    title: "Intensive Home Deep Cleaning & Sanitization",
    shortTitle: "Home Deep Cleaning",
    category: "Home Services",
    price: 2400,
    priceUnit: "home",
    rating: 4.7,
    reviewsCount: 198,
    duration: "3.5 Hours",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "Deep, thorough scrubbing, industrial vacuuming, degreasing, and steam sanitization for living rooms, kitchens, bathrooms, and balconies by a trained 3-person cleaning crew.",
    highlights: [
      "3-member verified background-checked cleaning squad",
      "High-pressure steam disinfection of kitchen tiles and sinks",
      "Sofa, rug, and mattress dry & wet vacuuming",
      "Eco-friendly non-toxic child & pet safe chemicals"
    ],
    included: [
      "All heavy-duty machines and cleaners provided",
      "Hard water stain removal on bathroom glass",
      "Full home air freshener misting"
    ],
    availableTimeSlots: [
      "08:30 AM",
      "11:00 AM",
      "02:00 PM",
      "04:00 PM"
    ],
    badge: "Essential"
  },
  {
    id: "serv-car-detailing",
    title: "Ceramic Foam Wash & Interior Car Spa",
    shortTitle: "Car Spa & Detailing",
    category: "Home Services",
    price: 1100,
    priceUnit: "car",
    rating: 4.8,
    reviewsCount: 125,
    duration: "2 Hours",
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80",
    coverImage: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1200&q=80",
    description: "Bring the showroom gloss back to your car. Complete snow foam wash, underbody rinse, dashboard conditioning, deep upholstery steam extraction, and hydrophobic glass coating.",
    highlights: [
      "Snow foam pH-neutral exterior body wash",
      "Leather/fabric seat vacuum and stain treatment",
      "Tire dressing and rim brake-dust cleanup",
      "Hydrophobic windshield water-repellent coating"
    ],
    included: [
      "Doorstep service or doorstep pickup",
      "Odor neutralizing cabin fogging",
      "Microfiber scratch-free dry finish"
    ],
    availableTimeSlots: [
      "09:00 AM",
      "11:30 AM",
      "02:30 PM",
      "04:30 PM"
    ],
    badge: "Convenient"
  }
];

export const getServiceById = (id) => {
  return SERVICES.find((service) => service.id === id) || null;
};

