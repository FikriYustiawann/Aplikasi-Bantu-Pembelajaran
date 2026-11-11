import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

// Nilai animasi 0→1 yang berulang terus (opsional bolak-balik / "yoyo").
export default function useLoop(duration, { yoyo = false, easing = Easing.linear, delay = 0 } = {}) {
  const v = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const step = (toValue) =>
      Animated.timing(v, { toValue, duration, easing, useNativeDriver: true });
    const cycle = yoyo ? Animated.sequence([step(1), step(0)]) : step(1);
    const run = Animated.sequence([Animated.delay(delay), Animated.loop(cycle)]);
    run.start();
    return () => run.stop();
  }, [v, duration, yoyo, delay]);

  return v;
}
