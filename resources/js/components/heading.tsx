import type { ReactNode } from 'react';

export default function Heading({
    title,
    description,
    variant = 'default',
    children,
}: {
    title: string;
    description?: string;
    variant?: 'default' | 'small';
    children?: ReactNode;
}) {
    return (
        <header
            className={
                variant === 'small'
                    ? 'space-y-0.5'
                    : 'flex items-start gap-3 mb-8'
            }
        >
            {variant === 'default' && children && (
                <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                    {children}
                </div>
            )}
            <div className="space-y-1">
                <h2
                    className={
                        variant === 'small'
                            ? 'text-base font-semibold tracking-tight'
                            : 'text-2xl font-bold tracking-tight'
                    }
                >
                    {title}
                </h2>
                {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                )}
            </div>
        </header>
    );
}
