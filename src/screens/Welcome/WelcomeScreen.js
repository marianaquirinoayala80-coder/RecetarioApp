import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen({ navigation }) {
  const goIn = () => {
    navigation.replace("Main");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Recetario</Text>
        <Text style={styles.subtitle}>
          Bienvenido a mi aplicación de recetario donde podrás descubrir deliciosas recetas de cocina y prepararlas en casa.
        </Text>

        <TouchableOpacity style={styles.btn} onPress={goIn} activeOpacity={0.9}>
          <Text style={styles.btnText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#E8F5E9" },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
  },
  subtitle: {
    color: "#4F4F4F",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  btn: {
    backgroundColor: "#2E7D32",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
    elevation: 2,
  },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
