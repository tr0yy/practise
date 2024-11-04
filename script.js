$(document).ready(function(){
    let latitude;
    let longitude;
    $("#country").text("Location not found"); //Sets default text incase API fails to return data
    $.get(`https://corsproxy.io/?https%3A%2F%2Fapi.ipgeolocation.io%2Fipgeo%3FapiKey%3Db16f67a58d814945b552bde99ddaa004`,function(location){
        //Sets location on page
        $("#country").text(location.country_name_official);
        $("#city").text(location.city);
        latitude = location.latitude;
        longitude = location.longitude;

        //Gets weather data
        $.get(`https://corsproxy.io/?https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&past_days=1&forecast_days=1`,function(weather){
            const currentHour = new Date().getHours();
            //Formats weather data and loads it on page
            weather.hourly.temperature_2m.slice(currentHour, currentHour + 5).forEach((temp, index) => {
                temp = Math.trunc(temp)
                const hour = (currentHour + index) % 24;
                $("#temperature").append(`<div class="hourly_temp"><h3>${temp}C</h3><h4>${hour}:00</h4></div>`);
            });
        });
    });
});