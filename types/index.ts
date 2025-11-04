export interface Specification {
  key: string;
  value: string;
}

export interface Review {
  id: string;
  product_id: string;
  customer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  images: string[];
  category: string;
  stock: number;
  featured: boolean;
  specifications?: Specification[];
  reviews?: Review[];
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface Order {
  id: string;
  user_id?: string;
  user_email: string;
  user_name: string;
  user_phone?: string;
  user_address: string;
  user_city: string;
  user_state?: string;
  user_postal_code: string;
  user_country: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'cod-pending' | 'upi-pending';
  payment_method?: 'upi' | 'cod' | 'stripe';
  stripe_payment_intent_id?: string;
  tracking_number?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  product_price: number;
  product_image: string;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  role: 'admin' | 'customer';
  phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  created_at: string;
  updated_at: string;
}

export interface SEOSettings {
  id: string;
  page_type: 'homepage' | 'product' | 'category';
  page_id?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  og_image?: string;
  twitter_card?: string;
  created_at: string;
  updated_at: string;
}

