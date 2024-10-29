import React, { useState } from 'react';
import gobbler from '../assets/gobbler.png';
import openmenu from '../assets/openMenu.png';
import submenuFilled from '../assets/submenuFilled.png';
import Vector from '../assets/Vector.png';
import vector2 from '../assets/Vector-2.png';
import systemsubmenu from '../assets/systemsubmenu.png';
import folderFilled from '../assets/folderFilled.png';

const Sidebar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('Menus');

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <div className="sidebar w-64 p-4 text-gray-300">
            {/* Logo and Menu Toggle */}
            <div className="flex items-center justify-between mb-8">
                <div className="text-2xl font-bold text-white">
                    <img src={gobbler} alt="cloit" />
                </div>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                    <img src={openmenu} alt="openmenu" />
                </button>
            </div>

            {/* Sidebar Items */}
            <div className="space-y-6"> {/* Increased space between groups */}
                {/* Systems Section */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <img src={folderFilled} alt="system" />
                        <span className="font-medium">Systems</span>
                    </div>
                    <div
                        onClick={() => handleItemClick('System Code')}
                        className={`flex items-center space-x-2 cursor-pointer ${
                            activeItem === 'System Code' ? 'bg-green-500 text-black rounded-md px-2 py-1' : 'text-gray-400'
                        }`}
                    >
                        <img src={systemsubmenu} alt="system submenu" />
                        <span className="font-medium">System Code</span>
                    </div>
                    <div
                        onClick={() => handleItemClick('Properties')}
                        className={`flex items-center space-x-2 cursor-pointer ${
                            activeItem === 'Properties' ? 'bg-green-500 text-black rounded-md px-2 py-1' : 'text-gray-400'
                        }`}
                    >
                        <img src={Vector} alt="properties" />
                        <span className="font-medium">Properties</span>
                    </div>
                    <div
                        onClick={() => handleItemClick('Menus')}
                        className={`flex items-center space-x-2 cursor-pointer ${
                            activeItem === 'Menus' ? 'bg-green-500 text-black rounded-md px-2 py-1' : 'text-gray-400'
                        }`}
                    >
                        <img src={activeItem === 'Menus' ? submenuFilled : systemsubmenu} alt="menu icon" />
                        <span className="font-medium">Menus</span>
                    </div>
                    <div
                        onClick={() => handleItemClick('API List')}
                        className={`flex items-center space-x-2 cursor-pointer ${
                            activeItem === 'API List' ? 'bg-green-500 text-black rounded-md px-2 py-1' : 'text-gray-400'
                        }`}
                    >
                        <img src={Vector} alt="API List" />
                        <span className="font-medium">API List</span>
                    </div>
                    {/* Users & Group */}
                    <div
                        onClick={() => handleItemClick('Users & Group')}
                        className={`flex items-center space-x-2 cursor-pointer ${
                            activeItem === 'Users & Group' ? 'bg-green-500 text-black rounded-md px-2 py-1' : 'text-gray-400'
                        }`}
                    >
                        <img src={vector2} alt="users & group" />
                        <span className="font-medium">Users & Group</span>
                    </div>

                    {/* Competition */}
                    <div
                        onClick={() => handleItemClick('Competition')}
                        className={`flex items-center space-x-2 cursor-pointer ${
                            activeItem === 'Competition' ? 'bg-green-500 text-black rounded-md px-2 py-1' : 'text-gray-400'
                        }`}
                    >
                        <img src={vector2} alt="competition" />
                        <span className="font-medium">Competition</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
