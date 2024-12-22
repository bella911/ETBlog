import React from "react";

function Error() {
  return (
    <div className="bg-[#eee]   dark:bg-gray-800 px-1 text-center">
    <div className="max-w-screen-xl mx-auto text-center pt-16 pb-64   min-h-[70vh]  ">
     <h2 className="sm:text-4xl text-xl md:w-[70%] w-full mx-auto text-red-500">😭 404 - Page Not Found 😭</h2> 
     <p className="sm:text-2xl text-base md:w-[60%] w-full mx-auto mt-8 dark:text-gray-400 text-gray-600 px-2">Whoops! That page doesn’t exist. But do not fret, check out our other resources to get started.</p> 
    </div>
    </div>
  );
}

export default Error;
