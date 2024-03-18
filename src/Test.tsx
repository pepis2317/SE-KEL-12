import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { RootStackScreenProps } from "../navigation/Types"
import Navbar, { NeedsUser } from "../components/Navbar"

export type TestParams={
    userID: string
}

const Test = ({route}:RootStackScreenProps<'Test'>)=>{
    return(
        <SafeAreaView>
            <Text>chat page for {route.params.userID} nigga</Text>
        </SafeAreaView>
    )
}
export default Test