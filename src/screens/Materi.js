import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLOR } from '../theme';
import PageShell, { Card } from '../components/PageShell';

function Table({ heads, rows, accent }) {
  return (
    <View>
      <View style={s.row}>
        {heads.map((h) => (
          <Text key={h} style={s.head}>{h}</Text>
        ))}
      </View>
      {rows.map((r, i) => (
        <View key={i} style={s.row}>
          {r.map((c, j) => (
            <Text key={j} style={s.cell}>{c}</Text>
          ))}
        </View>
      ))}
    </View>
  );
}

export default function Materi({ onBack }) {
  return (
    <PageShell title="Tabel Visualisasi" onBack={onBack}>
      <Card no="1" title="Perbandingan Senilai">
        <Text style={s.desc}>Konteks: Bensin & Jarak Tempuh</Text>
        <Table
          heads={['Bensin (Liter)', 'Jarak (Km)']}
          rows={[['3  (↑ Naik)', '45  (↑ Naik)'], ['8  (↑ Naik)', '120 (↑ Naik)']]}
        />
        <Text style={[s.logic, { color: COLOR.cyan }]}>Logika: Bensin bertambah, jarak ikut bertambah panjang.</Text>
      </Card>

      <Card no="2" title="Perbandingan Berbalik Nilai" accent={COLOR.accent}>
        <Text style={s.desc}>Konteks: Pekerja & Waktu Bangunan</Text>
        <Table
          heads={['Pekerja (Orang)', 'Waktu (Hari)']}
          rows={[['15  (↑ Naik)', '24  (↓ Turun)'], ['21  (↑ Naik)', '10  (↓ Turun)']]}
        />
        <Text style={[s.logic, { color: COLOR.accent }]}>Logika: Pekerja ditambah, maka waktu selesai makin cepat (hari berkurang).</Text>
      </Card>
    </PageShell>
  );
}

const s = StyleSheet.create({
  desc: { color: COLOR.white, fontSize: 14, marginBottom: 14, lineHeight: 22, opacity: 0.9 },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.12)', paddingVertical: 10 },
  head: { flex: 1, color: COLOR.white, fontWeight: '900', fontSize: 14 },
  cell: { flex: 1, color: COLOR.text, fontSize: 14 },
  logic: { marginTop: 14, fontStyle: 'italic', fontSize: 14, fontWeight: '800' },
});
