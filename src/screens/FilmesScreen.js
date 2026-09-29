import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { buscarFilmesPopulares } from "../services/api";

const URL_IMAGEM = "https://image.tmdb.org/t/p/w500";

export default function FilmesScreen({ navigation }) {
    const [filmes, setFilmes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        carregarFilmes();
    }, []);

    async function carregarFilmes() {
        try {
            setCarregando(true);
            setErro("");

            const dados = await buscarFilmesPopulares();

            setFilmes(dados);
        } catch (error) {
            console.log(error);
            setErro("Não foi possível carregar os filmes.");
        } finally {
            setCarregando(false);
        }
    }

    function renderizarFilme({ item }) {
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() =>
                    navigation.navigate("Detalhes", {
                        id: item.id,
                    })
                }
            >
                <Image
                    source={{
                        uri: `${URL_IMAGEM}${item.poster_path}`,
                    }}
                    style={styles.poster}
                />

                <View style={styles.informacoes}>
                    <Text style={styles.titulo} numberOfLines={2}>
                        {item.title}
                    </Text>

                    <Text style={styles.informacao}>
                         Lançamento:{" "}
                        {item.release_date || "Não informado"}
                    </Text>

                    <Text style={styles.informacao}>
                         Nota:{" "}
                        {item.vote_average
                            ? item.vote_average.toFixed(1)
                            : "Sem nota"}
                    </Text>

                    <Text style={styles.informacao}>
                         Votos: {item.vote_count}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    if (carregando) {
        return (
            <View style={styles.centralizado}>
                <ActivityIndicator
                    size="large"
                    color="#7C4DFF"
                />

                <Text style={styles.carregando}>
                    Carregando filmes...
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

                <TouchableOpacity
                    style={styles.botao}
                    onPress={carregarFilmes}
                >
                    <Text style={styles.textoBotao}>
                        Tentar novamente
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cabecalho}>
                <Text style={styles.tituloPagina}>
                    Filmes Populares
                </Text>

                <Text style={styles.subtitulo}>
                    Filmes obtidos através da API TMDB
                </Text>
            </View>

            <FlatList
                data={filmes}
                keyExtractor={(item) =>
                    item.id.toString()
                }
                renderItem={renderizarFilme}
                contentContainerStyle={styles.lista}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#100B1F",
    },

    cabecalho: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },

    tituloPagina: {
        color: "#FFFFFF",
        fontSize: 28,
        fontWeight: "bold",
    },

    subtitulo: {
        color: "#B9AEC9",
        fontSize: 14,
        marginTop: 5,
    },

    lista: {
        padding: 15,
    },

    card: {
        flexDirection: "row",
        backgroundColor: "#211832",
        borderRadius: 15,
        padding: 12,
        marginBottom: 15,
    },

    poster: {
        width: 95,
        height: 140,
        borderRadius: 10,
    },

    informacoes: {
        flex: 1,
        paddingLeft: 15,
        justifyContent: "center",
    },

    titulo: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },

    informacao: {
        color: "#D5CDE0",
        fontSize: 14,
        marginBottom: 7,
    },

    centralizado: {
        flex: 1,
        backgroundColor: "#100B1F",
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
    },

    carregando: {
        color: "#FFFFFF",
        marginTop: 15,
        fontSize: 16,
    },

    erro: {
        color: "#FFFFFF",
        fontSize: 17,
        textAlign: "center",
        marginBottom: 20,
    },

    botao: {
        backgroundColor: "#7C4DFF",
        paddingHorizontal: 25,
        paddingVertical: 14,
        borderRadius: 10,
    },

    textoBotao: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});