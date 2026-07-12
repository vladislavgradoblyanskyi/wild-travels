import AuthFooter from '@/components/layout/AuthFooter/AuthFooter';
import AuthHeader from '@/components/layout/AuthHeader/AuthHeader';
import RegistrationForm from '@/components/RegisterPage/RegistrationForm/RegistrationForm';
import css from './registrationglobal.module.css';
import LoginBar from '@/components/layout/LoginBar/LoginBar';

export default function Register() {
  return (
    <div className={css.wrapper}>
      <AuthHeader />

      <div className={css.main}>
        <div className={css.container}>
          <LoginBar />
          <RegistrationForm />
        </div>
      </div>

      <AuthFooter />
    </div>
  );
}
