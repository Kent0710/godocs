import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | number): string {
    // Ensure we always have a Date object
    const d = date instanceof Date ? date : new Date(date);

    // Use Intl.DateTimeFormat for locale-safe, consistent output
    const formatted = new Intl.DateTimeFormat("en-US", {
        month: "short", // Jul
        day: "numeric", // 5
        year: "numeric", // 2025
        hour: "numeric", // 5
        minute: "2-digit", // 59
        hour12: true, // 12-hour clock with AM/PM
    }).format(d);

    // Replace comma after year with a pipe (optional aesthetic)
    return formatted.replace(",", " |");
}
