import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function CardProduto({ nome, preco, categoria, imagem }) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imagem }}
        style={styles.imagem}
      />

      <View style={styles.info}>
        <Text style={styles.nome}>{nome}</Text>
 
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
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
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
  nome: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2b0d2e',
    marginBottom: 6,
  },
  preco: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000000',
  },
});
 