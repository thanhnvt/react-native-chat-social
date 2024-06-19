import React, { useEffect, useState } from "react";
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
import fireStore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_STORAGE_KEY } from "../constant/asyncStorageContant";
import { UserType } from "../types/UserTypes";
import { createConversation, getUserByConversation } from "../utils/chatUtils";
import {
  COLLECTION_CHATS_DEMO,
  COLLECTION_USERS,
  DOC_CONVERSATIONS,
  DOC_USER,
} from "../constant/chatContant";

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

const HeaderBar = (props: any) => {
  const { user } = props;
  return (
    <View style={styles.headerContainer}>
      <Image
        source={{ uri: user?.avatar }}
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

const UserView = (props: any) => {
  const { user } = props;
  const [users, setUsers] = useState<Array<any>>([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const querySnapshot = fireStore()
      .collection(COLLECTION_CHATS_DEMO)
      .doc(DOC_USER)
      .collection(COLLECTION_USERS);
    const data = await querySnapshot.get();
    const users = [] as any;
    await data.forEach((element) => {
      const value = element.data();
      if (value) {
        users.push(value);
      }
    });
    setUsers(users);
  };

  const onChatNow = async (desUser: UserType) => {
    await createConversation(user, desUser);
  };

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {users.map(
          (us) =>
            user._id !== us._id && (
              <Pressable
                key={us?._id}
                style={styles.userItem}
                onPress={() => onChatNow(us)}
              >
                <Image
                  source={{ uri: us?.avatar }}
                  style={styles.avatarUser}
                  resizeMode="contain"
                />
                <Text style={styles.txtUserName}>{us.userName}</Text>
              </Pressable>
            )
        )}
      </ScrollView>
    </View>
  );
};

const ConversationView = (props: any) => {
  const { navigation, user } = props;

  const [conversations, onChangeConversation] = useState<Array<any>>([]);

  useEffect(() => {
    if (user?._id) {
      getConversations();
    }
  }, [user]);

  const onGoChat = () => {
    navigation?.navigate(ScreensName.CHAT_SCREEN);
  };

  const getConversations = async () => {
    const querySnapshot = await fireStore()
      .collection(COLLECTION_CHATS_DEMO)
      .doc(DOC_CONVERSATIONS)
      .collection(user._id);

    const svs = [] as any;
    const data = await querySnapshot.get();
    await data.forEach((element) => {
      if (element.data()) {
        svs.push(element.data());
      }
    });
    onChangeConversation(svs);
  };

  console.log("aaaaaa", conversations);

  if (!conversations?.length) return null;
  return (
    <View style={styles.conversationContainer}>
      {conversations.map((cvt) => {
        const desUser = getUserByConversation(user, cvt?.users);
        return (
          <Pressable
            key={cvt?._id}
            style={styles.convertStationView}
            onPress={onGoChat}
          >
            <Image
              source={{ uri: desUser?.avatar }}
              style={styles.avatarConversation}
              resizeMode="contain"
            />
            <View style={styles.convertStationInfoView}>
              <Text style={styles.txtCvtName}>{desUser.userName}</Text>
              <Text style={styles.txtCvtLastMessenger}>
                {cvt.lastMessenger ?? "have new messenger"}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const UsersScreen = (props: any) => {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const userStr = await AsyncStorage.getItem(
      ASYNC_STORAGE_KEY.USER_INFORMATION
    );
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  };
  return (
    <View style={styles.container}>
      <HeaderBar user={user} />
      <ScrollView style={styles.body}>
        <SearchBar />
        <UserView user={user} />
        <ConversationView navigation={props?.navigation} user={user} />
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
    alignItems: "center",
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
