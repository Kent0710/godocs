"use client";

import { Fragment } from "react";

const BASE_SECTION_CLASSNAME = "p-4 border rounded";

function sanitizeContent(html: string): string {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
}

interface CommitDiffViewerProps {
    oldContent: string;
    newContent: string;
}

export function CommitDiffViewer({
    oldContent,
    newContent,
}: CommitDiffViewerProps) {
    const diff = (oldStr: string, newStr: string) => {
        const oldLines = oldStr.split("\n");
        const newLines = newStr.split("\n");
        const oldWords = oldStr.split(/\s+/);
        const newWords = newStr.split(/\s+/);

        if (oldLines.length > 5 || newLines.length > 5) {
            // Fallback to line-by-line diff for larger content
            const diffResult = [];
            let i = 0,
                j = 0;
            while (i < oldLines.length || j < newLines.length) {
                if (
                    i < oldLines.length &&
                    j < newLines.length &&
                    oldLines[i] === newLines[j]
                ) {
                    diffResult.push({
                        value: oldLines[i] + "\n",
                        type: "common",
                    });
                    i++;
                    j++;
                } else {
                    if (i < oldLines.length) {
                        diffResult.push({
                            value: oldLines[i] + "\n",
                            type: "removed",
                        });
                        i++;
                    }
                    if (j < newLines.length) {
                        diffResult.push({
                            value: newLines[j] + "\n",
                            type: "added",
                        });
                        j++;
                    }
                }
            }
            return diffResult;
        }

        // Word-by-word diff using LCS
        const dp = Array(oldWords.length + 1)
            .fill(0)
            .map(() => Array(newWords.length + 1).fill(0));

        for (let i = 1; i <= oldWords.length; i++) {
            for (let j = 1; j <= newWords.length; j++) {
                if (oldWords[i - 1] === newWords[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        const result = [];
        let i = oldWords.length;
        let j = newWords.length;

        while (i > 0 || j > 0) {
            if (i > 0 && j > 0 && oldWords[i - 1] === newWords[j - 1]) {
                result.unshift({
                    value: oldWords[i - 1] + " ",
                    type: "common",
                });
                i--;
                j--;
            } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
                result.unshift({ value: newWords[j - 1] + " ", type: "added" });
                j--;
            } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
                result.unshift({
                    value: oldWords[i - 1] + " ",
                    type: "removed",
                });
                i--;
            } else {
                break;
            }
        }
        return result;
    };

    const changes = diff(
        sanitizeContent(oldContent),
        sanitizeContent(newContent)
    );

    return (
        <>
            <section className={`${BASE_SECTION_CLASSNAME} bg-red-50/50`}>
                <pre className="whitespace-pre-wrap font-sans">
                    {changes.map((part, index) => (
                        <Fragment key={index}>
                            {part.type !== "added" && (
                                <span
                                    className={
                                        part.type === "removed"
                                            ? "bg-red-200"
                                            : ""
                                    }
                                >
                                    {part.value}
                                </span>
                            )}
                        </Fragment>
                    ))}
                </pre>
            </section>

            <section className={`${BASE_SECTION_CLASSNAME} bg-green-50/50`}>
                <pre className="whitespace-pre-wrap font-sans">
                    {changes.map((part, index) => (
                        <Fragment key={index}>
                            {part.type !== "removed" && (
                                <span
                                    className={
                                        part.type === "added"
                                            ? "bg-green-200"
                                            : ""
                                    }
                                >
                                    {part.value}
                                </span>
                            )}
                        </Fragment>
                    ))}
                </pre>
            </section>
        </>
    );
}
