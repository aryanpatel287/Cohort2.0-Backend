import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios
            .get('/data')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            <h1>Users</h1>
            <list>
                {data &&
                    data.users.map((user) => (
                        <li key={user.id}>
                            {user.id}: {user.name}
                        </li>
                    ))}
            </list>
        </>
    );
}

export default App;
