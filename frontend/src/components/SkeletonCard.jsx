import React from 'react';

const SkeletonCard = () => (
  <div className="block bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
    {/* Image Skeleton */}
    <div className="w-full h-48 bg-gray-300"></div>
    <div className="p-5">
      {/* Title Skeleton */}
      <div className="h-6 bg-gray-300 rounded-md w-3/4 mb-3"></div>
      {/* Description Skeleton */}
      <div className="h-4 bg-gray-300 rounded-md w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded-md w-5/6"></div>
    </div>
  </div>
);

export default SkeletonCard;