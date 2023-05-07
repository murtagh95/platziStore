import { User } from "./users.entity";
import { Product } from "../../products/entities/products.entity";

export class Order {
  id: number;
  name: string;
  description: string;
  user: User;
  product_ids: Product[];
  total_price: number;
  date: Date;
}
