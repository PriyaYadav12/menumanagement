import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import '../../css/output.css';
import sideBar from '../assets/Sidebar.png';
import folderIcon from '../assets/folder.png';
import titleIcon from '../assets/icon-title.png';
import MenuAdd from './MenuAdd';
import MenuItem from './MenuItem';
import { expandAllState } from './MenuItem'; // Import atom
import Hamburger from '../assets/menu.png';
import Sidebar from './sideBar';

const Menu = () => {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const setExpandAll = useSetRecoilState(expandAllState);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await axios.get('/api/menus');
                setMenus(buildTree(response.data)); // Build hierarchical structure
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMenus();
    }, []);

    const buildTree = (list, parent = null) => {
        const filteredList = list.filter((item) => item.parent_id === parent);
        return filteredList.map((item) => ({
            ...item,
            children: buildTree(list, item.id),
        }));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="flex">
            <div className="w-3/4 p-4 sidebar-icon">
                <Sidebar className="w-full h-full object-cover sidebar-icon"/>
            </div>
            <div className="mobile-image">
                <img src={Hamburger} alt="Mobile Image" className="w-6" />
            </div>
            <div>
                
            </div>
            <div className="w-1/4 p-4">
                <div className="flex items-center mb-4">
                    <img src={folderIcon} alt="Folder Icon" className="w-6 h-6 mr-2" />
                    <h1 className="text-2xl font-bold"> / Menus</h1>
                </div>
                <div className="flex items-center mb-4">
                    <img src={titleIcon} alt="Title Icon" className="w-6 h-6 mr-2" />
                    <h1 className="text-2xl font-bold"> Menu</h1>
                </div>
                <select className="border p-2 rounded dropDown">
                    <option value="system-management">System Management</option>
                </select>
                <div className="mb-4 flex button-div">
                    <button
                        className="expand-button text-white px-4 py-2"
                        onClick={() => setExpandAll(true)} // Expand all
                    >
                        Expand All
                    </button>
                    <button
                        className="collapse-button px-4 py-2 ml-0"
                        onClick={() => setExpandAll(false)} // Collapse all
                    >
                        Collapse All
                    </button>
                </div>
                <MenuItem menus={menus} /> {/* Pass menus as prop */}
                <div className='hide'><MenuAdd /></div>
            </div>

            <div className="show w-1/4 p-4">
                <MenuAdd />
            </div>
        </div>
    );
};

export default Menu;
