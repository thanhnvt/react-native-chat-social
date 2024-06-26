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
  success,
} from "../theme";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScreensName } from "../constant/screensName";
import fireStore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_STORAGE_KEY } from "../constant/asyncStorageContant";
import { UserType } from "../types/UserTypes";
import {
  createConversation,
  getUserByConversation,
  getUserDetail,
} from "../utils/chatUtils";
import { collectionUsers, docConversation } from "../constant/fireStore";
import { hideLoading, showLoading } from "../utils/utils";

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
    await collectionUsers.onSnapshot((snapshot) => {
      const users = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setUsers(users);
    });
  };

  const onChatNow = async (desUser: UserType) => {
    await createConversation(user, desUser);
  };

  const checkUser = (us?: any) => {
    if (!us) return false;
    if (user?._id === us?._id) return false;
    if (!user?.connects?.length && !us?.connects?.length) return true;
    const indexUser = user?.connects?.indexOf(us._id) ?? -1;
    const indexUs = us?.connects?.indexOf(user._id) ?? -1;
    return indexUser < 1 && indexUs < 0;
  };

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {users.map(
          (us) =>
            checkUser(us) && (
              <Pressable
                key={us?._id}
                style={styles.userItem}
                onPress={() => onChatNow(us)}
              >
                <View>
                  <Image
                    source={{ uri: us?.avatar }}
                    style={styles.avatarUser}
                    resizeMode="contain"
                  />
                  <View style={styles.dot} />
                </View>
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
    const querySnapshot = await docConversation.collection(user._id + "").get();
    const svs = [];
    for (const element of querySnapshot.docs) {
      if (element.data()) {
        svs.push(element.data());
      }
    }
    onChangeConversation(svs);
  };

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
    showLoading();
    getUser();
  }, []);
  const getUser = async () => {
    const userStr = await AsyncStorage.getItem(
      ASYNC_STORAGE_KEY.USER_INFORMATION
    );
    if (userStr) {
      const user = await getUserDetail(JSON.parse(userStr)._id + "");
      console.log("user", user);
      setUser(user);
    }
    hideLoading();
  };
  if (!user) return null;
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
  dot: {
    width: space.md,
    height: space.md,
    borderRadius: space.md / 2,
    backgroundColor: success[500],
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: colors.white,
  },
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
