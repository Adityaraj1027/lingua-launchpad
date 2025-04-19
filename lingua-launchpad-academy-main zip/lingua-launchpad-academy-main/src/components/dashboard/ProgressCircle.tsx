
import { cn } from "@/lib/utils";

interface ProgressCircleProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  children?: React.ReactNode;
}

export default function ProgressCircle({
  percentage,
  size = 120,
  strokeWidth = 10,
  className,
  children,
}: ProgressCircleProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg height={size} width={size} className="transform -rotate-90">
        <circle
          className="text-muted stroke-current"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-primary stroke-current progress-ring-circle"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children || <span className="text-2xl font-bold">{percentage}%</span>}
      </div>
    </div>
  );
}
