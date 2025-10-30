"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createCommitFormSchema } from "@/lib/form-schemas";

import { GitCommitHorizontal } from "lucide-react";
import { createCommitAction } from "@/actions/commit/create-commit-action";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

interface CommitDialogProps {
    branchId: string;
    newContent: string; // the newContent
    onCommitSuccess: () => void;
}

export default function CommitDialog({
    branchId,
    newContent,
    onCommitSuccess,
}: CommitDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
                    <GitCommitHorizontal /> Commit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Commit Changes</DialogTitle>
                    <DialogDescription>
                        Provide a title and description for your commit.
                    </DialogDescription>
                </DialogHeader>
                <CommitForm
                    branchId={branchId}
                    newContent={newContent}
                    onCommitSuccess={onCommitSuccess}
                />
            </DialogContent>
        </Dialog>
    );
}

// THE ACTUAL FORM

function CommitForm({
    branchId,
    newContent,
    onCommitSuccess,
}: CommitDialogProps) {
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(createCommitFormSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof createCommitFormSchema>) => {
        const workspaceId = pathname.split("/")[2];

        if (!branchId) {
            throw new Error("Branch ID is required to create a commit.");
        }

        if (!workspaceId) {
            throw new Error("Workspace ID is required to create a commit.");
        }

        const result = await createCommitAction(
            workspaceId,
            branchId,
            data,
            newContent
        );

        if (result.success) {
            onCommitSuccess();
            
            toast.success("Commit created successfully!");
            form.reset();
        } else {
            toast.error("Failed to create commit.");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Commit Title*</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter commit title"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Commit Description</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter commit description"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Commit Changes</Button>
            </form>
        </Form>
    );
}
