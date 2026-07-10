'use client';

import { userLogin } from '@/lib/api/clientApi';
import css from './LoginForm.module.css';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import { UserLogin } from '@/types/auth';
import { Field, type FieldProps } from 'formik';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { motion } from 'motion/react';
import { useAuthStore } from '@/lib/store/useAuthStore';

const initialValues: UserLogin = {
  password: '',
  email: '',
};
const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Невірний формат пошти').required(),
  password: Yup.string().min(8).required(),
});

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const handleSubmit = async (
    values: UserLogin,
    { setSubmitting }: FormikHelpers<UserLogin>,
  ) => {
    try {
      const user = await userLogin(values);

      toast.success('Успішний вхід');

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
    <>
      <div className="container">
        <motion.h3
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className={css.h3}
        >
          Вхід
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className={css.p}
        >
          Вітаємо знову у спільноту мандрівників!
        </motion.p>
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={css.form}>
              <motion.label
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                htmlFor="email"
                className={css.label}
              >
                Пошта*{' '}
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
              <motion.button
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
                type="submit"
                className={css.button}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Loading...' : 'Увійти'}
              </motion.button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
