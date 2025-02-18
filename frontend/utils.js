
const Utils = {
    convertStringToFirstAndLast: (bigString) => {
        // essa função serve para pegar a primeira e a última palavra de uma string
        const palavras = bigString.split(' ');
        if (palavras.length > 1) {
            return `${palavras[0]} ${palavras[palavras.length - 1]}`;
        } else {
            return bigString;
        }
    },
    getInfoUsuarioREQ: () => {
        const userLogado = JSON.parse(localStorage.getItem('userLogado'));
        return {
            id: userLogado.id,
            token: userLogado.token
        }
    }
}

export default Utils;