import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import {
  colors,
  defaultColor,
  fontSize,
  iconSize,
  insets,
  space,
} from "../theme";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScreensName } from "../constant/screensName";

const USERS = [
  {
    image: "https://imgur.com/ylPJBm7.png",
    name: "Joshua",
    id: 1,
  },
  {
    image: "https://imgur.com/ylPJBm7.png",
    name: "Martin",
    id: 2,
  },
  {
    image: "https://imgur.com/ylPJBm7.png",
    name: "Karen",
    id: 3,
  },
  {
    image: "https://imgur.com/ylPJBm7.png",
    name: "Martha",
    id: 4,
  },
  {
    image: "https://imgur.com/ylPJBm7.png",
    name: "Joshua",
    id: 6,
  },
  {
    image: "https://imgur.com/ylPJBm7.png",
    name: "Martin",
    id: 7,
  },
  {
    image: "https://imgur.com/ylPJBm7.png",
    name: "Karen",
    id: 8,
  },
  {
    image: "https://imgur.com/ylPJBm7.png",
    name: "Martha",
    id: 9,
  },
];

const CONVERSATIONS = [
  {
    image: "https://imgur.com/ylPJBm7.png",
    name: "Joshua",
    lastMessenger: "Hello !",
    date: "2024-06-10",
    id: 1,
  },
  {
    image: "https://imgur.com/ylPJBm7.png",
    name: "Joshua",
    lastMessenger: "Ok! See you again",
    date: "2024-05-10",
    id: 2,
  },
  {
    image: "https://imgur.com/ylPJBm7.png",
    name: "Joshua",
    lastMessenger: "The business plan",
    date: "2024-04-10",
    id: 3,
  },
  {
    image: "https://imgur.com/ylPJBm7.png",
    name: "Joshua",
    lastMessenger: "Ok! See you again",
    date: "2024-05-10",
    id: 4,
  },
  {
    image: "https://imgur.com/ylPJBm7.png",
    name: "Joshua",
    lastMessenger: "The business plan",
    date: "2024-04-10",
    id: 5,
  },
  {
    image: "https://imgur.com/ylPJBm7.png",
    name: "Joshua",
    lastMessenger: "Hello !",
    date: "2024-03-10",
    id: 6,
  },
  {
    image: "https://imgur.com/ylPJBm7.png",
    name: "Joshua",
    lastMessenger: "Ok! See you again",
    date: "2024-02-10",
    id: 7,
  },
  {
    image: "https://imgur.com/ylPJBm7.png",
    name: "Joshua",
    lastMessenger: "The business plan",
    date: "2024-01-10",
    id: 8,
  },
];

const HeaderBar = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={{ uri: "https://imgur.com/ylPJBm7.png" }}
        style={styles.avatar}
        resizeMode="contain"
      />
      <Text style={styles.txtChats}>Chats</Text>
    </View>
  );
};

const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.inputContainer}>
        <Icon
          name="search"
          color={defaultColor[300]}
          style={styles.icoSearch}
          size={iconSize.md}
        />
        <TextInput placeholder="Search" style={styles.inputSearch} />
      </View>
    </View>
  );
};

const UserView = () => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((us) => (
          <View key={us.id} style={styles.userItem}>
            <Image
              source={{ uri: "https://imgur.com/ylPJBm7.png" }}
              style={styles.avatarUser}
              resizeMode="contain"
            />
            <Text style={styles.txtUserName}>{us.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const ConversationView = (props: any) => {
  const onGoChat = () => {
    props?.navigation?.navigate(ScreensName.CHAT_SCREEN);
  };
  return (
    <View style={styles.conversationContainer}>
      {CONVERSATIONS.map((cvt) => (
        <Pressable
          key={cvt.id}
          style={styles.convertStationView}
          onPress={onGoChat}
        >
          <Image
            source={{ uri: "https://imgur.com/ylPJBm7.png" }}
            style={styles.avatarConversation}
            resizeMode="contain"
          />
          <View style={styles.convertStationInfoView}>
            <Text style={styles.txtCvtName}>{cvt.name}</Text>
            <Text style={styles.txtCvtLastMessenger}>{cvt.lastMessenger}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const UsersScreen = (props: any) => {
  return (
    <View style={styles.container}>
      <HeaderBar />
      <ScrollView style={styles.body}>
        <SearchBar />
        <UserView />
        <ConversationView navigation={props?.navigation} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  conversationContainer: {
    // marginTop: space.sm,
  },
  txtCvtLastMessenger: {
    fontWeight: "500",
    color: defaultColor[500],
  },
  txtCvtName: {
    fontWeight: "600",
  },
  convertStationInfoView: {
    marginLeft: space.sm,
    flexDirection: "column",
    gap: space["2xs"],
  },
  convertStationView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: space.sm,
  },
  body: {
    flex: 1,
    paddingHorizontal: space.md,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  userItem: {
    marginTop: space.md,
    marginRight: space.md,
  },
  txtUserName: {
    textAlign: "center",
    color: defaultColor[500],
    marginTop: space.sm,
  },
  icoSearch: {
    marginLeft: space.xs,
  },
  inputContainer: {
    flexDirection: "row",
    borderRadius: space["2xs"],
    backgroundColor: defaultColor[100],
    alignItems: "center",
    marginTop: space.xs,
  },
  inputSearch: {
    padding: space.sm,
    flex: 1,
  },
  headerContainer: {
    paddingTop: insets.top,
    flexDirection: "row",
    alignContent: "center",
    paddingHorizontal: space.md,
    paddingBottom: space.sm,
  },
  avatar: {
    height: iconSize["3xl"],
    width: iconSize["3xl"],
    borderRadius: iconSize["3xl"] / 2,
  },
  txtChats: {
    fontWeight: "700",
    alignItems: "center",
    textAlign: "center",
    alignSelf: "center",
    marginLeft: space.sm,
    fontSize: fontSize["3xl"],
  },
  searchContainer: {
    marginTop: space.xs,
  },
  avatarUser: {
    height: iconSize.lg * 2,
    width: iconSize.lg * 2,
    borderRadius: iconSize.lg,
  },
  avatarConversation: {
    height: iconSize.xl * 2,
    width: iconSize.xl * 2,
    borderRadius: iconSize.xl,
  },
});

export default UsersScreen;
