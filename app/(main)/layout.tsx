import Header from "@/components/header";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col h-dvh ">
            <Header />
            <main className="flex-1 ">{children}</main>
        </div>
    );
}
