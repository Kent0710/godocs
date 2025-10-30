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
import { writeDocumentFormSchema } from "@/lib/form-schemas";
import { Dispatch, SetStateAction, useState } from "react";

interface WriteDocumentButtonProps {
    isWriting: boolean;
    onWrite: (
        tone: WriterToneOption,
        format: WriterFormatOption,
        additionalWritePrompt: string,
        length: WriterLengthOption
    ) => Promise<void>;
}

export function WriteDocumentButton({
    isWriting,
    onWrite,
}: WriteDocumentButtonProps) {
    const [writeDialogOpen, setWriteDialogOpen] = useState(false);

    return (
        <Dialog open={writeDialogOpen} onOpenChange={setWriteDialogOpen}>
            <DialogTrigger asChild>
                <Button variant={"special"}>
                    {isWriting ? (
                        <>
                            <Loader className="animate-spin mr-2" />{" "}
                            Rewriting...
                        </>
                    ) : (
                        <>
                            <Sparkles fill="white" /> Write
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
                <WriteDocumentForm
                    isWriting={isWriting}
                    onWrite={onWrite}
                    setRewriteDialogOpen={setWriteDialogOpen}
                />
            </DialogContent>
        </Dialog>
    );
}

// THE ACTUAL FORM
interface RewriteDocumentFormProps extends WriteDocumentButtonProps {
    setRewriteDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export function WriteDocumentForm({
    onWrite,
    isWriting,
    setRewriteDialogOpen,
}: RewriteDocumentFormProps) {
    const form = useForm({
        resolver: zodResolver(writeDocumentFormSchema),
        defaultValues: {
            tone: "neutral",
            format: "plain-text",
            writingPrompt: "",
            length: "short",
        },
    });

    async function onSubmit(data: z.infer<typeof writeDocumentFormSchema>) {
        setRewriteDialogOpen(false);

        await onWrite(data.tone, data.format, data.writingPrompt, data.length);
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="writingPrompt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prompt</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="E.g., 'Make it more concise and professional.'"
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
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select tone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="formal">
                                            Formal
                                        </SelectItem>
                                        <SelectItem value="neutral">
                                            Neutral
                                        </SelectItem>
                                        <SelectItem value="casual">
                                            Casual
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
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
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select format" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="markdown">
                                            Markdown
                                        </SelectItem>
                                        <SelectItem value="plain-text">
                                            Plain Text
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="length"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Length</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select length" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="short">
                                            Short
                                        </SelectItem>
                                        <SelectItem value="medium">
                                            Medium
                                        </SelectItem>
                                        <SelectItem value="long">
                                            Long
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isWriting} className="mt-4" variant={'special'}>
                    {isWriting ? (
                        <>
                            <Loader className="animate-spin mr-2" /> Writing...
                        </>
                    ) : (
                        <>
                            <Sparkles fill="white" /> Write Document
                        </>
                    )}
                </Button>
            </form>
        </Form>
    );
}
