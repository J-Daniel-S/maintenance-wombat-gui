import React, { useEffect, useRef, useState } from "react";

const Header = (props) => {
  const locationDropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);

  let headerCss = !props.loginState ? (props.maintainerState 
    ? "nav-wrapper amber"
    : "nav-wrapper blue") : 'nav-wrapper cyan';
  let textCss = props.maintainerState && !props.loginState
    ? "orange-text text-darken-2"
    : "blue-text text-darken-2";

  useEffect(() => {

  }, [props.maintainerState, props.loginState]);

  //  Need to add functionality that receives all locations from the backend
  //  I might leave as is
  const locations = props.locationState === '' ? [
    { location: "San Antonio", id: 1 },
    { location: "Fort Worth", id: 2 },
    { location: "Abilene", id: 3 },
    { location: "Lubbock", id: 4 },
    { location: "Amarillo", id: 5 },
    { location: "McAllen", id: 6 },
    { location: "Sugarland", id: 7 },
  ] : [];
  // ditto for categories
  const categories = props.categoryState === '' ? [
    { category: "Electrical", id: 1 },
    { category: "Plumbing", id: 3 },
    { category: "IT", id: 4 },
    { category: "Structural", id: 5 },
    { category: "Cleanup", id: 6 },
    { category: "Other", id: 7 },
  ] : [];

  const categoryClicked = (c) => {
    props.setCategoryState(c.category);
  };

  const locationClicked = (l) => {
    props.setLocationState(l.location);
  };

  const allLocationsClicked = () => {
    props.setLocationState('');
  };

  const allCategoriesClicked = () => {
    props.setCategoryState('');
  };

  const headerButtonClass = 'dropdown-trigger header-button center-align';

  return (
    <React.Fragment>
      <nav>
        <div className={headerCss}>
          {props.loginState && <a className="brand-logo">Maintenance Wombat Login</a>}
          {!props.loginState && props.maintainerState ? (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a className="brand-logo">Maintenance Requests</a>
          ) : (!props.loginState &&
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a className="brand-logo">Submit Maintenance Request</a>
          )}
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Header;