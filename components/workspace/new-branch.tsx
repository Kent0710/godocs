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
import { Plus } from "lucide-react";
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
import { toast } from "sonner";

interface NewBranchProps {
    workspaceId?: string;
}

export default function NewBranch({ workspaceId }: NewBranchProps) {
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
                <NewBranchForm 
                    workspaceId={workspaceId}
                />
            </DialogContent>
        </Dialog>
    );
}

const formSchema = z.object({
    name: z.string().min(2, "Branch name must be at least 1 characters."),
    option: z.enum(["independent", "dependent"]).default("dependent"),
});

function NewBranchForm({ workspaceId }: NewBranchProps) {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            option: "dependent",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);

        if (!workspaceId) {
            toast.error("Workspace ID is missing.");
            return;
        }

        router.push(`/workspace/${workspaceId}?branch=${data.name}`);
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
                <Button type="submit">Create Branch</Button>
            </form>
        </Form>
    );
}
