import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import type { InertiaLinkProps } from '@inertiajs/react';

export default function TextLink({
    className,
    children,
    ...props
}: InertiaLinkProps) {
    return (
        <Link
            className={cn(
                'font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80',
                className,
            )}
            {...props}
        >
            {children}
        </Link>
    );
}
