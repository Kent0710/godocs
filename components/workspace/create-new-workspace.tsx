"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { FilePlus2 } from "lucide-react";
import { Subtitle } from "../reusables/texts";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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

export default function CreateNewWorkspace() {
    return (
        <Dialog>
            <DialogTrigger className="flex flex-col items-center justify-center border p-4 rounded">
                <>
                    <FilePlus2 size={48} className="mb-4 " />
                    <Subtitle>Create New Workspace</Subtitle>
                </>
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

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Workspace name must be at least 1 characters.",
    }),
    description: z.string().optional(),
});

export function CreateNewWorkspaceForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
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
                <Button type="submit">Create Workspace</Button>
            </form>
        </Form>
    );
}
