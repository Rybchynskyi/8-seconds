import styles from "../tailwind_presets";

function Error() {
  return (
    <div className="grow self-center place-content-center flex flex-col w-3/4 md:w-1/2">
      <p className={styles.bigText}>Oops!</p>
      <p className="text-4xl md:text-6xl text-red-500 dark:text-white mb-6">This link is not exist</p>
      <a className={"self-end " + styles.button} href="/">Go to main page</a>
    </div>
  );
}

export default Error;
