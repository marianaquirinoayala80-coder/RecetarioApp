import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

export function RegisterScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Text style={styles.title}>Crear cuenta</Text>

        <TextInput
          placeholder="Correo electrónico"
          placeholderTextColor="#a0a0a0"
          keyboardType="email-address"
          style={styles.input}
        />

        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#a0a0a0"
          secureTextEntry
          style={styles.input}
        />

        <TextInput
          placeholder="Confirmar contraseña"
          placeholderTextColor="#a0a0a0"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity activeOpacity={0.8} style={styles.registerButton}>
          <Text style={styles.registerText}>Crear cuenta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('LoginScreen')}
          style={styles.link}
        >
          <Text style={styles.linkText}>
            ¿Ya tienes cuenta?{' '}
            <Text style={styles.linkHighlight}>Inicia sesión</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f0f0f' },
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 28 },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 28,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#2b2b2b',
  },
  registerButton: {
    backgroundColor: '#00b300',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 8,
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  link: { marginTop: 24, alignItems: 'center' },
  linkText: { color: '#bfbfbf' },
  linkHighlight: { color: '#00b300', fontWeight: '600' },
});
