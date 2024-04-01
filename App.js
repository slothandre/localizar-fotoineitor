import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useEffect, useState } from "react";

import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import imagePlaceholder from "./assets/images/placeholder.svg";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/screen/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: "#FFF" },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titulo: {
    fontSize: 24,
    marginTop: 50,
  },
  viewFoto: {
    marginTop: 25,
    marginBottom: 16,
  },
  input: {
    width: 300,
    borderColor: "#000",
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
  },
  imagem: {
    width: 300,
    height: 168.75,
    marginBottom: 16,
  },
  viewMapa: {},
  mapa: {
    width: 300,
    height: 168.75,
    marginBottom: 16,
  },
});
