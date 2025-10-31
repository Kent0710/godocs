"use client";

import { WorkflowIcon, Loader } from "lucide-react";
import { Button } from "../ui/button";
import {  useState } from "react";
import { toast } from "sonner";
import { UpdateMergeAutomationsResult } from "@/actions/merge/update-merge-automations-result-action";

interface RunMergeAutomationsButtonProps {
    mergeId: string;
    newContent: string;
}

export function RunMergeAutomationsButton({
    mergeId,
    newContent,
}: RunMergeAutomationsButtonProps) {
    const [isRunning, setIsRunning] = useState(false);

    const handleRunAutomations = async () => {
        setIsRunning(true);

        if (!("Proofreader" in self)) {
            toast.warning("Proofreader AI model is not available.");
            return;
        }

        // plug in the proofreader token
        const otMeta = document.createElement("meta");
        otMeta.httpEquiv = "origin-trial";
        otMeta.content =
            process.env.NEXT_PUBLIC_PROOFREADER_ORIGIN_TRIAL_TOKEN!;
        document.head.append(otMeta);

        if (otMeta.content === "") {
            toast.error("Proofreader Origin Trial token is missing.");
            setIsRunning(false);
            return;
        }

        const availability = await Proofreader.availability();
        if (availability === "unavailable") {
            toast.error("Proofreader AI model is unavailable in this browser.");
            setIsRunning(false);
            return;
        }

        toast.message("Running merge automations...");

        // the newContent is the one to be proofread

        const proofreader = await Proofreader.create();
        const result = await proofreader.proofread(newContent);

        console.log("Proofreader result:", result);

        const response = await UpdateMergeAutomationsResult(
            mergeId,
            newContent,
            result.correctedInput,
            result.corrections
        );

        // set the result
        // setMergeData((prev) => {
        //     if (!prev) return prev;
        //     return {
        //         ...prev,
        //         automations: prev.automations.map((automation) =>

        //             automation.name === "Proofreading Automation"
        //                 ? {
        //                       ...automation,
        //                         status: "completed",
        //                         content: newContent,
        //                         comment: JSON.stringify({
        //                             correctedInput: result.correctedInput,
        //                             corrections: result.corrections,
        //                         }),
        //                   }
        //                 : automation
        //         ),
        //     };
        // });
        

        if (!response.success) {
            toast.error("Failed to update merge automations result.");
            setIsRunning(false);
            return;
        } else {
            toast.success("Merge automations result updated.");
        }

        toast.success("Merge automations completed.");

            setIsRunning(false);
        };

        return (
            <>
                <Button
                    variant={"outline"}
                    disabled={isRunning}
                    onClick={handleRunAutomations}
                >
                    {isRunning ? (
                        <Loader className="animate-spin mr-2" />
                    ) : (
                        <>
                            <WorkflowIcon /> Run Merge Automations
                        </>
                    )}
                </Button>
            </>
        );
    }
