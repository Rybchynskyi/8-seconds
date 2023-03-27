import cellphone from '../images/cellphone.gif';
import styles from "../tailwind_presets";
import React from "react";
import { useSpring, animated } from '@react-spring/web'

function Main() {

  const springsLeft = useSpring({
    from: { x: -100, opacity: 0 },
    to: { x: 0, opacity: 1 },
    config: {
      tension: 280,
      friction: 120
    },
  })

  const springsRight = useSpring({
    delay: 300,
    from: { x: 50, opacity: 0 },
    to: { x: 0, opacity: 1 },
    config: {
      tension: 280,
      friction: 120
    },
  })

  return (
    <div className="grow self-center place-content-center flex flex-col mb-6 dark:text-white">
      <img className="max-w-xs md:max-w-2xl mx-auto mb-8" src={cellphone} width="897" height="556" alt="3 steps" />
      <div className="max-w-sm md:max-w-2xl mx-auto px-6 md:px-0">
        <div>
          <animated.p style={{...springsLeft}} className={styles.bigText}><span className="text-purple-700 dark:text-white font-semibold">8</span>Seconds - the better way to say once</animated.p>
          <animated.p style={{...springsRight}} className="text-md md:text-2xl mt-4">Your messages will be deleted after the moment, when it will be readed</animated.p>
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
