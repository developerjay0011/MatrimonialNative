import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#ffffff' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 60, paddingBottom: 16, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
    backButton: { padding: 4 },
    title: { fontSize: 18, fontWeight: '600', color: '#111827' },
    content: { flex: 1, padding: 16 },
    tipCard: { flexDirection: 'row', backgroundColor: '#fff7ed', borderRadius: 12, padding: 16, marginBottom: 16 },
    iconContainer: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
    tipContent: { flex: 1 },
    tipTitle: { fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 4 },
    tipDescription: { fontSize: 14, color: '#6b7280', lineHeight: 20 },
});
