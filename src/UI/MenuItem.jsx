/* eslint-disable react/prop-types */

import styled from "styled-components";

const Button = styled.button`
  text-decoration: none;
  color: var(--color-grey-700);
  transition: all, 0.2s;
  background: transparent;
  border: none;

  &:hover {
    font-size: 1.8rem;
    text-decoration: none;
    color: white;
    font-weight: bolder;
  }
`;

function MenuItem({category}) {
  const value = category.split(" ").join("").toLowerCase();

  // function handleMenuClick(e) {
  //   if (!e.target.value) return;
  //   let filteredSearchedPosts;
  //   if (e.target.value === "allPosts") {
  //     filteredSearchedPosts = posts;
  //   } else {
  //     filteredSearchedPosts = posts.filter((post) => String(post.category).toLowerCase() === e.target.value.toLowerCase());
  //   }

  //   dispatch({type: "setSearchedPosts", payload: filteredSearchedPosts});
  // }

  return (
    <li>
      <Button value={value}>{category}</Button>
    </li>
  );
}

export default MenuItem;
