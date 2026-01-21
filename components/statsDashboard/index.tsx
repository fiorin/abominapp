'use client';

import { Card, CardBody, CardHeader } from '@heroui/card';
import { Progress } from '@heroui/progress';
import { Flame, Footprints, Zap, Target } from 'lucide-react';
import { Statistics } from '@/hooks/useStatistics';
import { GROUP_CONFIG } from '@/config/constants';

interface StatsDashboardProps {
  stats: Statistics;
}

export default function StatsDashboard({ stats }: StatsDashboardProps) {
  if (stats.total === 0) {
    return null;
  }

  return (
    <div className="w-full space-y-6">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex gap-3">
            <Target className="text-blue-500" size={20} />
            <div className="flex flex-col">
              <p className="text-md font-bold">Total</p>
            </div>
          </CardHeader>
          <CardBody className="py-2">
            <p className="text-2xl font-bold text-blue-500">{stats.total}</p>
            <p className="text-xs text-default-500">Abominations</p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex gap-3">
            <Flame className="text-red-500" size={20} />
            <div className="flex flex-col">
              <p className="text-md font-bold">Avg Danger</p>
            </div>
          </CardHeader>
          <CardBody className="py-2">
            <p className="text-2xl font-bold text-red-500">
              {stats.avgDanger.toFixed(1)}
            </p>
            <Progress
              value={(stats.avgDanger / stats.maxDanger) * 100}
              className="mt-2"
              color="danger"
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex gap-3">
            <Footprints className="text-green-500" size={20} />
            <div className="flex flex-col">
              <p className="text-md font-bold">Avg Actions</p>
            </div>
          </CardHeader>
          <CardBody className="py-2">
            <p className="text-2xl font-bold text-green-500">
              {stats.avgActions.toFixed(1)}
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex gap-3">
            <Zap className="text-yellow-500" size={20} />
            <div className="flex flex-col">
              <p className="text-md font-bold">Avg Damage</p>
            </div>
          </CardHeader>
          <CardBody className="py-2">
            <p className="text-2xl font-bold text-yellow-500">
              {stats.avgDamage.toFixed(1)}
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Group Distribution */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-bold">Distribution by Group</h3>
        </CardHeader>
        <CardBody className="py-4">
          <div className="space-y-3">
            {Object.entries(stats.groupDistribution).map(([group, count]) => {
              const percentage = (count / stats.total) * 100;
              const config =
                GROUP_CONFIG[(group ?? "default") as keyof typeof GROUP_CONFIG];

              return (
                <div key={group}>
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-sm font-semibold ${config.text}`}>
                      {config.label}
                    </span>
                    <span className="text-xs text-default-500">
                      {count} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <Progress
                    value={percentage}
                    className="h-2"
                    color="primary"
                  />
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      {/* Danger Level Distribution */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-bold">Danger Level Breakdown</h3>
        </CardHeader>
        <CardBody className="py-4">
          <div className="space-y-3">
            {stats.dangerDistribution.map(({ level, count, percentage }) => (
              <div key={level}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold">
                    Level {level}
                  </span>
                  <span className="text-xs text-default-500">
                    {count} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <Progress
                  value={percentage}
                  className="h-2"
                  color="danger"
                />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
