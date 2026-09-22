import * as React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  // Extend as needed
}

const Card = React.forwardRef<
  HTMLDivElement,
  CardProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={[
      'rounded-xl p-6 bg-linear-to-br from-accent-violet/10 to-surface-night border border-accent-violet/40 bg-accent-violet/15 text-on-primary backdrop-blur-sm shadow-sm',
      className,
    ].join(' ')}
    {...props}
  />
));
Card.displayName = 'Card';

export { Card };
