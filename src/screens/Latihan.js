import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLOR } from '../theme';
import PageShell, { Card } from '../components/PageShell';

const OPTIONS = [
  { id: 'A', text: 'A. Senilai (Patungan makin mahal)', correct: false },
  { id: 'B', text: 'B. Berbalik Nilai (Patungan makin murah)', correct: true },
];

export default function Latihan({ onBack }) {
  const [picked, setPicked] = useState(null);
  const answered = picked !== null;
  const isRight = answered && OPTIONS.find((o) => o.id === picked).correct;

  return (
    <PageShell title="Latihan Kasus" onBack={onBack}>
      <Card no="1" title="Kasus Patungan Pizza">
        <Text style={s.desc}>
          8 orang sepakat patungan Rp15.000 untuk beli pizza. Tiba-tiba 2 orang teman bergabung (total jadi 10 orang). Harga pizza tetap.
        </Text>
        <Text style={s.ask}>Konsep apa yang harus dipakai?</Text>

        {OPTIONS.map((o) => {
          const chosen = picked === o.id;
          const border = !answered ? '#3B4A7A' : o.correct ? COLOR.cyan : chosen ? COLOR.accent : '#3B4A7A';
          return (
            <Pressable
              key={o.id}
              disabled={answered}
              onPress={() => setPicked(o.id)}
              style={[s.opt, { borderColor: border }, chosen && { backgroundColor: 'rgba(0,229,255,0.12)' }]}
            >
              <Text style={s.optText}>{o.text}</Text>
            </Pressable>
          );
        })}

        {answered && (
          <View style={[s.result, { borderColor: isRight ? COLOR.cyan : COLOR.accent }]}>
            <Text style={[s.resultTitle, { color: isRight ? COLOR.cyan : COLOR.accent }]}>
              {isRight ? 'BENAR!' : 'BELUM TEPAT'}
            </Text>
            <Text style={s.resultBody}>
              Total uang tetap: 8 × Rp15.000 = Rp120.000. Jika orang bertambah menjadi 10, tiap orang cukup Rp12.000. Orang naik → iuran turun, jadi ini perbandingan berbalik nilai.
            </Text>
            <Pressable onPress={() => setPicked(null)} style={s.retry}>
              <Text style={s.retryText}>ULANGI</Text>
            </Pressable>
          </View>
        )}
      </Card>
    </PageShell>
  );
}

const s = StyleSheet.create({
  desc: { color: COLOR.white, fontSize: 14, lineHeight: 22, opacity: 0.9 },
  ask: { marginTop: 16, color: COLOR.cyan, fontStyle: 'italic', fontSize: 14, fontWeight: '800' },
  opt: { padding: 15, borderWidth: 2, marginTop: 12, backgroundColor: '#050A1F' },
  optText: { color: COLOR.text, fontSize: 14, fontWeight: '800' },
  result: { marginTop: 18, borderWidth: 2, padding: 14, backgroundColor: 'rgba(2,12,27,0.7)' },
  resultTitle: { fontSize: 16, fontWeight: '900', fontStyle: 'italic', letterSpacing: 2, marginBottom: 6 },
  resultBody: { color: COLOR.text, fontSize: 13, lineHeight: 20 },
  retry: { alignSelf: 'flex-start', marginTop: 12, backgroundColor: COLOR.white, paddingHorizontal: 14, paddingVertical: 4, transform: [{ skewX: '-12deg' }] },
  retryText: { color: COLOR.navy, fontWeight: '900', letterSpacing: 2, fontSize: 12, transform: [{ skewX: '12deg' }] },
});
