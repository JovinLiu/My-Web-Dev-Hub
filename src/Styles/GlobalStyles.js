import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  &, &.light-mode{  
     --color-grey-0: #fff;
    --color-grey-50: #f9fafb;
    --color-grey-100: #f3f4f6;
    --color-grey-200: #e5e7eb;
    --color-grey-300: #d1d5db;
    --color-grey-400: #9ca3af;
    --color-grey-500: #6b7280;
    --color-grey-600: #4b5563;
    --color-grey-700: #374151;
    --color-grey-800: #1f2937;
    --color-grey-900: #111827; 

    --color-blue-1: #104485;
    --color-blue-2: #bfdbfe;
    --color-blue-3: #dae7f7;
    --color-green-1: #dcfce7;
    --color-green-2: #15803d;
    --color-yellow-1: #fef9c3;
    --color-yellow-2: #a16207;
    --color-silver-1: #e5e7eb;
    --color-silver-2: #374151;
    --color-indigo-1: #e0e7ff;
    --color-indigo-2: #4338ca;

    --color-red-100: #fee2e2;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;

    --backdrop-color: rgba(255, 255, 255, 0.1);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

    --image-grayscale: 0;
    --image-opacity: 100%;
}

  &.dark-mode{
    --color-grey-0: #18212f;
    --color-grey-50: #111827;
    --color-grey-100: #1f2937;
    --color-grey-200: #374151;
    --color-grey-300: #4b5563;
    --color-grey-400: #6b7280;
    --color-grey-500: #9ca3af;
    --color-grey-600: #d1d5db;
    --color-grey-700: #e5e7eb;
    --color-grey-800: #f3f4f6;
    --color-grey-900: #f9fafb;

    --color-blue-1: #e0f2fe;
    --color-blue-2: #075985;
    --color-blue-3: #05334d;
    --color-green-1: #166534;
    --color-green-2: #dcfce7;
    --color-yellow-1: #854d0e;
    --color-yellow-2: #fef9c3;
    --color-silver-1: #374151;
    --color-silver-2: #f3f4f6;
    --color-indigo-1: #3730a3;
    --color-indigo-2: #e0e7ff;

    --color-red-700: #fee2e2;
    --color-red-100: #b91c1c;
    --color-red-800: #991b1b;

    --backdrop-color: rgba(0, 0, 0, 0.3);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

    --image-grayscale: 10%;
    --image-opacity: 90%;
}


  /* Feature Color*/
  --color-webbasic-100: rgb(7, 89, 133);
  --color-javascript-100: rgb(255, 214, 0);
  --color-typescript-100: rgb(0, 122, 204);
  --color-html-100: rgb(255, 109, 0);
  --color-css-100: rgb(3, 155, 229);
  --color-sass-100: rgb(240, 98, 146);
  --color-tailwindcss-100: rgb(0, 172, 193);
  --color-react-100: rgb(83, 193, 222);
  --color-redux-100: rgb(108, 78, 176);
  --color-nodejs-100: rgb(33, 163, 102);
  --color-express-100: rgb(0,0,0);
  --color-reactrouter-100: rgb(244, 66, 80);
  --color-reactquery-100: rgb(239, 68, 68);
  --color-git-100: rgb(241, 78, 50);
  --color-github-100: rgb(0,0,0);
  --color-githubcopilot-100: rgb(0,0,0);
  --color-vercel-100: rgb(0,0,0);
  --color-nextjs-100: rgb(0,0,0);
  --color-heroku-100: rgb(81, 74, 143);
  --color-supabase-100: rgb(56, 200, 123);
  --color-mongodb-100: rgb(91, 160, 57);
  --color-mongoose-100: rgb(116, 0, 2);
  --color-postman-100: rgb(243, 81, 42);
  --color-styledcomponents-100: rgb(230, 91, 154);
  --color-pug-100: rgb(168, 100, 84);
  --color-bootstrap-100: rgb(76,11,206);
  --color-docker-100: rgb(6,109,165);
  --color-netlify-100: rgb(32, 198, 183);
  --color-sql-100: rgb(0, 188, 242);
  --color-postgresql-100: rgb(51, 103, 145);
  --color-jquery-100: rgb(18, 102, 169);
  --color-graphql-100: rgb(229, 53, 171);
  --color-aws-100: rgb(255, 153, 51);

  
  /* Feature Color translucent*/
  --color-webbasic-20: rgb(7, 89, 133, 0.2);
  --color-javascript-20: rgb(255, 214, 0, 0.2);
  --color-typescript-20: rgb(0, 122, 204, 0.2);
  --color-html-20: rgb(255, 109, 0, 0.2);
  --color-css-20: rgb(3, 155, 229, 0.2);
  --color-sass-20: rgb(240, 98, 146, 0.2);
  --color-tailwindcss-20: rgb(0, 172, 193, 0.2);
  --color-react-20: rgb(83, 193, 222, 0.2);
  --color-redux-20: rgb(108, 78, 176, 0.2);
  --color-nodejs-20: rgb(33, 163, 102, 0.2);
  --color-express-20: rgb(0,0,0, 0.2);
  --color-reactrouter-20: rgb(244, 66, 80, 0.2);
  --color-reactquery-20: rgb(239, 68, 68, 0.2);
  --color-git-20: rgb(241, 78, 50, 0.2);
  --color-github-20: rgb(0,0,0, 0.2);
  --color-githubcopilot-20: rgb(0,0,0, 0.2);
  --color-vercel-20: rgb(0,0,0, 0.2);
  --color-nextjs-20: rgb(0,0,0, 0.2);
  --color-heroku-20: rgb(81, 74, 143, 0.2);
  --color-supabase-20: rgb(56, 200, 123, 0.2);
  --color-mongodb-20: rgb(91, 160, 57, 0.2);
  --color-mongoose-20: rgb(116, 0, 2, 0.2);
  --color-postman-20: rgb(243, 81, 42, 0.2);
  --color-styledcomponents-20: rgb(230, 91, 154, 0.2);
  --color-pug-20: rgb(168, 100, 84, 0.2);
  --color-bootstrap-20: rgb(76,11,206,0.2);
  --color-docker-20: rgb(6,109,165,0.2);
  --color-netlify-20: rgb(32, 198, 183,0.2);
  --color-sql-20: rgb(0, 188, 242,0.2);
  --color-postgresql-20: rgb(51, 103, 145,0.2);
  --color-jquery-20: rgb(18, 102, 169,0.2);
  --color-graphql-20: rgb(229, 53, 171,0.2);
  --color-aws-20: rgb(255, 153, 51,0.2);

  --transition-1: all 0.2s ease-in-out;

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;
}


*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

*::-webkit-scrollbar {
  width: 5px;
  height:5px;
  background-color: none
}

*::-webkit-scrollbar-track {
    background-color: none
  }

*::-webkit-scrollbar-thumb {
  background: var(--color-blue-1);
  border-radius: 10px;
}

*::-webkit-scrollbar-corner {
  background: none
}


body {
  font-family: "Poppins", sans-serif;
  color: var(--color-grey-700);
  background-color: var(--color-grey-100);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
/* button:focus, */
textarea:focus,
select:focus {
  outline: 2px solid var(--color-grey-700);
  outline-offset: 2px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

ol {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

.ql-syntax {
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
}
`;

export default GlobalStyles;
