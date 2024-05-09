import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Navbar, { NeedsUser } from "../components/Navbar"
import Map from '../components/Map'
const FindBuddy = ()=>{
    return(
        <SafeAreaView>
            <Text>Find Study Buddy page :3</Text>
            <Map/>
        </SafeAreaView>
    )
}
export default FindBuddy