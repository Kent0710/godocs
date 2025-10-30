import { z } from "zod";

export const createNewWorkspaceFormSchema = z.object({
    name: z.string().min(1, {
        message: "Workspace name must be at least 1 characters.",
    }),
    description: z.string().optional(),
});

export const createNewBranchFormSchema = z.object({
    name: z.string().min(1, "Branch name must be at least 1 characters."),
    option: z.enum(["independent", "dependent"]).default("dependent"),
    originBranch: z.string(),
});

export const createCommitFormSchema = z.object({
    title: z.string().min(1, "Commit title must be at least 1 characters."),
    description: z.string().optional(),
});

export const createMergeRequestFormSchema = z
    .object({
        title: z
            .string()
            .min(1, "Merge Request title must be at least 1 character."),
        description: z.string().optional(),
        originBranchId: z.string().min(1, "From Branch must be selected."),
        targetBranchId: z.string().min(1, "To Branch must be selected."),
    })
    .refine((data) => data.originBranchId !== data.targetBranchId, {
        message: "From and To branches cannot be the same.",
        path: ["targetBranchId"], // or ["originBranchId"], depending on where you want the error to appear
    });
