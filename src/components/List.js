// src/components/List.js
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
const mapStateToProps = state => {
  return { alloys: state.alloys, selected: state.selected, waxWeight: state.waxWeight, calculate: state.calculate };
};
const ConnectedList = ({ alloys, selected, waxWeight, calculate }) => (
<div>
  <ul className='list-group list-group-flush'>
    {alloys.map(el => (
      <MenuItem className='list-group-item' key={el.id}>
        Alloy: {el.alloyName} Specific Density: {el.specificDensity}
      </MenuItem>
    ))}
    <MenuItem> Selected: {selected.alloyUsed} Specific Density: {selected.data}</MenuItem>
    <MenuItem> Wax Weight: {waxWeight.wax} </MenuItem>
    <MenuItem> Alloy Needed: {calculate.result} </MenuItem>
  </ul>

</div>
);
const List = connect(mapStateToProps)(ConnectedList);
export default List;