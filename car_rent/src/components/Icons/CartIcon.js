import React from "react";
import plus from "../../assets/Pictures/icon-plus.svg";
import minus from "../../assets/Pictures/icon-minus.svg";

const QuantityButton = ({ onQuant, onRemove, onAdd }) => {
  return (
    <div className="amount">
      <button className="minus" onClick={onRemove} disabled={onQuant === 0}>
        <img src={minus} alt="icon-minus" />
      </button>
      <p>{onQuant}</p>
      <button className="plus" onClick={onAdd} disabled={onQuant === 100}>
        <img src={plus} alt="icon-plus" />
      </button>
    </div>
  );
};

export default QuantityButton;