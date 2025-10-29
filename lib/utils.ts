import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatDate(date : any): string {
    let d: Date;

    // Firestore Timestamp object (has a .toDate() function)
    if (date && typeof date.toDate === "function") {
        d = date.toDate();
    }
    // Already a Date
    else if (date instanceof Date) {
        d = date;
    }
    // String or number
    else {
        d = new Date(date);
    }

    if (isNaN(d.getTime())) return "Invalid Date";

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    })
        .format(d)
        .replace(",", " |");
}
