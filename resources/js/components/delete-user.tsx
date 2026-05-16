import { Form, usePage } from '@inertiajs/react';
import { Trash2, AlertTriangle } from 'lucide-react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

export default function DeleteUser() {
    const { auth } = usePage().props;

    return (
        <div className="space-y-6">
            <Heading
                variant="small"
                title="Delete account"
                description="Permanently delete your account and all associated data."
            />

            <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
                <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                        <AlertTriangle className="size-5" />
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm font-semibold text-destructive">Tindakan ini tidak boleh dibatalkan</p>
                        <p className="text-sm text-muted-foreground">
                            Setelah akaun anda dipadamkan, semua data dan sumber akan dialih keluar secara kekal.
                            Sila muat turun sebarang data yang anda ingin simpan sebelum memadamkan akaun anda.
                        </p>
                    </div>
                </div>
            </div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="destructive"
                        className="rounded-xl"
                    >
                        <Trash2 className="size-4" />
                        Delete account
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                        <DialogDescription>
                            Once your account is deleted, all of its resources and data will be permanently deleted.
                            Please enter your password to confirm you would like to permanently delete your account.
                        </DialogDescription>
                    </DialogHeader>

                    <Form
                        action="/settings/profile"
                        method="delete"
                        className="space-y-4"
                    >
                        {({ errors, processing }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="sr-only">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        autoComplete="current-password"
                                    />
                                    {errors.password && (
                                        <p className="text-sm text-destructive">{errors.password}</p>
                                    )}
                                </div>

                                <DialogFooter>
                                    <Button
                                        type="submit"
                                        variant="destructive"
                                        disabled={processing}
                                        className="rounded-xl"
                                    >
                                        {processing ? 'Deleting...' : 'Delete account'}
                                    </Button>
                                </DialogFooter>
                            </>
                        )}
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
