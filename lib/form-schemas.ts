import {z} from 'zod'

export const createNewWorkspaceFormSchema = z.object({
    name: z.string().min(2, {
        message: "Workspace name must be at least 1 characters.",
    }),
    description: z.string().optional(),
});