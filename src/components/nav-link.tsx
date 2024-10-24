'use client';

import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface NavLinkProps extends LinkProps {
  className: string;
  activeClassName?: string;
  children: ReactNode;
}

const NavLink = ({
  className,
  activeClassName,
  children,
  ...props
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = props.href === pathname;

  return (
    <Link {...props} className={clsx(isActive && activeClassName, className)}>
      {children}
    </Link>
  );
};
export default NavLink;
