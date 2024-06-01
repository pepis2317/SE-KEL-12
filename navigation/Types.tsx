import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ChatParams } from "../src/Chat";
import { sendRequestParams } from "../src/SendRequest";
import { RequestParams } from "../src/Request";
import { findParams } from "../src/FindBuddy";



export type RootStackParamList = {
    RegisterPage:undefined,
    LoginPage:undefined,
    Home: undefined,
    Chat: ChatParams,
    SetupStudyLocation:undefined,
    AccountSettings:undefined,
    PrivacySettings:undefined,
    FindBuddy:findParams,
    RequestNotif:undefined,
    Chats:undefined,
    Request: RequestParams,
    SendRequest: sendRequestParams,
    SelectFindingMethod: undefined,
}
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}