import firestore from "@react-native-firebase/firestore";
import {
  COLLECTION_CHATS_DEMO,
  COLLECTION_USERS,
  DOC_CONVERSATIONS,
  DOC_USER,
} from "./chatConstant";

const firebase = firestore();
const collectionChatDemo = firebase.collection(COLLECTION_CHATS_DEMO);

const docConversation = collectionChatDemo.doc(DOC_CONVERSATIONS);
const docUser = collectionChatDemo.doc(DOC_USER);

const collectionUsers = docUser.collection(COLLECTION_USERS);

export { collectionChatDemo, docConversation, collectionUsers };
