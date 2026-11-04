"use client";

export interface PieChartComponentProps {
  title: string;
  description?: string | null;
  data: Array<{ label: string; value: number }>;
}

export function PieChart({ title, description, data }: PieChartComponentProps) {
  const total = (data ?? []).reduce((acc, curr) => acc + curr.value, 0) || 1;

  const colors = [
    "bg-indigo-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-sky-500",
    "bg-violet-500",
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</div>
      {description && (
        <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{description}</div>
      )}
      <div className="mt-3 flex h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        {data?.map((item, idx) => {
          const widthPct = (item.value / total) * 100;
          return (
            <div
              key={idx}
              className={`h-full ${colors[idx % colors.length]}`}
              style={{ width: `${widthPct}%` }}
              title={`${item.label}: ${item.value}`}
            />
          );
        })}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        {data?.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <span className={`h-2 w-2 rounded-full ${colors[idx % colors.length]}`} />
            <span className="truncate">{item.label}</span>
            <span className="ml-auto font-mono text-slate-900 dark:text-slate-200">
              {Math.round((item.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

