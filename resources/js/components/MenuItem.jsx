import React from 'react';
import { atom, useRecoilState } from 'recoil';
import { FaPlus } from 'react-icons/fa';
import { menuFormState, menuState } from '../recoil/menuState'; // Correct recoil imports

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

    const toggleExpand = () => {
        setIsOpen(prev => !prev); // Toggle the open state
    };

    return (
        <div
            onMouseEnter={() => onHover(item.id)} // Notify parent of hover
            onMouseLeave={() => onHover(null)} // Reset hover state on mouse leave
        >
            <div className="cursor-pointer flex items-center space-x-2" onClick={toggleExpand}>
                {item.children.length > 0 && (
                    <div className={`transform ${isOpen ? 'rotate-180' : ''}`}>^</div>
                )}
                <div className="font-medium">{item.name}</div>
                {hoveredItem === item.id && (
                    <button
                        onClick={handleAddClick}
                        className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-500 text-white ml-2"
                    >
                        <FaPlus />
                    </button>
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
