"use client";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function FavoritesPage() {
    const favorites = useSelector((state: RootState) => state.favorites.favorites);

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                            <ArrowLeft size={20} />
                            <span>Back to Shop</span>
                        </Link>
                        <h1 className="text-2xl font-bold text-blue-600">My Favorites</h1>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-8">
                {favorites.length === 0 ? (
                    <div className="text-center py-12">
                        <h2 className="text-xl text-gray-600">No favorite products yet</h2>
                        <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
                            Go back to shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {favorites.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}