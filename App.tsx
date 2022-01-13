import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import { fetchRepository, fetchRepositoryIssues } from './utils/api';

import NavBar from './components/NavBar';
import ThemedText from './components/ThemedText';
import InputField from './components/InputField';
import Picker from './components/SortPicker';
import ListItem from './components/ListItem';

export type RepoProps = {
  full_name: string;
  owner: {
    avatar_url: string;
    html_url: string;
  };
};

export type IssueProps = {
  title: string;
  number: number;
  state: string;
  html_url: string;
  created_at: string;
  user: {
    login: string;
  };
  labels: {
    name: string;
  }[];
};

type RenderItemProps = {
  item: IssueProps;
};

export default function App() {
  const flatListRef = useRef<FlatList>(null);
  const [query, setQuery] = useState<string>('');
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pickerOpen, setPickerOpen] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [noResults, setNoResults] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [repository, setRepository] = useState<RepoProps | null>(null);
  const [repositoryIssues, setRepositoryIssues] = useState<IssueProps[] | null>(
    null,
  );

  useEffect(() => {
    if (query) {
      getRepositoryIssues(page, selectedSort);
    }
  }, [page, selectedSort]);

  const getRepository = async () => {
    if (query) {
      const fields = query.split('/');
      const user = fields[0];
      const repo = fields[1];
      const data = await fetchRepository(user, repo);
      setRepository(data);
    }
  };

  const getRepositoryIssues = async (page: number, sort?: string) => {
    if (query) {
      setLoading(true);
      const fields = query.split('/');
      const user = fields[0];
      const repo = fields[1];
      const data = await fetchRepositoryIssues(user, repo, page, sort);

      if (data && data.length > 0) {
        setRepositoryIssues((issues: any) =>
          page === 1 ? data : [...issues, ...data],
        );
      } else {
        setNoResults(true);
      }
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (query) {
      setPage(1);
      getRepository();
      getRepositoryIssues(page);
      Keyboard.dismiss();
      flatListRef.current?.scrollToOffset({ animated: false, offset: 0 });
    }
  };

  const handlePickerChange = (value: string) => {
    setSelectedSort(value);
    setPickerOpen(false);
    flatListRef.current?.scrollToOffset({ animated: false, offset: 0 });
  };

  const renderItem = useCallback(
    ({ item }: RenderItemProps) => <ListItem item={item} />,
    [],
  );

  const keyExtractor = useCallback(
    (item: IssueProps, index: number) => `${item.number.toString()}-${index}`,
    [],
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <NavBar profile={repository} />
      <View style={styles.searchContainer}>
        <ThemedText style={styles.searchtitle}>
          Search for Github repository issue's [user/repo]
        </ThemedText>
        <View style={styles.inputContainer}>
          <InputField
            value={query}
            onChangeText={(text: string) => {
              setNoResults(false);
              setQuery(text);
            }}
            placeholder="Type to search"
          />
          <TouchableOpacity
            disabled={loading}
            style={styles.button}
            onPress={() => handleSearch()}
          >
            {loading ? <Text>Loading...</Text> : <Text>Search</Text>}
          </TouchableOpacity>
        </View>
        {repositoryIssues && repositoryIssues?.length > 0 && (
          <Picker
            pickerOpen={pickerOpen}
            setPickerOpen={setPickerOpen}
            selectedSort={selectedSort}
            handlePickerChange={handlePickerChange}
          />
        )}
      </View>
      {noResults && (
        <ThemedText style={styles.noResults}>
          No results found for {query}
        </ThemedText>
      )}
      <FlatList
        ref={flatListRef}
        keyboardDismissMode="on-drag"
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        onScrollBeginDrag={() => setScrolled(true)}
        style={styles.list}
        data={repositoryIssues}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReachedThreshold={0.25}
        onEndReached={() => {
          if (scrolled) {
            setPage(page + 1);
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#263238',
  },
  searchContainer: {
    backgroundColor: '#263238',
    alignItems: 'center',
    padding: 24,
    borderBottomColor: '#5B5B5B',
    borderBottomWidth: 1,
  },
  searchtitle: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 12,
    fontWeight: '600',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: '#e5e5e5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginLeft: 24,
  },
  list: {
    elevation: 9,
    backgroundColor: '#263238',
    paddingHorizontal: 24,
  },
  noResults: {
    marginTop: 24,
    textAlign: 'center',
  },
});
