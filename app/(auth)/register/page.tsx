'use client';

import { userRegister } from '@/lib/api/clientApi';
import css from './register.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import { UserRegister } from '@/types/auth';
import { Field, type FieldProps } from 'formik';
import { toast } from 'react-hot-toast';
import { usePathname } from 'next/navigation';

const initialValues: UserRegister = {
  password: '',
  email: '',
  name: '',
};
const registerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Ім'я та прізвище має містити мінімум 3 символи")
    .max(100, "Занадто довге ім'я")
    .trim()
    .matches(
      /^(?=.*[a-zA-Zа-яА-ЯіІїЇєЄґҐ])[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s'-]+$/,
      "Ім'я повинно містити хоча б одну літеру",
    )
    .required("Ім'я та прізвище обов'язкове"),

  email: Yup.string().email('Невірний формат пошти').required(),

  password: Yup.string()
    .min(8, 'Пароль має містити мінімум 8 символів')
    .required(),
});

export default function Register() {
  const pathname = usePathname();

  const router = useRouter();
  const handleSubmit = async (
    values: UserRegister,
    { setSubmitting }: FormikHelpers<UserRegister>,
  ) => {
    try {
      await userRegister(values);
      toast.success('Успішний вхід');
      router.push('/');
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Щось пішло не так';

      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <main className={`${css.main} main`}>
      <header>
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
        <h3 className={css.h2}>Реєстрація</h3>
        <p className={css.p}>Раді вас бачити у спільноті мандрівників!</p>
        <Formik
          initialValues={initialValues}
          validationSchema={registerValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={css.form}>
              <label htmlFor="name" className={css.label}>
                Імʼя та Прізвище*
              </label>
              <Field name="name">
                {({ field, meta }: FieldProps) => (
                  <>
                    <input
                      {...field}
                      id="name"
                      type="text"
                      autoComplete="name"
                      className={`${css.input} ${meta.touched && meta.error ? css.errorInput : ''}`}
                    />

                    <p className={css.error}>
                      {meta.touched ? meta.error : ''}
                    </p>
                  </>
                )}
              </Field>
              <label htmlFor="email" className={css.label}>
                Пошта*
              </label>
              <Field name="email">
                {({ field, meta }: FieldProps) => (
                  <>
                    <input
                      {...field}
                      id="email"
                      type="email"
                      autoComplete="email"
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
                      type="password"
                      id="password"
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
                {isSubmitting ? 'Loading...' : 'Зареєструватись'}
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
