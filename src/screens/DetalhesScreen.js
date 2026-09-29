import React, { useEffect, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import {View, Text, StyleSheet, Image, ScrollView, ActivityIndicator} from "react-native";
import { buscarDetalhesFilme } from "../services/api";

const URL_IMAGEM = "https://image.tmdb.org/t/p/w500";
const URL_BACKDROP = "https://image.tmdb.org/t/p/w780";

export default function DetalhesScreen({ route }) {
    const { id } = route.params;
    const [filme, setFilme] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    //Quando essa tela abrir, execute carregarDetalhes().
    useEffect(() => 
        {carregarDetalhes();
    }, []);

    async function carregarDetalhes() {
        try {
            setCarregando(true);
            const dados = await buscarDetalhesFilme(id);
            setFilme(dados);

        } catch (error) {
            console.log(error);
            setErro("Não foi possível carregar os detalhes.");

        } finally {
            setCarregando(false);
        }
    }

    if (carregando) {
        return (
            <View style={styles.centralizado}>
                <ActivityIndicator
                    size="large"
                    color="#7C4DFF"
                />

                <Text style={styles.carregando}>
                    Carregando detalhes...
                </Text>
            </View>
        );
    }

    if (erro) {
        return (
            <View style={styles.centralizado}>
                <Text style={styles.erro}>
                    {erro}
                </Text>
            </View>
        );
    }

    if (!filme) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {filme.backdrop_path && (
                    <Image
                        source={{
                            uri: `${URL_BACKDROP}${filme.backdrop_path}`,
                        }}
                        style={styles.backdrop}
                    />
                )}

                <View style={styles.conteudo}>
                    <Image
                        source={{
                            uri: `${URL_IMAGEM}${filme.poster_path}`,
                        }}
                        style={styles.poster}
                    />

                    <Text style={styles.titulo}>
                        {filme.title}
                    </Text>

                    {filme.original_title !==
                        filme.title && (
                        <Text style={styles.tituloOriginal}>
                            Título original:{" "}
                            {filme.original_title}
                        </Text>
                    )}

                    <View style={styles.informacoes}>
                        <Text style={styles.informacao}>
                             Lançamento:{" "}
                            {filme.release_date || "Não informado"}
                         </Text>

                        <Text style={styles.informacao}>
                             Avaliação:{" "}
                            {filme.vote_average ? filme.vote_average.toFixed(1): "Sem avaliação"}
                        </Text>

                        <Text style={styles.informacao}>
                             Votos: {filme.vote_count}
                        </Text>

                        {/* Duração do filme */}
                        <Text style={styles.informacao}>
                             Duração:{" "}
                            {filme.runtime ? `${filme.runtime} minutos`: "Não informado"}
                        </Text>

                        <Text style={styles.informacao}>
                              Idioma original:{" "} {filme.original_language}
                        </Text>
                    </View>

                    <Text style={styles.tituloSecao}>
                        Gêneros
                    </Text>

                    {/* Lista de gêneros */}
                    <View style={styles.generos}>
                        {filme.genres &&
                            filme.genres.map((genero) => (
                                <View
                                    key={genero.id}
                                    style={styles.genero}
                                >
                                    <Text
                                        style={
                                            styles.textoGenero
                                        }>
                                        {genero.name}
                                    </Text>
                                </View>
                            ))}
                    </View>

                    {/* Título da seção de sinopse */}
                    <Text style={styles.tituloSecao}>
                        Sinopse
                    </Text>

                    <Text style={styles.sinopse}>
                        {filme.overview ||"Sinopse não disponível."}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// Estilo da tela
const styles = StyleSheet.create({
    // Tela principal
    container: {
        flex: 1,
        backgroundColor: "#100B1F",
    },
// Imagem grande de fundo
    backdrop: {
        width: "100%",
        height: 220,
    },
// Área que contém as informações
    conteudo: {
        padding: 20,
        alignItems: "center",
    },
//Poster do filme
    poster: {
        width: 180,
        height: 270,
        borderRadius: 15,
        marginTop: -80,
        marginBottom: 20,
    },
//Tíyulo do filme
    titulo: {
        color: "#FFFFFF",
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 8,
    },

//Caixa das informações 
    informacoes: {
        width: "100%",
        backgroundColor: "#211832",
        padding: 18,
        borderRadius: 15,
        marginBottom: 25,
    },
//Coloca cor nas letras abaixo no título do filme
    informacao: {
        color: "#E8E0F0",
        fontSize: 15,
        marginBottom: 10,
    },
//Titulos da seção
    tituloSecao: {
        width: "100%",
        color: "#FFFFFF",
        fontSize: 21,
        fontWeight: "bold",
        marginBottom: 12,
    },
//Separação dos generos 
    generos: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 25,
    },
//Genero individual
    genero: {
        backgroundColor: "#7C4DFF",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },
//Texto dentro da area individual
    textoGenero: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },

    sinopse: {
        width: "100%",
        color: "#D5CDE0",
        fontSize: 16,
        lineHeight: 25,
        paddingBottom: 30,
    },
// Tela utilizada durante carregamento ou erro
    centralizado: {
        flex: 1,
        backgroundColor: "#100B1F",
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
    },
// Texto "Carregando detalhes..."
    carregando: {
        color: "#FFFFFF",
        marginTop: 15,
        fontSize: 16,
    },
});