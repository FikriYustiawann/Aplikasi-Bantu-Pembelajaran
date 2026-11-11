import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated, Easing } from 'react-native';
import { COLOR } from '../theme';
import useLoop from '../hooks/useLoop';
import { CHARACTER_IMAGE } from '../config';

// Siluet netral sementara — dipakai selama CHARACTER_IMAGE di config.js masih null.
function Silhouette({ width, height }) {
  const fill = '#061A45';
  const rim = COLOR.cyan;
  return (
    <View style={{ width, height, alignItems: 'center' }}>
      <View
        style={{
          position: 'absolute', bottom: 0, width: width * 0.78, height: height * 0.5,
          backgroundColor: fill, borderTopLeftRadius: width * 0.38, borderTopRightRadius: width * 0.38,
          borderWidth: 2, borderBottomWidth: 0, borderColor: rim,
        }}
      />
      <View style={{ position: 'absolute', bottom: height * 0.46, width: width * 0.14, height: height * 0.08, backgroundColor: fill }} />
      <View
        style={{
          position: 'absolute', bottom: height * 0.52, width: width * 0.36, height: width * 0.42,
          borderRadius: width * 0.2, backgroundColor: fill, borderWidth: 2, borderColor: rim,
        }}
      />
      <Text
        style={{
          position: 'absolute', top: height * 0.06, textAlign: 'center', color: COLOR.ice,
          opacity: 0.7, fontSize: 11, letterSpacing: 2, fontWeight: '700',
        }}
      >
        {'ASET KARAKTER\nassets/characters/makoto.png'}
      </Text>
    </View>
  );
}

// Karakter dengan animasi: masuk dari kanan, melayang/"bernapas", dan aura berdenyut.
export default function Character({ width, height, style, aura = true, fromLeft = false }) {
  const float = useLoop(2800, { yoyo: true, easing: Easing.inOut(Easing.sin) });
  const glow = useLoop(2200, { yoyo: true, easing: Easing.inOut(Easing.quad) });
  const enter = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(enter, { toValue: 1, friction: 7, tension: 40, useNativeDriver: true }).start();
  }, [enter]);

  const translateY = float.interpolate({ inputRange: [0, 1], outputRange: [0, -14] });
  const scale = float.interpolate({ inputRange: [0, 1], outputRange: [1, 1.02] });
  const enterX = enter.interpolate({ inputRange: [0, 1], outputRange: [fromLeft ? -width * 0.7 : width * 0.7, 0] });
  const glowOpacity = glow.interpolate({ inputRange: [0, 1], outputRange: [0.2, 0.55] });
  const glowScale = glow.interpolate({ inputRange: [0, 1], outputRange: [0.94, 1.1] });
  const auraSize = Math.min(width, height) * 0.9;

  return (
    <Animated.View
      pointerEvents="none"
      style={[{ width, height, alignItems: 'center', justifyContent: 'flex-end', transform: [{ translateX: enterX }] }, style]}
    >
      {aura && (
      <Animated.View
        style={{
          position: 'absolute', bottom: height * 0.12, width: auraSize, height: auraSize,
          borderRadius: auraSize / 2, backgroundColor: COLOR.royal,
          opacity: glowOpacity, transform: [{ scale: glowScale }],
        }}
      />
      )}
      <Animated.View style={{ transform: [{ translateY }, { scale }] }}>
        {CHARACTER_IMAGE ? (
          <Image source={CHARACTER_IMAGE} style={{ width, height }} resizeMode="contain" />
        ) : (
          <Silhouette width={width} height={height} />
        )}
      </Animated.View>
    </Animated.View>
  );
}
