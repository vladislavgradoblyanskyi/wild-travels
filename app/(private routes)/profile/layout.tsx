import React from "react";
export default function ProfileLayout({children,saved,my,modal}: {children: React.ReactNode;saved: React.ReactNode;my: React.ReactNode;modal: React.ReactNode}) {
    return (
        <>
            {children}
            {saved}
            {my}
            {modal}
        </>
    );
}
