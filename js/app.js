
let formFlightInput = document.getElementById('flightForm');
formFlightInput.addEventListener('submit', createFlight);

class Flight {
    constructor(flightNo, id, name, surname, toCity, fromCity, price, luggage, note) {
        this.flightNo=flightNo;
        this.personId =id;
        this.name = {
            name,
            surname
        };
        this.fromCity=fromCity;
        this.toCity=toCity;
        this.luggage = luggage;
        this.price = price;
        this.price_lug = luggage>20 ? 20 : 0;
        this.price_total = luggage>20 ? parseInt(price)+20 : 0;
        this.note = note;

    }
}
function createFlight(e){
    e.preventDefault();
    let newFl = new Flight(
        formFlightInput.elements['flightNo'].value,
        formFlightInput.elements['personId'].value,
        formFlightInput.elements['name'].value,
        formFlightInput.elements['surname'].value,
        formFlightInput.elements['fromCity'].value,
        formFlightInput.elements['toCity'].value,
        formFlightInput.elements['price'].value,
        formFlightInput.elements['luggage'].value,
        formFlightInput.elements['notes'].value
    );
    //Show modal Bootstrap jquery
    $('#myModal').modal('show');

    printTicket(newFl);
}

function printTicket(flight){
    document.getElementById('modal_name').innerText=flight.name['name'];
    document.getElementById('modal_surname').innerText=flight.name['surname'];
    document.getElementById('modal_id').innerText=flight.personId;
    document.getElementById('modal_from').innerText=flight.fromCity;
    document.getElementById('modal_to').innerText=flight.toCity;
    document.getElementById('modal_luggage').innerText=flight.luggage;
    document.getElementById('modal_notes').innerText=flight.note;

    document.getElementById('modal_price').innerText=flight.price;
    document.getElementById('modal_lug').innerText=flight.price_lug;
    document.getElementById('modal_total').innerText=flight.price_total;
    document.getElementById('modal_flightNo').innerText=flight.flightNo;

    document.getElementById("flightForm").reset();
}

//Load datalist 'from' and 'to'
window.onload = async function() {

    let response1 = await fetch(`https://data.opendatasoft.com/api/records/1.0/search/?dataset=airports-code%40public&facet=country_name`);
    response1.json().then(data=>
    {for (let i =0; i<data['records'].length; i++){
        let miestas = document.createElement('option');

        miestas.value= data['records'][i]['fields']['airport_name'];

        document.getElementById('fromCities').appendChild(miestas);
    }});
    let response2 = await fetch(`https://data.opendatasoft.com/api/records/1.0/search/?dataset=osm-world-airports%40babel&facet=country`);
    response2.json().then(data=>
    {for (let i =0; i<data['records'].length; i++){
        let miestas = document.createElement('option');

        miestas.value= data['records'][i]['fields']['name'];

        document.getElementById('toCities').appendChild(miestas);
    }});
};





