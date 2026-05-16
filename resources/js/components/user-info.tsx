import { useInitials } from '@/hooks/use-initials';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { User } from '@/types';

export function UserInfo({ user }: { user: User }) {
    const getInitials = useInitials();

    return (
        <>
            <Avatar className="size-8 overflow-hidden rounded-lg">
                <AvatarFallback className="rounded-lg bg-gradient-to-br from-[#FF385C] to-[#e93052] text-xs text-white font-semibold">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                    {user.role === 'admin' ? 'Admin' : 'Customer'}
                </span>
            </div>
        </>
    );
}
