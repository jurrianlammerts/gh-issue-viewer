import { Linking } from 'react-native';

export default async (url: string) => {
  await Linking.openURL(url);
};
