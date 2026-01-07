import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { AlertTriangle, X } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function LogoutDialog({ isOpen, onClose, onConfirm }: DialogProps) {
    const { t } = useTranslation();

    return (
        <Modal
            visible={isOpen}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.dialog}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <X size={20} color="#6b7280" />
                    </TouchableOpacity>

                    <View style={styles.iconContainer}>
                        <Text style={styles.emoji}>👋</Text>
                    </View>

                    <Text style={styles.title}>{t('dialogs.logout')}</Text>
                    <Text style={styles.message}>
                        {t('dialogs.logoutMessage')}
                    </Text>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelText}>{t('common.cancel')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                            <Text style={styles.confirmText}>{t('dialogs.logout')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export function DeactivateDialog({ isOpen, onClose, onConfirm }: DialogProps) {
    const { t } = useTranslation();

    return (
        <Modal
            visible={isOpen}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.dialog}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <X size={20} color="#6b7280" />
                    </TouchableOpacity>

                    <View style={[styles.iconContainer, { backgroundColor: '#fee2e2' }]}>
                        <AlertTriangle size={32} color="#ef4444" />
                    </View>

                    <Text style={styles.title}>{t('dialogs.deactivate')}</Text>
                    <Text style={styles.message}>
                        {t('dialogs.deactivateMessage')}
                    </Text>

                    <View style={styles.noteBox}>
                        <Text style={styles.noteTitle}>{t('dialogs.deactivateNote')}</Text>
                        <Text style={styles.noteText}>
                            {t('dialogs.deactivateNoteText')}
                        </Text>
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelText}>{t('common.cancel')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.confirmButton, { backgroundColor: '#ef4444' }]} onPress={onConfirm}>
                            <Text style={styles.confirmText}>{t('dialogs.deactivate')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    dialog: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24,
        width: '100%',
        maxWidth: 400,
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#fff7ed',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 16,
    },
    emoji: {
        fontSize: 32,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827',
        textAlign: 'center',
        marginBottom: 8,
    },
    message: {
        fontSize: 15,
        color: '#6b7280',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 16,
    },
    noteBox: {
        backgroundColor: '#fef3c7',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    noteTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#92400e',
        marginBottom: 4,
    },
    noteText: {
        fontSize: 12,
        color: '#92400e',
        lineHeight: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#d1d5db',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    cancelText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6b7280',
    },
    confirmButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#f97316',
        alignItems: 'center',
    },
    confirmText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
});
