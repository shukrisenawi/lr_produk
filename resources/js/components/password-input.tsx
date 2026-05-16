import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, type InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function PasswordInput({
    className,
    ...props
}: InputProps) {
    const [showPassword, setShowPassword] = React.useState(false);
    const disabled =
        props.value === '' || props.value === undefined || props.disabled;

    return (
        <div className="relative">
            <Input
                type={showPassword ? 'text' : 'password'}
                className={cn('hide-password-toggle pr-10', className)}
                {...props}
            />
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={disabled}
            >
                {showPassword && !disabled ? (
                    <Eye className="size-4" aria-hidden="true" />
                ) : (
                    <EyeOff className="size-4" aria-hidden="true" />
                )}
                <span className="sr-only">
                    {showPassword ? 'Hide password' : 'Show password'}
                </span>
            </Button>
        </div>
    );
}
