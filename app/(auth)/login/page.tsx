'use client';

import { userLogin } from '@/lib/api/clientApi';
import css from './login.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import { UserLogin } from '@/types/auth';
import { Field, type FieldProps } from 'formik';
import { toast } from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import axios from 'axios';

const initialValues: UserLogin = {
  password: '',
  email: '',
};
const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Невірний формат пошти').required(),
  password: Yup.string().min(8).required(),
});

export default function Login() {
  const pathname = usePathname();

  const router = useRouter();
  const handleSubmit = async (
    values: UserLogin,
    { setSubmitting }: FormikHelpers<UserLogin>,
  ) => {
    try {
      await userLogin(values);
      toast.success('Успішний вхід');
      router.push('/');
    } catch (error) {
      let message = 'Щось пішло не так. Спробуйте ще раз.';

      if (error instanceof Error) {
        message = error.message;
      } else if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message;
      }

      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <main className={`${css.main} main`}>
      <header className={css.header}>
        <div className="container">
          <nav className={css.navigationHome}>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className={css.homeLink}
            >
              <svg width="24" height="24" fill="#1b391b">
                <use href="/icons/icons.svg#icon-eco" />
              </svg>
              <span className={css.span}>Природні Мандри</span>
            </Link>
          </nav>
        </div>
      </header>
      <div className="container">
        <nav className={css.navigation}>
          <ul className={css.navigationList}>
            <li className={css.navigationListItem}>
              <Link
                href="/register"
                className={`${css.tab} ${pathname === '/register' ? css.active : ''}`}
              >
                Реєстрація
              </Link>
            </li>
            <li className={css.navigationListItem}>
              <Link
                href="/login"
                className={`${css.tab} ${pathname === '/login' ? css.active : ''}`}
              >
                Вхід
              </Link>
            </li>
          </ul>
        </nav>
        <h3 className={css.h2}>Вхід</h3>
        <p className={css.p}>Вітаємо знову у спільноту мандрівників!</p>
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={css.form}>
              <label htmlFor="email" className={css.label}>
                Пошта*{' '}
              </label>
              <Field name="email">
                {({ field, meta }: FieldProps) => (
                  <>
                    <input
                      {...field}
                      id="email"
                      autoComplete="email"
                      type="email"
                      className={`${css.input} ${meta.touched && meta.error ? css.errorInput : ''}`}
                    />

                    <p className={css.error}>
                      {meta.touched ? meta.error : ''}
                    </p>
                  </>
                )}
              </Field>
              <label htmlFor="password" className={css.label}>
                Пароль*
              </label>
              <Field name="password">
                {({ field, meta }: FieldProps) => (
                  <>
                    <input
                      {...field}
                      id="password"
                      type="password"
                      className={`${css.input} ${meta.touched && meta.error ? css.errorInput : ''}`}
                    />

                    <p className={css.error}>
                      {meta.touched ? meta.error : ''}
                    </p>
                  </>
                )}
              </Field>
              <button
                type="submit"
                className={css.button}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Loading...' : 'Увійти'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <footer className={css.footer}>
        <div className="container">
          <p className={css.pFooter}>&copy; 2025 Природні Мандри</p>
        </div>
      </footer>
    </main>
  );
}
