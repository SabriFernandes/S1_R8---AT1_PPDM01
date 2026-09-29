import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'; // Evita que as informações fique atras da tela. 

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.conteudo}>
                {/* Imagem que é mostrada na tela inicial sendo um emoji */}
                <Text style={styles.emoji}>🎬</Text> 
                <Text style={styles.titulo}>Mundo dos Filmes</Text>
                <Text style={styles.subtitulo}>
                    Consulte filmes, veja suas avaliações,
                    datas de lançamento e muito mais.
                </Text>

            {/* Botão para apertar e ir para a tela de filmes populares */}
                <TouchableOpacity style={styles.botao}onPress={() => navigation.navigate("Filmes")}>
                    <Text style={styles.textoBotao}>Ver filmes populares</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// StyleSheet reúne todos os estilos utilizados na tela
const styles = StyleSheet.create({

    // Estilo principal da tela
    container: {
        flex: 1,
        backgroundColor: "#100B1F",
    },

    // Estilo do container que guarda o conteúdo
    conteudo: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
    },

    // Estilo do emoji
    emoji: {
        fontSize: 70,
        marginBottom: 20,
    },

    // Estilo do título
    titulo: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 15,
    },

    // Estilo do texto de descrição
    subtitulo: {
        fontSize: 18,
        color: "#E8DFFF",
        textAlign: "center",
        lineHeight: 25,
        marginBottom: 25,
    },

    //Estilo do botão
    botao: {
        backgroundColor: "#7C4DFF",
        paddingVertical: 16,
        paddingHorizontal: 35,
        borderRadius: 19,
    },

    // Estilo do texto que fica dentro do botão
    textoBotao: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});