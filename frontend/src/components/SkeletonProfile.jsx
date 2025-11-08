import React from 'react';

const SkeletonProfile = () => (
  <div className="py-16 px-5 max-w-5xl mx-auto animate-pulse">
    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
      {/* Image Skeleton */}
      <div className="w-full md:w-[400px] h-72 rounded-xl bg-gray-300"></div>
      
      {/* Info Skeleton */}
      <div className="flex-1 w-full">
        {/* Title */}
        <div className="h-10 bg-gray-300 rounded-lg w-3/4 mb-5"></div>
        {/* Description Lines */}
        <div className="h-5 bg-gray-300 rounded-md w-full mb-3"></div>
        <div className="h-5 bg-gray-300 rounded-md w-full mb-3"></div>
        <div className="h-5 bg-gray-300 rounded-md w-1/2 mb-8"></div>
        
        {/* Button Skeletons */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="h-14 w-44 bg-gray-300 rounded-lg"></div>
          <div className="h-14 w-36 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  </div>
);

export default SkeletonProfile;