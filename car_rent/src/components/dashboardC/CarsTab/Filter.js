import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Filter = ({ name, removeTagHandler }) => {
  return (
    <div key={name} className="card__tag">
      <span className="card__tag-name">{name}</span>
      <button className="card__tag-delete" onClick={removeTagHandler}>
        <div className="sr-only">Remove filter</div>
        <FontAwesomeIcon icon={faTimes} className="close-icon" />

      </button>
    </div>
  );
};

export default Filter;
