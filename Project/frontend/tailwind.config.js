/** @type {import('tailwindcss').Config} */
module.exports = {

    plugins: [
        require('flowbite/plugin')
    ]

}

module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		extend: {},
	},
	plugins: [],
};

module.exports = {
	content: ["./src/**/*.{html,js}", "./node_modules/tw-elements/dist/js/**/*.js"],
	plugins: [require("tw-elements/dist/plugin")],
};


// module.exports = {

//     content: [
//         "./node_modules/flowbite/**/*.js"
//     ]

// }