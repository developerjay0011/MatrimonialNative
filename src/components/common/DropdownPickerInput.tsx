import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { FormInput } from './FormInput';
import { ChevronDown, Check } from 'lucide-react-native';

interface DropdownOption {
    label: string;
    value: string;
}

interface DropdownPickerInputProps {
    label: string;
    required?: boolean;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder?: string;
    options: DropdownOption[];
}

export function DropdownPickerInput({
    label,
    required,
    value,
    onChange,
    error,
    placeholder = 'Select an option',
    options,
}: DropdownPickerInputProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const selectedOption = options.find(opt => opt.value === value);
    const displayValue = selectedOption ? selectedOption.label : '';

    const onSelectOption = (optionValue: string) => {
        onChange(optionValue);
        setDropdownOpen(false);
    };

    return (
        <>
            <FormInput
                label={label}
                required={required}
                value={displayValue}
                placeholder={placeholder}
                editable={false}
                pointerEvents="none"
                error={error}
                rightIcon={<ChevronDown size={20} color="#6b7280" />}
                onPress={() => setDropdownOpen(true)}
                onRightIconPress={() => setDropdownOpen(true)}
            />

            <Modal
                visible={dropdownOpen}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setDropdownOpen(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setDropdownOpen(false)}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{label}</Text>
                            <TouchableOpacity
                                onPress={() => setDropdownOpen(false)}
                                style={styles.closeButton}
                            >
                                <Text style={styles.closeButtonText}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.optionsList} showsVerticalScrollIndicator={false}>
                            {options.map((option) => (
                                <TouchableOpacity
                                    key={option.value}
                                    style={[
                                        styles.optionItem,
                                        value === option.value && styles.optionItemSelected,
                                    ]}
                                    onPress={() => onSelectOption(option.value)}
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                            value === option.value && styles.optionTextSelected,
                                        ]}
                                    >
                                        {option.label}
                                    </Text>
                                    {value === option.value && (
                                        <Check size={20} color="#f97316" />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        width: '100%',
        maxWidth: 400,
        maxHeight: '70%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        overflow: 'hidden',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonText: {
        fontSize: 18,
        color: '#6b7280',
        fontWeight: '600',
    },
    optionsList: {
        maxHeight: 400,
    },
    optionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    optionItemSelected: {
        backgroundColor: '#fff7ed',
    },
    optionText: {
        fontSize: 16,
        color: '#374151',
        fontWeight: '500',
    },
    optionTextSelected: {
        color: '#f97316',
        fontWeight: '600',
    },
});
