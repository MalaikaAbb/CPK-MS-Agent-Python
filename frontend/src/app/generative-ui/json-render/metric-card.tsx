"use client";

export interface MetricCardComponentProps {
  label: string;
  value: string;
  trend?: string | null;
}

export function MetricCard({ label, value, trend }: MetricCardComponentProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
        {value}
      </div>
      {trend && (
        <div className="mt-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          {trend}
        </div>
      )}
    </div>
  );
}

