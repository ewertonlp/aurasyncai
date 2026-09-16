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
      'rounded-xl p-6 bg-linear-to-br from-ink-deep to-surface-night text-on-primary backdrop-blur-sm shadow-sm',
      className,
    ].join(' ')}
    {...props}
  />
));
Card.displayName = 'Card';

export { Card };
