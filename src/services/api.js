const BASE_URL = "https://api.themoviedb.org/3";

const TOKEN = process.env.EXPO_PUBLIC_TMDB_TOKEN;

const headers = {
    Authorization: `Bearer ${TOKEN}`,
    accept: "application/json",
};

export async function buscarFilmesPopulares() {
    const resposta = await fetch(
        `${BASE_URL}/movie/popular?language=pt-BR&page=1`,
        {
            method: "GET",
            headers,
        }
    );

    if (!resposta.ok) {
        throw new Error("Não foi possível buscar os filmes.");
    }

    const dados = await resposta.json();

    return dados.results;
}

export async function buscarDetalhesFilme(id) {
    const resposta = await fetch(
        `${BASE_URL}/movie/${id}?language=pt-BR`,
        {
            method: "GET",
            headers,
        }
    );

    if (!resposta.ok) {
        throw new Error("Não foi possível buscar os detalhes do filme.");
    }

    return await resposta.json();
}