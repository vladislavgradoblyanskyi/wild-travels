

"use client";

import { useEffect } from "react";
import Link from "next/link";

import css from "./ErrorWhileSavingModal.module.css";

type Props = {
  onClose: () => void;
};

export default function ErrorWhileSavingModal({ onClose }: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleBackdrop = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={css.backdrop}
      onClick={handleBackdrop}
    >
      <div className={css.modal}>
        <button
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Закрити"
        >
          ✕
        </button>

        <h2 className={css.title}>
          Щоб зберегти історію, необхідно авторизуватися
        </h2>

        <p className={css.text}>
          Увійдіть до свого акаунта або створіть новий.
        </p>

        <div className={css.actions}>
          <Link
            href="/login"
            className={css.loginBtn}
            onClick={onClose}
          >
            Увійти
          </Link>

          <Link
            href="/register"
            className={css.registerBtn}
            onClick={onClose}
          >
            Зареєструватись
          </Link>
        </div>
      </div>
    </div>
  );
}