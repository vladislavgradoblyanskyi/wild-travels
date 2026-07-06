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
  name: Yup.string().min(3).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
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
              <use>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.22327 19.7264C4.47694 18.9604 3.89486 18.075 3.47703 17.0701C3.05936 16.0655 2.85052 15.038 2.85052 13.9876C2.85052 12.7591 3.06702 11.6317 3.50002 10.6054C3.93303 9.57904 4.57853 8.63687 5.43653 7.77887C6.50969 6.70971 8.03953 5.94062 10.026 5.47162C12.0127 5.00262 14.4502 4.80179 17.3385 4.86913C17.7117 4.88579 18.0516 4.96146 18.3583 5.09612C18.6648 5.23062 18.9423 5.41821 19.1908 5.65887C19.4341 5.90271 19.627 6.17804 19.7695 6.48487C19.9119 6.79171 19.9905 7.13379 20.0055 7.51113C20.0515 8.95529 20.0329 10.2892 19.9495 11.5129C19.8662 12.7367 19.7037 13.8506 19.462 14.8546C19.2204 15.8585 18.9044 16.7518 18.5143 17.5346C18.1241 18.3173 17.6533 18.9851 17.1018 19.5381C16.2519 20.392 15.3266 21.0396 14.3258 21.4811C13.3249 21.9225 12.257 22.1431 11.122 22.1431C9.94936 22.1431 8.87594 21.9483 7.90178 21.5586C6.92744 21.169 6.03461 20.5582 5.22327 19.7264ZM7.93003 19.5709C8.34936 19.8542 8.83336 20.0689 9.38203 20.2149C9.93069 20.3609 10.5096 20.4339 11.1188 20.4339C11.9948 20.4339 12.8452 20.2515 13.67 19.8869C14.4947 19.5222 15.2428 18.9959 15.9143 18.3079C16.3921 17.8259 16.7904 17.2005 17.109 16.4316C17.4277 15.6628 17.681 14.7756 17.869 13.7701C18.057 12.7645 18.1784 11.6555 18.2333 10.4434C18.2879 9.23121 18.2839 7.94288 18.2213 6.57838C16.6666 6.54104 15.2724 6.56088 14.0385 6.63788C12.8049 6.71488 11.716 6.85338 10.772 7.05338C9.82803 7.25338 9.01836 7.50854 8.34303 7.81888C7.66769 8.12921 7.11928 8.50337 6.69778 8.94137C6.00978 9.64221 5.48044 10.3913 5.10978 11.1886C4.73911 11.986 4.55377 12.7938 4.55377 13.6121C4.55377 14.395 4.71961 15.2203 5.05128 16.0881C5.38311 16.956 5.79961 17.6545 6.30078 18.1839C7.15894 16.5744 8.19869 15.1276 9.42002 13.8436C10.6415 12.5596 11.9599 11.5326 13.375 10.7626C11.941 12.0166 10.776 13.3708 9.88003 14.8251C8.98386 16.2795 8.33386 17.8614 7.93003 19.5709Z"
                    fill="#1B391B"
                  />
                </svg>
              </use>
              <span>Природні Мандри</span>
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
