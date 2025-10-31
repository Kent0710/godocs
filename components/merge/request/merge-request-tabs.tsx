"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommitDiffViewer } from "@/components/commit/commit-diff-viewer";
import { useEffect, useState } from "react";
import { getMergeAutomations } from "@/actions/automations/get-merge-automations-action";
import { RunProofreadAutomationsButton } from "../run-proofread-automation-button";
import { MergeAutomationType } from "@/lib/types";

interface MergeRequestTabsProps {
    mergeId: string;
    oldContent: string;
    newContent: string;
}

export default function MergeRequestTabs({
    mergeId,
    oldContent,
    newContent,
}: MergeRequestTabsProps) {
    const [existingAutomations, setExistingAutomations] = useState<
        MergeAutomationType[]
    >([]);

    const [ready, setReady] = useState(false);

    useEffect(() => {
        async function fetchAutomations() {
            const existingAutomations = await getMergeAutomations(mergeId);
            setExistingAutomations(existingAutomations);

            setReady(true);
        }

        fetchAutomations();

        return () => {
            setExistingAutomations([]);
            setReady(false);
        };
    }, [mergeId]);

    if (!ready) return <div>Loading automations...</div>;

    return (
        <Tabs defaultValue="comparison">
            <TabsList>
                <TabsTrigger value="comparison">Merge Comparison</TabsTrigger>

                {existingAutomations.map((automation, index) => (
                    <TabsTrigger key={index} value={automation.name}>
                        {automation.name}
                    </TabsTrigger>
                ))}
            </TabsList>
            <TabsContent value="comparison" className="grid grid-cols-2 gap-6">
                <CommitDiffViewer
                    oldContent={oldContent}
                    newContent={newContent}
                />
            </TabsContent>
            {existingAutomations.map((res, index) => (
                <TabsContent key={index} value={res.name}>
                    {res.name === "proofread" && (
                        <RunProofreadAutomationsButton
                            mergeId={mergeId}
                            newContent={newContent}
                            setExistingAutomations={setExistingAutomations}
                        />
                    )}
                    <div className="grid grid-cols-2 gap-6 mt-4">
                        <CommitDiffViewer
                            oldContent={newContent}
                            newContent={res.correctedInput || ""}
                        />
                    </div>
                </TabsContent>
            ))}
        </Tabs>
    );
}
