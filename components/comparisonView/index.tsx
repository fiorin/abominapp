'use client';

import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { X, Footprints, Flame, Zap } from 'lucide-react';
import { Abomination } from '@/types';
import { GROUP_CONFIG } from '@/config/constants';
import Avatar from '@/components/avatar';
import Image from 'next/image';

interface ComparisonViewProps {
  abominations: Abomination[];
  onRemove: (slug: string) => void;
}

export default function ComparisonView({
  abominations,
  onRemove,
}: ComparisonViewProps) {
  if (abominations.length === 0) return null;

  // Get max values for comparison bars
  const maxActions = Math.max(...abominations.map((a) => a.actions));
  const maxDamage = Math.max(...abominations.map((a) => a.damage));
  const maxDanger = Math.max(...abominations.map((a) => a.danger));

  return (
    <div className="w-full space-y-6">
      <h2 className="text-2xl font-bold">Comparison View</h2>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {abominations.map((abom) => {
          const config = GROUP_CONFIG[abom.group ?? 'default'];
          const actionsPercent = (abom.actions / maxActions) * 100;
          const damagePercent = (abom.damage / maxDamage) * 100;
          const dangerPercent = (abom.danger / maxDanger) * 100;

          return (
            <Card key={abom.slug} className="relative overflow-hidden">
              <Button
                isIconOnly
                className="absolute top-2 right-2 z-10"
                size="sm"
                color="danger"
                variant="flat"
                onPress={() => onRemove(abom.slug)}
              >
                <X size={16} />
              </Button>

              <CardHeader className="flex flex-col items-center justify-center gap-2 py-4">
                <Image
                  alt={abom.name}
                  height={100}
                  src={`/images/abominations/${abom.slug}.png`}
                  width={100}
                  priority={false}
                  className="rounded-lg"
                />
                <div className="text-center">
                  <h3 className="text-lg font-bold">{abom.name}</h3>
                  <p className={`text-xs font-semibold ${config.text}`}>
                    {config.label}
                  </p>
                </div>
              </CardHeader>

              <CardBody className="gap-4">
                {/* Actions */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Footprints size={16} className="text-blue-500" />
                      <span className="text-sm font-semibold">Actions</span>
                    </div>
                    <span className="text-sm font-bold">{abom.actions}</span>
                  </div>
                  <div className="w-full bg-default-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${actionsPercent}%` }}
                    />
                  </div>
                </div>

                {/* Damage */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Zap size={16} className="text-yellow-500" />
                      <span className="text-sm font-semibold">Damage</span>
                    </div>
                    <span className="text-sm font-bold">{abom.damage}</span>
                  </div>
                  <div className="w-full bg-default-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full transition-all"
                      style={{ width: `${damagePercent}%` }}
                    />
                  </div>
                </div>

                {/* Danger */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Flame size={16} className="text-red-500" />
                      <span className="text-sm font-semibold">Danger</span>
                    </div>
                    <span className="text-sm font-bold">{abom.danger}</span>
                  </div>
                  <div className="w-full bg-default-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full transition-all"
                      style={{ width: `${dangerPercent}%` }}
                    />
                  </div>
                </div>

                {/* Ability */}
                <div>
                  <p className="text-xs font-semibold text-default-600 mb-1">
                    Ability
                  </p>
                  <p className="text-xs text-default-500">{abom.ability}</p>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Summary Stats */}
      {abominations.length > 1 && (
        <Card>
          <CardHeader>
            <h3 className="font-bold">Comparison Summary</h3>
          </CardHeader>
          <CardBody className="gap-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-default-600">Avg Actions</p>
                <p className="text-xl font-bold">
                  {(
                    abominations.reduce((sum, a) => sum + a.actions, 0) /
                    abominations.length
                  ).toFixed(1)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-default-600">Avg Damage</p>
                <p className="text-xl font-bold">
                  {(
                    abominations.reduce((sum, a) => sum + a.damage, 0) /
                    abominations.length
                  ).toFixed(1)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-default-600">Avg Danger</p>
                <p className="text-xl font-bold">
                  {(
                    abominations.reduce((sum, a) => sum + a.danger, 0) /
                    abominations.length
                  ).toFixed(1)}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
