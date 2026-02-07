"use client";

import type { Tariff } from "@/types/tariff";
import { getDiscountPercent, formatPrice } from "@/types/tariff";

export default function TariffCard({
  tariff,
  selected,
  isLarge,
  discountEnded,
  onClick,
}: {
  tariff: Tariff;
  selected: boolean;
  isLarge: boolean;
  discountEnded: boolean;
  onClick?: () => void;
}) {
  const discount = getDiscountPercent(tariff.price, tariff.full_price);
  const showDiscount = !discountEnded && discount > 0;
  const displayPrice = discountEnded ? tariff.full_price : tariff.price;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full text-left border-2 transition-all duration-300 bg-card-bg lg:shrink-0 ${
        isLarge ? "rounded-[var(--radius-card-large)] p-0 lg:pb-4 lg:px-0 lg:pt-0" : "rounded-[var(--radius-card-small)] p-0 lg:p-4"
      } ${
        selected
          ? "border-accent shadow-lg shadow-accent/20"
          : "border-card-border"
      } ${
        isLarge
          ? "h-[120px] min-[375px]:h-[130px] lg:h-[var(--height-card-large)] lg:w-[var(--width-card-large)] lg:max-w-full"
          : "h-[120px] min-[375px]:h-[130px] lg:h-[var(--height-card-small)] lg:w-[var(--width-card-small)] lg:max-w-full"
      }`}
    >
      {showDiscount && (
        <span
          className="absolute right-[50px] top-0 rounded-b-md px-2 py-1 font-gilroy text-xs font-bold leading-tight text-white min-[375px]:right-[60px] lg:left-[var(--discount-badge-left)] lg:right-auto"
          style={{ backgroundColor: "var(--color-discount-badge)" }}
        >
          -{discount}%
        </span>
      )}
      {tariff.is_best && (
        <span className="absolute right-[var(--hit-offset-right)] top-[var(--hit-offset-top)] text-[var(--hit-font-size)] font-medium leading-tight text-accent">
          хит!
        </span>
      )}
      <div
        className={`relative flex flex-col ${
          isLarge
            ? "h-full pt-0 lg:h-auto lg:pt-[35px] lg:pl-[120px] lg:pr-[65px] lg:pb-0 lg:gap-0"
            : "h-full pt-0 lg:h-auto lg:gap-0 lg:pt-[54px]"
        }`}
      >
        {isLarge ? (
          <>
            <div className="hidden lg:flex lg:flex-row lg:flex-nowrap lg:items-center lg:gap-[40px]">
              <div className="flex shrink-0 flex-col">
                <span className="font-semibold text-white text-lg sm:text-xl">
                  {tariff.period}
                </span>
                <div className="mt-[15px] flex flex-col items-end gap-0 leading-none">
                  <span
                    className={`block transition-all duration-500 ${
                      selected ? "text-accent" : "text-white"
                    } ${discountEnded ? "animate-priceSwitch" : ""}`}
                    style={{ fontWeight: 600, fontSize: "50px" }}
                  >
                    {formatPrice(displayPrice)}
                  </span>
                  {showDiscount && (
                    <span
                    className="block -mt-0.5 line-through text-[14px] transition-opacity duration-500 min-[375px]:text-[16px] lg:text-[24px]"
                    style={{ fontWeight: 400, color: "var(--color-text-muted)" }}
                  >
                    {formatPrice(tariff.full_price)}
                  </span>
                  )}
                </div>
              </div>
              <p className="flex min-w-0 max-w-[320px] shrink items-center text-sm leading-tight text-white">
                Для тех, кто хочет всегда быть в форме и поддерживать здоровье
              </p>
            </div>
            <div className="flex h-full flex-row flex-nowrap items-center gap-[30px] pt-[20px] pl-[20px] min-[375px]:gap-[50px] min-[375px]:pl-[30px] lg:hidden">
              <div className="flex min-w-0 shrink-0 flex-col">
                <span className="text-[16px] font-medium text-white min-[375px]:text-[18px]">
                  {tariff.period}
                </span>
                <div className="mt-[12px] flex flex-col items-end gap-0 leading-none min-[375px]:mt-[15px]">
                  <span
                    className={`block text-[30px] font-semibold transition-all duration-500 min-[375px]:text-[34px] ${
                      selected ? "text-accent" : "text-white"
                    } ${discountEnded ? "animate-priceSwitch" : ""}`}
                  >
                    {formatPrice(displayPrice)}
                  </span>
                  {showDiscount && (
                    <span
className="block -mt-0.5 line-through text-[14px] transition-opacity duration-500 min-[375px]:text-[16px] lg:text-[24px]"
                  style={{ fontWeight: 400, color: "var(--color-text-muted)" }}
                    >
                      {formatPrice(tariff.full_price)}
                    </span>
                  )}
                </div>
              </div>
              <p className="flex min-w-0 items-center text-sm leading-tight text-white">
                Всегда быть в форме
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="flex h-full flex-row flex-nowrap items-center gap-[30px] pt-[20px] pl-[20px] min-[375px]:gap-[50px] min-[375px]:pl-[30px] lg:hidden">
              <div className="flex min-w-0 shrink-0 flex-col">
                <span className="text-[16px] font-medium text-white min-[375px]:text-[18px]">
                  {tariff.period}
                </span>
                <div className="mt-[12px] flex flex-col items-end gap-0 leading-none min-[375px]:mt-[15px]">
                  <span
                    className={`block text-[30px] font-semibold transition-all duration-500 min-[375px]:text-[34px] ${
                      selected ? "text-accent" : "text-white"
                    } ${discountEnded ? "animate-priceSwitch" : ""}`}
                  >
                    {formatPrice(displayPrice)}
                  </span>
                  {showDiscount && (
                    <span
className="block -mt-0.5 line-through text-[14px] transition-opacity duration-500 min-[375px]:text-[16px] lg:text-[24px]"
                  style={{ fontWeight: 400, color: "var(--color-text-muted)" }}
                    >
                      {formatPrice(tariff.full_price)}
                    </span>
                  )}
                </div>
              </div>
              <p className="flex min-w-0 items-center text-sm leading-tight text-gray-300">
                {tariff.text}
              </p>
            </div>
            <div className="hidden lg:flex lg:flex-col lg:items-center lg:text-center">
              <span className="text-white" style={{ fontWeight: 500, fontSize: "26px" }}>
                {tariff.period}
              </span>
              <div className="mt-[30px] flex min-h-[78px] flex-col items-end justify-start gap-0 leading-none">
                <span
                  className={`block transition-all duration-500 ${
                    selected ? "text-accent" : "text-white"
                  } ${discountEnded ? "animate-priceSwitch" : ""}`}
                  style={{ fontWeight: 600, fontSize: "50px" }}
                >
                  {formatPrice(displayPrice)}
                </span>
                {showDiscount && (
                  <span
                    className="block -mt-0.5 line-through text-[14px] transition-opacity duration-500 min-[375px]:text-[16px] lg:text-[24px]"
                    style={{ fontWeight: 400, color: "var(--color-text-muted)" }}
                  >
                    {formatPrice(tariff.full_price)}
                  </span>
                )}
              </div>
              <p className="mt-[40px] min-h-[2.6em] w-full self-stretch pl-[15px] text-left text-sm leading-tight text-gray-300">
                {tariff.text}
              </p>
            </div>
          </>
        )}
      </div>
    </button>
  );
}
