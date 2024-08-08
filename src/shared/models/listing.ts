export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
}

export interface CartItem extends Listing {
  quantity: number;
}