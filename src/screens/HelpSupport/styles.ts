import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#ffffff' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 60, paddingBottom: 16, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
    backButton: { padding: 4 },
    title: { fontSize: 18, fontWeight: '600', color: '#111827' },
    content: { flex: 1, padding: 16 },
    sectionTitle: { fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 16 },
    contactItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
    contactInfo: { marginLeft: 12, flex: 1 },
    contactLabel: { fontSize: 14, fontWeight: '500', color: '#111827', marginBottom: 2 },
    contactValue: { fontSize: 13, color: '#6b7280' },
});
