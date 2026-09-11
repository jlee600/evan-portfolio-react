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
    <ResponsiveContainer width="100%" height={250}>
      <RadarChart data={data} outerRadius="66%" margin={{ top: 18, right: 32, bottom: 18, left: 32 }}>
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
          formatter={(value) => [`${value}%`, "Focus"]}
          contentStyle={{
            padding: "6px 8px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 7,
            boxShadow: "var(--shadow-soft)",
            fontSize: 11,
          }}
          labelStyle={{ color: "var(--text)", marginBottom: 2 }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
