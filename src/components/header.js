/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import M from "materialize-css";
import "materialize-css/dist/js/materialize.js";

const Header = (props) => {
  const locationDropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);
  const [locationDropdown, setLocationDropdown] = useState(null);
  const [categoryDropdown, setCategoryDropdown] = useState(null);

  let headerCss = !props.loginState
    ? props.maintainerState
      ? "nav-wrapper amber"
      : "nav-wrapper blue"
    : "nav-wrapper cyan";

  useEffect(() => {
    initializeDropdowns();
    return () => {
      destroyDropdowns();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.maintainerState, props.loginState]);

  const initializeDropdowns = () => {
    destroyDropdowns();

    const locationElems = M.Dropdown.init(locationDropdownRef.current, {});
    setLocationDropdown(locationElems);
    const categoryElems = M.Dropdown.init(categoryDropdownRef.current, {});
    setCategoryDropdown(categoryElems);
  };

  const destroyDropdowns = () => {
    if (locationDropdown) {
      locationDropdown.destroy();
      setLocationDropdown(null);
    }
    if (categoryDropdown) {
      categoryDropdown.destroy();
      setCategoryDropdown(null);
    }
  };

  //  Need to add functionality that receives all locations from the backend
  //  I might leave as is
  const locations =
    props.locationState === ""
      ? [
          { location: "San Antonio", id: 1 },
          { location: "Fort Worth", id: 2 },
          { location: "Abilene", id: 3 },
          { location: "Lubbock", id: 4 },
          { location: "Amarillo", id: 5 },
          { location: "McAllen", id: 6 },
          { location: "Sugarland", id: 7 },
        ]
      : [];
  // ditto for categories
  const categories =
    props.categoryState === ""
      ? [
          { category: "Electrical", id: 1 },
          { category: "Plumbing", id: 3 },
          { category: "IT", id: 4 },
          { category: "Structural", id: 5 },
          { category: "Cleanup", id: 6 },
          { category: "Other", id: 7 },
        ]
      : [];

  const categoryClicked = (c) => {
    props.setCategoryState(c.category);
  };

  const locationClicked = (l) => {
    props.setLocationState(l.location);
  };

  const allLocationsClicked = () => {
    props.setLocationState("");
  };

  const allCategoriesClicked = () => {
    props.setCategoryState("");
  };

  const headerButtonClass = "dropdown-trigger header-button center-align";

  return (
    <React.Fragment>
    <ul id="location-dropdown" className="dropdown-content">
      <li onClick={() => allLocationsClicked()}>
        <a className="header-button">All</a>
      </li>
      {locations.map((l) => (
        <li key={l.id} onClick={() => locationClicked(l)}>
          <a className="header-button">{l.location}</a>
        </li>
      ))}
    </ul>
    <ul id="category-dropdown" className="dropdown-content">
      <li onClick={() => allCategoriesClicked()}>
        <a className="header-button">All</a>
      </li>
      {categories.map((c) => (
        <li key={c.id} onClick={() => categoryClicked(c)}>
          <a className="header-button">{c.category}</a>
        </li>
      ))}
    </ul>
    <nav>
      <div className={headerCss}>
        {props.loginState && <a className="brand-logo">Maintenance Wombat Login</a>}
        {!props.loginState && props.maintainerState ? (
          <a className="brand-logo">Maintenance Requests</a>
        ) : (!props.loginState &&
          <a className="brand-logo">Submit Maintenance Request</a>
        )}
        <ul className="right hide-on-med-and-down">
          {!props.loginState && props.maintainerState && (
            <React.Fragment>
              <li>
                <a
                  className={headerButtonClass}
                  data-target="category-dropdown"
                  ref={categoryDropdownRef}
                >
                  {props.categoryState === "" ? 'View By Request Category' : ' - ' +  props.categoryState + ' - '}
                </a>
              </li>
              <li>
                <a
                  className={headerButtonClass}
                  data-target="location-dropdown"
                  ref={locationDropdownRef}
                >
                  {props.locationState === "" ? 'View By Location' : ' - ' + props.locationState + ' - '}
                </a>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  </React.Fragment>
  );
};

export default Header;
