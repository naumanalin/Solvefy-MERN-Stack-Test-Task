import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePicture } from '../redux/authSlice';
import defaultImage from '/download.jpg';

const Picture = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const user_Picture = `http://localhost:3000${user?.picture}`
    const [preview, setPreview] = useState(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);

        // Dispatch update action
        dispatch(updatePicture(file));
    };

    return (
        <div className="w-32 h-32 border-[#1C4565] border-[5px] overflow-hidden rounded-full shadow-lg cursor-pointer">
            <label htmlFor='picture' className="block w-full h-full">
                <img 
                    className="w-full h-full object-cover rounded-full"
                    src={preview || user_Picture  || defaultImage} 
                    alt="Profile" 
                />
                <input 
                    type="file"
                    id="picture"
                    name="picture"
                    hidden
                    accept="image/*"
                    onChange={handleFileUpload}
                />
            </label>
        </div>
    );
};

export default Picture;