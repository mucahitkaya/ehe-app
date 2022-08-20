import { View, StyleSheet, Alert } from "react-native";
import OutlinedButton from "../UI/OutllinedButton";
import { Colors } from "../../constants/color";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useNavigation } from "@react-navigation/native";

function LocationPicker(params) {
  const navigation = useNavigation();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  async function verifyPermissions(params) {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("Location Kullanımına izin verilmedi", "Lutfen izin veriniz");
      return false;
    }
    return true;
  }

  async function getLocationHandler(params) {
    const hadPermission = await verifyPermissions();

    if (!hadPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    // setPickedLocation({
    //     lat:location.coords.latitude,
    //     lng:location.coords.longitude,
    // })
  }

  function pickOnMapHandler(params) {
    navigation.navigate("Map");
  }

  return (
    <View>
      <View style={styles.mapPreview}></View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick On Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
