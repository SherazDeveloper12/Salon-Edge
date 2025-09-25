import Styles from './header.module.css';
export default function Header() {
  return (
    <header className={Styles.header}>
      <h1 className={Styles.title}>My Application</h1>
    </header>
  );
}