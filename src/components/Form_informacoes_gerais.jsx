const Form_informacoes_gerais = () => {
    return (
        <form className="form-direita">
            <div>
                <label htmlFor="qtd_discos">Quantidade de discos:</label>
                <input 
                    type="text" 
                    name="qtd_discos" 
                    value="100"
                    disabled
                />
            </div>

            <div>
                <label htmlFor="qtd_discos_artistas_nacionais">Discos de artistas nacionais:</label>
                <input 
                    type="text" 
                    name="qtd_discos_artistas_nacionais" 
                    value="50"
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="qtd_discos_artistas_internacionais">Discos de artistas internacionais:</label>
                <input 
                    type="text" 
                    name="qtd_discos_artistas_internacionais" 
                    value="50"
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="qtd_discos_simples">Quantidade de discos simples:</label>
                <input 
                    type="text" 
                    name="qtd_discos_simples" 
                    value="75"
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="qtd_discos_duplos">Quantidade de discos duplos:</label>
                <input 
                    type="text" 
                    name="qtd_discos_duplos" 
                    value="20"
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="qtd_discos_triplos">Quantidade de discos triplos:</label>
                <input 
                    type="text" 
                    name="qtd_discos_triplos" 
                    value="5"
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="decada_50">Década de 50:</label>
                <input 
                    type="text" 
                    name="decada_50" 
                    value="5"
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="decada_60">Década de 60:</label>
                <input 
                    type="text" 
                    name="decada_60" 
                    value="5"
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="decada_70">Década de 70:</label>
                <input 
                    type="text" 
                    name="decada_70" 
                    value="5"
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="decada_80">Década de 80:</label>
                <input 
                    type="text" 
                    name="decada_80" 
                    value="5"
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="decada_90">Década de 90:</label>
                <input 
                    type="text" 
                    name="decada_90" 
                    value="5"
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="anos_2000">Anos 2000:</label>
                <input 
                    type="text" 
                    name="anos_2000" 
                    value="5"
                    disabled
                />
            </div>
            
        </form>
    )
}

export default Form_informacoes_gerais;