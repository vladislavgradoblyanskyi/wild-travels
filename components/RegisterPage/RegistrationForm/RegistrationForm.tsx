'use client';

import { userRegister } from '@/lib/api/clientApi';
import css from './RegistrationForm.module.css';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import { UserRegister } from '@/types/auth';
import { Field, type FieldProps } from 'formik';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { motion } from 'motion/react';
import { useAuthStore } from '@/lib/store/useAuthStore';

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
      /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s'-]+$/,
      "Ім'я може містити тільки літери, пробіли, апостроф та дефіс",
    )
    .required("Ім'я та прізвище обов'язкове"),

  email: Yup.string().email('Невірний формат пошти').required(),

  password: Yup.string()
    .min(8, 'Пароль має містити мінімум 8 символів')
    .required(),
});
export default function RegistrationForm() {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const handleSubmit = async (
    values: UserRegister,
    { setSubmitting }: FormikHelpers<UserRegister>,
  ) => {
    try {
      const user = await userRegister(values);

      toast.success('Реєстрація успішна');

      setUser(user);

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
    <div className="container">
      <motion.h3
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className={css.h3}
      >
        Реєстрація
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className={css.p}
      >
        Раді вас бачити у спільноті мандрівників!
      </motion.p>
      <Formik
        initialValues={initialValues}
        validationSchema={registerValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <motion.label
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              htmlFor="name"
              className={css.label}
            >
              Імʼя та Прізвище*
            </motion.label>
            <Field name="name">
              {({ field, meta }: FieldProps) => (
                <>
                  <motion.input
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    {...field}
                    id="name"
                    type="text"
                    autoComplete="name"
                    className={`${css.input} ${meta.touched && meta.error ? css.errorInput : ''}`}
                  />

                  <p className={css.error}>{meta.touched ? meta.error : ''}</p>
                </>
              )}
            </Field>
            <motion.label
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              htmlFor="email"
              className={css.label}
            >
              Пошта*
            </motion.label>
            <Field name="email">
              {({ field, meta }: FieldProps) => (
                <>
                  <motion.input
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    {...field}
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={`${css.input} ${meta.touched && meta.error ? css.errorInput : ''}`}
                  />

                  <p className={css.error}>{meta.touched ? meta.error : ''}</p>
                </>
              )}
            </Field>
            <motion.label
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              htmlFor="password"
              className={css.label}
            >
              Пароль*
            </motion.label>
            <Field name="password">
              {({ field, meta }: FieldProps) => (
                <>
                  <motion.input
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    {...field}
                    type="password"
                    id="password"
                    className={`${css.input} ${meta.touched && meta.error ? css.errorInput : ''}`}
                  />

                  <p className={css.error}>{meta.touched ? meta.error : ''}</p>
                </>
              )}
            </Field>
            <motion.button
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              type="submit"
              className={css.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Loading...' : 'Зареєструватись'}
            </motion.button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
