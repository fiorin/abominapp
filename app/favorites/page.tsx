'use client';

import { useMemo } from 'react';
import { Card, CardBody } from '@heroui/card';
import { Button } from '@heroui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useAbominationsStatic } from '@/hooks/useAbominationsStatic';
import { useFavorites } from '@/hooks/useFavorites';
import { GROUP_CONFIG } from '@/config/constants';

export default function FavoritesPage() {
  const { abominations } = useAbominationsStatic();
  const { favorites } = useFavorites();

  const favoriteAbominations = useMemo(() => {
    return abominations.filter((a) => favorites.has(a.slug));
  }, [abominations, favorites]);

  return (
    <div className="min-h-screen bg-gradient-to-br p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Favorites</h1>
            <p className="text-gray-400">
              {favoriteAbominations.length} favorite
              {favoriteAbominations.length !== 1 ? 's' : ''}
            </p>
          </div>
          {favoriteAbominations.length === 0 && (
            <Button as={Link} href="/abominations" color="primary">
              Browse Abominations
            </Button>
          )}
        </div>

        {/* Empty State */}
        {favoriteAbominations.length === 0 ? (
          <Card className="bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-700">
            <CardBody className="py-12">
              <div className="text-center space-y-4">
                <Heart size={48} className="mx-auto text-gray-400" />
                <div>
                  <p className="text-xl text-gray-300 font-semibold mb-2">
                    No favorites yet
                  </p>
                  <p className="text-sm text-gray-500">
                    Start adding abominations to your favorites
                  </p>
                </div>
                <Button
                  as={Link}
                  href="/abominations"
                  color="primary"
                  variant="flat"
                  className="mt-4"
                >
                  Explore Abominations
                </Button>
              </div>
            </CardBody>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteAbominations.map((abom) => {
              const config =
                GROUP_CONFIG[abom.group ?? 'default'];

              return (
                <Card
                  key={abom.slug}
                  as={Link}
                  href={`/abominations/${abom.slug}`}
                  className="bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all hover:shadow-lg hover:shadow-slate-700/50 cursor-pointer overflow-hidden"
                >
                  <CardBody className="p-0 space-y-0">
                    {/* Image Container */}
                    <div className="relative w-full h-48 overflow-hidden bg-slate-800">
                      <Image
                        alt={abom.name}
                        className="w-full h-full object-cover"
                        height={200}
                        priority={false}
                        src={`/images/abominations/${abom.slug}.png`}
                        width={300}
                      />
                      {/* Heart Badge */}
                      <div className="absolute top-2 right-2 bg-red-500 rounded-full p-2">
                        <Heart
                          size={16}
                          className="fill-white text-white"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2">
                      <h3 className="text-lg font-bold text-white">
                        {abom.name}
                      </h3>
                      <p className={`text-xs font-semibold ${config.text}`}>
                        {config.label}
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 py-2">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Actions</p>
                          <p className="text-sm font-bold text-blue-400">
                            {abom.actions}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Damage</p>
                          <p className="text-sm font-bold text-yellow-400">
                            {abom.damage}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Danger</p>
                          <p className="text-sm font-bold text-red-400">
                            {abom.danger}
                          </p>
                        </div>
                      </div>

                      {/* Ability */}
                      <p className="text-xs text-gray-400 line-clamp-2">
                        {abom.ability}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
