import VehicleCard from './VehicleCard.js';
import ProfilePage from './ProfilePage.js';
import FilterBar from './FilterBar.js';
import { processVehicleData } from '../utils/index.js'

let rawData;
let availableVehicles = [];
let filters = [];
let sortColumn = 'estimatedTotal';

fetch('http://www.cartrawler.com/ctabe/cars.json')
  .then(response => response.json())
  .then(data => {
    rawData = data[0]
    renderCarApp(data[0]);
  });

const openHomePage = () => {

  // show legend
  const legend = document.getElementById('legend');
  legend.style.display = 'block';

  // show sorting
  const sorting = document.getElementById('sorting-container');
  sorting.style.display = 'block';

  // remove back button
  const backBtn = document.getElementById('back-btn');
  backBtn.removeChild(backBtn.children[0]);

  // remove profile
  const content = document.getElementById('content');
  content.removeChild(content.children[0]);

  // show car list
  renderCarApp(rawData);
}

const openProfilePage = (vehicleId) => {
  // remove car list
  const content = document.getElementById('content');
  const children = content.childNodes;
  const childLength = children.length
  for (let i = 0; i < childLength; i++) {
    content.removeChild(children[0]);
  }

  // find clicked vehicle data
  const vehicle = availableVehicles.find(vehicle => vehicle.id === vehicleId);

  // hide legend
  const legend = document.getElementById('legend');
  legend.style.display = 'none';

  // hide filters
  const filterBar = document.getElementById('filter-bar');
  filterBar.style.display = 'none';

  // hide sorting
  const sorting = document.getElementById('sorting-container');
  sorting.style.display = 'none';

  // add back button
  const backBtn = document.createElement('button');
  backBtn.className='back-button';
  backBtn.onclick=openHomePage;
  backBtn.appendChild(document.createTextNode('Back'));
  document.getElementById('back-btn').appendChild(backBtn)

  // show profile page
  content.appendChild(ProfilePage(vehicle));
}

const handleFilterChange = (column, value) => {
  const filterIndex = filters.findIndex(filter => filter.column === column);
  // if filter doesn't already exist, add filter
  if (filterIndex === -1) {
    if (value !== 'ALL') {
      filters.push({column, value});
    }
  } else {
    // if filter does already exist, change value
    value === 'ALL'
      ? filters.splice(filterIndex, 1)
      : filters[filterIndex] = {column, value};
  }

  refreshRender();
}

const checkFilters = (vehicle) => {
  return filters.reduce((pass, filter) => {
    if (vehicle[filter.column] !== filter.value) {
      return false;
    }
    return pass;
  }, true);
}

const handleSortChange = (e) => {
  sortColumn = e.target.value;

  refreshRender();
}

const sortVehicles = (a, b) => {
  return parseFloat(a[sortColumn]) - parseFloat(b[sortColumn])
}

const refreshRender = () => {
  // remove car list
  const content = document.getElementById('content');
  const children = content.childNodes;
  const childLength = children.length
  for (let i = 0; i < childLength; i++) {
    content.removeChild(children[0]);
  }

  // show car list
  renderCarApp(rawData);
}

const renderCarApp = (data) => {
  availableVehicles = processVehicleData(data?.VehAvailRSCore?.VehVendorAvails);
  
  // Normally innerHTML is not a good idea, but in the interest of time I am using it for this application
  document.getElementById('pickup-date').innerHTML = new Date(data.VehAvailRSCore.VehRentalCore['@PickUpDateTime']).toUTCString();
  document.getElementById('pickup-location').innerHTML = data.VehAvailRSCore.VehRentalCore.PickUpLocation['@Name'];
  document.getElementById('return-date').innerHTML = new Date(data.VehAvailRSCore.VehRentalCore['@ReturnDateTime']).toUTCString();
  document.getElementById('return-location').innerHTML = data.VehAvailRSCore.VehRentalCore.ReturnLocation['@Name'];

  // show filters
  const filterBar = document.getElementById('filter-bar');
  if (filterBar.children.length > 0) {
    filterBar.style.display = 'block';
  } else {
    filterBar.appendChild(FilterBar(availableVehicles, handleFilterChange))
  }

  const sortInput = document.getElementById('sorting-container');
  sortInput.addEventListener('change', handleSortChange);

  const content = document.getElementById('content');
  const filteredVehicles = availableVehicles.filter(checkFilters)
  if (filteredVehicles.length > 0) {
    filteredVehicles
      .sort(sortVehicles)
      .map(vehicle => {
        const card = VehicleCard(vehicle);
        card.addEventListener('click', (e) => {
          const vehicleNo = e.path.find((elem) => elem.id === 'vehicle-card-parent').name;
          openProfilePage(vehicleNo);
        });
        return card;
      })
      .forEach(element => content.appendChild(element));
  } else {
    const noCars = document.createElement('div');
    noCars.className = 'no-cars-message';
    noCars.innerHTML = `<div>There are no cars available matching your settings.</div><div>Try changing the filters</div>`;
    content.appendChild(noCars);
  }
};
