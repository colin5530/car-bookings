// VehicleCard imported from ./VehicleCard.js
console.log('car bookings');

fetch('http://www.cartrawler.com/ctabe/cars.json')
  .then(response => response.json())
  .then(data => {
    console.log('data', data);
    renderCarApp(data[0]);
  });

const processVehicleData = (vehicleData) => {
  const flattenedVehicles = [];
  vehicleData.forEach(vendor => {
    vendor.VehAvails.forEach(vehicle => {
      flattenedVehicles.push({
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

const renderCarApp = (data) => {
  const availableVehicles = processVehicleData(data?.VehAvailRSCore?.VehVendorAvails);
  console.log('availableVehicles', availableVehicles);
  
  document.getElementById('pickup-date').innerHTML = new Date(data.VehAvailRSCore.VehRentalCore['@PickUpDateTime']).toUTCString();
  document.getElementById('pickup-location').innerHTML = data.VehAvailRSCore.VehRentalCore.PickUpLocation['@Name'];
  document.getElementById('return-date').innerHTML = new Date(data.VehAvailRSCore.VehRentalCore['@ReturnDateTime']).toUTCString();
  document.getElementById('return-location').innerHTML = data.VehAvailRSCore.VehRentalCore.ReturnLocation['@Name'];

  // document.getElementsByClassName('vehicle-card').addEventListener((e) => {
  //   console.log('click e', e);
  // });
  // availableVehicles.sort((a, b) => parseFloat(a) - parseFloat(b));

  // document.getElementById("app").innerHTML = `
  //   <h1>Car Bookings</h1>
  //   <div class='legend-container'>
  //   <div class='legend-content'>
  //     <div class='legend-title'>Legend</div>
  //       <div class='legend-pickup'>
  //         <div class='legend-event-title'>Pick Up</div>
  //         <div class='legend-datetime'><span class='legend-event-attribute-title'>Date:</span> ${new Date(data.VehAvailRSCore.VehRentalCore['@PickUpDateTime']).toUTCString()}</div>
  //         <div class='legend-location'><span class='legend-event-attribute-title'>Location:</span> ${data.VehAvailRSCore.VehRentalCore.PickUpLocation['@Name']}</div>
  //       </div>
  //       <div class='legend-return'>
  //         <div class='legend-event-title'>Return</div>
  //         <div class='legend-datetime'><span class='legend-event-attribute-title'>Date:</span> ${new Date(data.VehAvailRSCore.VehRentalCore['@ReturnDateTime']).toUTCString()}</div>
  //         <div class='legend-location'><span class='legend-event-attribute-title'>Location:</span> ${data.VehAvailRSCore.VehRentalCore.ReturnLocation['@Name']}</div>
  //       </div>
  //     </div>
  //   </div>


  // document.getElementById('content').innerHTML = `
  //   <div>
  //     <div>${
  //       availableVehicles
  //         .sort((a, b) => parseFloat(a.estimatedTotal) - parseFloat(b.estimatedTotal))
  //         .map(vehicle => {
  //           console.log('vehicle', vehicle);

  //             return VehicleCard(vehicle);
        
  //         })
  //         .join('')
  //     }</div>
    
  //   </div>
  // `;

  const content = document.getElementById('content');

  const vehicleCardElements = availableVehicles
    .sort((a, b) => parseFloat(a.estimatedTotal) - parseFloat(b.estimatedTotal))
    .map(vehicle => VehicleCard(vehicle))
    .forEach(element => content.appendChild(element));

  console.log('vehicleCardElements', vehicleCardElements);

};
