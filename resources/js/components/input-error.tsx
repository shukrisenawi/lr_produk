import { cn } from '@/lib/utils';

export default function InputError({
    message,
    className,
}: {
    message?: string;
    className?: string;
}) {
    return message ? (
        <p className={cn('text-sm text-destructive', className)}>
            {message}
        </p>
    ) : null;
}
