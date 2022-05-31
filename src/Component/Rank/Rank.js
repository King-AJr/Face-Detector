import React from "react";

const Rank = ({ make, enteries }) => {
      return (
          <div>
              <div className="white f3">
                {`${make}, your current entry count is ` }
              </div>
              <div className="white f1">
                {`${enteries}`}
              </div>
          </div>
      );
}
export default Rank