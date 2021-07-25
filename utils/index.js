
export const currencyCodeSymbols = {
  'EUR': '€',
  'GBP': '£',
  'USD': '$',
  'CAD': '$',
};

export const processVehicleData = (vehicleData) => {
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

export const generateFilter = (column, label, availableVehicles, handleFilterChange) => {
  const handleFilter = (e) => {
    handleFilterChange(column, e.target.value);
  }

  const getFilterOptions = () => {
    const values = [...new Set(availableVehicles.map(vehicle => vehicle[column]))];


    const allOption = document.createElement('option');
    allOption.value = 'ALL';
    allOption.default = true;
    allOption.appendChild(document.createTextNode('ALL'));


    const options = values.map(value => {
      const option = document.createElement('option');
      option.value = value;
      option.appendChild(document.createTextNode(value));
      return option;
    });

    return [allOption, ...options]
  }

  const filterInput = document.createElement('select');
  filterInput.id = `${column}-filter`;
  filterInput.addEventListener('change', handleFilter);
  getFilterOptions().forEach(option => filterInput.appendChild(option));

  const filter = document.createElement('div');
  filter.className = 'filter-container';
  filter.appendChild(document.createTextNode(`${label}: `))
  filter.appendChild(filterInput);

  return filter;
}