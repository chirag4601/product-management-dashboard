export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description?: string;
  rating?: { rate?: string; count?: string };
}
