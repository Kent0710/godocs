"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { FilePlus2, Loader } from "lucide-react";

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

import { createNewWorkspaceFormSchema } from "@/lib/form-schemas";
import { createWorkspace } from "@/actions/workspace/create-workspace";
import { useRouter } from "next/navigation";

export default function CreateNewWorkspace() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <FilePlus2 className="mr-2" />
                    New Workspace
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new workspace</DialogTitle>
                    <DialogDescription>
                        Give your new workspace a name and optional description.
                    </DialogDescription>
                </DialogHeader>
                <CreateNewWorkspaceForm />
            </DialogContent>
        </Dialog>
    );
}

// THE ACTUAL FORM

function CreateNewWorkspaceForm() {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(createNewWorkspaceFormSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const onSubmit = async (
        data: z.infer<typeof createNewWorkspaceFormSchema>
    ) => {
        const result = await createWorkspace(data);
        if (result.success) {
            toast.success("Workspace created successfully!");
            form.reset();

            router.push(`/workspace/${result.workspaceId}?branch=${result.defaultBranchId}`);
        } else {
            toast.error("Failed to create workspace.");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Workspace Name*</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="My Awesome Workspace"
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
                            <FormLabel>Workspace Description </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="An optional description for your workspace."
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
                            <Loader className="animate-spin" /> Creating
                            workspace...
                        </>
                    ) : (
                        "Create Workspace"
                    )}
                </Button>
            </form>
        </Form>
    );
}
