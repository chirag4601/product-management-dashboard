"use client";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { toggleFavorite } from "@/store/features/favoriteSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Product } from "@/types/product";

export default function ProductDetail({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );
  const isFavorite = favorites.some((item) => item.id === product.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Products
          </Link>
          <Link
            href="/favorites"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
          >
            <ShoppingBag size={20} />
            <span>Favorites ({favorites.length})</span>
          </Link>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <div className=" relative bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <div className="h-64 w-full md:w-96 bg-gray-100 flex items-center justify-center p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full object-contain"
                />
              </div>
            </div>
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
            <div className="p-8">
              <div className="text-sm text-blue-600 font-semibold tracking-wide uppercase">
                {product.category}
              </div>
              <h1 className="mt-2 text-2xl font-bold text-gray-900">
                {product.title}
              </h1>
              <p className="mt-4 text-gray-500">{product?.description}</p>
              <div className="mt-6">
                <div className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </div>
                <div className="mt-2 flex items-center">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(+(product?.rating?.rate || 5))
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-gray-600">
                      ({product.rating?.count} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
