import { generateFilter } from "../utils/index.js";

const FilterBar = (availableVehicles, handleFilterChange) => {

  const filterBar = document.createElement('div');
  filterBar.className = 'filter-bar-container';
  filterBar.appendChild(generateFilter('doorCount', 'Doors', availableVehicles, handleFilterChange));
  filterBar.appendChild(generateFilter('passengerQuantity', 'Passengers', availableVehicles, handleFilterChange));
  filterBar.appendChild(generateFilter('fuelType', 'Fuel Type', availableVehicles, handleFilterChange));
  filterBar.appendChild(generateFilter('transmission', 'Transmission', availableVehicles, handleFilterChange));
  filterBar.appendChild(generateFilter('name', 'Name', availableVehicles, handleFilterChange));

  return filterBar;
}

export default FilterBar;