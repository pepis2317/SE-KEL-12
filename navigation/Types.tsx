import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TestParams } from "../src/Test";


export type RootStackParamList = {
    Home: undefined,
    Test: TestParams,
    SetupStudyLocation:undefined,
    AccountSettings:undefined,
    PrivacySettings:undefined,
    FindBuddy:undefined,
    RequestNotif:undefined,
    Chats:undefined
}
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}