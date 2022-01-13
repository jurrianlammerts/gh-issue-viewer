import { Image, TouchableOpacity, StyleSheet, View } from 'react-native';
import { RepoProps } from '../App';

import openLink from '../helpers/openLink';
import ThemedText from './ThemedText';

type Props = {
  profile: RepoProps | null;
};

const NavBar = ({ profile }: Props) => (
  <View style={styles.navbar}>
    <TouchableOpacity onPress={() => openLink('https://github.com/')}>
      <Image style={styles.avatar} source={require('../assets/icon.png')} />
    </TouchableOpacity>
    <View style={styles.titleContainer}>
      <ThemedText style={styles.title}>{profile?.full_name}</ThemedText>
    </View>
    {profile?.owner.avatar_url && (
      <TouchableOpacity
        onPress={() =>
          profile?.owner.html_url && openLink(profile?.owner.html_url)
        }
      >
        <Image
          style={styles.avatar}
          source={{
            uri: profile?.owner.avatar_url,
          }}
        />
      </TouchableOpacity>
    )}
  </View>
);

export default NavBar;

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#263238',
    borderBottomColor: '#5B5B5B',
    borderBottomWidth: 1,
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  titleContainer: {
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    alignContent: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 100,
  },
});
