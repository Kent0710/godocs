"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { UsersRound } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { joinWorkspaceFormSchema } from "@/lib/form-schemas";
import { joinWorkspace } from "@/actions/workspace/join-workspace-action";
import LoaderButton from "../reusables/loader-button";
import { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";

export default function JoinNewWorkspace() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
            <DialogTrigger asChild>
                <Button variant={"secondary"}>
                    <UsersRound className="mr-2" />
                    Join Workspace
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Join a workspace</DialogTitle>
                    <DialogDescription>
                        Enter the workspace code to join an existing workspace.
                    </DialogDescription>
                </DialogHeader>
                <JoinWorkspaceForm setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    );
}

// THE ACTUAL FORM

interface JoinWorkspaceFormProps {
    setOpen: React.Dispatch<SetStateAction<boolean>>;
}

function JoinWorkspaceForm({ setOpen }: JoinWorkspaceFormProps) {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(joinWorkspaceFormSchema),
        defaultValues: {
            code: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof joinWorkspaceFormSchema>) => {
        const result = await joinWorkspace(data.code);

        setOpen(false);

        if (result.success) {
            toast.success("Successfully joined the workspace!");
            form.reset();

            router.push(
                `/workspace/${result.workspaceId}?branch=${result.defaultBranchId}`
            );
        } else {
            toast.error(`Failed to join workspace.`);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Workspace Code</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter workspace code"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <LoaderButton
                    loadingText="Joining..."
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    isLoading={form.formState.isSubmitting}
                >
                    Join Workspace
                </LoaderButton>
            </form>
        </Form>
    );
}
