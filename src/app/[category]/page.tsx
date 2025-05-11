import { getCategoryProducts } from "../actions";
import ProductsSkeleton from "@/components/products/skeleton";
import { Suspense } from "react";
import { GridProducts } from "@/components/products/GridProducts";
import { ProductItem } from "@/components/products/item";

interface Props {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const capitalizedCategory = capitalizeFirstLetter(params.category);

  return {
    title: `${capitalizedCategory} | Ecommerce Template`,
    description: `${capitalizedCategory} category at e-commerce template made by Marcos Cámara`,
  };
}

const CategoryPage = async ({ params }: Props) => {
  return (
    <section className="pt-14">
      <Suspense fallback={<ProductsSkeleton items={6} />}>
        <CategoryProducts category={params.category} />
      </Suspense>
    </section>
  );
};

const CategoryProducts = async ({ category }: { category: string }) => {
  const products = await getCategoryProducts(category);

  return (
    <GridProducts>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </GridProducts>
  );
};

export default CategoryPage;
