import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MapView from "react-native-maps";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/list")}
      >
        <Text style={styles.addButtonText}>Person List</Text>
      </TouchableOpacity>
      <MapView style={styles.map} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  addButton: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
