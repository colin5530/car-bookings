import VehicleCard from './VehicleCard.js';
import ProfilePage from './ProfilePage.js';

let rawData;
let availableVehicles = [];

fetch('http://www.cartrawler.com/ctabe/cars.json')
  .then(response => response.json())
  .then(data => {
    rawData = data[0]
    renderCarApp(data[0]);
  });

const processVehicleData = (vehicleData) => {
  const flattenedVehicles = [];
  vehicleData.forEach(vendor => {
    vendor.VehAvails.forEach(vehicle => {
      flattenedVehicles.push({
        id: `${vendor.Vendor['@Name']}-${vehicle.Vehicle.VehMakeModel['@Name']}-${vehicle.Vehicle['@Code']}-${vehicle.TotalCharge['@RateTotalAmount']}`,
        name: vehicle.Vehicle.VehMakeModel['@Name'],
        airConditioning: vehicle.Vehicle['@AirConditionInd'],
        baggageQuantity: vehicle.Vehicle['@BaggageQuantity'],
        code: vehicle.Vehicle['@Code'],
        codeContext: vehicle.Vehicle['@CodeContext'],
        doorCount: vehicle.Vehicle['@DoorCount'],
        driveType: vehicle.Vehicle['@DriveType'],
        fuelType: vehicle.Vehicle['@FuelType'],
        passengerQuantity: vehicle.Vehicle['@PassengerQuantity'],
        transmission: vehicle.Vehicle['@TransmissionType'],
        pictureURL: vehicle.Vehicle['PictureURL'],
        currencyCode: vehicle.TotalCharge['@CurrencyCode'],
        estimatedTotal: vehicle.TotalCharge['@EstimatedTotalAmount'],
        rate: vehicle.TotalCharge['@RateTotalAmount'],
        status: vehicle['@Status'],
        vendor: {
          name: vendor.Vendor['@Name'],
          code: vendor.Vendor['@Code'],
        }
      })
    })
  });
  return flattenedVehicles;
}

const openHomePage = () => {

  // show legend
  const legend = document.getElementById('legend');
  legend.style.display = 'block';

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

  // add back button
  const backBtn = document.createElement('button');
  backBtn.className='back-button';
  backBtn.onclick=openHomePage;
  backBtn.appendChild(document.createTextNode('Back'));
  document.getElementById('back-btn').appendChild(backBtn)

  // show profile page
  content.appendChild(ProfilePage(vehicle));
}

const renderCarApp = (data) => {
  availableVehicles = processVehicleData(data?.VehAvailRSCore?.VehVendorAvails);
  
  // Normally innerHTML is not a good idea, but in the interest of time I am using it for this application
  document.getElementById('pickup-date').innerHTML = new Date(data.VehAvailRSCore.VehRentalCore['@PickUpDateTime']).toUTCString();
  document.getElementById('pickup-location').innerHTML = data.VehAvailRSCore.VehRentalCore.PickUpLocation['@Name'];
  document.getElementById('return-date').innerHTML = new Date(data.VehAvailRSCore.VehRentalCore['@ReturnDateTime']).toUTCString();
  document.getElementById('return-location').innerHTML = data.VehAvailRSCore.VehRentalCore.ReturnLocation['@Name'];

  const content = document.getElementById('content');

  availableVehicles
    .sort((a, b) => parseFloat(a.estimatedTotal) - parseFloat(b.estimatedTotal))
    .map(vehicle => {
      const card = VehicleCard(vehicle);
      card.addEventListener('click', (e) => {
        const vehicleNo = e.path.find((elem) => elem.id === 'vehicle-card-parent').name;
        openProfilePage(vehicleNo);
      });
      return card;
    })
    .forEach(element => content.appendChild(element));

};
