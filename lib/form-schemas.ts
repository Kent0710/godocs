import {z} from 'zod'

export const createNewWorkspaceFormSchema = z.object({
    name: z.string().min(1, {
        message: "Workspace name must be at least 1 characters.",
    }),
    description: z.string().optional(),
});

export const createNewBranchFormSchema = z.object({
    name: z.string().min(1, "Branch name must be at least 1 characters."),
    option: z.enum(["independent", "dependent"]).default("dependent"),
    originBranch: z.string()
});

export const createCommitFormSchema = z.object({
    title: z.string().min(1, "Commit title must be at least 1 characters."),
    description: z.string().optional(),
});
