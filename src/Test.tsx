import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { RootStackScreenProps } from "../navigation/Types"

export type TestParams={
    userID: string
}

const Test = ({route}:RootStackScreenProps<'Test'>)=>{
    return(
        <SafeAreaView>
            <Text>chat page for {route.params.userID}</Text>
        </SafeAreaView>
    )
}
export default Test