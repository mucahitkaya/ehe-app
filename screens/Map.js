import MapView, { Marker } from "react-native-maps";
import { Alert, StyleSheet } from "react-native";
import { useCallback, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";

function Map({ navigation }) {
  const [selectedLocation, setLocatedLocation] = useState();

  const region = {
    latitude: 37.78,
    longitude: -122.34,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selecetLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setLocatedLocation({ lat: lat, lng: lng });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("No location picked", "Pick a location by typing on a map");
      return;
    }

    // screen olan sayfalara navgtion prop olarak gelir
    // ve eski sayfalara dönebilmek için aşşağıdaki yöntemi kullanabiliriz
    // addplace de bir sayfadır ve onun yanında o sayfaya paramatre passleyebilirzi
    navigation.navigate("AddPlace ", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  // uselayouteffect ilk defa çaşıltığında bu fonks çaıştırır
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selecetLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}
export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
