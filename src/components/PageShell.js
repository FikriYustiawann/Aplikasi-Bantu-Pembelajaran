import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, Pressable, Animated, Easing, StyleSheet } from 'react-native';
import { COLOR } from '../theme';
import AnimatedBackground from './AnimatedBackground';

// Kerangka layar isi: latar bergerak ringan + tombol kembali + judul bergaya Persona
export default function PageShell({ title, onBack, children }) {
  const enter = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(enter, { toValue: 1, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, [enter]);

  return (
    <View style={styles.root}>
      <AnimatedBackground variant="page" />
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack} style={styles.back}>
          <Text style={styles.backText}>◀  KEMBALI</Text>
        </Pressable>

        <Animated.View
          style={{ opacity: enter, transform: [{ translateX: enter.interpolate({ inputRange: [0, 1], outputRange: [-60, 0] }) }] }}
        >
          <View style={styles.titleBar}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
        </Animated.View>

        {children}
      </ScrollView>
    </View>
  );
}

// Kartu bergaya Persona: bingkai cyan + label bernomor miring
export function Card({ no, title, accent = COLOR.cyan, children }) {
  return (
    <View style={[styles.card, { borderColor: accent }]}>
      <View style={styles.cardHead}>
        {no != null && (
          <View style={[styles.no, { backgroundColor: accent }]}>
            <Text style={styles.noText}>{no}</Text>
          </View>
        )}
        <Text style={[styles.cardTitle, { color: accent }]}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLOR.bg },
  content: { padding: 24, paddingBottom: 60 },
  back: { alignSelf: 'flex-start', marginTop: 6, marginBottom: 22, paddingVertical: 6, paddingHorizontal: 14, borderWidth: 2, borderColor: COLOR.cyan, backgroundColor: COLOR.glass, transform: [{ skewX: '-12deg' }] },
  backText: { color: COLOR.white, fontWeight: '900', letterSpacing: 2, fontSize: 14 },
  titleBar: { alignSelf: 'flex-start', backgroundColor: COLOR.white, paddingHorizontal: 16, paddingVertical: 4, marginBottom: 24, transform: [{ skewX: '-12deg' }] },
  titleText: { color: COLOR.navy, fontSize: 26, fontWeight: '900', fontStyle: 'italic', letterSpacing: 2, textTransform: 'uppercase', transform: [{ skewX: '12deg' }] },
  card: { borderWidth: 2, padding: 20, marginBottom: 26, backgroundColor: COLOR.glass },
  cardHead: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  no: { width: 30, height: 30, alignItems: 'center', justifyContent: 'center', marginRight: 12, transform: [{ skewX: '-12deg' }] },
  noText: { color: COLOR.navy, fontWeight: '900', fontSize: 16, transform: [{ skewX: '12deg' }] },
  cardTitle: { flex: 1, fontSize: 17, fontWeight: '900', letterSpacing: 1, textTransform: 'uppercase' },
});
