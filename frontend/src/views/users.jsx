import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { Helmet } from "react-helmet";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); //armazenar o texto da pesquisa

  useEffect(() => {
    getUsers();
  }, []);

  const onDeleteClick = user => {
    if (!window.confirm("Você tem certeza que deseja deletar este usuário?")) {
      return;
    }
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        getUsers();
      });
  };

  const getUsers = () => {
    setLoading(true);
    axiosClient.get('/users')
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  //filtra os usuários conforme o texto da pesquisa
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <center>
      <div>
        <Helmet>
          <title>Usuários</title>
        </Helmet>

        <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
          <p> </p>
          <Link className="btn-add" to="/users/new">Add new</Link>
        </div>
        <h1 className="h1">Users</h1>
        <div>
          <input
            className="input-busca"
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="card animated fadeInDown">
          <table id="tabela">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            {loading &&
              <tbody>
                <tr>
                  <td colSpan="4" className="text-center">
                    Loading...
                  </td>
                </tr>
              </tbody>
            }
            {!loading &&
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map(u => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                        &nbsp;
                        <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            }
          </table>
        </div>
      </div>
    </center>
  );
}