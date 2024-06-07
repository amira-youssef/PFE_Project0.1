import Filter from './Filter';
import './style/layout.css'

const FilterPanel = ({
  type,
  maker,
  boite,
  removeTagHandler,
  resetTagsHandler,
}) => {
  return (
    <div className=" filter__panel">
      <div className="filter">
        <div className="card__tags">
          {type && (
            <Filter
              name={type}
              removeTagHandler={() => removeTagHandler('type', type)}
            ></Filter>
          )}
          {maker && (
            <Filter
              name={maker}
              removeTagHandler={() => removeTagHandler('maker', maker)}
            ></Filter>
          )}
          {boite && (
            <Filter
              name={boite}
              removeTagHandler={() => removeTagHandler('boite', boite)}
            ></Filter>
          )}

        </div>
        <button className="btn__reset" onClick={resetTagsHandler}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
