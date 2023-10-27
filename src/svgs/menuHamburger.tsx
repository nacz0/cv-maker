export default function MenuHamburgerIcon(props: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? "20px"}
      height={props.size ?? "20px"}
      viewBox="0 0 24 24"
      fill="inherit"
    >
      <path
        d="M4 18L20 18"
        stroke={props.color ?? "#000000"}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d="M4 12L20 12"
        stroke={props.color ?? "#000000"}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d="M4 6L20 6"
        stroke={props.color ?? "#000000"}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}
