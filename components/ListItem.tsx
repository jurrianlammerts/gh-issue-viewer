import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { IssueProps } from '../App';
import openLink from '../helpers/openLink';
import ThemedText from './ThemedText';
import calculateDaysAgo from '../helpers/calculateDaysAgo';

type Props = {
  item: IssueProps;
};

const ListItem = ({ item }: Props) => {
  const renderStatusIcon = (state: string) => {
    switch (state) {
      case 'open':
        return <FontAwesome5 name="dot-circle" size={24} color="green" />;
      case 'closed':
        return <FontAwesome5 name="dot-circle" size={24} color="red" />;
    }
  };
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => openLink(item.html_url)}
    >
      <View style={styles.listItemIcon}>{renderStatusIcon(item.state)}</View>
      <View style={styles.listItemRow}>
        <ThemedText style={styles.listItemText}>{item.title}</ThemedText>

        {item.labels.length > 0 && (
          <View style={styles.labelList}>
            {item.labels.map((label: { name: string }) => (
              <View style={styles.label}>
                <Text>{label.name}</Text>
              </View>
            ))}
          </View>
        )}
        <View style={styles.listItemFooter}>
          <Text style={styles.listItemFooterText}>
            #{item.number} opened {calculateDaysAgo(item.created_at)} by{' '}
            {item.user.login}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomColor: '#5B5B5B',
    borderBottomWidth: 1,
  },
  listItemIcon: {
    marginRight: 12,
  },
  listItemRow: {
    flex: 1,
    paddingVertical: 24,
    justifyContent: 'space-between',
  },
  listItemFooter: {
    marginTop: 6,
    flexDirection: 'row',
  },
  listItemFooterText: {
    color: '#a0a0a0',
  },
  listItemText: {
    color: '#fff',
    paddingRight: 12,
  },
  labelList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  label: {
    justifyContent: 'center',
    backgroundColor: '#e5e5e5',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    margin: 4,
  },
});
