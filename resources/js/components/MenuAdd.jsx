import React, { useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { menuFormState } from '../recoil/menuState'; // Adjust the import path accordingly
import '../../css/output.css'; // Import Tailwind-generated CSS

const MenuAdd = () => {
    const [formData, setFormData] = useRecoilState(menuFormState);
    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {
        // Generate a random hexadecimal value for the Menu ID
        const generateHexId = () => {
            const hexId = Math.random().toString(16).slice(2, 34).toUpperCase(); 
            const chunks = hexId.match(/.{1,8}/g); 
            const formattedHexId = chunks.join('-');
            setFormData(prev => ({ ...prev, menuId: formattedHexId })); 
        };

        generateHexId(); 
    }, []);

    const handleSave = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setIsLoading(true);
        console.log(formData);
        // Simulate an API call to save the menu data
        try {
            // Replace this with your API endpoint
            await axios.post('/api/saveMenu', formData);
            window.location.reload();            // Reset the form or perform other actions
        } catch (error) {
            console.error('Error saving menu:', error);
            alert('Failed to save menu. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 rounded" style={{ marginTop: '25%' }}>       
            <form onSubmit={handleSave}>
                {/* Menu ID */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1" htmlFor="menuId">
                        Menu ID
                    </label>
                    <input
                        type="text"
                        id="menuId"
                        value={formData.menuId}
                        readOnly // Make this field read-only since it's auto-generated
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Depth */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1" htmlFor="depth">
                        Depth
                    </label>
                    <input
                        type="text"
                        id="depth"
                        value={formData.depth}
                        disabled // Make this field disabled
                        className="w-full p-2 border border-gray-300 rounded bg-gray-200"
                    />
                </div>

                {/* Parent Data */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1" htmlFor="parentData">
                        Parent Data
                    </label>
                    <input
                        type="text"
                        id="parentData"
                        value={formData.parentData}
                        onChange={(e) => setFormData(prev => ({ ...prev, parentData: e.target.value }))} // Update parent data state
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} // Update name state
                        className="w-full p-2 border border-gray-300 rounded"
                        required // Make this field required
                    />
                </div>

                {/* Save Button */}
                <button
                    type="submit"
                    className={`saveButton p-2 bg-blue-500 text-white rounded-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isLoading} // Disable the button while loading
                >
                    {isLoading ? 'Saving...' : 'Save'}
                </button>
            </form>
        </div>
    );
};

export default MenuAdd;
