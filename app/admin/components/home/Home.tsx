import styles from './home.module.scss';

export default function Home() {
  return (
    <div className={styles.home}>
      <h1>Admin portal</h1>

      <p>Manage packages and explore related pages for package management.</p>
      <section>
        <p>
          <strong>Click &apos;Packages&apos; </strong>to view and manage
          existing packages.
        </p>
        <p>
          <strong>Click &apos;Add Package&apos;</strong> to add a new package to
          the database.
        </p>
      </section>
    </div>
  );
}
