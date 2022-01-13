import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontWeight: '300',
    fontSize: 18,
    color: '#e5e5e5',
  },
});

interface Props extends TextProps {
  style?: StyleProp<TextStyle>;
}

const ThemedText = ({ children, style }: Props) => (
  <Text style={[styles.text, style]}>{children}</Text>
);

export default ThemedText;
