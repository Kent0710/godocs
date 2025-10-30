declare const Summarizer: {
    availability(): Promise<"available" | "unavailable" | "downloadable">;
    create(options?: {
        type?: "tldr" | "teaser" | "key-points" | "headline";
        format?: "markdown" | "plain-text";
        length?: "short" | "medium" | "long";
        sharedContext?: string;
        expectedInputLanguages?: string[];
        outputLanguage?: string;
        expectedContextLanguages?: string[];
        monitor?: (monitor: EventTarget) => void;
    }): Promise<{
        summarize(
            text: string,
            options?: { context?: string }
        ): Promise<string>;
        summarizeStreaming?(
            text: string,
            options?: { context?: string }
        ): AsyncGenerator<string>;
    }>;
};

declare const LanguageModel: {
    availability(): Promise<
        "available" | "unavailable" | "downloadable" | "downloading"
    >;
    params(): Promise<{
        defaultTopK: number;
        maxTopK: number;
        defaultTemperature: number;
        maxTemperature: number;
    }>;
    create(options?: {
        temperature?: number;
        topK?: number;
        signal?: AbortSignal;
        monitor?: (monitor: EventTarget) => void;
        initialPrompts?: Array<{
            role: "system" | "user" | "assistant";
            content: string;
        }>;
        expectedInputs?: Array<{
            type: "text" | "image" | "audio";
            languages?: string[];
        }>;
        expectedOutputs?: Array<{ type: "text"; languages?: string[] }>;
    }): Promise<{
        prompt(
            input:
                | string
                | Array<{
                      role: "system" | "user" | "assistant";
                      content: string;
                  }>,
            options?: {
                signal?: AbortSignal;
                responseConstraint?: object;
                omitResponseConstraintInput?: boolean;
            }
        ): Promise<string>;

        promptStreaming?(
            input:
                | string
                | Array<{
                      role: "system" | "user" | "assistant";
                      content: string;
                  }>,
            options?: {
                signal?: AbortSignal;
                responseConstraint?: object;
                omitResponseConstraintInput?: boolean;
            }
        ): AsyncGenerator<string>;

        append?(
            input: Array<{
                role: "system" | "user" | "assistant";
                content: string | unknown[];
            }>
        ): Promise<void>;

        clone?(options?: { signal?: AbortSignal }): Promise<unknown>;

        destroy(): void;

        inputUsage?: number;
        inputQuota?: number;
    }>;
};

declare const Proofreader: {
    availability(): Promise<"available" | "unavailable" | "downloadable">;

    create(options?: {
        expectedInputLanguages?: string[];
        monitor?: (monitor: EventTarget) => void;
    }): Promise<{
        proofread(text: string): Promise<{
            correctedInput: string;
            corrections: Array<{
                startIndex: number;
                endIndex: number;
                replacement: string;
                label?: string;
                explanation?: string;
            }>;
        }>;
    }>;
};

// FOR REWRITER ==========================================================================

declare type RewriterFormatOption = "as-is" | "markdown" | "plain-text";
declare type RewriterToneOption = "more-formal" | "as-is" | "more-casual";
declare const Rewriter: {
    availability(): Promise<"available" | "unavailable" | "downloadable">;

    create(options?: {
        tone?: RewriterToneOption;
        format?: RewriterFormatOption;
        length?: "shorter" | "as-is" | "longer";
        sharedContext?: string;
        expectedInputLanguages?: string[];
        expectedContextLanguages?: string[];
        outputLanguage?: string;
        signal?: AbortSignal;
        monitor?: (monitor: EventTarget) => void;
    }): Promise<{
        rewrite(
            text: string,
            options?: {
                context?: string;
                tone?: "more-formal" | "as-is" | "more-casual";
                signal?: AbortSignal;
            }
        ): Promise<string>;

        rewriteStreaming?(
            text: string,
            options?: {
                context?: string;
                tone?: "more-formal" | "as-is" | "more-casual";
                signal?: AbortSignal;
            }
        ): AsyncGenerator<string>;

        destroy(): void;
    }>;
};

// ===========================================================
// WRITER API (Gemini Nano built-in Chrome API)
// ===========================================================

type WriterToneOption = "formal" | "neutral" | "casual";
type WriterFormatOption = "markdown" | "plain-text";
type WriterLengthOption = "short" | "medium" | "long";

declare const Writer: {
    availability(): Promise<"available" | "unavailable" | "downloadable">;

    create(options?: {
        tone?: WriterToneOption;
        format?: WriterFormatOption;
        length?: WriterLengthOption;
        sharedContext?: string;
        expectedInputLanguages?: string[];
        expectedContextLanguages?: string[];
        outputLanguage?: string;
        signal?: AbortSignal;
        monitor?: (monitor: EventTarget) => void;
    }): Promise<{
        write(
            prompt: string,
            options?: { context?: string; signal?: AbortSignal }    
        ): Promise<string>;

        writeStreaming?(
            prompt: string,
            options?: { context?: string; signal?: AbortSignal }
        ): AsyncGenerator<string>;

        destroy(): void;
    }>;
};
