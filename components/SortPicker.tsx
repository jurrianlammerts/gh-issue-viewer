import { TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { Picker, PickerIOS } from '@react-native-picker/picker';

import ThemedText from './ThemedText';

type Props = {
  pickerOpen: boolean;
  setPickerOpen: (pickerOpen: boolean) => void;
  selectedSort: string;
  handlePickerChange: (selectedSort: string) => void;
};

const SortPicker = ({
  pickerOpen,
  setPickerOpen,
  selectedSort,
  handlePickerChange,
}: Props) => {
  return (
    <>
      {Platform.OS === 'ios' ? (
        pickerOpen ? (
          <PickerIOS
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={selectedSort}
            onValueChange={(itemValue) =>
              handlePickerChange(itemValue.toString())
            }
          >
            <Picker.Item label="Created" value="created" />
            <Picker.Item label="Updated" value="updated" />
            <Picker.Item label="Comments" value="comments" />
          </PickerIOS>
        ) : (
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => setPickerOpen(true)}
          >
            <ThemedText>{selectedSort || 'Sort by'}</ThemedText>
            <Octicons name="triangle-down" size={20} color="#e5e5e5" />
          </TouchableOpacity>
        )
      ) : (
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={selectedSort}
          onValueChange={(itemValue) => handlePickerChange(itemValue)}
        >
          <Picker.Item label="Created" value="created" />
          <Picker.Item label="Updated" value="updated" />
          <Picker.Item label="Comments" value="comments" />
        </Picker>
      )}
    </>
  );
};

export default SortPicker;

const styles = StyleSheet.create({
  picker: {
    width: '100%',
    marginTop: 24,
    backgroundColor: '#263238',
    color: '#e5e5e5',
    padding: 12,
    borderColor: '#e5e5e5',
    borderWidth: 1,
    borderRadius: 4,
  },
  pickerItem: {
    color: '#e5e5e5',
  },
  sortButton: {
    width: ' 100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#e5e5e5',
    borderWidth: 1,
    backgroundColor: '#263238',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginTop: 24,
  },
});
