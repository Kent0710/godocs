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
import { commitFormSchema } from "@/lib/form-schemas";

import { GitCommitHorizontal } from "lucide-react";

interface CommitDialogProps {}

export default function CommitDialog({}: CommitDialogProps) {
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
                <CommitForm />
            </DialogContent>
        </Dialog>
    );
}

// THE ACTUAL FORM

function CommitForm({}: CommitDialogProps) {
    const form = useForm({
        resolver: zodResolver(commitFormSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof commitFormSchema>) => {
        // Handle commit submission logic here
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
