import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker } from "react-native-maps";

export default function Salvos() {
  const [listaLocais, setListaLocais] = useState([]);
  useEffect(() => {
    const carregarLocais = async () => {
      try {
        const dados = await AsyncStorage.getItem("@lugaresvisitados");
        if (dados) {
          setListaLocais(JSON.parse(dados));
        }
      } catch (error) {
        console.error("Erro ao carregar os dados: " + error);
        Alert.alert("Erro", "Erro ao carregar os dados.");
      }
    };
    carregarLocais();
  }, []);
  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Text>Locais Salvos</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {listaLocais.map((local, index) => {
            const regiaoInicialMapa = {
              latitude: local.localizacao.latitude,
              longitude: local.localizacao.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.02,
            };

            return (
              <View key={index} style={styles.viewLista}>
                <Text>{local.nomeFoto}</Text>
                {local.foto ? (
                  <Image
                    source={{ uri: local.foto }}
                    style={{ width: 300, height: 168.75 }}
                  />
                ) : (
                  <Text>Imagem não encontrada</Text>
                )}
                <Text>Localização</Text>
                <MapView
                  mapType="hybrid"
                  region={regiaoInicialMapa}
                  style={{ width: 300, height: 168.75 }}
                >
                  <Marker coordinate={regiaoInicialMapa} />
                </MapView>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  viewLista: {
    padding: 16,
    borderColor: "#000",
    borderWidth: 1,
    marginTop: 20,
  },
});
