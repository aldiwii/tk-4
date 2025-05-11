import React, { useState } from "react";
import {
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { getAllPeople } from "../config/database";

export default function List() {
  const [people, setPeople] = useState([]);
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      loadPeople();
    }, [])
  );

  const loadPeople = async () => {
    try {
      const data = await getAllPeople();
      setPeople(data);
    } catch (error) {
      console.error("Error loading people:", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => router.push(`/detail/${item.id}`)}
    >
      <Text style={styles.name}>{item.full_name}</Text>
      {item.city_of_origin && (
        <Text style={styles.city}>From: {item.city_of_origin}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/add")}
      >
        <Text style={styles.addButtonText}>Add New Person</Text>
      </TouchableOpacity>

      <FlatList
        data={people}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No data yet. Add some people!</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
  list: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: "white",
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  city: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#666",
  },
});
