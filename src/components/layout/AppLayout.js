import styles from '../../../styles/Home.module.css';

const AppLayout = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default AppLayout;
