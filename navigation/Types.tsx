import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ChatParams } from "../src/Chat";



export type RootStackParamList = {
    RegisterPage:undefined,
    LoginPage:undefined,
    Home: undefined,
    Chat: ChatParams,
    SetupStudyLocation:undefined,
    AccountSettings:undefined,
    PrivacySettings:undefined,
    FindBuddy:undefined,
    RequestNotif:undefined,
    Chats:undefined,
    Request: ChatParams
}
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}