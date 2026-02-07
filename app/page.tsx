"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import type { Tariff } from "@/types/tariff";
import Header from "@/components/Header";
import TariffGrid from "@/components/TariffGrid";

const API_URL = "https://t-core.fit-hub.pro/Test/GetTariffs";
const TIMER_SECONDS = 2 * 60;

export default function TariffsPage() {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(TIMER_SECONDS);
  const [agreed, setAgreed] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);
  const [discountEnded, setDiscountEnded] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((data: Tariff[]) => {
        const withUniqueIds = data.map((t, i) => ({ ...t, id: `${t.id}-${i}` }));
        setTariffs(withUniqueIds);
        const best = withUniqueIds.find((t) => t.is_best);
        setSelectedId(best?.id ?? withUniqueIds[0]?.id ?? null);
      })
      .catch(() => setTariffs([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setDiscountEnded(true);
      return;
    }
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  const handleBuy = useCallback(() => {
    if (!agreed) {
      setCheckboxError(true);
      return;
    }
    setCheckboxError(false);
    setIsPurchased(true);
  }, [agreed]);

  const isExpired = secondsLeft <= 0;

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header secondsLeft={Math.max(0, secondsLeft)} isExpired={isExpired} />

      <main className="mx-auto max-w-6xl bg-dark-bg px-[15px] py-6 sm:px-6 sm:py-8">
        <h1 className="mb-6 text-center text-2xl font-bold text-white sm:mb-8 sm:text-3xl lg:text-4xl">
          Выбери подходящий для себя{" "}
          <span className="text-accent">тариф</span>
        </h1>

        <div className="grid grid-cols-1 gap-8 min-[320px]:gap-y-0 sm:gap-y-8 lg:grid-cols-[minmax(0,0.9fr)_1fr] lg:gap-10">
          <div className="relative flex justify-center lg:block">
            <div
              className="relative h-[200px] w-full max-w-full min-[375px]:h-[250px] lg:h-[var(--height-image)] lg:w-[var(--width-image)]"
            >
              <Image
                src="/человек.png"
                alt=""
                fill
                className="object-contain object-center"
                priority
                sizes="380px"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {loading ? (
              <div className="text-gray-400">Загрузка тарифов...</div>
            ) : (
              <TariffGrid
                tariffs={tariffs}
                selectedId={selectedId}
                discountEnded={discountEnded}
                onSelect={setSelectedId}
              />
            )}

            <div
              className={`flex max-w-[500px] gap-[15px] rounded-[20px] border p-[20px] text-sm text-gray-300 transition-colors ${
                discountEnded ? "border-gray-600 bg-card-bg/50" : "border-gray-600 bg-card-bg"
              }`}
            >
              <svg
                className="mt-0.5 shrink-0 align-top"
                width={4}
                height={24}
                viewBox="0 0 3 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M0.377523 11.6437C0.386898 12.2578 0.888461 12.75 1.50252 12.75C2.11659 12.75 2.61815 12.2531 2.62752 11.6437L3.00252 1.5375C3.02596 1.15313 2.88534 0.778125 2.61346 0.4875C2.32284 0.178125 1.91971 0 1.50252 0C1.08534 0 0.682211 0.178125 0.391586 0.4875C0.119711 0.778125 -0.0209143 1.15313 0.00252325 1.5375L0.377523 11.6437Z"
                  fill="#FDB056"
                />
                <path
                  d="M1.5 18C2.32843 18 3 17.3284 3 16.5C3 15.6716 2.32843 15 1.5 15C0.671573 15 0 15.6716 0 16.5C0 17.3284 0.671573 18 1.5 18Z"
                  fill="#FDB056"
                />
              </svg>
              <span className="min-w-0">
                Следуя плану на 3 месяца и более, люди получают
                <br />
                в 2 раза лучший результат, чем за 1 месяц.
              </span>
            </div>

            <div className="space-y-4">
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-3 transition-colors ${
                  checkboxError ? "border-card-border bg-card-border/20" : "border-transparent"
                }`}
              >
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => {
                    setAgreed(e.target.checked);
                    setCheckboxError(false);
                  }}
                  className="checkbox-agreement shrink-0 focus:ring-0"
                />
                <span className="text-sm text-secondary">
                  Я согласен с{" "}
                  <a href="#" className="text-accent underline">
                    офертой рекуррентных платежей
                  </a>{" "}
                  и{" "}
                  <a href="#" className="text-accent underline">
                    Политикой конфиденциальности
                  </a>
                </span>
              </label>

              <button
                type="button"
                onClick={handleBuy}
                className={`flex max-w-full items-center justify-center bg-accent text-lg font-bold text-black transition-opacity hover:opacity-95 ${isPurchased ? "animate-blink" : ""}`}
                style={{
                  height: "var(--height-button)",
                  width: "var(--width-button)",
                  maxWidth: "100%",
                  borderRadius: "var(--radius-button)",
                  padding: "var(--padding-button-y) var(--padding-button-x)",
                }}
              >
                Купить
              </button>

              <p
                className="text-xs min-[320px]:text-[10px] min-[320px]:font-normal min-[375px]:text-[10px] min-[375px]:font-normal"
                style={{ color: "var(--color-text-muted)" }}
              >
                Нажимая кнопку «Купить», Пользователь соглашается на разовое
                списание денежных средств для получения пожизненного доступа к
                приложению. Пользователь соглашается, что данные кредитной/дебетовой
                карты будут сохранены для осуществления покупок дополнительных
                услуг сервиса в случае желания пользователя.
              </p>
            </div>
          </div>
        </div>

        <section
          className="mt-12 rounded-[20px] border border-solid bg-brand-green/10 px-4 py-6 text-center min-[375px]:text-left sm:mt-16 lg:rounded-[30px]"
          style={{ borderColor: "var(--color-text-muted)" }}
        >
          <h2
            className="mb-2 inline-block rounded-[30px] border border-solid font-semibold pt-[10px] pr-[18px] pb-[12px] pl-[18px] lg:pt-[16px] lg:pr-[30px] lg:pb-[18px] lg:pl-[30px]"
            style={{ borderColor: "#81fe95", backgroundColor: "#2d3233", color: "#81fe95" }}
          >
            гарантия возврата 30 дней
          </h2>
          <p className="ml-[12px] text-left text-sm text-gray-300 lg:ml-[20px] lg:text-2xl lg:font-normal">
            Мы уверены, что наш план сработает для тебя и ты увидишь видимые
            результаты уже через 4 недели! Мы даже готовы полностью вернуть твои
            деньги в течение 30 дней с момента покупки, если ты не получишь
            видимых результатов.
          </p>
        </section>
      </main>
    </div>
  );
}
