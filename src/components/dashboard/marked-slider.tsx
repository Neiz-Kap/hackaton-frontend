import { Slider } from "@/components/ui/slider";

interface MarkedSliderProps {
  value: number;
  onChange: (value: number) => void;
  points: { value: number; label: string }[];
}

export function MarkedSlider({ value, onChange, points }: MarkedSliderProps) {
  // Минимальное и максимальное значение для слайдера
  const min = Math.min(...points.map((p) => p.value));
  const max = Math.max(...points.map((p) => p.value));

  return (
    <div className="flex flex-col gap-4">
      {/* Слайдер */}
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        min={min}
        max={max}
        step={1} // Разрешаем любые значения с шагом 1
        className="w-full"
      />
      {/* Метки под слайдером */}
      <div className="flex justify-between text-xs">
        {points.map((point) => (
          <div key={point.value} className="flex flex-col items-center">
            <span>{point.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}