import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const ChatScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          data={[1, 1, 1, 1, 1, 1, 1, 1]}
          renderItem={() => (
            <>
              <Text>ChatScreen</Text>
            </>
          )}
          contentContainerStyle={styles.list}
          inverted
        />
        <View>
          <TextInput placeholder="chat in here" style={styles.inputView} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  list: {
    flex: 1,
    backgroundColor: 'blue',
  },
  inputView: {
    backgroundColor: 'white',
  },
});

export default ChatScreen;
