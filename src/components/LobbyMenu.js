import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, Animated, Easing, StyleSheet } from 'react-native';

// Makin jauh dari item terpilih, makin biru & redup (seperti menu referensi)
const PALETTE = ['#5CEBFF', '#47D0FF', '#3FA8FF', '#3A80FF', '#3A62FF'];

function Item({ item, index, selected, dist, fs, onSelect, onOpen }) {
  const enter = useRef(new Animated.Value(0)).current;
  const sel = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(enter, { toValue: 1, duration: 480, delay: 300 + index * 100, easing: Easing.out(Easing.back(1.3)), useNativeDriver: true }).start();
  }, [enter, index]);
  useEffect(() => {
    Animated.spring(sel, { toValue: selected ? 1 : 0, friction: 6, tension: 150, useNativeDriver: true }).start();
  }, [sel, selected]);

  const x = enter.interpolate({ inputRange: [0, 1], outputRange: [-120, 0] });
  const opacity = enter.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolate: 'clamp' });
  const scale = sel.interpolate({ inputRange: [0, 1], outputRange: [1, 1.14] });
  const shift = sel.interpolate({ inputRange: [0, 1], outputRange: [0, fs * 0.6] });
  const color = selected ? '#000000' : PALETTE[Math.min(dist - 1, PALETTE.length - 1)];

  return (
    <Animated.View
      style={{ opacity, alignSelf: 'flex-start', marginTop: -fs * 0.1, zIndex: selected ? 2 : 1, transform: [{ translateX: x }, { translateX: shift }, { scale }] }}
    >
      <Pressable
        onPressIn={() => onSelect(index)}
        onHoverIn={() => onSelect(index)}
        onPress={() => !item.locked && onOpen(item)}
        style={{ paddingHorizontal: fs * 0.3, paddingVertical: fs * 0.08 }}
      >
        {selected && <View style={[styles.band, { left: -fs * 0.2, right: -fs * 0.5 }]} />}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.label, { fontSize: fs, lineHeight: fs * 1.05, color }]}>{item.label}</Text>
          {item.locked && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>SEGERA</Text>
            </View>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default function LobbyMenu({ items, selected, onSelect, onOpen, fontSize = 44 }) {
  return (
    <View style={{ transform: [{ rotate: '-10deg' }] }}>
      {items.map((item, i) => (
        <Item key={item.key} item={item} index={i} selected={i === selected} dist={Math.abs(i - selected)} fs={fontSize} onSelect={onSelect} onOpen={onOpen} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontWeight: '900', fontStyle: 'italic', letterSpacing: -1, textTransform: 'uppercase' },
  band: {
    position: 'absolute', top: '12%', bottom: '6%', backgroundColor: '#FF1A1A',
    borderRightWidth: 8, borderRightColor: '#FF8AD8', transform: [{ skewX: '-24deg' }, { rotate: '-3deg' }],
  },
  badge: { backgroundColor: '#FF1A1A', paddingHorizontal: 6, paddingVertical: 1, marginLeft: 10 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '900', letterSpacing: 1.5 },
});
