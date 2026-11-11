import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StatusBar, Animated, Easing, StyleSheet } from 'react-native';
import { COLOR } from './src/theme';
import Lobby from './src/screens/Lobby';
import Materi from './src/screens/Materi';
import Latihan from './src/screens/Latihan';

// Transisi sederhana tiap pindah layar (fade + naik sedikit)
function Transition({ children }) {
  const a = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(a, { toValue: 1, duration: 380, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, [a]);
  return (
    <Animated.View style={{ flex: 1, opacity: a, transform: [{ translateY: a.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }] }}>
      {children}
    </Animated.View>
  );
}

export default function App() {
  const [screen, setScreen] = useState('HOME');
  const home = () => setScreen('HOME');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLOR.bg} />
      <Transition key={screen}>
        {screen === 'HOME' && <Lobby onNavigate={setScreen} />}
        {screen === 'MATERI' && <Materi onBack={home} />}
        {screen === 'LATIHAN' && <Latihan onBack={home} />}
      </Transition>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLOR.bg },
});
