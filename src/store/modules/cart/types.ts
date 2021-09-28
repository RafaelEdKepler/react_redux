export interface IProduct {
  id: number;
  title: string;
  price: string;
}

export interface ICartItem {
  product: object;
  quantity: number;
}
export interface ICartState {
  items: ICartItem[];
}