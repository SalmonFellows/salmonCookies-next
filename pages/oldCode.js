/*
  FILE app.js
  date 2022-06-27
*/
'use strict';
console.log('app is connected');
//debugger;

/**
 * 
 */
function hourlyStoreTotalFooter(){
  let cookieTotal =0;
  let tFoot = document.getElementById('tableFooter');
  let tr= document.createElement('tr');
  tFoot.appendChild(tr);

  let tdTitle=document.createElement('td');
  tdTitle.textContent= 'Totals';
  tr.appendChild(tdTitle);


  for(let i =0; i < cookiesTotalHour.length; i++) {
    let cookiesForThisHour = cookiesTotalHour[i];
    cookieTotal += cookiesForThisHour;
    let cookieHourlyTotals =  document.createElement('td');
    cookieHourlyTotals.textContent = cookiesForThisHour;
    tr.appendChild(cookieHourlyTotals);// find equivalent value
  }

  let cookieTotals = document.createElement('td');
  cookieTotals.textContent = cookieTotal;
  tr.appendChild(cookieTotals);
}



//step 1 not in a function
let storeHours = ['6am', '7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];
let cookiesTotalHour =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,];
let storePlaces;// an array of locations

//step 2 Constructer Function
/**
 *
 * @param {string} storeLocation - this is the name of a city
 * @param {number} minimumCust
 * @param {number} maximumCust
 * @param {number} avgCookPerCust
 */
function Store(storeLocation , minimumCust, maximumCust, avgCookPerCust){
  this.storeLocation = storeLocation;
  this.minCust = minimumCust;
  this.maxCust = maximumCust;
  this.avgCookPerCust = avgCookPerCust;
  this.cookiesSold =[];
  this.numOfCookiesPerHour();
  Store.storeSites.push(this);
}

Store.storeSites=[];//not in a function

/**
 * 
 */
Store.prototype.numOfCookiesPerHour = function(){
  for(let i=0; i < storeHours.length; i++){
    this.cookiesSold[i]= Math.ceil(this.getRandomCustomersPerHour()* this.avgCookPerCust);
  }
};

/**
 * 
 * 
 */
Store.prototype.getRandomCustomersPerHour= function(){
  return Math.ceil(Math.random()* (this.maxCust- this.minCust)*this.minCust);
};// end constructor



/**
 * 
 */
function initialize(){
  console.log('In initialize()');
  //stores that can cause the old ones to be cleared out?
  storePlaces =[];

  render(storePlaces);
  // finding the survey form id in survey html, adding submit button which comes with event listener
  let form = document.getElementById('storeForm');
  form.addEventListener('submit', allowSubmit);
  let seattle = new Store('Seattle', 23, 65, 6.3);
  let tokyo = new Store('Tokyo',3,24,1.2 );
  let dubai = new Store('Dubai',11,38,3.7);
  let paris = new Store('Paris',20,38,2.3);
  let lima = new Store('Lima',2,16,4.6);
  let allStores = [seattle,tokyo,dubai,paris,lima];
  console.log('Our Stores', allStores);
  Store.renderAll();

}


// stop submit button from submitting
/**
 * 
 * @param {*} evt 
 */
function allowSubmit(evt){
  evt.preventDefault();
  // retrieving form id's and connecting them to javascript counteparts.
  let storeLocation = document.getElementById ('storeLocation').value;
  let minimumCust = document.getElementById('minimumCust').value;
  let maximumCust = document.getElementById('maximumCust').value;
  let avgCookPerCust = document.getElementById ('avgCookPerCust').value;

  let storePlace  = new Store(storeLocation , minimumCust, maximumCust, avgCookPerCust);
  // adding new stores to table
  storePlaces.push(storePlace);
  Store.renderAll();
}


// render survey function

/**
 * 
 * @param {*} storePlaces 
 */
function render(storePlaces){
  let locationTable = document.getElementById('locationTable');
  // clears out old and reloads new records
  locationTable. innerHTML =' ';
  // draws records into empty string

  // loop through storeplaces
  for (let i = 0; i< storePlaces.length; i++){
    let storePlace = storePlaces[i];
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.innerText = storePlace.storeLocation;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerText = storePlace.minimumCust;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerText = storePlace.maximumCust(', ');
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerText = storePlace.avgCookPerCust;
    tr.appendChild(td);
  }
}
//end


// Render Function

/**
 * 
 */
Store.prototype.render = function(){
  let cookieTotal= 0;
  let tbody = document.getElementById ('dataOfStore');
  let tr =document.createElement('tr');
  tbody.appendChild (tr);

  // adding table data using store locations
  let tdStoreLocation = document.createElement('td');
  tdStoreLocation.textContent = this.storeLocation;
  console.log(this.storeLocation);
  tr.appendChild(tdStoreLocation);

  // store hours
  for(let i = 0; i < storeHours.length; i++){
    let cookiesForThisHour = this.cookiesSold[i];
    cookiesTotalHour[i] += cookiesForThisHour;
    cookieTotal += cookiesForThisHour;

    let cookieHourlyData = document.createElement('td');
    cookieHourlyData.textContent = cookiesForThisHour;
    tr.appendChild(cookieHourlyData);
  }
  let cookieTotals = document.createElement('td');
  cookieTotals.textContent = cookieTotal;
  tr. appendChild(cookieTotals);
};//end render()

// Add Button Function

/**
 * 
 */
function addLocation(evt) {
  evt.preventDefault();
  console.log('In addLocation()');
  let good = true; // flags whether the form input is good
  let storeLocation = document.getElementById('storeLocation').value.trim();
  if (storeLocation === '') {
    // Name is required!
    good = false;
    let span = document.getElementById('storeLocationError');
    span.innerText = 'Location cannot be blank!';
    let br = document.createElement('br');
    span.appendChild(br);
  }
  let minimumCust = document.getElementById('minimumCust').value;
  minimumCust = minimumCust.trim();
  let maximumCust = document.getElementById('maximumCustomer');
  let avgCookPerCust = document.getElementById('average cookies per customer');
  if (good) {
    let store = new Store(storeLocation , minimumCust, maximumCust, avgCookPerCust);
    storePlaces.push(store);
    render(store);

  }
}

/**
 * 
 */
Store.renderAll= function(){
  let tbody = document.getElementById ('dataOfStore');
  tbody.innerHTML= "";
  for(let i = 0; i < Store.storeSites.length; i++){
    Store.storeSites[i].render();
  }

  hourlyStoreTotalFooter();
};


// luis js

'use strict';

// ****** WINDOW INTO THE DOM *********
let storeTable = document.getElementById('store-tables')
let storeForm = document.getElementById('my-form')

// All hours array
let hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm']
// cities array
let theCities = [];
// constructors
function Cities(city, minCustomer, maxCustomer, avgCookieBought) {
  this.city = city;
  this.minCustomer = minCustomer;
  this.maxCustomer = maxCustomer;
  this.avgCookieBought = avgCookieBought;
  this.cookiesBoughtPerHour = [];
  this.total = 0;
  theCities.push(this);
}
// constructor prototype:
Cities.prototype.randomCustomerPerHour = function () {
  return Math.floor(Math.random() * (this.maxCustomer - this.minCustomer + 1) + this.minCustomer);
}
// Random function/prototype
Cities.prototype.calcCookies = function () {
  for (let i = 0; i < hours.length; i++) {
    let number = Math.round(this.randomCustomerPerHour() * this.avgCookieBought)
    this.cookiesBoughtPerHour.push(number)
    this.total += number
  }
}
// my table render
Cities.prototype.render = function () {
  this.calcCookies();
  let row1 = document.createElement('tr');
  storeTable.appendChild(row1);

  let elem1 = document.createElement('td');
  elem1.textContent = this.city;
  row1.appendChild(elem1);

  for (let i = 0; i < this.cookiesBoughtPerHour.length; i++) {
    let elem2 = document.createElement('td');
    elem2.textContent = this.cookiesBoughtPerHour[i];
    row1.appendChild(elem2);
  }
  let myTotal = document.createElement('td');
  myTotal.textContent = this.total;
  row1.appendChild(myTotal);
};
// my table head
function tableHeader() {
  let theHeader = document.createElement('thead');
  storeTable.appendChild(theHeader);

  let row2 = document.createElement('tr');
  theHeader.appendChild(row2);

  let elem1 = document.createElement('td');
  row2.appendChild(elem1);

  for (let i = 0; i < hours.length; i++) {
    let elem2 = document.createElement('td');
    elem2.textContent = hours[i];
    row2.appendChild(elem2);
  }
  let total = document.createElement('td');
  total.textContent = 'Total';
  row2.appendChild(total);
}

tableHeader();

// my table footer
function tableFooter() {
  let theFooter = document.createElement('tfoot');
  storeTable.appendChild(theFooter);

  let newRow = document.createElement('tr');
  theFooter.appendChild(newRow);

  let tdElem = document.createElement('td');
  tdElem.textContent = 'Totals';
  newRow.appendChild(tdElem);

  let grandTotal = 0;

  for (let i = 0; i < hours.length; i++) {
    let totalHour = 0;
    for (let j = 0; j < theCities.length; j++) {
      totalHour = totalHour + theCities[j].cookiesBoughtPerHour[i];
      grandTotal = grandTotal + theCities[j].cookiesBoughtPerHour[i];
    }
    let td = document.createElement('td');
    td.textContent = totalHour;
    newRow.appendChild(td);
  }
  let ted = document.createElement('td');
  ted.textContent = grandTotal;
  newRow.appendChild(ted);
}
// making my cities
let Seattle = new Cities('Seattle', '23', '65', '6.3');
let Tokyo = new Cities('Tokyo', '3', '24', '1.2');
let Dubai = new Cities('Dubai', '11', '38', '3.7');
let Paris = new Cities('Paris', '20', '38', '2.3');
let Lima = new Cities('Lima', '2', '16', '4.6');
// make city function
function renderCities() {
  for (let i = 0; i < theCities.length; i++) {
    let currentCity = theCities[i];
    currentCity.render();
  }
}
// calling city function
renderCities();
// calling footer function
tableFooter();
// function for form submit
function newSubmit(event){
  event.preventDefault();
  
  let locationName = event.target.namecity.value;
  let minCo = +event.target.cookiesMin.value;
  let maxCo = +event.target.cookiesMax.value;
  let avgCo = +event.target.cookiesavg.value;
  
  let subLocation = new Cities(locationName, minCo, maxCo, avgCo);
  
  document.getElementById("store-tables").deleteTFoot();
  subLocation.randomCustomerPerHour();
  subLocation.render();
  tableFooter();
}
// event listener
storeForm.addEventListener('submit', newSubmit);