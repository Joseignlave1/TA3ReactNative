import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, Button} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [titulo, setTitulo] = useState("");
  const [peliculaEncontrada, setPeliculaEncontrada] = useState<Movie | null>(null);


  interface Movie  {
    Poster: string;
    Title: string;
    Plot: string;
    // Add other properties you may need from the API response
  }
  const handleSearch = () => {
    getMovies();
  }
  const getMovies = async () => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?t=${titulo}&apikey=97e09dca`
      );
      if (!response.ok) throw new Error("La película no se encuentra.");

      const jsonResponse = await response.json();
      setPeliculaEncontrada(jsonResponse);
    } catch (error) {
      setPeliculaEncontrada(null);
    }
  };



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView edges={["top"]}>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Busca tu película favorita"
              value={titulo}
              onChangeText={setTitulo}
            />
            <Button 
            title="Busca tu pelicula"
            onPress={handleSearch}
            />
            {peliculaEncontrada ? (
              <View style={styles.container}>
                <Image 
                source ={{uri: peliculaEncontrada.Poster}}
                width={300}
                height={300}
                />
                <Text style={styles.text}>{peliculaEncontrada.Title}</Text>
                <Text>{peliculaEncontrada.Plot}</Text>
              </View>
            ) : (
              <Text>No se encontró la pelìcula`</Text>
            )}
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  text: {
    margin: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
});
