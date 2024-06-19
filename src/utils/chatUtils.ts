import { collectionUsers, docConversation } from "../constant/fireStore";
import { UserType } from "../types/UserTypes";

export const createConversation = async (user: UserType, desUser: UserType) => {
  console.log("createConversation", user, desUser);

  const conversationId = user._id + desUser._id;
  const conversation = {
    users: [user, desUser],
    _id: conversationId,
  };
  await docConversation
    .collection(user._id+"")
    .doc(conversationId)
    .set(conversation);
  await docConversation
    .collection(desUser._id+"")
    .doc(conversationId)
    .set(conversation);
};

export const registerUser = async (id: string, user: UserType) => {
  await collectionUsers.doc(id).set(user);
};

export const getUserByConversation = (user: any, users: any) => {
  const data = users.filter((us: any) => us._id !== user._id);
  return data[0] ?? {};
};
