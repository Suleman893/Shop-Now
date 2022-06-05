import React from "react";

const OrdersList = () => {
  return (
    <div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Name</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="UserId">4334434343434334</td>
              <td data-label="Email">Watch</td>
              <td data-label="Name">222</td>
              <td data-label="Role">122</td>
              <td data-label="Edit">Edit Icon</td>
              <td data-label="Delete">Delete Icon</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersList;
