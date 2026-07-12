'use client';
import React from "react";
import { usePathname } from "next/navigation";
export default function ProfileLayout({children,saved,my,modal}:{children: React.ReactNode;saved: React.ReactNode;my: React.ReactNode;modal: React.ReactNode}) {
    const pathname = usePathname();

    const isMyStoriesActive = pathname.includes('/profile/my');

    return (
        <>
            {children}
            {!isMyStoriesActive ? saved : my}
            {modal}
        </>
    );
}