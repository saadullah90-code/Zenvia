import type { MouseEventHandler, ReactNode } from 'react';
import { cn } from '@/lib/utils';

function Sparkle() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" className="sparkle" aria-hidden="true">
      <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z" />
    </svg>
  );
}

type Size = 'sm' | 'md' | 'lg';

type Props = {
  children: ReactNode;
  size?: Size;
  className?: string;
  href?: string;
  type?: 'button' | 'submit';
  onClick?: MouseEventHandler<HTMLElement>;
};

export function SparkleButton({ children, size = 'md', className, href, type = 'button', onClick }: Props) {
  const cls = cn('sparkle-btn', size === 'sm' && 'sparkle-btn--sm', size === 'lg' && 'sparkle-btn--lg', className);
  const inner = (
    <>
      <Sparkle />
      <span className="text">{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
