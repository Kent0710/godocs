import React from "react";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

// get the props of the Button
type LoaderButtonProps = React.ComponentProps<typeof Button> & {
    isLoading: boolean;
    loadingText?: string;
};

export default function LoaderButton({
    isLoading,
    loadingText = "Loading...",
    children,
    ...props
}: LoaderButtonProps) {
    return (
        <Button disabled={isLoading} {...props}>
            {isLoading ? (
                <>
                    <Loader className="animate-spin" />
                    <span>{loadingText}</span>
                </>
            ) : (
                children
            )}
        </Button>
    );
}
