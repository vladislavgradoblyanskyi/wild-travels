import AuthBar from '@/components/layout/AuthBar/AuthBar';
import AuthFooter from '@/components/layout/AuthFooter/AuthFooter';
import AuthHeader from '@/components/layout/AuthHeader/AuthHeader';
import LoginForm from '@/components/LoginPage/LoginForm/LoginForm';
import css from './loginglobal.module.css';

export default function Login() {
  return (
    <div className={css.wrapper}>
      <AuthHeader />

      <div className={css.main}>
        <div className={css.container}>
          <AuthBar />
          <LoginForm />
        </div>
      </div>

      <AuthFooter />
    </div>
  );
}
