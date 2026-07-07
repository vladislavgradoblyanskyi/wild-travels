import AuthBar from '@/components/layout/AuthBar/AuthBar';
import AuthFooter from '@/components/layout/AuthFooter/AuthFooter';
import AuthHeader from '@/components/layout/AuthHeader/AuthHeader';
import RegistrationForm from '@/components/RegisterPage/RegistrationForm/RegistrationForm';
import css from './registrationglobal.module.css';

export default function Register() {
  return (
    <div className={css.wrapper}>
      <AuthHeader />

      <div className={css.main}>
        <div className={css.container}>
          <AuthBar />
          <RegistrationForm />
        </div>
      </div>

      <AuthFooter />
    </div>
  );
}
