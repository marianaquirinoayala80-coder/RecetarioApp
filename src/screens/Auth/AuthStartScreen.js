import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

export function AuthStartScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../../assets/welcome.png')}  
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {/* Contenedor inferior con botones */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.loginButton}
              onPress={() => navigation.navigate('LoginScreen')}
            >
              <Text style={styles.loginText}>Iniciar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.registerButton}
              onPress={() => navigation.navigate('RegisterScreen')}
            >
              <Text style={styles.registerText}>Registrarse</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end', // botones al fondo
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)', // leve oscurecido si quieres destacar los botones
  },
  buttonsContainer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  loginButton: {
    backgroundColor: '#00b300', // verde
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  registerButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  registerText: {
    color: '#00b300',
    fontSize: 16,
    fontWeight: '700',
  },
});