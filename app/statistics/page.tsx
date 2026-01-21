'use client';

import { Card, CardBody, CardHeader } from '@heroui/card';
import { useAbominationsStatic } from '@/hooks/useAbominationsStatic';
import { useStatistics } from '@/hooks/useStatistics';
import StatsDashboard from '@/components/statsDashboard';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { GROUP_CONFIG } from '@/config/constants';

export default function StatsPage() {
  const { abominations } = useAbominationsStatic();
  const stats = useStatistics(abominations);

  const groupColors: Record<string, string> = {
    runner: '#ef4444',
    fatty: '#f97316',
    tank: '#3b82f6',
    special: '#8b5cf6',
    default: '#6b7280',
  };

  // Prepare data for group distribution chart
  const groupDistributionData = Object.entries(stats.groupDistribution).map(
    ([group, count]) => ({
      name: GROUP_CONFIG[group as keyof typeof GROUP_CONFIG]?.label || group,
      count,
      color: groupColors[group as keyof typeof groupColors] || '#6b7280',
    })
  );

  // Prepare data for danger distribution chart
  const dangerDistributionData = stats.dangerDistribution.map((d) => ({
    level: `Level ${d.level}`,
    count: d.count,
    percentage: d.percentage,
  }));

  // Prepare data for stats by group
  const statsByGroupData = Object.entries(stats.byGroup).map(([group, data]) => ({
    group: GROUP_CONFIG[group as keyof typeof GROUP_CONFIG]?.label || group,
    avgDanger: parseFloat(data.avgDanger.toFixed(1)),
    avgActions: parseFloat(data.avgActions.toFixed(1)),
    avgDamage: parseFloat(data.avgDamage.toFixed(1)),
  }));

  return (
    <div className="min-h-screen from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Abominations Statistics
          </h1>
          <p className="text-gray-400">
            Comprehensive insights into the abominations dataset
          </p>
        </div>

        {/* Main Stats Dashboard */}
        <StatsDashboard stats={stats} />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Group Distribution Pie Chart */}
          <Card className="bg-slate-800 border border-slate-700">
            <CardHeader>
              <h2 className="font-bold text-white">Distribution by Group</h2>
            </CardHeader>
            <CardBody className="flex items-center justify-center py-8">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={groupDistributionData}
                    cx="50%"
                    cy="50%"
                    dataKey="count"
                    fill="#8884d8"
                    label={(entry: any) => `${entry.name}: ${entry.count}`}
                    labelLine={false}
                    outerRadius={80}
                  >
                    {groupDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>

          {/* Danger Distribution Bar Chart */}
          <Card className="bg-slate-800 border border-slate-700">
            <CardHeader>
              <h2 className="font-bold text-white">Distribution by Danger</h2>
            </CardHeader>
            <CardBody className="py-8">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dangerDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#555555ff" />
                  <XAxis dataKey="level" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#3b3b3bff',
                      border: '1px solid #555555ff',
                      color: '#e2e8f0',
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="#ef4444"
                    name="Count"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>

          {/* Average Stats by Group */}
          <Card className="bg-slate-800 border border-slate-700 lg:col-span-2">
            <CardHeader>
              <h2 className="font-bold text-white">Average Stats by Group</h2>
            </CardHeader>
            <CardBody className="py-8">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={statsByGroupData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#555555ff" />
                  <XAxis dataKey="group" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#3b3b3bff',
                      border: '1px solid #555555ff',
                      color: '#e2e8f0',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="avgDanger"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="Avg Danger"
                    connectNulls
                  />
                  <Line
                    type="monotone"
                    dataKey="avgActions"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Avg Actions"
                    connectNulls
                  />
                  <Line
                    type="monotone"
                    dataKey="avgDamage"
                    stroke="#fbbf24"
                    strokeWidth={2}
                    name="Avg Damage"
                    connectNulls
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </div>

        {/* Detailed Stats Table */}
        <Card className="bg-slate-800 border border-slate-700">
          <CardHeader>
            <h2 className="font-bold text-white">Detailed Group Statistics</h2>
          </CardHeader>
          <CardBody>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">
                      Group
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-300">
                      Count
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-300">
                      Avg Danger
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-300">
                      Avg Actions
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-300">
                      Avg Damage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(stats.byGroup).map(([group, data]) => (
                    <tr
                      key={group}
                      className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded font-semibold text-white ${GROUP_CONFIG[group as keyof typeof GROUP_CONFIG]?.bg}`}
                        >
                          {GROUP_CONFIG[group as keyof typeof GROUP_CONFIG]?.label}
                        </span>
                      </td>
                      <td className="text-center py-3 px-4 font-semibold">
                        {data.count}
                      </td>
                      <td className="text-center py-3 px-4">
                        {data.avgDanger.toFixed(2)}
                      </td>
                      <td className="text-center py-3 px-4">
                        {data.avgActions.toFixed(2)}
                      </td>
                      <td className="text-center py-3 px-4">
                        {data.avgDamage.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
