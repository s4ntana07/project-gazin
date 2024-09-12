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
              <p>Esse é o meu novo projeto usando React e Laravel, para
                testar meus conhecimentos sobre essas novas linguagens que aprendi.

                Aqui você pode ver os usuários que estão cadastrados, editar,
                deletar, e até cadastrar um novo usuário.
              </p>
            </section>
        </div>
    </center>
  );
}

export default Home;