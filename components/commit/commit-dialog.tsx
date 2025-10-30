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

import { GitCommitHorizontal,  Sparkles } from "lucide-react";
import { createCommitAction } from "@/actions/commit/create-commit-action";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { constructCommitLanguageModelPrompt } from "@/lib/prompts";

interface CommitDialogProps {
    branchId: string;
    oldContent: string;
    newContent: string; // the newContent
    onCommitSuccess: () => void;
}

export default function CommitDialog({
    branchId,
    oldContent,
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
                    oldContent={oldContent}
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
    oldContent,
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

    const handleSummarize = async () => {
        try {
            toast.loading("Checking AI model availability...");

            // Check if the Prompt API (Gemini Nano) is available
            if (!("LanguageModel" in self)) {
                toast.warning("Prompt API not available.");
                return;
            }

            const availability = await LanguageModel.availability();
            if (availability === "unavailable") {
                toast.error("Gemini Nano model not available on this device.");
                return;
            }

            toast.dismiss();
            toast.message("Generating commit message using Gemini Nano...");

            // Create a session with commit conditioning
            const session = await LanguageModel.create({
                expectedInputs: [{ type: "text", languages: ["en"] }],
                expectedOutputs: [{ type: "text", languages: ["en"] }],
                initialPrompts: [
                    {
                        role: "system",
                        content: constructCommitLanguageModelPrompt(
                            oldContent,
                            newContent
                        ),
                    },
                ],
            });

            // Use structured output with a JSON schema
            const schema = {
                type: "object",
                properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                },
                required: ["title", "description"],
            };

            const result = await session.prompt(
                constructCommitLanguageModelPrompt(oldContent, newContent),
                {
                    responseConstraint: schema,
                }
            );

            // Parse result
            const parsed = JSON.parse(result);
            const title = parsed.title?.trim() ?? "";
            const description = parsed.description?.trim() ?? "";

            // Basic validation fallback
            if (!title || !description) {
                toast.warning("AI output incomplete.");
                return;
            }

            // Set form values
            form.setValue("title", title);
            form.setValue("description", description);

            toast.success("AI-generated commit message created!");
        } catch (err) {
            console.error("Prompt API error:", err);
            toast.error("Failed to use Gemini Nano Prompt API.");
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
                <div className="flex gap-2">
                    <Button type="submit">Commit Changes</Button>
                    <Button
                        variant={"special"}
                        onClick={handleSummarize}
                        type="button"
                    >
                        <Sparkles fill="white" />
                        Generate commit with AI
                    </Button>
                </div>
            </form>
        </Form>
    );
}
