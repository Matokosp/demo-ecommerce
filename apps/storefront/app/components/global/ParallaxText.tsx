"use client";

import { wrap } from "@motionone/utils";
import { Await } from "@remix-run/react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { ReactNode, Suspense, useEffect, useRef } from "react";

interface ParallaxProps {
  children: ReactNode;
  baseVelocity: number;
}

export const ParallaxText = ({
  children,
  baseVelocity = 100,
}: ParallaxProps) => {
  const baseX = useMotionValue(0);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 400], [0, 8], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(0, -50.5, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax m-0 overflow-hidden">
      <motion.div className="scroller flex flex-col gap-y-7" style={{ y: x }}>
        {children}
        {children}
      </motion.div>
    </div>
  );
};
