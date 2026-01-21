'use client';

import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import { Abomination } from '@/types';
import { GROUP_CONFIG } from '@/config/constants';
import Image from 'next/image';
import { Check, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';

interface ComparisonSelectorProps {
  abominations: Abomination[];
  selectedSlugs: string[];
  onToggle: (slug: string) => void;
  canAdd: boolean;
  onClose: () => void;
}

export default function ComparisonSelector({
  abominations,
  selectedSlugs,
  onToggle,
  canAdd,
  onClose,
}: ComparisonSelectorProps) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return abominations.filter((a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.ability.toLowerCase().includes(search.toLowerCase())
    );
  }, [abominations, search]);

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search abominations..."
        value={search}
        onValueChange={setSearch}
        isClearable
        onClear={() => setSearch('')}
        className="w-full"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-2">
        {filtered.map((abom) => {
          const isSelected = selectedSlugs.includes(abom.slug);
          const config = GROUP_CONFIG[abom.group ?? 'default'];
          const isDisabled = !isSelected && !canAdd;

          return (
            <Card
              key={abom.slug}
              className={`cursor-pointer transition-all ${
                isSelected
                  ? 'ring-2 ring-primary bg-slate-700'
                  : isDisabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-slate-700'
              }`}
            >
              <CardBody
                className="p-3"
                onClick={() => !isDisabled && onToggle(abom.slug)}
              >
                <div className="flex gap-3">
                  <Image
                    alt={abom.name}
                    height={60}
                    src={`/images/abominations/${abom.slug}.png`}
                    width={60}
                    priority={false}
                    className="rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm line-clamp-1">
                      {abom.name}
                    </h3>
                    <p className={`text-xs font-semibold ${config.text}`}>
                      {config.label}
                    </p>
                    <p className="text-xs text-default-500 line-clamp-2 mt-1">
                      {abom.ability}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    {isSelected ? (
                      <div className="bg-primary text-primary-foreground rounded-full p-1">
                        <Check size={16} />
                      </div>
                    ) : !isDisabled ? (
                      <div className="bg-default-200 rounded-full p-1">
                        <Plus size={16} className="text-default-500" />
                      </div>
                    ) : null}
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No abominations found</p>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4 border-t border-slate-700">
        <Button variant="flat" onPress={onClose}>
          Done
        </Button>
      </div>
    </div>
  );
}
