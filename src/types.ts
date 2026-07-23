export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'massage' | 'facials' | 'body' | 'packages';
  price: number;
  durations: number[]; // e.g. [60, 90]
  basePriceByDuration: Record<number, number>;
  benefits: string[];
  features: string[];
  imageUrl: string;
}

export interface Therapist {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviewsCount: number;
  specialty: string[];
  bio: string;
  imageUrl: string;
  availability: string[]; // e.g. ["Mon", "Tue", "Thu", "Fri"]
}

export interface CustomSessionConfig {
  baseStyle: string;
  duration: number; // 60, 75, 90
  pressure: 'light' | 'medium' | 'deep';
  focusAreas: string[];
  addOns: string[];
  soundscape: string;
}

export interface CartItem {
  id: string; // random identifier
  isCustom: boolean;
  serviceId?: string; // empty if custom
  name: string;
  price: number;
  duration: number;
  therapistId?: string;
  therapistName?: string;
  date?: string;
  timeSlot?: string;
  customDetails?: CustomSessionConfig;
}

export interface BookingDetails {
  items: CartItem[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialInstructions?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  servicePurchased: string;
}
