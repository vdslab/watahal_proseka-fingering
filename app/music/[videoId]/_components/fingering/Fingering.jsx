export default function Fingering({ hand, line, fingeringColor }) {
  return (
    <g>
      <path
        key="fingeringLine"
        d={line?.(hand)}
        fill="none"
        strokeWidth={2.5}
        stroke={fingeringColor}
      />
    </g>
  );
}
