import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Heart } from "lucide-react";

import { Product } from "@/types/product";
import { toggleFavorite } from "@/store/features/favoriteSlice";
import { RootState } from "@/store/store";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );
  const isFavorite = favorites.some((item) => item.id === product.id);

  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="bg-white rounded-lg w-full flex flex-col justify-between space h-full shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain"
          />
          <button
            onClick={(ev) => {
              ev.stopPropagation();
              ev.preventDefault();
              dispatch(toggleFavorite(product));
            }}
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isFavorite ? "bg-red-500" : "bg-gray-100"
            }`}
          >
            <Heart
              size={20}
              className={isFavorite ? "text-white" : "text-gray-600"}
              fill={isFavorite ? "currentColor" : "none"}
            />
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {product.title}
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-blue-600 font-bold">${product.price}</span>
            <span className="text-sm text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
