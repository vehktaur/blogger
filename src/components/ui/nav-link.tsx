'use client';

import { cn } from '@/lib/utils';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface NavLinkProps extends LinkProps {
  className: string;
  activeClassName?: string;
  exact?: boolean;
  children: ReactNode;
}

const NavLink = ({
  className,
  activeClassName,
  children,
  exact = false,
  ...props
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = exact
    ? pathname === props.href
    : pathname.startsWith(String(props.href));

  return (
    <Link {...props} className={cn(className, isActive && activeClassName)}>
      {children}
    </Link>
  );
};
export default NavLink;
