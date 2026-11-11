import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { COLOR } from '../theme';
import { APP_TITLE, APP_SUBTITLE, MENU } from '../config';
import AnimatedBackground from '../components/AnimatedBackground';
import Character from '../components/Character';
import LobbyMenu from '../components/LobbyMenu';

function Btn({ k, t }) {
  return (
    <View style={s.btn}>
      <View style={s.btnCircle}><Text style={s.btnK}>{k}</Text></View>
      <Text style={s.btnT}>{t}</Text>
    </View>
  );
}

export default function Lobby({ onNavigate }) {
  const { width: W, height: H } = useWindowDimensions();
  const land = W > H;
  const [sel, setSel] = useState(0);

  const panelW = land ? W * 0.36 : W * 0.34;
  const f = Math.min(panelW * 0.62, 150);       // ukuran teks vertikal raksasa
  const cx = panelW * 0.18;                      // posisi tengah teks vertikal
  const fs = Math.min(W * 0.07, 56);             // ukuran font menu
  const menuLeft = land ? W * 0.42 : panelW + 8;
  const cardH = Math.min(W * 0.07, 62);

  const vText = (color, dx) => (
    <Text
      numberOfLines={1}
      style={{
        position: 'absolute', width: H, left: cx - H / 2 + dx, top: H / 2 - f * 0.55,
        fontSize: f, lineHeight: f * 1.1, fontWeight: '900', fontStyle: 'italic', color,
        paddingLeft: 40, transform: [{ rotate: '-90deg' }],
      }}
    >
      {APP_TITLE[1]}
    </Text>
  );

  return (
    <View style={s.root}>
      <AnimatedBackground variant="sea" />

      {/* panel putih miring + teks vertikal raksasa */}
      <View style={{ position: 'absolute', top: -20, bottom: -20, left: -panelW * 0.15, width: panelW * 1.15, backgroundColor: '#fff', transform: [{ skewX: '-6deg' }] }} />
      {vText('#8A8A8A', -f * 0.1)}
      {vText('#000000', 0)}

      <Character
        width={panelW * 1.5} height={H * 0.8} aura={false} fromLeft
        style={{ position: 'absolute', left: panelW * 0.1, bottom: 0 }}
      />

      {/* kotak judul (pengganti kotak "wallet") */}
      <View style={s.titleBox}>
        <Text style={s.titleMain}>{APP_TITLE.join(' ')}</Text>
        <Text style={s.titleSub}>{APP_SUBTITLE}</Text>
      </View>

      {/* menu */}
      <View style={{ position: 'absolute', left: menuLeft, top: H * 0.3 }}>
        <LobbyMenu items={MENU} selected={sel} onSelect={setSel} fontSize={fs} onOpen={(it) => it.screen && onNavigate(it.screen)} />
      </View>

      {/* kartu portrait kanan atas (placeholder untuk progres / modul) */}
      {[0, 1, 2].map((i) => (
        <View key={i} style={[s.card, { top: 20 + i * (cardH + 14), height: cardH, width: cardH * 2.1 }]}>
          <View style={[s.avatar, { width: cardH * 0.6, height: cardH * 0.6, borderRadius: cardH * 0.3 }]} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <View style={[s.bar, { backgroundColor: COLOR.cyan }]} />
            <View style={[s.bar, { backgroundColor: '#FFD400', width: `${90 - i * 20}%` }]} />
          </View>
        </View>
      ))}

      {/* petunjuk perintah + tombol (kanan bawah) */}
      <View style={s.hint}>
        <Text style={s.hintMain}>{MENU[sel].sub}</Text>
        <View style={s.hintLine}><Text style={s.hintSub}>Perintah</Text></View>
        <View style={{ flexDirection: 'row', marginTop: 14 }}>
          <Btn k="A" t="Pilih" />
          <Btn k="B" t="Kembali" />
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLOR.bg },
  titleBox: { position: 'absolute', top: 22, left: 22, backgroundColor: '#fff', borderWidth: 2, borderColor: '#000', paddingHorizontal: 14, paddingVertical: 8 },
  titleMain: { color: '#000', fontSize: 22, fontWeight: '900', fontStyle: 'italic', letterSpacing: 1 },
  titleSub: { color: '#000', fontSize: 11, fontWeight: '800', fontStyle: 'italic', marginTop: 2 },
  card: { position: 'absolute', right: 18, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, backgroundColor: 'rgba(10,60,200,0.85)', borderWidth: 2, borderColor: COLOR.cyan, transform: [{ skewX: '-12deg' }] },
  avatar: { backgroundColor: COLOR.ice, borderWidth: 2, borderColor: COLOR.cyan },
  bar: { height: 6, marginVertical: 3, width: '100%' },
  hint: { position: 'absolute', right: 22, bottom: 22, alignItems: 'flex-end' },
  hintMain: { color: '#fff', fontSize: 28, fontWeight: '900', fontStyle: 'italic' },
  hintLine: { borderBottomWidth: 1, borderBottomColor: '#fff', alignSelf: 'stretch', alignItems: 'flex-start' },
  hintSub: { color: '#fff', fontSize: 11, fontWeight: '800' },
  btn: { flexDirection: 'row', alignItems: 'center', marginLeft: 14 },
  btnCircle: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  btnK: { color: '#fff', fontSize: 11, fontWeight: '900' },
  btnT: { color: '#fff', fontSize: 18, fontWeight: '900', fontStyle: 'italic', marginLeft: 6 },
});
