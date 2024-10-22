import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/menus'); // Update the URL if necessary
                setMenus(response.data); // Set the fetched data to state
            } catch (err) {
                setError(err); // Handle error
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchMenus(); // Call the fetch function
    }, []); // Empty dependency array means this effect runs once after the first render

    if (loading) return <div>Loading...</div>; // Show loading state
    if (error) return <div>Error: {error.message}</div>; // Show error state

    return (
        <div>
            <h1>Menus</h1>
            <ul>
                {menus.map(menu => (
                    <li key={menu.id}>{menu.name}</li> // Display menu names
                ))}
            </ul>
        </div>
    );
};

export default App;
