import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  keyboardView: {
    flex: 1,
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
  },
  placeholderBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  placeholderText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 0,
  },

  photoActionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  photoPickerCardsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  photoPickerCard: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2
  },
  photoPickerCardDisabled: {
    opacity: 0.5,
  },
  photoPickerIcon: {
    fontSize: 28,
    marginBottom: 5,
  },
  photoPickerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  photoPickerSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  photoActionButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f97316',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoActionButtonDisabled: {
    backgroundColor: '#fed7aa',
  },
  photoActionText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 15,
  },
  photoHint: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 12,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  photoTile: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  removePhotoButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(17,24,39,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removePhotoText: {
    color: '#ffffff',
    fontSize: 18,
    lineHeight: 18,
    marginTop: -2,
  },
  photoEmpty: {
    width: '100%',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 18,
    backgroundColor: '#ffffff',
  },
  photoEmptyTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  photoEmptySubtitle: {
    fontSize: 13,
    color: '#6b7280',
  },

  permissionOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  permissionCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  permissionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  permissionButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  permissionSecondaryButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionSecondaryText: {
    color: '#111827',
    fontWeight: '600',
  },
  permissionPrimaryButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#f97316',
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionPrimaryText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  permissionSettingsButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  permissionSettingsText: {
    color: '#f97316',
    fontWeight: '600',
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: -12,
    marginBottom: 12,
  },
});
