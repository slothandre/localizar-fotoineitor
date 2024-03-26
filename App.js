import { StatusBar } from "expo-status-bar";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import imagePlaceholder from "./assets/images/placeholder.svg";
import { useEffect, useState } from "react";

export default function App() {
  const [foto, setFoto] = useState(null);

  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  useEffect(() => {
    async function verificaPermissoes() {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      requestPermission(cameraStatus === "granted");
    }

    verificaPermissoes();
  }, []);

  const acessarCamera = async () => {
    const imagem = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!imagem.canceled) {
      await MediaLibrary.saveToLibraryAsync(imagem.assets[0].uri);
      setFoto(imagem.assets[0].uri);
    }
  };

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Text style={styles.titulo}>Localizar Fotoineitor</Text>
        <View style={styles.viewFoto}>
          <TextInput style={styles.input} placeholder="Legenda da foto" />
          {foto ? (
            <Image
              source={{ uri: foto }}
              style={{ width: 300, height: 168.75, marginBottom: 16 }}
            />
          ) : (
            <Image source={imagePlaceholder} style={styles.imagem} />
          )}

          <Button title="Tirar uma foto" onPress={acessarCamera} />
        </View>
      </View>
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
    marginTop: 20,
  },
  viewFoto: {
    marginTop: 30,
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
});
