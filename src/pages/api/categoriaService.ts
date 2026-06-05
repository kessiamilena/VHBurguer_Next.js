import { api } from "./api";

export async function cadastrarCategoria(nome: string) {
    try {
        await api.post("Categoria", { nome });
        // console.log("eba deu certo 🤗")
    } catch (error: any) {
        // console.log(error.response.data)
        throw new Error(error.response.data);
    }
}

export async function listarCategoria() {
    try {
        const response = await api.get("Categoria");
        return response;
    } catch (error: any) {
        throw new Error(error.response.data);
    }
}