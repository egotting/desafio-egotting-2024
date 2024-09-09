class RecintosZoo {

    constructor(){
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];

        this.animaisInfo = {
            'LEAO': { tamanho: 3, bioma: ['savana'] },
            'LEOPARDO': { tamanho: 2, bioma: ['savana'] },
            'CROCODILO': { tamanho: 3, bioma: ['rio'] },
            'MACACO': { tamanho: 1, bioma: ['savana', 'floresta'] },
            'GAZELA': { tamanho: 2, bioma: ['savana'] },
            'HIPOPOTAMO': { tamanho: 4, bioma: ['savana', 'rio'] }
        };
    }

    analisaRecintos(animal, quantidade) {

        if(!this.animaisInfo[animal]){
            return {erro: "Animal inválido"}
        };

        if(quantidade <= 0 || !Number.isInteger(quantidade)){
            return {erro: "É Preciso passar a quantidade de animais"}
        };

        const {tamanho, bioma} = this.animaisInfo[animal];
        const recintosViaveis = [];


        this.recintos.forEach(recinto => {
            const espacoOcupado = recinto.animais.reduce((sum, a) => sum + (a.quantidade * this.animaisInfo[a.especie].tamanho), 0);
            const espacoLivre = recinto.tamanhoTotal - espacoOcupado;
            const biomaCompativel = bioma.includes(recinto.bioma) || (recinto.bioma == 'savana e rio' && bioma.length > 1);
            const espacoNecessario = (quantidade * tamanho)+ (recinto.animais.length > 0 ? 1 : 0);

            if(biomaCompativel && espacoLivre >= espacoNecessario){
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre  - espacoNecessario} total: ${recinto.tamanhoTotal})`);
            }
        });

        if(!recintosViaveis.length > 0){
            return {erro: "Não foi achado recinto viavel para esta especie"};
        }

        return {recintosViaveis};    
    }
}

export { RecintosZoo as RecintosZoo };
