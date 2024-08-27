// import {Link} from "react-router-dom";

// /* eslint-disable react/prop-types */
// function PostItem({post, index, lastEnd1, lastEnd2, lastEnd3}) {
//   const bodyShort = post.body.slice(0, 500);
//   const titleShort = post.title.slice(0, 100);

//   function gridStyle() {
//     let start, end;
//     const space = Number(createSpace());
//     const x = index % 4;

//     function createSpace() {
//       let space;
//       const randomNum = (Math.random() * 10).toFixed(0);
//       if (randomNum >= 0 && randomNum < 2) {
//         space = 2;
//         return space;
//       }
//       if (randomNum >= 2 && randomNum < 4) {
//         space = 3;
//         return space;
//       }
//       if (randomNum >= 4 && randomNum < 6) {
//         space = 4;
//         return space;
//       }
//       if (randomNum >= 6 && randomNum < 8) {
//         space = 5;
//         return space;
//       }
//       if (randomNum >= 8 && randomNum <= 10) {
//         space = 6;
//         return space;
//       }
//     }

//     function orderFirst() {
//       start = 1;
//       start + space >= 7 ? (end = 7) : (end = start + space);
//       lastEnd1.current = end;
//       return {gridColumnStart: start, gridColumnEnd: end};
//     }

//     function orderSecond() {
//       start = lastEnd1.current;
//       start + space >= 12 ? (end = 12) : (end = start + space);
//       lastEnd2.current = end;
//       return {gridColumnStart: start, gridColumnEnd: end};
//     }

//     function orderThird() {
//       start = lastEnd2.current;
//       start + space >= 14 ? (end = 14) : (end = start + space);
//       lastEnd3.current = end;
//       return {gridColumnStart: start, gridColumnEnd: end};
//     }

//     function orderFourth() {
//       start = lastEnd3.current;
//       end = -1;
//       return {gridColumnStart: start, gridColumnEnd: end};
//     }

//     if (x === 0) return orderFirst();
//     if (x === 1) return orderSecond();
//     if (x === 2) return orderThird();
//     if (x === 3) return orderFourth();
//   }

//   function shortTimeFormat() {
//     const dateArr = post.date.split(", ");
//     return dateArr[1] + " at " + dateArr[2];
//   }

//   return (
//     <Link to={`/app/viewer/`} style={gridStyle()}>
//       <p className={` ${styles.bodyShort} ${viewMode === "night" ? styles.night : postItemStyleBackGround()}`}>{parse(bodyShort)}......</p>
//       <div className={`${styles.titleContainer} ${postItemStyle()}`}>
//         <Icon category={post.category} />
//         <div className={styles.infoContainer}>
//           <span className={styles.title}>
//             <strong>{titleShort}</strong>
//           </span>
//           <span className={styles.date}>{shortTimeFormat()}</span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default PostItem;
