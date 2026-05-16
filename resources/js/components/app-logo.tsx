import { Sparkles } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF385C] to-[#e93052] shadow-md shadow-[#FF385C]/20">
                <Sparkles className="size-4 text-white" />
            </div>
            <div className="ml-2 grid flex-1 text-left text-sm">
                <span className="truncate font-bold tracking-tight">
                    Aurora <span className="text-primary">Terapi</span>
                </span>
            </div>
        </>
    );
}
