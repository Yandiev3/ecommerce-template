import { z } from "zod";

enum ProductCategory {
  T_SHIRT = "t-shirt",
  PANTS = "pants",
  SWEATSHIRT = "sweatshirt",
}

export enum ProductSize {
  XS = "xs",
  S = "s",
  M = "m",
  L = "l",
  XL = "xl",
  XXL = "2xl",
}

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.nativeEnum(ProductCategory),
  img: z.string(),
  created_at: z.string().default(() => new Date().toISOString()),
  updated_at: z.string().default(() => new Date().toISOString()),
});

export const ProductVariantSchema = z.object({
  id: z.number(),
  stripe_id: z.string(),
  product_id: z.number(),
  color: z.string(),
  sizes: z.array(z.nativeEnum(ProductSize)),
  images: z.array(z.string()),
  created_at: z.string().default(() => new Date().toISOString()),
  updated_at: z.string().default(() => new Date().toISOString()),
});

export const OrderProductSchema = z.object({
  id: z.number(),
  order_id: z.number(),
  variant_id: z.number(),
  quantity: z.number(),
  size: z.nativeEnum(ProductSize),
  created_at: z.string().default(() => new Date().toISOString()),
  updated_at: z.string().default(() => new Date().toISOString()),
  products_variants: z.any(),
});

export const CustomerInfoSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.object({
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    postal_code: z.string(),
    country: z.string(),
  }),
  stripe_order_id: z.string(),
  total_price: z.number(),
});

export const OrderItemSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  delivery_date: z.string(),
  order_number: z.number(),
  created_at: z.string().default(() => new Date().toISOString()),
  updated_at: z.string().default(() => new Date().toISOString()),
  order_products: z.array(OrderProductSchema),
  customer_info: CustomerInfoSchema,
});

export const CartItemSchema = z.object({
  id: z.number(),
  variant_id: z.number(),
  quantity: z.number(),
  size: z.nativeEnum(ProductSize),
  user_id: z.string(),
  created_at: z.string().default(() => new Date().toISOString()),
  updated_at: z.string().default(() => new Date().toISOString()),
});

export const WishlistItemSchema = z.object({
  id: z.number(),
  product_id: z.number(),
  user_id: z.string(),
  created_at: z.string().default(() => new Date().toISOString()),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductVariant = z.infer<typeof ProductVariantSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type OrderProduct = z.infer<typeof OrderProductSchema>;
export type CartItem = z.infer<typeof CartItemSchema>;
export type WishlistItem = z.infer<typeof WishlistItemSchema>;
export type EnrichedProduct = Product & {
  variants: ProductVariant[];
  cart_item?: CartItem;
  wishlist_item?: WishlistItem;
};

export type CustomerInfo = z.infer<typeof CustomerInfoSchema>;

export const productsWithVariantsQuery = "*, variants:products_variants(*)";
