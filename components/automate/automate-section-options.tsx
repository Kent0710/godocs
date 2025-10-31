"use client";

import { useSearchParams } from "next/navigation";
import { Switch } from "../ui/switch";
import { SubHeading } from "../reusables/texts";
import { useEffect, useState } from "react";
import { getBranchAutomations } from "@/actions/automations/get-branch-automations-action";
import { Button } from "../ui/button";
import { Loader, Save } from "lucide-react";
import { saveBranchAutomations } from "@/actions/automations/save-automations-action-action";
import { toast } from "sonner";

export default function AutomateSectionOptions() {
    const [isSaving, setIsSaving] = useState(false);
    const [originalAutomations, setOriginalAutomations] = useState<string[]>(
        []
    );
    const [automations, setAutomations] = useState<string[]>([]);

    const branchId = useSearchParams().get("branchId");

    useEffect(() => {
        async function handleGetBranchAutomations() {
            if (!branchId) return;

            const response = await getBranchAutomations(branchId);

            setAutomations(response);
            setOriginalAutomations(response);
        }

        handleGetBranchAutomations();

        return () => {
            setOriginalAutomations([]);
            setAutomations([]);
        };
    }, [branchId]);

    if (!branchId) return <div> Please select a branch to view options. </div>;

    const handleSwitchChange = (value: string) => {
        setAutomations((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    const handleSave = async () => {
        setIsSaving(true);

        const result = await saveBranchAutomations(branchId, automations);

        if (result.success) {
            setOriginalAutomations(automations);
            toast.success("Automations saved successfully.");
        } else {
            toast.error("Failed to save automations. Please try again.");
        }

        setIsSaving(false);
    };

    return (
        <section className="flex-1 border rounded p-4">
            <div className="pb-4 mb-4 border-b flex items-center justify-between">
                <SubHeading> Available Automations </SubHeading>
                {JSON.stringify(automations) !==
                    JSON.stringify(originalAutomations) && (
                    <Button
                        variant={"outline"}
                        disabled={isSaving}
                        onClick={handleSave}
                    >
                        {isSaving ? (
                            <>
                                <Loader className="animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save /> Save Changes
                            </>
                        )}
                    </Button>
                )}
            </div>
            <pre>{JSON.stringify(automations, null, 2)}</pre>
            <ul className="flex flex-col gap-4">
                <li className="flex items-center justify-between">
                    <p className="font-medium">
                        Automatic Proofread Merge Request
                    </p>
                    <Switch
                        checked={automations.includes("proofread")}
                        onCheckedChange={() => {
                            handleSwitchChange("proofread");
                        }}
                    />
                </li>
                <li className="flex items-center justify-between">
                    <p className="font-medium">
                        Automatic Summarize Changes in Merge Request
                    </p>
                    <Switch
                        checked={automations.includes("summarize")}
                        onCheckedChange={() => {
                            handleSwitchChange("summarize");
                        }}
                    />
                </li>
            </ul>
        </section>
    );
}
