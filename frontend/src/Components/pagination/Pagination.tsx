import React from "react";
function Pagination( cardsPerPage: number, totalCards: number, paginate: (arg0: number) => void ): JSX.Element {
    const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
      <div className="Pagination">
         <nav>
            <ul className="pagination">
              {pageNumbers.map((number) => (
                <li key={number} className="page-item">
                  <a onClick={() => paginate(number)} href="!#" className="page-link">
                    {number}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
      </div>
  );
}

export default Pagination;
// const Pagination = ({ cardsPerPage:any, totalCards:any, paginate:any }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <nav>
//       <ul className="pagination">
//         {pageNumbers.map((number) => (
//           <li key={number} className="page-item">
//             <a onClick={() => paginate(number)} href="!#" className="page-link">
//               {number}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Pagination;

