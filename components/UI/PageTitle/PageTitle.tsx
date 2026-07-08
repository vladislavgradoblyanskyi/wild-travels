import styles from "./PageTitle.module.css";
import React from "react";

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
  tag?: "h1" | "h2" | "h3";
  id?: string;
}

export const PageTitle = ({
  children,
  className = "",
  tag: Tag = "h1",
  id,
}: PageTitleProps) => {
  return (
    <Tag id={id} className={`${styles.title} ${styles.center} ${className}`}>
      {children}
    </Tag>
  );
};
