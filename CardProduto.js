import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function CardProduto({ nome, preco, categoria, imagem }) {
  return (
    <View style={styles.card}>
      {/* A imagem ocupa a parte superior do card */}
      <Image
        source={{ uri: imagem }}
        style={styles.imagem}
        resizeMode="cover"
      />
 
      {/* Bloco de informações do produto */}
      <View style={styles.info}>
        <Text style={styles.nome}>{nome}</Text>
 
        {/* Badge colorido indicando a categoria */}
        <View style={styles.badgeCategoria}>
          <Text style={styles.textCategoria}>{categoria}</Text>
        </View>
 
        <Text style={styles.preco}>R$ {preco.toFixed(2)}</Text>
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    // Sombra para Android
    elevation: 4,
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  imagem: {
    width: '100%',
    height: 180,
    backgroundColor: '#F0F4E8',
  },
  info: {
    padding: 14,
  },
  nome: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2E0D',
    marginBottom: 6,
  },
  badgeCategoria: {
    alignSelf: 'flex-start',
    backgroundColor: '#D4EDDA',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 8,
  },
  textCategoria: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D6A4F',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  preco: {
    fontSize: 20,
    fontWeight: '800',
    color: '#3A7D44',
  },
});
 