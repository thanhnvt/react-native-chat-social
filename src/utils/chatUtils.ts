import { collectionUsers, docConversation } from "../constant/fireStore";
import { UserType } from "../types/UserTypes";

export const createConversation = async (user: UserType, desUser: UserType) => {
  const conversationId = user._id + desUser._id;
  const conversation = {
    users: [user, desUser],
    _id: conversationId,
  };

  await docConversation
    .collection(user._id + "")
    .doc(conversationId)
    .set(conversation);

  await docConversation
    .collection(desUser._id + "")
    .doc(conversationId)
    .set(conversation);

  const currentUserRef = await collectionUsers.doc(user._id + "");
  const currentUserData = (await currentUserRef.get()).data();

  await currentUserRef.update({
    connects: currentUserData?.connects
      ? [...currentUserData?.connects, desUser._id]
      : [desUser._id],
  });

  const currentDesUserRef = await collectionUsers.doc(desUser._id + "");
  const currentDesUserData = (await currentDesUserRef.get()).data();

  await currentDesUserRef.update({
    connects: currentDesUserData?.connects
      ? [...currentDesUserData?.connects, user._id]
      : [user._id],
  });
};

export const registerUser = async (id: string, user: UserType) => {
  await collectionUsers.doc(id).set(user);
};

export const getUserByConversation = (user: any, users: any) => {
  const data = users.filter((us: any) => us._id !== user._id);
  return data[0] ?? {};
};

export const getUserDetail = async (userId: string) => {
  return (await collectionUsers.doc(userId).get()).data();
};
