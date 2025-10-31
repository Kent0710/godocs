"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Loader, UsersRound } from "lucide-react";

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

export default function JoinNewWorkspace() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
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
                <JoinWorkspaceForm />
            </DialogContent>
        </Dialog>
    );
}

// THE ACTUAL FORM

function JoinWorkspaceForm() {
    const form = useForm({
        resolver: zodResolver(joinWorkspaceFormSchema),
        defaultValues: {
            code: "",
        },
    });

    const onSubmit = async (
        data: z.infer<typeof joinWorkspaceFormSchema>
    ) => {
        const result = await joinWorkspace(data.code);

        if (result.success) {
            toast.success("Successfully joined the workspace!");
        } else {
            toast.error(`Failed to join workspace.`);
        };
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
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
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                        <>
                            <Loader className="animate-spin" />
                            Joining...
                        </>
                    ) : (
                        "Join Workspace"
                    )}
                </Button>
            </form>
        </Form>
    );
}
