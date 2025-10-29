"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "./ui/button";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getUsername } from "@/actions/user/get-username";
import { signOut } from "@/actions/auth";

interface HeaderProps {
    className?: string;
}

export default function Header({ className }: HeaderProps) {
    const [username, setUsername] = useState<string>("");

    const router = useRouter();

    const pathname = usePathname();
    const navs = useMemo(
        () => [{ label: "Home", href: "/home", active: pathname === "/home" }],
        [pathname]
    );

    useEffect(() => {
        async function fetchUsername() {
            const name = await getUsername();
            setUsername(name);
        }

        fetchUsername();
    }, []);

    return (
        <header
            className={twMerge(
                `flex items-center justify-between w-full py-2 px-8 border-b`,
                className
            )}
        >
            {/* left section  */}
            <section className="flex items-center gap-10">
                <p className="font-bold">GOODOCS</p>

                <ul>
                    {navs.map((nav) => (
                        <li
                            key={nav.href}
                            className={twMerge(nav.active ? "underline" : "")}
                        >
                            <Link href={nav.href}>{nav.label}</Link>
                        </li>
                    ))}
                </ul>
            </section>

            {/* right section  */}
            <section>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"outline"}>
                            <User /> {username}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <Button
                            variant={"ghost"}
                            onClick={async () => {
                                await signOut();
                                router.push("/signIn");
                            }}
                        >
                            <LogOut /> Sign Out
                        </Button>
                    </DropdownMenuContent>
                </DropdownMenu>
            </section>
        </header>
    );
}
