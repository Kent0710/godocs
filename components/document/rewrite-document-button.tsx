"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Sparkles, Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { rewriteDocumentFormSchema } from "@/lib/form-schemas";
import { Dispatch, SetStateAction, useState } from "react";

interface RewriteDocumentButtonProps {
    onRewrite: (
        tone: RewriterToneOption,
        format: RewriterFormatOption,
        additionalRewritePrompt: string
    ) => Promise<void>;
    isRewriting: boolean;
}

export default function RewriteDocumentButton({
    onRewrite,
    isRewriting,
}: RewriteDocumentButtonProps) {
    const [rewriteDialogOpen, setRewriteDialogOpen] = useState(false);

    return (
        <Dialog open={rewriteDialogOpen} onOpenChange={setRewriteDialogOpen}>
            <DialogTrigger asChild>
                <Button variant={"special"}>
                    {isRewriting ? (
                        <>
                            <Loader className="animate-spin mr-2" />{" "}
                            Rewriting...
                        </>
                    ) : (
                        <>
                            <Sparkles fill="white" /> Rewrite Document
                        </>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Rewrite Document</DialogTitle>
                    <DialogDescription>
                        Provide additional instructions to rewrite the document.
                    </DialogDescription>
                </DialogHeader>
                <RewriteDocumentForm
                    isRewriting={isRewriting}
                    onRewrite={onRewrite}
                    setRewriteDialogOpen={setRewriteDialogOpen}
                />
            </DialogContent>
        </Dialog>
    );
}

// THE ACTUAL FORM
interface RewriteDocumentFormProps extends RewriteDocumentButtonProps {
    setRewriteDialogOpen: Dispatch<SetStateAction<boolean>>;
}

function RewriteDocumentForm({
    onRewrite,
    setRewriteDialogOpen,
}: RewriteDocumentFormProps) {
    const form = useForm({
        resolver: zodResolver(rewriteDocumentFormSchema),
        defaultValues: {
            additionalPrompt: "",
            format: "as-is",
            tone: "as-is",
        },
    });

    async function onSubmit(data: z.infer<typeof rewriteDocumentFormSchema>) {
        setRewriteDialogOpen(false);

        onRewrite(data.tone, data.format, data.additionalPrompt);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="additionalPrompt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Additional Prompt</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Your instruction here..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tone</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select tone" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="more-formal">
                                        More Formal
                                    </SelectItem>
                                    <SelectItem value="as-is">As-Is</SelectItem>
                                    <SelectItem value="more-casual">
                                        More Casual
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="format"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Format</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select format" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="as-is">As-Is</SelectItem>
                                    <SelectItem value="markdown">
                                        Markdown
                                    </SelectItem>
                                    <SelectItem value="plain-text">
                                        Plain Text
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" variant={"special"}>
                    <Sparkles fill="white" /> Rewrite Document
                </Button>
            </form>
        </Form>
    );
}
