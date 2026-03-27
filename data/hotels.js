const hotels = [
  {
    name: 'Taj Hotel Colaba',
    location: 'Colaba',
    price: 15000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    description:
      'The iconic Taj Mahal Palace, a symbol of Mumbai hospitality since 1903. Overlooking the Gateway of India with opulent rooms, world-class dining, and an award-winning spa.',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Room Service', 'Valet Parking'],
  },
  {
    name: 'Trident Nariman Point',
    location: 'Nariman Point',
    price: 12500,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    description:
      'Luxurious sea-facing hotel at Nariman Point with stunning views of Marine Drive. Features elegant rooms, rooftop pool, and fine-dining restaurants.',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Sea View', 'Business Center'],
  },
  {
    name: 'The Oberoi Mumbai',
    location: 'Nariman Point',
    price: 14000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    description:
      'An ultra-luxury retreat at Nariman Point with panoramic ocean views. Known for its impeccable service, Michelin-level cuisine, and serene spa experiences.',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Butler Service', 'Limousine'],
  },
  {
    name: 'JW Marriott Juhu',
    location: 'Juhu',
    price: 11000,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    description:
      'Premium beachfront property on Juhu Beach. Features multiple award-winning restaurants, a luxurious spa, and rooms with breathtaking Arabian Sea views.',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Beach Access', 'Kids Club'],
  },
  {
    name: 'ITC Maratha',
    location: 'Andheri',
    price: 10500,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80',
    description:
      'A grand 5-star hotel near Mumbai Airport reflecting Maratha heritage. Renowned for Peshawri restaurant, luxurious Kaya Kalp spa, and regal architecture.',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Airport Shuttle', 'Business Center'],
  },
  {
    name: 'The Leela Mumbai',
    location: 'Andheri',
    price: 10000,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    description:
      'An elegant 5-star property near the airport inspired by the Lotus Palace. Offers world-class dining, a lush pool area, and spacious rooms with modern luxury.',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Airport Shuttle', 'Concierge'],
  },
  {
    name: 'Sofitel Mumbai BKC',
    location: 'Bandra',
    price: 9500,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
    description:
      'French luxury in the heart of Bandra Kurla Complex. Chic interiors, Artisan cocktail bar, Jyran tandoor dining, and a rooftop infinity pool.',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Rooftop Lounge', 'Business Center'],
  },
  {
    name: 'Hotel Suba International',
    location: 'Andheri',
    price: 4500,
    rating: 4.1,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
    description:
      'Well-located mid-range hotel in Andheri East near the airport. Offers comfortable rooms, multi-cuisine restaurant, and excellent business facilities.',
    amenities: ['Free WiFi', 'Restaurant', 'Room Service', 'AC', 'Airport Shuttle', 'Laundry'],
  },
  {
    name: 'Hotel Bawa Continental',
    location: 'Juhu',
    price: 4000,
    rating: 4.0,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d82de4e38?w=800&q=80',
    description:
      'A charming mid-range hotel near Juhu Beach. Known for warm hospitality, clean rooms, and proximity to entertainment hubs and the beach.',
    amenities: ['Free WiFi', 'Restaurant', 'Room Service', 'AC', 'Laundry', 'Travel Desk'],
  },
  {
    name: 'Residency Hotel Fort',
    location: 'Fort',
    price: 3800,
    rating: 4.0,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    description:
      'Heritage-style mid-range hotel in the Fort business district. Walking distance to CST station, Gateway of India, and major corporate offices.',
    amenities: ['Free WiFi', 'Restaurant', 'Room Service', 'AC', 'Business Center', 'Laundry'],
  },
  {
    name: 'Hotel Sahil',
    location: 'Mumbai Central',
    price: 3200,
    rating: 3.8,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
    description:
      'Affordable comfort near Mumbai Central station. A popular choice for business and leisure travelers with clean rooms and reliable service.',
    amenities: ['Free WiFi', 'Restaurant', 'AC', 'Room Service', 'Parking', 'Laundry'],
  },
  {
    name: 'Fern Residency',
    location: 'Bandra',
    price: 5500,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80',
    description:
      'Eco-friendly boutique hotel in trendy Bandra West. Green-certified with stylish rooms, organic restaurant, and proximity to Bandstand and Linking Road.',
    amenities: ['Free WiFi', 'Restaurant', 'Gym', 'AC', 'Eco-Friendly', 'Laundry'],
  },
  {
    name: 'Radisson Mumbai Andheri',
    location: 'Andheri',
    price: 6500,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    description:
      'Modern 4-star hotel in Andheri East with excellent airport connectivity. Features contemporary rooms, multi-cuisine dining, and a well-equipped fitness center.',
    amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Bar', 'Gym', 'Airport Shuttle', 'Business Center'],
  },
  {
    name: 'The Resort Mumbai',
    location: 'Madh Island',
    price: 7000,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
    description:
      'Beach resort escape on Madh Island with 14 acres of lush gardens. Perfect for a weekend getaway with pools, beach access, and adventure activities.',
    amenities: ['Free WiFi', 'Pool', 'Beach Access', 'Restaurant', 'Bar', 'Spa', 'Adventure Sports'],
  },
  {
    name: 'Novotel Mumbai Juhu Beach',
    location: 'Juhu',
    price: 7500,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&q=80',
    description:
      'Contemporary beachside hotel on Juhu Beach with modern amenities. Features family-friendly rooms, an infinity pool, and vibrant all-day dining.',
    amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Bar', 'Gym', 'Kids Area', 'Beach View'],
  },
  {
    name: 'Zostel Mumbai',
    location: 'Colaba',
    price: 1200,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
    description:
      'India\'s largest backpacker hostel chain with a vibrant Colaba location. Dorm beds and private rooms near the Gateway of India, with a buzzing common area.',
    amenities: ['Free WiFi', 'Common Kitchen', 'Lounge', 'Lockers', 'AC', 'Tour Desk'],
  },
  {
    name: 'Backpacker Panda Colaba',
    location: 'Colaba',
    price: 1000,
    rating: 4.0,
    image: 'https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=800&q=80',
    description:
      'Fun and affordable hostel in the heart of Colaba. Perfect for solo travelers and backpackers with cozy dorms, a rooftop chill zone, and city tour packages.',
    amenities: ['Free WiFi', 'Common Area', 'Lockers', 'AC', 'Rooftop', 'Tour Packages'],
  },
  {
    name: 'Budget Inn Andheri',
    location: 'Andheri',
    price: 1800,
    rating: 3.6,
    image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&q=80',
    description:
      'No-frills budget hotel near Andheri station and airport. Clean rooms, 24-hour front desk, and great transport connectivity at pocket-friendly prices.',
    amenities: ['Free WiFi', 'AC', '24hr Front Desk', 'Parking', 'Laundry'],
  },
  {
    name: 'City Guest House',
    location: 'Dadar',
    price: 1500,
    rating: 3.5,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
    description:
      'Simple and affordable guest house in Dadar, one of Mumbai\'s best-connected suburbs. Ideal for short stays with basic amenities and a friendly atmosphere.',
    amenities: ['Free WiFi', 'AC', 'TV', '24hr Front Desk', 'Laundry'],
  },
  {
    name: 'Hotel Kohinoor Continental',
    location: 'Andheri',
    price: 5000,
    rating: 4.1,
    image: 'https://images.unsplash.com/photo-1587213811864-46e59f6873b1?w=800&q=80',
    description:
      'Popular 4-star hotel near the international airport. Well-appointed rooms, excellent Indian restaurant, banquet halls, and business-class amenities.',
    amenities: ['Free WiFi', 'Restaurant', 'Bar', 'Gym', 'Business Center', 'Airport Shuttle', 'Banquet Hall'],
  },
  {
    name: 'The Orchid Hotel',
    location: 'Vile Parle',
    price: 5500,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800&q=80',
    description:
      'Asia\'s first ecotel certified 5-star hotel near the domestic airport. Rooftop pool, eco-conscious rooms, and award-winning restaurant Mostly Grills.',
    amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Gym', 'Eco-Friendly', 'Airport Shuttle', 'Rooftop'],
  },
  {
    name: 'Hyatt Regency Mumbai',
    location: 'Andheri',
    price: 8500,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1519449556851-5720b33024e7?w=800&q=80',
    description:
      'Upscale hotel in Andheri with stunning city views. Features elegant rooms, an outdoor pool, Stax restaurant, and excellent conference facilities.',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Business Center', 'Concierge'],
  },
  {
    name: 'Courtyard by Marriott',
    location: 'Navi Mumbai',
    price: 6000,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1529290130-4ca3753253ae?w=800&q=80',
    description:
      'Modern business hotel in Navi Mumbai with spacious rooms and great connectivity to Pune and South Mumbai. Ideal for corporate travelers.',
    amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Bar', 'Gym', 'Business Center', 'Parking'],
  },
  {
    name: 'Keys Select by Lemon Tree',
    location: 'Powai',
    price: 4200,
    rating: 4.0,
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80',
    description:
      'Vibrant mid-range hotel in the IT hub of Powai, near IIT Bombay and Powai Lake. Cheerful rooms, multi-cuisine restaurant, and good value for money.',
    amenities: ['Free WiFi', 'Restaurant', 'Gym', 'AC', 'Parking', 'Laundry', 'Meeting Room'],
  },
  {
    name: 'Dragonfly Hotel',
    location: 'Lower Parel',
    price: 4800,
    rating: 4.1,
    image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=800&q=80',
    description:
      'Boutique hotel in the commercial hub of Lower Parel. Stylish interiors, rooftop views, proximity to Phoenix Palladium mall and corporate offices.',
    amenities: ['Free WiFi', 'Restaurant', 'Bar', 'AC', 'Gym', 'Rooftop', 'Business Center'],
  },
];

module.exports = hotels;
