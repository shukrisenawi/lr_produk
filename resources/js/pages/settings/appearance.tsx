import { Head } from '@inertiajs/react';
import { Palette } from 'lucide-react';
import AppearanceTabs from '@/components/appearance-tabs';
import { edit as editAppearance } from '@/routes/appearance';

export default function Appearance() {
    return (
        <>
            <Head title="Appearance settings" />

            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                        <Palette className="size-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight">Appearance settings</h2>
                        <p className="text-sm text-muted-foreground">Update your account's appearance settings</p>
                    </div>
                </div>
                <AppearanceTabs />
            </div>
        </>
    );
}

Appearance.layout = {
    breadcrumbs: [
        {
            title: 'Appearance settings',
            href: editAppearance(),
        },
    ],
};
