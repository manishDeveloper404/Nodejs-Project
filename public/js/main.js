const searchData = document.getElementById('searchdata');
const city = document.getElementById("city");
const time = document.getElementById("time");
const day = document.getElementById("day");
const tem = document.getElementById("temp");
const temStatus = document.getElementById("temp-status");
const output = document.getElementById("output");
const date1 = document.getElementById("date");
const showHide = document.querySelector(".showhide");

const sunRise = document.getElementById("rise");
const sunSet = document.getElementById("set");
const humi = document.getElementById("humidity");
const press = document.getElementById("pressure");
const windSpeed = document.getElementById("windspeed");

const loc = document.getElementById("loc");
const riseImg = document.getElementById("rise-img");
const setImg = document.getElementById("set-img");



const menubars = document.querySelector(".open");
const close = document.querySelector("#close");
const menu = document.querySelector(".menu");


close.addEventListener("click", () => {
    menu.style.transform = "translateX(-100%)";
});

menubars.addEventListener("click", () => {
    menu.classList.toggle("opencolse");
});




// const city = "pune";
// alert("Manish Kumar");

const getInfo = async (event) => {
    event.preventDefault();    //======>to prevent data not reload 
    // debugger;
    let cityValue = city.value;

    console.log(cityValue);
    if (cityValue == "") {
        output.innerText = `Enter City Name before Search`;
        showHide.classList.add("showhide");
    } else {

        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=89bbf6c1b0682176c05edc2bc8105e36`;
            const response = await fetch(url);     //feachApi
            const data = await response.json();
            const dataArr = [data];
            // console.log(dataArr.main["temp"]);
            loc.innerHTML = "&#xf041";
            loc.style.color = "red";
            output.innerHTML = ` ${cityValue},${dataArr[0].sys.country}`;
            tem.innerHTML = dataArr[0].main.temp;
            tempCond = dataArr[0].weather[0].main;
            // tempCond = Rain;
            humi.innerHTML = `Humidity: ${dataArr[0].main.humidity}`;
            press.innerHTML = `Pressure: ${dataArr[0].main.pressure}mbar`;
            windSpeed.innerHTML = `Wind Speed: ${dataArr[0].wind.speed}km/h`;
            var sunriseTime = dataArr[0].sys.sunrise;
            var sunsetTime = dataArr[0].sys.sunset;
            var sunriseTimes1 = new Date(sunriseTime * 1000);
            var sunsetTimes1 = new Date(sunsetTime * 1000);

            var sunriseTimes = sunriseTimes1.toLocaleTimeString();
            var sunsetTimes = sunsetTimes1.toLocaleTimeString();
            riseImg.src = "img/sunrise.png";
            setImg.src = "img/sunset.png";
            sunRise.innerHTML = `${sunriseTimes}`;
            sunSet.innerHTML = `${sunsetTimes}`;

            if (tempCond == "Clear") {
                // temStatus.innerHTML = "&#xf185";
                // temStatus.style.color = "#eccc68";
                temStatus.src = "img/weatherstatus/sunny.png";
            } else if (tempCond == "clouds") {
                // temStatus.innerHTML = "&#xf0c2";
                // temStatus.style.color = "#f1f2f6";
                temStatus.src = "img/weatherstatus/clouds.png";
            } else if (tempCond == "Rain") {
                // temStatus.innerHTML = "&#x1F327;";
                // temStatus.style.color = "#a4b0be";
                temStatus.src = "img/weatherstatus/rain.png";
            } else if (tempCond == "Haze" || tempCond == "smoky") {
                // temStatus.style.color = "#C6C6DC";
                // temStatus.innerHTML = "&#127787;";
                temStatus.src = "img/weatherstatus/foggy.png";
            } else {
                // temStatus.innerHTML = "&#xf185;";
                // temStatus.style.color = "yellow";
                temStatus.src = "img/weatherstatus/sunny.png";
            }
            showHide.classList.remove("showhide");

        } catch {
            output.innerText = `Plz Enter Valid City`;
            showHide.classList.add("showhide");
        }
    }
};

searchData.addEventListener('click', getInfo);


function showTime() {
    var date = new Date();

    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var days = date.getDay();
    var months = date.getMonth();
    var dates = date.getDate();
    // var dayss = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var dayss = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    var monthss = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    day.innerHTML = dayss[days];
    date1.innerHTML = `${dates},${monthss[months]}`;

    if (h == 0) {
        h = 12;
    }

    if (h >= 12) {
        h = h - 12;
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    var times = `${h}:${m}:${s}`;
    time.innerText = times;
    time.textContent = times;

    setTimeout(showTime, 1000);

}
showTime();


