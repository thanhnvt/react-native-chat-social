import {
  COLLECTION_CHATS_DEMO,
  DOC_CONVERSATIONS,
} from "../constant/chatContant";
import { UserType } from "../types/UserTypes";
import firestore from "@react-native-firebase/firestore";

export const createConversation = async (user: UserType, desUser: UserType) => {
  const conversationId = user._id + desUser._id;
  const conversation = {
    users: [user, desUser],
    _id: conversationId,
  };

  await firestore()
    .collection(COLLECTION_CHATS_DEMO)
    .doc(DOC_CONVERSATIONS)
    .collection(user._id)
    .doc(conversationId)
    .set(conversation);

  await firestore()
    .collection(COLLECTION_CHATS_DEMO)
    .doc(DOC_CONVERSATIONS)
    .collection(desUser._id)
    .doc(conversationId)
    .set(conversation);
};

export const getUserByConversation = (user: any, users: any) => {
  const data = users.filter((us: any) => us._id !== user._id);
  return data[0] ?? {};
};
