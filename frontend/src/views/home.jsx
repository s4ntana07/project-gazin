import { Helmet } from "react-helmet";

function Home() {
  return (
    <center>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div className="home-page">  
            <section className="home-page">
              <h2>Seja bem-vindo</h2><br />
              <p>
                Esse é o meu novo projeto usando React e Laravel, para
                testar meus conhecimentos sobre essas novas linguagens que aprendi.
              </p> 
              <br />

              <p>
                  Esse é um sistema de Estoque de Produtos, primeiramente você precisa
                  criar uma conta, após isso, você pode ir até a página "Adicionar Produto"
                  localizada no cabeçalho acima, após isso aparecerá um formulario, para que
                  seja efetuada o cadastro do produto que o usuário deseja, é preciso que 
                  todos os campos sejam preenchidos.
              </p> 
              <p>
                  Após isso, clique em "Listar Produtos", e será exibido uma tabela, com todos os 
                  produtos cadastrados, é possível editar,e excluir um produto se necessário. 
              </p>
            </section>
        </div>
    </center>
  );
}

export default Home;