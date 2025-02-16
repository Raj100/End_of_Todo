'use client';
import React, { use, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SiAmazon, SiGithub, SiGoogle, SiMeta, SiTwitch } from "react-icons/si";
import { twMerge } from "tailwind-merge";
import { div } from "framer-motion/client";

export const Todo = () => {

  // useEffect(() => {
  // }, []);
  return (
    <section className="flex h-72 flex-col items-center justify-center gap-12 bg-neutral-950 px-4 py-24 md:flex-row">
      <LogoRolodex
        items={[
          ,
        ]}
        DELAY_IN_MS={1000*360}
        time = 'hour'
      />
      <LogoRolodex
        items={[
          ,
        ]}
        DELAY_IN_MS={1000*60}
        time = 'min'
      />
      <LogoRolodex
        items={[
          ,
        ]}
        DELAY_IN_MS={1000}
        time = 'sec'
      />
    </section>
  );
};



const LogoRolodex = ({ items, DELAY_IN_MS, time }) => {
  const intervalRef = useRef(null);
  const [index, setIndex] = useState(0);
  const today = new Date();
  const sec = today.getSeconds();
  const min = today.getMinutes();
  const hour = today.getHours();
  const TRANSITION_DURATION_IN_SECS = 1;
  const current = time==='sec' ? sec : time==='min' ? min : time==='hour' ? hour : time;
  useEffect(() => {
    // intervalRef.current = setInterval(() => {
    //   setIndex((pv) => pv + 1);
    // }, current);
    intervalRef.current = current;
    setIndex((pv) => pv + 1);
    console.log(current);
    return () => {
      clearInterval(intervalRef.current || undefined);
    };
  }, [current]);

  return (
    <div className="grid grid-cols-2 gap-4">
    <div
      style={{
        transform: "rotateY(-20deg)",
        transformStyle: "preserve-3d",
      }}
      className="relative z-0 h-44 w-60 shrink-0 rounded-xl border border-neutral-700 bg-neutral-800"
    >
      <AnimatePresence mode="sync">
        <motion.div
          style={{
            y: "-50%",
            x: "-50%",
            clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
            zIndex: -index,
            backfaceVisibility: "hidden",
          }}
          key={index}
          transition={{
            duration: TRANSITION_DURATION_IN_SECS,
            ease: "easeInOut",
          }}
          initial={{ rotateX: "0deg" }}
          animate={{ rotateX: "0deg" }}
          exit={{ rotateX: "-180deg" }}
          className="absolute left-1/2 top-1/2"
        >
          <div key={1}
          className={twMerge(
            "grid h-36 w-52 place-content-center rounded-lg bg-neutral-700 text-6xl text-neutral-50")}
        >
          {current}
        </div>
        </motion.div>
        <motion.div
          style={{
            y: "-50%",
            x: "-50%",
            clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
            zIndex: index,
            backfaceVisibility: "hidden",
          }}
          key={(index + 1) * 2}
          initial={{ rotateX: "180deg" }}
          animate={{ rotateX: "0deg" }}
          exit={{ rotateX: "0deg" }}
          transition={{
            duration: TRANSITION_DURATION_IN_SECS,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2"
        >
         <div key={1}
          className={twMerge(
            "grid h-36 w-52 place-content-center rounded-lg bg-neutral-700 text-6xl text-neutral-50")}
        >
          {time==='sec' ? sec : time==='min' ? min : time==='hour' ? hour : time}
        </div>
        </motion.div>
      </AnimatePresence>

      <hr
        style={{
          transform: "translateZ(1px)",
        }}
        className="absolute left-0 right-0 top-1/2 z-[999999999] -translate-y-1/2 border-t-2 border-neutral-800"
      />
    </div>
    </div>
  );
};


export default Todo;