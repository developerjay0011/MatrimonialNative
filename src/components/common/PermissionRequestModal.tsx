import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Linking, Modal, PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type PermissionRequest = {
    permissions: string[];
    title: string;
    description: string;
    primaryLabel?: string;
    secondaryLabel?: string;
    showOpenSettings?: boolean;
    explainerKey?: string;
};

export type PermissionRequestModalRef = {
    ensureAndroidPermissions: (req: PermissionRequest) => Promise<boolean>;
};

type PermissionRequestModalProps = {
    defaultPrimaryLabel?: string;
    defaultSecondaryLabel?: string;
};

export const PermissionRequestModal = forwardRef<PermissionRequestModalRef, PermissionRequestModalProps>(
    function PermissionRequestModal(
        { defaultPrimaryLabel = 'Continue', defaultSecondaryLabel = 'Not now' },
        ref
    ) {
        const [visible, setVisible] = useState(false);
        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');
        const [primaryLabel, setPrimaryLabel] = useState(defaultPrimaryLabel);
        const [secondaryLabel, setSecondaryLabel] = useState(defaultSecondaryLabel);
        const [showOpenSettings, setShowOpenSettings] = useState(true);

        const pendingRequestRef = useRef<PermissionRequest | null>(null);
        const resolveRef = useRef<((value: boolean) => void) | null>(null);
        const explainedKeysRef = useRef<Record<string, boolean>>({});

        const checkAndroidPermissions = async (permissions: string[]) => {
            const checks = await Promise.all(permissions.map((p) => PermissionsAndroid.check(p as any)));
            return checks.every(Boolean);
        };

        const requestAndroidPermissions = async (permissions: string[]) => {
            try {
                const results = await (PermissionsAndroid as any).requestMultiple(permissions);
                const resultsMap = results as Record<string, string>;
                return permissions.every((p) => resultsMap[p] === PermissionsAndroid.RESULTS.GRANTED);
            } catch (error) {
                console.log('Permission request error:', error);
                return false;
            }
        };

        const closeAndResolve = (value: boolean) => {
            setVisible(false);
            const r = resolveRef.current;
            resolveRef.current = null;
            pendingRequestRef.current = null;
            r?.(value);
        };

        const continueFlow = async () => {
            const req = pendingRequestRef.current;
            if (!req) {
                closeAndResolve(false);
                return;
            }

            setVisible(false);
            const granted = await requestAndroidPermissions(req.permissions);
            closeAndResolve(granted);
        };

        const safeOpenSettings = async () => {
            try {
                await Linking.openSettings();
            } catch {
                try {
                    await Linking.openURL('app-settings:');
                } catch {
                    // ignore
                }
            }
        };

        useImperativeHandle(ref, () => ({
            ensureAndroidPermissions: async (req: PermissionRequest) => {
                if (Platform.OS !== 'android') return true;

                const alreadyGranted = await checkAndroidPermissions(req.permissions);
                if (alreadyGranted) return true;

                const key = req.explainerKey ?? req.permissions.join('|');
                const explained = explainedKeysRef.current[key] === true;
                explainedKeysRef.current[key] = true;

                if (explained) {
                    return await requestAndroidPermissions(req.permissions);
                }

                pendingRequestRef.current = req;
                setTitle(req.title);
                setDescription(req.description);
                setPrimaryLabel(req.primaryLabel ?? defaultPrimaryLabel);
                setSecondaryLabel(req.secondaryLabel ?? defaultSecondaryLabel);
                setShowOpenSettings(req.showOpenSettings ?? true);
                setVisible(true);

                return await new Promise<boolean>((resolve) => {
                    resolveRef.current = resolve;
                });
            },
        }));

        return (
            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => closeAndResolve(false)}
            >
                <View style={styles.overlay}>
                    <View style={styles.card}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.description}>{description}</Text>

                        <View style={styles.buttonsRow}>
                            <TouchableOpacity style={styles.secondaryButton} onPress={() => closeAndResolve(false)}>
                                <Text style={styles.secondaryText}>{secondaryLabel}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.primaryButton} onPress={continueFlow}>
                                <Text style={styles.primaryText}>{primaryLabel}</Text>
                            </TouchableOpacity>
                        </View>

                        {showOpenSettings && (
                            <TouchableOpacity style={styles.settingsButton} onPress={safeOpenSettings}>
                                <Text style={styles.settingsText}>Open Settings</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </Modal>
        );
    }
);

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    card: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 6,
    },
    description: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 16,
        lineHeight: 20,
    },
    buttonsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    secondaryButton: {
        flex: 1,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryText: {
        color: '#111827',
        fontWeight: '600',
    },
    primaryButton: {
        flex: 1,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#f97316',
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryText: {
        color: '#ffffff',
        fontWeight: '600',
    },
    settingsButton: {
        marginTop: 12,
        alignItems: 'center',
    },
    settingsText: {
        color: '#f97316',
        fontWeight: '600',
    },
});
