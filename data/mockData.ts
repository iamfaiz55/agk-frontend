// Mock data for AGK Developers real-estate project

export interface Flat {
  id: string;
  flatNumber: string;
  area: string;
  price: string;
  floor: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  status: 'available' | 'booked' | 'sold';
  image: string;
  images: string[];
  description: string;
}

export interface Floor {
  id: string;
  name: string;
  description: string;
  type: 'parking' | 'shops' | 'offices' | 'flats';
  count?: number;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  location: string;
  heroImage: string;
  heroImages: string[];
  floors: Floor[];
  amenities: Amenity[];
}

export const projectData: Project = {
  id: 'pearl-heights',
  name: 'Pearl Heights Premium Mixed-Use Development',
  description: 'A modern, luxurious residential and commercial complex in the heart of the city. Featuring premium 3BHK flats, commercial shops, and office spaces.',
  location: 'Prime Location, City Center',
  heroImage: '/images/main-building-1.jpg', // Left side captured full building
  heroImages: [
    '/images/main-building-1.jpg', // Left side
    '/images/main-building-2.jpg', // Right side
    '/images/main-building-1.jpg', // Repeat for carousel
    '/images/main-building-2.jpg',
  ],
  floors: [
    {
      id: 'basement',
      name: 'Basement',
      description: 'Spacious parking area with 24/7 security',
      type: 'parking',
    },
    {
      id: 'ground',
      name: 'Ground Floor',
      description: 'Premium commercial shops with high footfall',
      type: 'shops',
      count: 8,
    },
    {
      id: 'first',
      name: '1st Floor',
      description: 'Modern office spaces with excellent connectivity',
      type: 'offices',
      count: 6,
    },
    {
      id: 'second',
      name: '2nd Floor',
      description: 'Luxurious 3BHK flats with premium finishes',
      type: 'flats',
      count: 4,
    },
    {
      id: 'third',
      name: '3rd Floor',
      description: 'Luxurious 3BHK flats with premium finishes',
      type: 'flats',
      count: 4,
    },
    {
      id: 'fourth',
      name: '4th Floor',
      description: 'Luxurious 3BHK flats with premium finishes',
      type: 'flats',
      count: 4,
    },
    {
      id: 'fifth',
      name: '5th Floor',
      description: 'Luxurious 3BHK flats with premium finishes',
      type: 'flats',
      count: 4,
    },
    {
      id: 'sixth',
      name: '6th Floor',
      description: 'Luxurious 3BHK flats with premium finishes',
      type: 'flats',
      count: 4,
    },
  ],
  amenities: [
    {
      id: 'security',
      name: '24/7 Security',
      icon: '🔒',
      description: 'Round-the-clock security with CCTV surveillance',
    },
    {
      id: 'parking',
      name: 'Basement Parking',
      icon: '🚗',
      description: 'Spacious covered parking for all residents',
    },
    {
      id: 'elevator',
      name: 'High-Speed Elevators',
      icon: '🛗',
      description: 'Modern elevators for quick access',
    },
    {
      id: 'power',
      name: 'Power Backup',
      icon: '⚡',
      description: 'Uninterrupted power supply',
    },
    {
      id: 'water',
      name: 'Water Supply',
      icon: '💧',
      description: '24/7 water supply with storage',
    },
    {
      id: 'waste',
      name: 'Waste Management',
      icon: '♻️',
      description: 'Efficient waste disposal system',
    },
  ],
};

export const flatsData: Flat[] = [
  {
    id: 'flat-201',
    flatNumber: '201',
    area: '1200 sq ft',
    price: '₹45,00,000',
    floor: 2,
    type: '3BHK',
    bedrooms: 3,
    bathrooms: 2,
    status: 'available',
    image: '/images/flat nno 01_1 - Photo.jpg',
    images: ['/images/flat nno 01_1 - Photo.jpg', '/images/flat nno 01_2 - Photo.jpg'],
    description: 'Spacious 3BHK flat with modern amenities, premium finishes, and excellent ventilation.',
  },
  {
    id: 'flat-202',
    flatNumber: '202',
    area: '1200 sq ft',
    price: '₹45,00,000',
    floor: 2,
    type: '3BHK',
    bedrooms: 3,
    bathrooms: 2,
    status: 'available',
    image: '/images/flat no 02_1 - Photo.jpg',
    images: ['/images/flat no 02_1 - Photo.jpg', '/images/flat no 02_2 - Photo.jpg'],
    description: 'Beautiful 3BHK flat with corner location, offering extra privacy and natural light.',
  },
  {
    id: 'flat-203',
    flatNumber: '203',
    area: '1200 sq ft',
    price: '₹45,00,000',
    floor: 2,
    type: '3BHK',
    bedrooms: 3,
    bathrooms: 2,
    status: 'booked',
    image: '/images/flat no 03_1 - Photo.jpg',
    images: ['/images/flat no 03_1 - Photo.jpg', '/images/flat no 03_2 - Photo.jpg'],
    description: 'Premium 3BHK flat with modern kitchen and spacious living area.',
  },
  {
    id: 'flat-204',
    flatNumber: '204',
    area: '1200 sq ft',
    price: '₹45,00,000',
    floor: 2,
    type: '3BHK',
    bedrooms: 3,
    bathrooms: 2,
    status: 'available',
    image: '/images/flat no 04_1 - Photo.jpg',
    images: ['/images/flat no 04_1 - Photo.jpg', '/images/flat no 04_2 - Photo.jpg'],
    description: 'Elegant 3BHK flat with premium flooring and modern fixtures.',
  },
  {
    id: 'flat-301',
    flatNumber: '301',
    area: '1200 sq ft',
    price: '₹46,00,000',
    floor: 3,
    type: '3BHK',
    bedrooms: 3,
    bathrooms: 2,
    status: 'available',
    image: '/images/seond floor_1 - Photo.jpg',
    images: ['/images/seond floor_1 - Photo.jpg', '/images/seond floor_2 - Photo.jpg'],
    description: 'Luxurious 3BHK flat on higher floor with better views.',
  },
  {
    id: 'flat-302',
    flatNumber: '302',
    area: '1200 sq ft',
    price: '₹46,00,000',
    floor: 3,
    type: '3BHK',
    bedrooms: 3,
    bathrooms: 2,
    status: 'available',
    image: '/images/thid floor plan_1 - Photo.jpg',
    images: ['/images/thid floor plan_1 - Photo.jpg', '/images/thid floor plan_2 - Photo.jpg'],
    description: 'Modern 3BHK flat with spacious balconies and premium amenities.',
  },
  {
    id: 'flat-401',
    flatNumber: '401',
    area: '1200 sq ft',
    price: '₹47,00,000',
    floor: 4,
    type: '3BHK',
    bedrooms: 3,
    bathrooms: 2,
    status: 'available',
    image: '/images/flat no 05_1 - Photo.jpg',
    images: ['/images/flat no 05_1 - Photo.jpg', '/images/flat no 05_2 - Photo.jpg'],
    description: 'Premium 3BHK flat with excellent natural lighting and ventilation.',
  },
  {
    id: 'flat-501',
    flatNumber: '501',
    area: '1200 sq ft',
    price: '₹48,00,000',
    floor: 5,
    type: '3BHK',
    bedrooms: 3,
    bathrooms: 2,
    status: 'sold',
    image: '/images/R FIFTH FLOOR PLAN copy.jpg',
    images: ['/images/R FIFTH FLOOR PLAN copy.jpg'],
    description: 'Top floor 3BHK flat with panoramic views and premium finishes.',
  },
];

export const adminStats = {
  totalProjects: 1,
  totalBuildings: 1,
  totalFlats: 24,
  availableFlats: 18,
  bookedFlats: 4,
  soldFlats: 2,
  totalLeads: 156,
  newLeads: 12,
  totalUsers: 45,
  activeUsers: 32,
};

export const leadsData = [
  { id: '1', name: 'John Doe', phone: '+91 98765 43210', email: 'john@example.com', date: '2024-01-15', status: 'new', project: 'Pearl Heights' },
  { id: '2', name: 'Jane Smith', phone: '+91 98765 43211', email: 'jane@example.com', date: '2024-01-14', status: 'contacted', project: 'Pearl Heights' },
  { id: '3', name: 'Mike Johnson', phone: '+91 98765 43212', email: 'mike@example.com', date: '2024-01-13', status: 'qualified', project: 'Pearl Heights' },
];

export const usersData = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', joined: '2024-01-10' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', joined: '2024-01-08' },
  { id: '3', name: 'Admin User', email: 'admin@agk.com', role: 'admin', status: 'active', joined: '2024-01-01' },
];

