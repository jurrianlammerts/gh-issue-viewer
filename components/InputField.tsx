import { TextInput, StyleSheet, View, TextInputProps } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignSelf: 'stretch',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  textInput: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: '300',
    fontSize: 18,
    color: '#e5e5e5',
    flex: 1,
  },
});

interface Props extends TextInputProps {
  value?: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
}

const InputField = ({ placeholder, value, onChangeText }: Props) => (
  <View style={styles.container}>
    <TextInput
      style={styles.textInput}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
    />
  </View>
);

export default InputField;
