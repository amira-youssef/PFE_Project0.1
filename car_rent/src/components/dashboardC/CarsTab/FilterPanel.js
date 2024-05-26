import Filter from './Filter';

const FilterPanel = ({
  type,
  level,
  languages,
  tools,
  removeTagHandler,
  resetTagsHandler,
}) => {
  return (
    <div className="container filter__panel">
      <div className="filter">
        <div className="card__tags">
          {type && (
            <Filter
              name={type}
              removeTagHandler={() => removeTagHandler('type', type)}
            ></Filter>
          )}
          {level && (
            <Filter
              name={level}
              removeTagHandler={() => removeTagHandler('level', level)}
            ></Filter>
          )}

          {languages.length > 0 &&
            languages.map((language) => (
              <Filter
                key={language}
                name={language}
                removeTagHandler={() => removeTagHandler('languages', language)}
              />
            ))}
          {tools.length > 0 &&
            tools.map((tool) => (
              <Filter
                key={tool}
                name={tool}
                removeTagHandler={() => removeTagHandler('tools', tool)}
              />
            ))}
        </div>
        <button className="btn__reset" onClick={resetTagsHandler}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
