import React from "react";

function Error() {
  return (
    <div className="bg-[#eee] min-w-96  dark:bg-gray-800">
    <div className="max-w-screen-xl mx-auto text-center pt-16 pb-64 pl-8  min-h-[70vh]  ">
     <h2 className="text-4xl w-[50%] mx-auto text-red-500">😭 404 - Page Not Found 😭</h2> 
     <p className="text-2xl w-[50%] mx-auto mt-8 dark:text-gray-400 text-gray-600">Whoops! That page doesn’t exist. But do not fret, check out our other resources to get started.</p> 
    </div>
    </div>
  );
}

export default Error;
