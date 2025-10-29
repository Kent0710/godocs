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
import { Loader, Plus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createNewBranchFormSchema } from "@/lib/form-schemas";
import { toast } from "sonner";
import { createBranchAction } from "@/actions/branch/create-branch-action";
import { BranchType } from "@/lib/types";

interface CreateNewBranchProps {
    workspaceId?: string;
    workspaceBranches: BranchType[];
}

export default function CreateNewBranch({ workspaceId, workspaceBranches }: CreateNewBranchProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
                    <Plus />
                    New Branch
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new document branch</DialogTitle>
                    <DialogDescription>
                        Configure your new branch
                    </DialogDescription>
                </DialogHeader>
                <NewBranchForm workspaceId={workspaceId} workspaceBranches={workspaceBranches} />
            </DialogContent>
        </Dialog>
    );
}

function NewBranchForm({ workspaceId, workspaceBranches }: CreateNewBranchProps) {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(createNewBranchFormSchema),
        defaultValues: {
            name: "",
            option: "dependent",
            originBranch: workspaceBranches.find((branch) => branch.name === "main")?.id || "",
        },
    });

    const onSubmit = async (
        data: z.infer<typeof createNewBranchFormSchema>
    ) => {
        if (!workspaceId) {
            toast.error("Workspace ID is missing.");
            return;
        }

        toast.loading("Creating branch...");
        const result = await createBranchAction(workspaceId, data);
        toast.dismiss();

        if (result.success) {
            toast.success("Branch created successfully!");
            router.push(`/workspace/${workspaceId}?branch=${result.branchId}`);
        } else {
            toast.error(`Failed to create branch.`);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Branch Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Branch Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="option"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Branch Type</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select branch type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="independent">
                                            Independent
                                        </SelectItem>
                                        <SelectItem value="dependent">
                                            Dependent
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription>
                                {form.getValues("option") === "dependent"
                                    ? "Configure dependent requirements after branch creation."
                                    : "Independent branches have no dependencies."}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="originBranch"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Origin Branch</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select origin branch" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {workspaceBranches.map((branch) => (
                                            <SelectItem key={branch.id} value={branch.id}>
                                                {branch.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                        <>
                            <Loader /> Creating branch...
                        </>
                    ) : (
                        "Create Branch"
                    )}
                </Button>
            </form>
        </Form>
    );
}
