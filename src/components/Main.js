import cellphone from '../images/cellphone.gif';
import styles from "../tailwind_presets";
import React from "react";

function Main() {

  return (
    <div className="grow self-center place-content-center flex flex-col mb-6 dark:text-white">
      <img className="max-w-md md:max-w-3xl mx-auto mb-8" src={cellphone} alt="3 steps" />
      <div className="max-w-sm md:max-w-2xl mx-auto">
        <div>
          <p className={styles.bigText}><span className="text-purple-700 dark:text-white font-semibold">8</span>Seconds - the better way to say once</p>
          <p className="text-md md:text-2xl mt-4">Your messages will be deleted after the moment, when it will be readed</p>
        </div>
        <div className="flex space-x-2 md:space-x-10 mt-10 justify-center">
          <a href='/create' className={styles.button}>Create a message</a>
          <a href='/note' className={styles.button}>Write a message</a>
        </div>
      </div>
    </div>
  );
}

export default Main;
