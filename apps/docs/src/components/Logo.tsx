export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 80 24" aria-hidden="true" {...props}>
      <g>
        <path d="M1 8 L12 1 L23 8 L23 15 L12 22 L1 15 Z" className="fill-amber-400" />
        <path d="M1 8 L12 11.5 L23 8 L12 1 Z" className="fill-amber-300" />
        <path d="M12 11.5 L12 22 L23 15 L23 8 Z" className="fill-amber-500" />
        <circle cx="12" cy="9.5" r="1.5" className="fill-white" />
        <path
          d="M10.5 13 L13.5 13"
          className="stroke-white"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </g>
      <text
        x="26"
        y="11.5"
        dominantBaseline="middle"
        className="fill-zinc-900 text-xl font-bold dark:fill-white"
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        PCU
      </text>
    </svg>
  )
}
