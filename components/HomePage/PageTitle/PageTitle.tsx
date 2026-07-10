import { ReactNode } from 'react';
import css from './PageTitle.module.css';

interface Props {
  children: ReactNode;
}

export default function PageTitle({ children }: Props) {
  return <h1 className={css.title}>{children}</h1>;
}
