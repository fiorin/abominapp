'use client';

import { useMemo, useState } from 'react';
import { Button } from '@heroui/button';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useAbominationsStatic } from '@/hooks/useAbominationsStatic';
import { useComparison } from '@/hooks/useComparison';
import ComparisonView from '@/components/comparisonView';
import ComparisonSelector from '@/components/comparisonSelector';

export default function ComparePage() {
  const { abominations } = useAbominationsStatic();
  const comparison = useComparison(3);
  const [showSelector, setShowSelector] = useState(false);

  const selectedAbominations = useMemo(() => {
    return abominations.filter((a) =>
      comparison.selectedSlugs.includes(a.slug)
    );
  }, [abominations, comparison.selectedSlugs]);

  return (
    <div className="min-h-screen from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Compare Abominations
            </h1>
            <p className="text-gray-400">
              Select up to 3 abominations to compare their stats side-by-side
            </p>
          </div>
          <div className="flex gap-2">
            {comparison.count > 0 && (
              <Button
                color="danger"
                variant="flat"
                onPress={comparison.clearComparison}
              >
                Clear All
              </Button>
            )}
            <Button
              color="secondary"
              endContent={<Plus size={18} />}
              onPress={() => setShowSelector(!showSelector)}
            >
              Add Abomination
            </Button>
          </div>
        </div>

        {/* Selector */}
        {showSelector && (
          <Card className="border border-slate-700">
            <CardHeader>
              <h2 className="font-bold text-white">
                Select Abominations ({comparison.count}/3)
              </h2>
            </CardHeader>
            <CardBody>
              <ComparisonSelector
                abominations={abominations}
                selectedSlugs={comparison.selectedSlugs}
                onToggle={comparison.toggleAbomination}
                canAdd={comparison.canAdd}
                onClose={() => setShowSelector(false)}
              />
            </CardBody>
          </Card>
        )}

        {/* Empty State */}
        {selectedAbominations.length === 0 ? (
          <Card className="border border-slate-700">
            <CardBody className="py-12">
              <div className="text-center space-y-4">
                <p className="text-xl text-gray-400">
                  No abominations selected yet
                </p>
                <p className="text-sm text-gray-500">
                  Click "Add Abomination" to start comparing
                </p>
                <Button
                  as={Link}
                  href="/abominations"
                  color="secondary"
                  variant="flat"
                  className="mt-4"
                >
                  Browse Abominations
                </Button>
              </div>
            </CardBody>
          </Card>
        ) : (
          <ComparisonView
            abominations={selectedAbominations}
            onRemove={comparison.removeAbomination}
          />
        )}
      </div>
    </div>
  );
}
