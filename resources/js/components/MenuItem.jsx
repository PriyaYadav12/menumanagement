import React from 'react';
import { atom, useRecoilState } from 'recoil';
import { menuFormState, menuState } from '../recoil/menuState'; // Correct recoil imports
import addButton from '../assets/addButton.png';
import { MdDelete } from "react-icons/md";
import axios from 'axios';

// Define a global atom for the expand/collapse state
export const expandAllState = atom({
    key: 'expandAllState',
    default: true, // Default is true to keep all expanded
});

// Recursive MenuList component
const MenuList = ({ item, onHover, hoveredItem }) => {
    const [expandAll] = useRecoilState(expandAllState);
    const [isOpen, setIsOpen] = React.useState(expandAll);
    const [formData, setFormData] = useRecoilState(menuFormState);
    const [menuArr] = useRecoilState(menuState); // Get the menu data from Recoil state
    const [isEditing, setIsEditing] = React.useState(false); // New state for editing
    const [editableName, setEditableName] = React.useState(item.name); // State for the editable name

    React.useEffect(() => {
        setIsOpen(expandAll); // Sync with expand/collapse all state
    }, [expandAll]);

    const handleAddClick = (event) => {
        event.stopPropagation(); // Prevent event bubbling

        // Find the last depth for the given parent_id
        const getLastDepth = (parentId, items) => {
            let maxDepth = 0;
            maxDepth = item.children ? item.children.length : 0;
            return maxDepth;
        };
        const lastDepth = getLastDepth(item.parent_id, menuArr);

        // Set the form data with depth + 1 of the last found depth
        setFormData((prev) => ({
            ...prev,
            depth: lastDepth + 1, // Increase depth by 1
            parentData: item.name,
            name: '', // Clear the name or set as required
        }));

        console.log(`Add new item under ${item.name} with depth ${lastDepth + 1}`);
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        try {
            // Send the toDeleteIds array to the server using Axios
            await axios.post(`/api/deleteItems/${item.id}`);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting items:', error);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleBlur = async () => {
        setIsEditing(false);
        // Only send the update if the name has changed
        if (editableName !== item.name) {
            try {
                await axios.post(`/api/update/${item.id}`, { name: editableName });
                window.location.reload();
            } catch (error) {
                console.error('Error updating item:', error);
            }
        }
    };

    const handleChange = (e) => {
        setEditableName(e.target.value); // Update the editable name
    };

    const toggleExpand = () => {
        setIsOpen((prev) => !prev); // Toggle the open state
    };

    return (
        <div
            onMouseEnter={() => onHover(item.id)} // Notify parent of hover
            onMouseLeave={() => onHover(null)} // Reset hover state on mouse leave
        >
            <div className="cursor-pointer flex items-center space-x-2" onClick={handleEditClick}>
                {item.children.length > 0 && (
                    <div className={`transform ${isOpen ? 'rotate-180' : ''}`} onClick={toggleExpand}>^</div>
                )}
                {isEditing ? (
                    <input
                        type="text"
                        value={editableName}
                        onChange={handleChange}
                        onBlur={handleBlur} // Send update on blur
                        autoFocus // Focus the input when editing
                        className="border border-gray-300 rounded p-1"
                    />
                ) : (
                    <div className="font-medium">{item.name}</div>
                )}
                {hoveredItem === item.id && (
                    <div className="flex space-x-1 ml-2">
                        <button
                            onClick={handleAddClick}
                            className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-500 text-white"
                        >
                            <img src={addButton} alt="Add" />
                        </button>
                        <MdDelete onClick={handleDelete} />
                    </div>
                )}
            </div>

            {isOpen && item.children.length > 0 && (
                <div className="pl-6 mt-2 relative">
                    <div className="absolute left-0 top-0 h-full border-l-2 border-gray-300"></div>
                    <div className="absolute left-0 top-4 w-6 border-t-2 border-gray-300"></div>
                    <div className="pl-6">
                        {item.children.map((child) => (
                            <MenuList key={child.id} item={child} onHover={onHover} hoveredItem={hoveredItem} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const MenuItem = ({ menus }) => {
    const [hoveredItem, setHoveredItem] = React.useState(null);
    const [menuArr, setMenus] = useRecoilState(menuState); // Use Recoil state here

    const handleHover = (id) => {
        setHoveredItem(id); // Update the hovered item ID
    };

    React.useEffect(() => {
        // If menus are provided, update the global Recoil state
        if (menus) {
            setMenus(menus);
        }
    }, [menus, setMenus]);

    if (!menus || menus.length === 0) {
        return <div>No menus found</div>;
    }

    return (
        <div className="p-4">
            {menus.map((item) => (
                <MenuList key={item.id} item={item} onHover={handleHover} hoveredItem={hoveredItem} />
            ))}
        </div>
    );
};

export default MenuItem;
