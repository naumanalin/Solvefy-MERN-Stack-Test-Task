import React from 'react';

const Picture = () => {
  return (
    <div className="w-32 h-32 border-[#1C4565] border-[5px] overflow-hidden rounded-full shadow-lg">
      <img className="w-full h-full object-cover rounded-full" src="/home_image_1.jpg" alt="Profile picture" />
    </div>
  );
};

export default Picture;
