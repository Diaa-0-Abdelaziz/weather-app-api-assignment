//***********the days of week start from sunday in javascript and the value of sunday == 1*************** 
//***********the months of year start from January  and the value of January == index [0] *************** 

let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
let Days = [ "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let dateNow = new Date()
let month = dateNow.getMonth()
let day = dateNow.getDay()
//**get today's date [1 - 31]** 
let dateOfDay = dateNow.getDate()
//**print name of day by using array of --Days-- and knowing the day by using getDay()**
let printDay = Days[day]
//**print name of month by using array of --months-- and knowing the day by using getMonth()**
let prinMonth = months[month]

//**knowing weather's data by using value of input search**
let searchInput = document.getElementById("search")
searchInput.addEventListener("change", function(){
    getAPI(searchInput.value);
    clearInput();
})
//**show default data**
getAPI("egypt")
//**calling api**
async function getAPI(result){
    let APIKey = "6a02086e510a477a878145757240201";
    let getAPI = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${APIKey}&q=${result}&days=3`);
    const data = await getAPI.json();
    showData(data)
    showDataForNextDays(data)
}
getAPI();

//**showing weather data today function** 
function showData(list){
    document.getElementById("location").innerHTML=`
    ${list.location.country} - ${list.location.region} - ${list.location.name}
    `
    let mainData = `
    <div class="artPop">
    <article>
        <p class="d-flex justify-content-between mt-2 text-light fw-bolder bg-gradient p-3">
            <span>${printDay}</span>
            <span>${dateOfDay}/${prinMonth}</span>
        </p>
         <div class="content">
            <div class="country">
                <p class="text-light my-3 fs-4 fw-bold">${list.location.name}</p>
            </div>
            <div class="degree d-flex justify-content-between">
                <h2 class="mx-2 text-primary">${list.current.temp_c}<span class="text-light">ºC</span></h2>
                <img src="http:${list.current.condition.icon}" class="" alt="">
            </div>
            <div class="info">
                <p class="text-light bg-dark rounded fs-5 fw-bolder badge" style="letter-spacing: 2px;">${list.current.condition.text}</p>
            </div>

            <ul class="d-flex justify-content-around text-light list-unstyled">
                <li><i class="fa-solid fa-droplet"></i> ${list.current.humidity}%</li>
                <li><i class="fa-solid fa-wind"></i> ${list.current.wind_kph}km/h</li>
                <li><i class="fa-regular fa-compass"></i> ${list.current.wind_dir}</li>
            </ul>
         </div>
    </article>
</div>
    `
    document.getElementById("weatherData").innerHTML = mainData;
}
//**showing weather data tomorrow and after tomorrow function** 
function showDataForNextDays(tomorrowData){
    let tbody = "";
    for (let T = 0; T < 2; T++) {
        //**calc 2 days after the day and showing every one in row of the table**
        let afterTheDay = tomorrowData.forecast.forecastday[T+1].date
        let changeAfterTheDaySyntax = new Date(afterTheDay)
        let finallyPrintTheDay = Days[changeAfterTheDaySyntax.getDay()]
        tbody += `

         <tr>
         <td class="fw-bolder">${finallyPrintTheDay}</td>
         <td>${tomorrowData.forecast.forecastday[T+1].day.maxtemp_c}ºC</td>
         <td>${tomorrowData.forecast.forecastday[T+1].day.mintemp_c}ºC</td>
         <td>${tomorrowData.forecast.forecastday[T+1].day.condition.text}</td>
         <td> <img src="http:${tomorrowData.forecast.forecastday[T+1].day.condition.icon}" alt=""></td>
         <td>${tomorrowData.forecast.forecastday[T+1].astro.sunrise}</td>
         <td>${tomorrowData.forecast.forecastday[T+1].astro.sunset}</td>
       </tr>
    `
    document.getElementById("tbody").innerHTML = tbody;
    }
    
}


function clearInput(){
    searchInput.value = "";
}















