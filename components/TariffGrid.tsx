"use client";

import type { Tariff } from "@/types/tariff";
import TariffCard from "./TariffCard";

export default function TariffGrid({
  tariffs,
  selectedId,
  discountEnded,
  onSelect,
}: {
  tariffs: Tariff[];
  selectedId: string | null;
  discountEnded: boolean;
  onSelect: (id: string) => void;
}) {
  const bestTariff = tariffs.find((t) => t.is_best);
  const others = tariffs.filter((t) => !t.is_best);

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <div className="flex flex-col gap-3 lg:hidden">
        {bestTariff && (
          <TariffCard
            tariff={bestTariff}
            selected={selectedId === bestTariff.id}
            isLarge
            discountEnded={discountEnded}
            onClick={() => onSelect(bestTariff.id)}
          />
        )}
        {others.map((t) => (
          <TariffCard
            key={t.id}
            tariff={t}
            selected={selectedId === t.id}
            isLarge={false}
            discountEnded={discountEnded}
            onClick={() => onSelect(t.id)}
          />
        ))}
      </div>
      <div className="hidden lg:flex lg:flex-col lg:gap-4">
        {bestTariff && (
          <TariffCard
            tariff={bestTariff}
            selected={selectedId === bestTariff.id}
            isLarge
            discountEnded={discountEnded}
            onClick={() => onSelect(bestTariff.id)}
          />
        )}
        <div className="flex items-start gap-4">
          {others.map((t) => (
            <TariffCard
              key={t.id}
              tariff={t}
              selected={selectedId === t.id}
              isLarge={false}
              discountEnded={discountEnded}
              onClick={() => onSelect(t.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
