import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar,} from 'react-native';
import CardProduto from './CardProduto';

const todosProdutos = [

  {
    nome: 'Goiaba',
    preco: 7.00,
    categoria: 'Frutas',
    imagem: 'https://img.cdndsgni.com/preview/11842278.jpg',
  },
  {
    nome: 'Banana',
    preco: 4.50,
    categoria: 'Frutas',
    imagem: 'https://png.pngtree.com/png-clipart/20220716/ourmid/pngtree-banana-yellow-fruit-banana-skewers-png-image_5944324.png',
  },
  {
    nome: 'Cenoura',
    preco: 3.20,
    categoria: 'Legumes',
    imagem: 'https://static.vecteezy.com/system/resources/thumbnails/020/943/780/small/three-fresh-orange-carrots-isolated-with-clipping-path-and-shadow-in-file-format-close-up-of-healthy-vegetable-root-with-full-focus-png.png',
  },
  {
    nome: 'Abóbora',
    preco: 2.80,
    imagem: 'https://static.vecteezy.com/system/resources/thumbnails/026/772/936/small/halloween-pumpkin-with-ai-generated-free-png.png',
  },
  {
    nome: 'Alface',
    preco: 2.50,
    categoria: 'Verduras',
    imagem: 'https://png.pngtree.com/png-vector/20250219/ourmid/pngtree-bright-green-curly-lettuce-illustration-png-image_15524635.png',
  },
  {
    nome: 'Espinafre',
    preco: 3.90,
    categoria: 'Verduras',
    imagem: 'https://static.vecteezy.com/system/resources/previews/045/808/083/non_2x/a-bunch-of-green-spinach-vegetables-isolated-on-a-transparent-background-free-png.png',
  },
  {
    nome: 'Manga',
    preco: 6.00,
    categoria: 'Frutas',
    imagem: 'https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-mango-cut-in-half-png-image_10215981.png',
  },

];
 
function itemEValido(produto) {
  const categoriasPermitidas = ['Frutas', 'Legumes', 'Verduras'];
 
  if (!produto.nome || produto.nome.trim().length < 3) return false;
 
  if (typeof produto.preco !== 'number' || produto.preco <= 0) return false;

  if (!categoriasPermitidas.includes(produto.categoria)) return false;
 
  return true;
}
 
export default function App() {

  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
 
  const categorias = ['Todos', 'Frutas', 'Legumes', 'Verduras'];
 
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6a2d2d" />
 
      <View style={styles.header}>
        <Text style={styles.titulo}>Hortifruti</Text>
      </View>
 
      <View style={styles.filtros}>
        {categorias.map((cat) => (
          <TouchableOpacity
            key={cat}

            onPress={() => setCategoriaAtiva(cat)}
            style={[
              styles.botaoFiltro,

              categoriaAtiva === cat && styles.botaoFiltroAtivo,
            ]}
          >
            <Text
              style={[
                styles.textoBotao,
                categoriaAtiva === cat && styles.textoBotaoAtivo,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      >
        {todosProdutos.map((produto, index) => {

          if (!itemEValido(produto)) return null;
 

          if (categoriaAtiva !== 'Todos' && produto.categoria !== categoriaAtiva) {
            return null;
          }
 
          return (
            <CardProduto
              key={index}
              nome={produto.nome}
              preco={produto.preco}
              categoria={produto.categoria}
              imagem={produto.imagem}
            />
          );
        })}
 
        <View style={{ height: 24 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#6a2d2d',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  filtros: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E8EDE4',
  },
  botaoFiltro: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: '#C8D8C0',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  botaoFiltroAtivo: {
    backgroundColor: '#6a2d2d',
    borderColor: '#050505',
  },
  textoBotao: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7a645a',
  },
  textoBotaoAtivo: {
    color: 'white',
  },
  lista: {
    paddingTop: 12,
  },
});
 
