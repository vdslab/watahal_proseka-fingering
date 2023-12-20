import { Link as MuiLink } from "@mui/material";
import Link from "next/link";

export default function LinkWrapper({ children, ...res }) {
  return (
    <Link {...res} legacyBehavior passHref style={{ cursor: "pointer" }}>
      <MuiLink>{children}</MuiLink>
    </Link>
  );
}
