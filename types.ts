import { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image?: string;
}

export interface Package {
  title: string;
  price: string;
  features: string[];
  isPremium?: boolean;
  highlightColor?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: 'Design' | 'Web' | 'Audiovisual' | 'Branding';
  imageUrl: string;
}