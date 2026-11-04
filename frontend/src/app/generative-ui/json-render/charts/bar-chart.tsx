"use client";

export interface BarChartComponentProps {
  title: string;
  description?: string | null;
  data: Array<{ label: string; value: number }>;
}

export function BarChart({ title, description, data }: BarChartComponentProps) {
  const maxValue = Math.max(...(data?.map((d) => d.value) ?? [1]), 1);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</div>
      {description && (
        <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{description}</div>
      )}
      <div className="mt-3 space-y-2">
        {data?.map((item, idx) => {
          const pct = Math.min(100, Math.max(8, (item.value / maxValue) * 100));
          return (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>{item.label}</span>
                <span className="font-mono text-slate-900 dark:text-slate-100">{item.value.toLocaleString()}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-2 rounded-full bg-blue-600 dark:bg-blue-500 transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

