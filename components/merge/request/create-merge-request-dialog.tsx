"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { createMergeRequestFormSchema } from "@/lib/form-schemas";

import { Merge } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BranchType } from "@/lib/types";
import { getWorkspaceBranches } from "@/actions/branch/get-branches-action";
import { usePathname } from "next/navigation";

import { toast } from "sonner";
import { createMergeRequestAction } from "@/actions/merge/create-merge-request-action";
import LoaderButton from "@/components/reusables/loader-button";

export default function CreateMergeRequestDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
                    <Merge />
                    New Merge Request
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Merge Request</DialogTitle>
                    <DialogDescription>
                        Create a new merge request to merge changes between
                        branches.
                    </DialogDescription>
                </DialogHeader>
                <CreateMergeRequestForm setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    );
}

// THE ACTUAL FORM

interface CreateMergeRequestFormProps {
    setOpen: Dispatch<SetStateAction<boolean>>;
}

function CreateMergeRequestForm({ setOpen }: CreateMergeRequestFormProps) {
    const pathname = usePathname();

    const [ready, setReady] = useState(false);
    const [workspaceBranches, setWorkspaceBranches] = useState<BranchType[]>(
        []
    );

    const form = useForm({
        resolver: zodResolver(createMergeRequestFormSchema),
        defaultValues: {
            title: "",
            description: "",
            originBranchId: "",
            targetBranchId: "",
        },
    });

    async function onSubmit(
        data: z.infer<typeof createMergeRequestFormSchema>
    ) {
        const workspaceId = pathname.split("/")[3];

        const result = await createMergeRequestAction(workspaceId, data);
        setOpen(false);

        if (result.success) {
            toast.success("Merge request created successfully");
            form.reset();
        } else {
            toast.error("An error occurred while creating the merge request");
        }
    }

    useEffect(() => {
        async function fetchWorkspaceBranches() {
            const workspaceId = pathname.split("/")[3];

            const workspaceBranches = await getWorkspaceBranches(workspaceId);
            setWorkspaceBranches(workspaceBranches);
            setReady(true);
        }

        fetchWorkspaceBranches();
    }, [pathname]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title*</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Merge Request Title"
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
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Optional description"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {!ready ? (
                    <div>Loading branches...</div>
                ) : (
                    <>
                        <FormField
                            control={form.control}
                            name="originBranchId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Origin Branch*</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select origin branch" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {workspaceBranches.map(
                                                    (branch) => (
                                                        <SelectItem
                                                            key={branch.id}
                                                            value={branch.id}
                                                        >
                                                            {branch.name}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="targetBranchId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Target Branch*</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select target branch" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {workspaceBranches.map(
                                                    (branch) => (
                                                        <SelectItem
                                                            key={branch.id}
                                                            value={branch.id}
                                                        >
                                                            {branch.name}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )}

                <LoaderButton
                    type="submit"
                    loadingText="Creating..."
                    isLoading={form.formState.isSubmitting}
                >
                    Create Merge Request
                </LoaderButton>
            </form>
        </Form>
    );
}
