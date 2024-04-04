import { useState, useEffect } from "react";

import axios from "axios";

const Inventory = () => {
  const [inventories, setInventories] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);

  useEffect(
    () => {
      fetchInventories();
    },
    [] /*, [currentPage]*/
  ); // Refetch inventories when currentPage changes

  const fetchInventories = async () => {
    try {
      const response = await axios.get(
        //`/report/inventory-rating?page=${currentPage}`
        `/report/inventory-rating`
      );
      setInventories(response.data[0]);
      console.log(response.data[0]);
      //setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching inventories:", error);
    }
  };

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  return (
    <div>
      <>
        <h1>Inventory Rating Report</h1>
        <h2>Inventory Ratings</h2>

        <ul>
          {inventories.map((inventory, index) => (
            <li key={index}>
              <>
                {`Store ID: ${inventory.store_id} Rating: ${inventory.rating} Items: ${inventory.inventory_items} `}{" "}
              </>
            </li>
          ))}
        </ul>

        {/* Pagination */}

        {/* <div>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            // Display only a subset of page numbers around the current page
            if (
              page === 1 ||
              page === currentPage ||
              page === totalPages ||
              Math.abs(currentPage - page) <= 2
            ) {
              return (
                <button
                  key={i}
                  onClick={() => handlePageChange(page)}
                  disabled={currentPage === page}
                >
                  {page}
                </button>
              );
            }
            return null;
          })}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div> */}
      </>
    </div>
  );
};

export default Inventory;
