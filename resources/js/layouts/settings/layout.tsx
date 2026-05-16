import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { Settings, User, Shield, Palette } from 'lucide-react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn, toUrl } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import type { NavItem } from '@/types';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: edit(),
        icon: User,
    },
    {
        title: 'Security',
        href: editSecurity(),
        icon: Shield,
    },
    {
        title: 'Appearance',
        href: editAppearance(),
        icon: Palette,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl } = useCurrentUrl();

    return (
        <div className="px-4 py-6 lg:px-6">
            <Heading
                title="Settings"
                description="Manage your profile and account settings"
            >
                <Settings className="size-5 text-muted-foreground" />
            </Heading>

            <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:gap-12">
                <aside className="w-full shrink-0 lg:w-56">
                    <nav
                        className="flex flex-row gap-1 overflow-x-auto lg:flex-col"
                        aria-label="Settings"
                    >
                        {sidebarNavItems.map((item, index) => (
                            <Button
                                key={`${toUrl(item.href)}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn(
                                    'shrink-0 justify-start gap-2.5 rounded-xl px-4',
                                    isCurrentOrParentUrl(item.href)
                                        ? 'bg-secondary text-secondary-foreground font-semibold'
                                        : 'text-muted-foreground hover:text-foreground',
                                )}
                            >
                                <Link href={item.href}>
                                    {item.icon && <item.icon className="size-4" />}
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="lg:hidden" />

                <div className="flex-1 min-w-0">
                    <section className="max-w-2xl space-y-10">
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
}
