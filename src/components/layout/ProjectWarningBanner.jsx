import React from 'react';

const ProjectWarningBanner = () => {
  return (
    <div className="w-full border-b border-amber-200 bg-amber-50">
      <p className="mx-auto max-w-360 px-4 py-2 text-center text-xs font-medium text-amber-900 sm:px-6 lg:px-8 sm:text-sm">
        Student project warning: This demo is not affiliated with, endorsed by, or operated by Coinbase.
      </p>
    </div>
  );
};

export default ProjectWarningBanner;