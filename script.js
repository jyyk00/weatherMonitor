
$(document).ready(function () {

    var apiKey = "611cbaabb5e7fb240aad688b17efbc18";

    $("#dateOne").text(moment().add(1, 'days').format('l'));
    $("#dateTwo").text(moment().add(2, 'days').format('l'));
    $("#dateThree").text(moment().add(3, 'days').format('l'));
    $("#dateFour").text(moment().add(4, 'days').format('l'));
    $("#dateFive").text(moment().add(5, 'days').format('l'));


    $("button").on("click", function () {
        event.preventDefault();
        var citySearch = $("input").val();
        if (citySearch === "") {
            return;
        }
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&APPID=" + apiKey;
        var queryUrl2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial&APPID=" + apiKey;
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {

            var currentDay = moment().format('l');
            $("h3").text(response.name + " " + "(" + currentDay + ")");
            $("#main1").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
            $(".temp").text("Temperature: " + response.main.temp + " \xB0F");
            $(".humid").text("Humidity: " + response.main.humidity + "%");
            $(".wind").text("Wind Speed " + response.wind.speed + " MPH");

            var lon = response.coord.lon
            var lat = response.coord.lat
            var queryUrl3 = "https://api.openweathermap.org/data/2.5/uvi?" + "lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

            $.ajax({
                url: queryUrl3,
                method: "GET"
            }).then(function (response3) {
                $(".uv").text("UV index: " + response3.value);
            })
        });

        $.ajax({
            url: queryUrl2,
            method: "GET"
        }).then(function (response2) {

            $("#day1T").text("temp: " + response2.list[5].main.temp + " \xB0F");
            $("#day2T").text("temp: " + response2.list[13].main.temp + " \xB0F");
            $("#day3T").text("temp: " + response2.list[21].main.temp + " \xB0F");
            $("#day4T").text("temp: " + response2.list[29].main.temp + " \xB0F");
            $("#day5T").text("temp: " + response2.list[37].main.temp + " \xB0F");

            $("#day1H").text("Humidity: " + response2.list[5].main.humidity + "%");
            $("#day2H").text("Humidity: " + response2.list[13].main.humidity + "%");
            $("#day3H").text("Humidity: " + response2.list[21].main.humidity + "%");
            $("#day4H").text("Humidity: " + response2.list[29].main.humidity + "%");
            $("#day5H").text("Humidity: " + response2.list[37].main.humidity + "%");

            $("#img1").attr("src", "https://openweathermap.org/img/w/" + response2.list[5].weather[0].icon + ".png");
            $("#img2").attr("src", "https://openweathermap.org/img/w/" + response2.list[13].weather[0].icon + ".png");
            $("#img3").attr("src", "https://openweathermap.org/img/w/" + response2.list[21].weather[0].icon + ".png");
            $("#img4").attr("src", "https://openweathermap.org/img/w/" + response2.list[29].weather[0].icon + ".png");
            $("#img5").attr("src", "https://openweathermap.org/img/w/" + response2.list[37].weather[0].icon + ".png");
        });
    });


    var cityList = $("ul");
    var cityArr = [];
    init();



    function renderStoredCity() {
        cityList.text("");
        for (var i = 0; i < cityArr.length; i++) {
            var a = $("<a>").attr("class", "list-group-item").text(cityArr[i].toLowerCase());
            cityList.prepend(a);
        }
    };

    $.each($("a"), function () {
        $(this).on("click", function () {
            $("input").val($(this).text());
        })
    });


    function init() {
        var storedCity = JSON.parse(localStorage.getItem("cityArr"));
        if (storedCity !== null) {
            cityArr = storedCity;
        }
        renderStoredCity();
    };

    function storeCity() {
        localStorage.setItem("cityArr", JSON.stringify(cityArr));
    };

    $("button").on("click", function () {
        event.preventDefault();
        var citySearch = $(this).prev().val().toLowerCase();
        if (citySearch === "") {
            return;
        }
        var cityRecent = citySearch.trim();
        for (var i = 0; i < cityArr.length; i++) {
            if (cityArr[i] === citySearch) {
                return;
            }
        }
        if (cityArr.length === 8) {
            cityArr.shift();
        }
        cityArr.push(cityRecent);
        storeCity();
        renderStoredCity();

    });






});