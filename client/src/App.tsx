import './App.css';
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_USERS, GET_ONE_USER } from './query/user';
import { CREATE_USER } from './mutations/user';

const defaultUser = {
  username: '',
  age: 0,
};

function App() {
  const { data, loading, refetch } = useQuery(GET_ALL_USERS);

  const [newUser] = useMutation(CREATE_USER);

  const addUser = (e: any) => {
    e.preventDefault();
    newUser({
      variables: { input: { username: user.username, age: Number(user.age) } },
    })
      .then(({ data: { createUser } }) => {
        setUser(defaultUser);
      })
      .catch((err) => console.log(err));
  };

  const getAll = (e: any) => {
    e.preventDefault();
    refetch();
  };

  const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER, {
    variables: { id: 1 },
  });
  console.log(oneUser);
  

  const [users, setUsers] = useState([]);

  const [user, setUser] = useState(defaultUser);

  const onInputChange = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!loading) setUsers(data.getAllUsers);
  }, [data, loading]);

  return (
    <div>
      <form>
        <input
          name="username"
          value={user.username}
          onChange={onInputChange}
          type="text"
        />
        <input
          name="age"
          value={user.age}
          onChange={onInputChange}
          type="number"
        />
        <div>
          <button onClick={(e) => addUser(e)}>Create</button>
          <button onClick={(e) => getAll(e)}>Get</button>
        </div>
      </form>

      <div>
        {users.map(({ id, username, age }) => (
          <div key={id} className="user">
            {id}. {username} ({age})
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
