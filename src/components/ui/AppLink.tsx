import {
  forwardRef,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

interface AppLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("tel:");
}

export const Link = forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ href, onClick, children, target, rel, ...props }, ref) => {
    const navigate = useNavigate();

    if (isExternalHref(href) || target === "_blank") {
      return (
        <a ref={ref} href={href} target={target} rel={rel} onClick={onClick} {...props}>
          {children}
        </a>
      );
    }

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) {
        return;
      }

      if (href.startsWith("#")) {
        event.preventDefault();
        const targetElement = document.querySelector(href);
        targetElement?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      if (href.startsWith("/")) {
        return;
      }

      event.preventDefault();
      navigate(href);
    };

    return (
      <RouterLink ref={ref} to={href} onClick={handleClick} {...props}>
        {children}
      </RouterLink>
    );
  }
);

Link.displayName = "Link";
