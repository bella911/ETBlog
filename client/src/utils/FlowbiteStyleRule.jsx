import React from 'react'

function FlowbiteStyleRule() {
  return (
    <div>FlowbiteStyleRule</div>
  )
}

export default FlowbiteStyleRule

// Option 1: Change the Tailwind CSS classes directly in the component

// import { Button } from "flowbite-react";

// export default function MyPage() {
//   return <Button className="bg-red-500 hover:bg-red-600">Click me</Button>;
// }



//....................................................................................................



// Option 2: Create a custom theme#
// You can create a custom theme and pass it to the <Flowbite> component. 
// The custom theme will be merged with the default theme, and the resulting theme will be used by the components.

// import type { CustomFlowbiteTheme } from "flowbite-react";
// import { Flowbite } from "flowbite-react";

// const customTheme: CustomFlowbiteTheme = {
//   button: {
//     color: {
//       primary: "bg-red-500 hover:bg-red-600",
//     },
//   },
// };

// export default function MyPage() {
//   return (
//     <Flowbite theme={{ theme: customTheme }}>
//       <Button color="primary">Click me</Button>
//     </Flowbite>
//   );
// }



// ....................................................................................................




// Option 3: Create a reusable component with a custom theme#
// You can also pass theme={} directly to any component, which will override the theme for that component, 
// but not its children. This is useful if you want to create a reusable component with a custom theme.

// import type { CustomFlowbiteTheme } from "flowbite-react";
// import { Button } from "flowbite-react";

// const customTheme: CustomFlowbiteTheme["button"] = {
//   color: {
//     primary: "bg-red-500 hover:bg-red-600",
//   },
// };

// export default function MyPage() {
//   return (
//     <Button theme={customTheme} color="primary">
//       Click me
//     </Button>
//   );
// }



// ..............................................................................


// Theme for scroll

// {
//     "arrowIcon": "ml-2 h-4 w-4",
//     "content": "py-1 focus:outline-none",
//     "floating": {
//       "animation": "transition-opacity",
//       "arrow": {
//         "base": "absolute z-10 h-2 w-2 rotate-45",
//         "style": {
//           "dark": "bg-gray-900 dark:bg-gray-700",
//           "light": "bg-white",
//           "auto": "bg-white dark:bg-gray-700"
//         },
//         "placement": "-4px"
//       },
//       "base": "z-10 w-fit divide-y divide-gray-100 rounded shadow focus:outline-none",
//       "content": "py-1 text-sm text-gray-700 dark:text-gray-200",
//       "divider": "my-1 h-px bg-gray-100 dark:bg-gray-600",
//       "header": "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200",
//       "hidden": "invisible opacity-0",
//       "item": {
//         "container": "",
//         "base": "flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white",
//         "icon": "mr-2 h-4 w-4"
//       },
//       "style": {
//         "dark": "bg-gray-900 text-white dark:bg-gray-700",
//         "light": "border border-gray-200 bg-white text-gray-900",
//         "auto": "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white"
//       },
//       "target": "w-fit"
//     },
//     "inlineWrapper": "flex items-center"
//   }