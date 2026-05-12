import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar,} from 'react-native';
import CardProduto from './CardProduto';

const todosProdutos = [
  // ✅ VÁLIDOS
  {
    nome: 'Maçã Fuji',
    preco: 7.99,
    categoria: 'Frutas',
    imagem: '',
  },
  {
    nome: 'Banana Prata',
    preco: 4.5,
    categoria: 'Frutas',
    imagem: '',
  },
  {
    nome: 'Cenoura',
    preco: 3.2,
    categoria: 'Legumes',
    imagem: '',
  },
  {
    nome: 'Chuchu',
    preco: 2.8,
    categoria: 'Legumes',
    imagem: '',
  },
  {
    nome: 'Alface Crespa',
    preco: 2.5,
    categoria: 'Verduras',
    imagem: '',
  },
  {
    nome: 'Espinafre',
    preco: 3.9,
    categoria: 'Verduras',
    imagem: '',
  },
  {
    nome: 'Manga Palmer',
    preco: 6.0,
    categoria: 'Frutas',
    imagem: '',
  },
  {
    nome: 'Rúcula',
    preco: 3.1,
    categoria: 'Verduras',
    imagem: '',
  },
 
  // ❌ INVÁLIDOS — serão filtrados pelo Filtro de Integridade
  {
    nome: 'Ab',           // ❌ Nome muito curto (menos de 3 caracteres)
    preco: 5.0,
    categoria: 'Frutas',
    imagem: '',
  },
  {
    nome: 'Batata Doce',
    preco: -1.5,          // ❌ Preço negativo (não é maior que zero)
    categoria: 'Legumes',
    imagem: '',
  },
  {
    nome: 'Pimenta',
    preco: 4.0,
    categoria: 'Condimentos', // ❌ Categoria inválida (não é Frutas, Legumes ou Verduras)
    imagem: '',
  },
  {
    nome: 'Uva Verde',
    preco: 8.0,
    categoria: 'Frutas',
    imagem: null,             // ❌ Sem imagem
  },
];
 
// ─────────────────────────────────────────────────────────────
// FILTRO DE INTEGRIDADE — Camada de Validação
// Retorna null para itens que não cumprem os critérios.
// O .map() renderiza null como nada na tela.
// ─────────────────────────────────────────────────────────────
function itemEhValido(produto) {
  const categoriasPermitidas = ['Frutas', 'Legumes', 'Verduras'];
 
  // 1. Nome deve ter pelo menos 3 caracteres
  if (!produto.nome || produto.nome.trim().length < 3) return false;
 
  // 2. Preço deve ser um número maior que zero
  if (typeof produto.preco !== 'number' || produto.preco <= 0) return false;
 
  // 3. Categoria deve ser uma das três permitidas
  if (!categoriasPermitidas.includes(produto.categoria)) return false;
 
  // 4. Imagem deve existir
  if (!produto.imagem) return false;
 
  return true;
}
 
// ─────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────
export default function App() {
  // useState controla qual categoria está ativa no momento
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
 
  const categorias = ['Todos', 'Frutas', 'Legumes', 'Verduras'];
 
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2D6A4F" />
 
      {/* ── CABEÇALHO ── */}
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>🛒</Text>
        <Text style={styles.headerTitulo}>Hortifruti</Text>
        <Text style={styles.headerSubtitulo}>Catálogo Digital</Text>
      </View>
 
      {/* ── BOTÕES DE FILTRO POR CATEGORIA ── */}
      <View style={styles.filtros}>
        {categorias.map((cat) => (
          <TouchableOpacity
            key={cat}
            // Ao clicar, o estado da categoria ativa é atualizado
            onPress={() => setCategoriaAtiva(cat)}
            style={[
              styles.botaoFiltro,
              // Se a categoria do botão é a ativa, aplica estilo diferente
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
 
      {/* ── LISTA DE PRODUTOS ──
          Usamos ScrollView + .map() conforme especificado.
          ScrollView permite scroll na lista de conteúdo.
          FlatList NÃO é utilizada (conforme proibição do projeto).
      ── */}
      <ScrollView
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      >
        {todosProdutos.map((produto, index) => {
          // PASSO 1 — Filtro de Integridade: valida os dados do produto
          if (!itemEhValido(produto)) return null;
 
          // PASSO 2 — Filtro de Categoria: verifica se pertence à categoria ativa
          if (categoriaAtiva !== 'Todos' && produto.categoria !== categoriaAtiva) {
            return null;
          }
 
          // PASSO 3 — Se passou nas duas verificações, renderiza o CardProduto
          // Os dados são passados ao componente filho via Props
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
 
        {/* Espaço no final da lista para não cortar o último card */}
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
 
// ─────────────────────────────────────────────────────────────
// ESTILOS
// ─────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7F2',
  },
  header: {
    backgroundColor: '#2D6A4F',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  headerTitulo: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  headerSubtitulo: {
    fontSize: 13,
    color: '#B7E4C7',
    fontWeight: '400',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 2,
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
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#C8D8C0',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  botaoFiltroAtivo: {
    backgroundColor: '#2D6A4F',
    borderColor: '#2D6A4F',
  },
  textoBotao: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5A7A62',
  },
  textoBotaoAtivo: {
    color: '#FFFFFF',
  },
  lista: {
    paddingTop: 12,
  },
});
 

