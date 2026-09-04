interface Props {
  className?: string;
}

export function VettaLogo({ className = "h-6 w-auto" }: Props) {
  return (
    <svg
      viewBox="0 0 1094 267"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
      className={className}
    >
      <path d="M356.8 184.74L389.95 110.76H396.69L356.8 199.83L317.05 110.76H323.65L356.8 184.74Z" />
      <path d="M509.19 157.65V151.45V116.96H559.86V110.76H503.13V198.34H559.86V192.01H509.19V157.65Z" />
      <path d="M743.65 110.76V116.96H709.02V198.35H702.82V116.96H668.06V110.76H743.65Z" />
      <path d="M923.94 110.76V116.96H889.31V198.35H883.11V116.96H848.35V110.76H923.94Z" />
      <path d="M1054.51 109.68L1013.28 198.34H1020.01L1030.39 176.11L1033.22 170.05L1054.24 124.64L1074.32 170.05L1077.01 176.11L1086.85 198.34H1093.45L1054.51 109.68Z" />
      <path d="M548.67 132.09H505.46V138.42H548.67V132.09Z" />
      <path d="M27 266.44L119.31 60.44L211.61 266.44H238.22L119.31 0L0 266.44H27Z" />
      <path d="M323.98 266.44L204.59 0H178.15L297.06 266.44H323.98Z" />
    </svg>
  );
}
