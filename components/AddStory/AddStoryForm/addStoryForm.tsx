'use client';

import { Field, Formik, Form, FormikHelpers, ErrorMessage } from 'formik';
import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import css from './addStoryForm.module.css';
import Select from '@/components/CategorySelect/CategorySelect';
import { selectStyles, type CategoryOption } from './selectStyles';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { createNewStory } from '@/lib/api/storyApi';
import ErrorWhileSavingModal from '@/components/ui/ErrorWhileSavingModal/ErrorWhileSavingModal';
import LoaderComponent from '@/components/Loader/Loader';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/buttons/btn';
import { useMutation } from '@tanstack/react-query';

type OrderFormValues = {
  img: File | undefined;
  title: string;
  category: string;
  article: string;
};

type CategoriesProps = {
  categories: string[];
};

const initialValues: OrderFormValues = {
  img: undefined,
  title: '',
  category: 'Категорія',
  article: '',
};

const validationSchema = Yup.object().shape({
  img: Yup.mixed<File>().required('Оберіть файл'),
  title: Yup.string()
    .min(2, 'Мінімум 2 символи')
    .max(40, 'Максимум 40 символів')
    .required('Введіть заголовок'),
  category: Yup.string()
    .required('Обери категорію')
    .notOneOf(['Категорія'], 'Обери категорію'),
  article: Yup.string()
    .min(12, 'Мінімум 12 символів')
    .max(3000, 'Максимум 3000 символів')
    .required('Залиши опис'),
});

const AddStoryForm = ({ categories }: CategoriesProps) => {
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [placeholderSrc, setPlaceholderSrc] = useState(
    '/Placeholder-mobile1x.webp',
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fieldId = useId();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createNewStory,
    onSuccess: (story) => {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setPreview(undefined);
      setIsMenuOpen(false);

      router.push(`/stories/${story._id}`);
    },
    onError: (error) => {
      let message = 'Не вдалося створити історію. Спробуйте ще раз.';

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message;
        if (error.response?.status === 401) {
          setIsErrorModalOpen(true);
        }
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    },
  });

  useEffect(() => {
    const updatePlaceholder = () => {
      const isRetina = window.devicePixelRatio >= 2;
      const width = window.innerWidth;

      if (width >= 1440) {
        setPlaceholderSrc(
          isRetina
            ? '/Placeholder-desktop2x.webp'
            : '/Placeholder-desktop1x.webp',
        );
        return;
      }

      if (width >= 768) {
        setPlaceholderSrc(
          isRetina
            ? '/Placeholder-tablet2x.webp'
            : '/Placeholder-tablet1x.webp',
        );
        return;
      }

      setPlaceholderSrc(
        isRetina ? '/Placeholder-mobile2x.webp' : '/Placeholder-mobile1x.webp',
      );
    };

    updatePlaceholder();
    window.addEventListener('resize', updatePlaceholder);

    return () => {
      window.removeEventListener('resize', updatePlaceholder);
    };
  }, []);

  const handleSubmit = async (
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>,
  ) => {
    mutation.mutate({
      img: values.img as File,
      title: values.title.trim(),
      category: values.category,
      article: values.article.trim(),
    });
    actions.setSubmitting(false);
  };

  const options: CategoryOption[] = categories.map((category) => ({
    value: category,
    label: category,
  }));

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        submitCount,
        isValid,
        dirty,
        isSubmitting,
        setFieldValue,
        resetForm,
        setTouched,
      }) => {
        const isSubmitted = submitCount > 0;
        const titleHasRequiredError =
          isSubmitted &&
          Boolean(errors.title) &&
          values.title.trim().length === 0;
        const articleHasRequiredError =
          isSubmitted &&
          Boolean(errors.article) &&
          values.article.trim().length === 0;
        const categoryHasRequiredError =
          isSubmitted &&
          Boolean(errors.category) &&
          (values.category.trim().length === 0 ||
            values.category === 'Категорія');

        const isFormReady = isValid && dirty;

        const handleCancel = () => {
          resetForm();
          setPreview(undefined);
          setIsMenuOpen(false);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        };

        return (
          <>
            {mutation.isPending && (
              <div className={css.loaderOverlay}>
                <LoaderComponent />
              </div>
            )}
            {isErrorModalOpen && (
              <ErrorWhileSavingModal
                onClose={() => setIsErrorModalOpen(false)}
              />
            )}
            <p className={`${css.label} ${css.marginBottom16}`}>
              Обкладинка статті
            </p>

            <Form className={css.form}>
              <div className={css.imageWrap}>
                <Image
                  src={preview || placeholderSrc}
                  alt="Фото Історії"
                  loading="eager"
                  fill
                  sizes="(min-width: 1440px) 1091px, (min-width: 768px) 704px, 335px"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <label htmlFor={`${fieldId}-file`} className={css.uploadLabel}>
                Завантажити фото
              </label>

              <Field name="img">
                {() => (
                  <input
                    ref={fileInputRef}
                    id={`${fieldId}-file`}
                    type="file"
                    name="img"
                    className={css.fileInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const img = e.currentTarget.files?.[0];
                      setFieldValue('img', img);
                      if (img) {
                        setPreview(URL.createObjectURL(img));
                      }
                    }}
                  />
                )}
              </Field>

              <ErrorMessage name="img" component="span" className={css.error} />

              <label htmlFor={`${fieldId}-title`} className={css.label}>
                Заголовок
                <Field
                  id={`${fieldId}-title`}
                  type="text"
                  name="title"
                  className={`${css.placeholder} ${css.input} ${
                    titleHasRequiredError ? css.inputError : ''
                  }`}
                  placeholder="Введіть заголовок історії"
                />
                <ErrorMessage
                  name="title"
                  component="span"
                  className={css.error}
                />
              </label>

              <label htmlFor={`${fieldId}-category`} className={css.label}>
                Категорія
                <Select
                  className={`${css.categorySelect} ${css.placeholder} ${
                    categoryHasRequiredError ? css.categoryError : ''
                  }`}
                  classNamePrefix="category-select"
                  styles={selectStyles}
                  isSearchable={false}
                  instanceId={`${fieldId}-category-select`}
                  aria-invalid={categoryHasRequiredError}
                  menuIsOpen={isMenuOpen}
                  onMenuOpen={() => setIsMenuOpen(true)}
                  onMenuClose={() => setIsMenuOpen(false)}
                  maxMenuHeight={9999}
                  menuPlacement="bottom"
                  menuPosition="absolute"
                  menuShouldScrollIntoView={false}
                  inputId={`${fieldId}-category`}
                  name="category"
                  options={options}
                  placeholder="Оберіть категорію"
                  value={
                    options.find(
                      (option) => option.value === values.category,
                    ) || null
                  }
                  onChange={(option: CategoryOption | null) =>
                    setFieldValue('category', option?.value ?? '')
                  }
                />
                <ErrorMessage
                  name="category"
                  component="span"
                  className={css.error}
                />
              </label>

              <label htmlFor={`${fieldId}-article`} className={css.label}>
                Текст історії
                <Field
                  id={`${fieldId}-article`}
                  as="textarea"
                  name="article"
                  rows={5}
                  className={`${css.placeholder} ${css.input} ${css.textarea} ${
                    articleHasRequiredError ? css.inputError : ''
                  }`}
                  placeholder="Ваша історія тут"
                />
                <ErrorMessage
                  name="article"
                  component="span"
                  className={`${css.error}`}
                />
              </label>

              <div className={css.buttonContainer}>
                <Button
                  type="submit"
                  className={
                    isFormReady ? css.normalButton : css.buttonDisabled
                  }
                  disabled={isSubmitting}
                  aria-disabled={!isFormReady}
                  onClick={() => {
                    if (!isFormReady && !isSubmitting) {
                      void setTouched(
                        {
                          img: true,
                          title: true,
                          category: true,
                          article: true,
                        },
                        true,
                      );
                    }
                  }}
                >
                  Зберегти
                </Button>
                <Button
                  type="button"
                  className={css.buttonCancel}
                  onClick={handleCancel}
                >
                  Відмінити
                </Button>
              </div>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

export default AddStoryForm;
