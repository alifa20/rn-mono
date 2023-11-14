import { useState } from 'react';
import { View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { format } from 'date-fns';
import { TextInput } from '../TextInput';

type DatePickerProps = {
  label: string;
  errorMessage?: string;
  onValueChange: (date?: Date) => void;
  value?: Date;
};
export const DatePicker = ({
  label,
  errorMessage,
  value,
  onValueChange
}: DatePickerProps) => {
  const [open, setOpen] = useState<boolean>();

  const handleOnValueChange = (date?: Date) => {
    setOpen(false);
    onValueChange(date);
  };

  return (
    <View className="space-y-1">
      <TextInput
        iconType="feather"
        label={label}
        placeholder={label}
        error={errorMessage}
        value={
          value ? format(new Date(value || Date.now()), 'dd MMM, yyyy') : ''
        }
        isReadOnly
        onPressIn={() => setOpen(!open)}
      />
      {open && (
        <View>
          <DateTimePickerModal
            isVisible={open}
            mode="date"
            onConfirm={handleOnValueChange}
            onCancel={() => setOpen(false)}
          />
        </View>
      )}
    </View>
  );
};
