import AuthFooter from '@/components/layout/AuthFooter/AuthFooter';
import AuthHeader from '@/components/layout/AuthHeader/AuthHeader';
import LoginForm from '@/components/LoginPage/LoginForm/LoginForm';
import LoginBar from '@/components/layout/LoginBar/LoginBar';
import css from './loginglobal.module.css';

export default function Login() {
  return (
    <div className={css.wrapper}>
      <AuthHeader />

      <div className={css.main}>
        <div className={css.container}>
          <LoginBar />
          <LoginForm />
        </div>
      </div>

      <AuthFooter />
    </div>
  );
}
