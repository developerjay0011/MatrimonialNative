import React, { useState } from 'react';
import { FormInput } from './FormInput';
import { Calendar } from 'lucide-react-native';
import { DatePickerModal } from 'react-native-paper-dates';

interface DatePickerInputProps {
    label: string;
    required?: boolean;
    value: string;
    onChange: (date: string, age: number) => void;
    error?: string;
    placeholder?: string;
    minDate?: Date;
    maxDate?: Date;
    showAge?: boolean;
}

export function DatePickerInput({
    label,
    required,
    value,
    onChange,
    error,
    placeholder = 'Select date',
    minDate = new Date(1924, 0, 1),
    maxDate = new Date(),
}: DatePickerInputProps) {
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        value ? new Date(value) : undefined
    );

    const calculateAge = (dob: string): number => {
        if (!dob) return 0;
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };


    const onDateConfirm = (params: any) => {
        setDatePickerOpen(false);
        const date = params.date;
        if (date) {
            setSelectedDate(date);
            const formattedDate = date.toISOString().split('T')[0];
            const age = calculateAge(date);
            onChange(formattedDate, age);
        }
    };

    const onDateDismiss = () => {
        setDatePickerOpen(false);
    };

    return (
        <>
            <FormInput
                label={label}
                required={required}
                value={value}
                placeholder={placeholder}
                editable={false}
                pointerEvents="none"
                error={error}
                rightIcon={<Calendar size={20} color="#6b7280" />}
                onPress={() => { setDatePickerOpen(true) }}
                onRightIconPress={() => { setDatePickerOpen(true) }}
            />

            <DatePickerModal
                locale="en"
                mode="single"
                visible={datePickerOpen}
                onDismiss={onDateDismiss}
                date={selectedDate}
                onConfirm={onDateConfirm}
                validRange={{
                    startDate: minDate,
                    endDate: maxDate,
                }}
            />
        </>
    );
}
