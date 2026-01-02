// src/components/onboarding/ProgressBar.tsx


interface Props { step: number; total: number; }

export default function ProgressBar({ step, total }: Props) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="w-full max-w-3xl mx-auto px-6">
      <div className="flex justify-between items-center mb-3">
        <div className="text-sm text-gray">{`Paso ${step} de ${total}`}</div>
        <div className="text-sm font-medium text-gray">{pct}%</div>
      </div>
      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
        <div
          className="h-2 rounded-full bg-primary"
          style={{ width: `${pct}%` }}
        />
        
      </div>
    </div>
  );
}
