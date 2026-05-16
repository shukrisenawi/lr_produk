import { Link } from '@inertiajs/react';
import { LogOut, User as UserIcon, Settings, Sparkles } from 'lucide-react';
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import type { User } from '@/types';
import { edit } from '@/routes/profile';
import { logout } from '@/routes';

export function UserMenuContent({ user }: { user: User }) {
    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link href={edit()} className="block cursor-pointer">
                        <UserIcon className="size-4" />
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/settings/appearance" className="block cursor-pointer">
                        <Sparkles className="size-4" />
                        Appearance
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/settings/security" className="block cursor-pointer">
                        <Settings className="size-4" />
                        Settings
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href={logout()} method="post" as="button" className="block w-full cursor-pointer">
                    <LogOut className="size-4" />
                    Log out
                </Link>
            </DropdownMenuItem>
        </>
    );
}
