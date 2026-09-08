import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type RadarPoint = { name: string; score: number };

export default function SkillRadar({ data }: { data: RadarPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <RadarChart data={data} outerRadius="68%" margin={{ top: 24, right: 36, bottom: 24, left: 36 }}>
        <PolarGrid stroke="var(--chart-grid)" radialLines={false} />
        <PolarAngleAxis dataKey="name" tick={{ fill: "var(--muted)", fontSize: 12, fontWeight: 600 }} />
        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
        <Radar
          dataKey="score"
          stroke="var(--accent)"
          strokeWidth={2}
          fill="var(--accent)"
          fillOpacity={0.16}
          dot={{ r: 4, fill: "var(--accent)", strokeWidth: 0 }}
          isAnimationActive={false}
        />
        <Tooltip
          formatter={(value) => [`${value}%`, "Relative focus"]}
          contentStyle={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            boxShadow: "var(--shadow)",
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
