import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Navbar, { NeedsUser } from "../components/Navbar"
import { RootStackScreenProps } from "../navigation/Types"
import { user } from "./LoginPage"

const AccountSettings = ()=>{
    return(
        <SafeAreaView>
            <Text>Account Settings page :3</Text>
        </SafeAreaView>
    )
}
export default AccountSettings