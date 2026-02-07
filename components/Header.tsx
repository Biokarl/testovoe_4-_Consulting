"use client";

const WARN_THRESHOLD = 30;

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4.99781 0.463683C5.22659 -0.154582 6.10105 -0.15458 6.32983 0.463685L7.44113 3.46694C7.51306 3.66132 7.66632 3.81458 7.8607 3.8865L10.864 4.99781C11.4822 5.22659 11.4822 6.10105 10.864 6.32983L7.8607 7.44113C7.66632 7.51306 7.51306 7.66632 7.44113 7.8607L6.32983 10.864C6.10105 11.4822 5.22659 11.4822 4.99781 10.864L3.8865 7.8607C3.81458 7.66632 3.66132 7.51306 3.46694 7.44113L0.463683 6.32983C-0.154582 6.10105 -0.15458 5.22659 0.463685 4.99781L3.46694 3.8865C3.66132 3.81458 3.81458 3.66132 3.8865 3.46694L4.99781 0.463683Z"
        fill="currentColor"
      />
    </svg>
  );
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")} : ${s.toString().padStart(2, "0")}`;
}

export default function Header({
  secondsLeft,
  isExpired,
}: {
  secondsLeft: number;
  isExpired: boolean;
}) {
  const isWarn = !isExpired && secondsLeft <= WARN_THRESHOLD;

  return (
    <header
      className="sticky top-0 z-50 flex w-full flex-col justify-center px-4 text-center"
      style={{
        height: "var(--height-header)",
        backgroundColor: "var(--color-header-bg)",
      }}
    >
      <p className="text-center text-[14px] font-semibold leading-[1.3] text-white min-[375px]:text-[18px] lg:text-base">
        Успейте открыть пробную неделю
      </p>
      <p
        className={`mt-2 font-gilroy text-[28px] font-bold min-[375px]:text-[32px] lg:text-xl ${
          isExpired ? "text-white" : "text-accent"
        }`}
      >
        <span
          className={`inline-block align-middle ${isWarn ? "animate-blink" : ""}`}
          style={isWarn ? { color: "var(--color-timer-warn)" } : undefined}
        >
          <StarIcon className="mr-1 h-4 w-4 sm:mr-1.5 sm:h-5 sm:w-5" />
        </span>
        <span
          className={`tabular-nums ${isWarn ? "animate-blink" : ""}`}
          style={isWarn ? { color: "var(--color-timer-warn)" } : undefined}
        >
          {formatTime(secondsLeft)}
        </span>
        <span
          className={`inline-block align-middle ${isWarn ? "animate-blink" : ""}`}
          style={isWarn ? { color: "var(--color-timer-warn)" } : undefined}
        >
          <StarIcon className="ml-1 h-4 w-4 sm:ml-1.5 sm:h-5 sm:w-5" />
        </span>
      </p>
    </header>
  );
}
