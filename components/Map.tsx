import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 
import Marker from 'react-native-maps'

const Map = () => {
    return (
        <MapView style={{
            width: '100%',
            height: '100%',
        }}
            initialRegion={{
                latitude: -6.22293421633117,
                longitude: 106.64898499810106,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}>



        </MapView>
    )
}
export default Map