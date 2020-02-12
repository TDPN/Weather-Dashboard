var cities = ['Sacramento']



function displayWeatherInfo() {

    var city = $(this).attr("data-name")
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=b8b68f399c7de845feba2e117eb6858c";



    // Creating an AJAX call for the specific city button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        var UVIndex = `https://api.openweathermap.org/data/2.5/uvi?appid=9960537bc504b12a81ff658aa9dd27bd&lat=` + response.city.coord.lat + `&lon=` + response.city.coord.lon

        $.ajax({
            url: UVIndex,
            method: "GET"

        }).then(function (UVResponse) {
            
            //UV index
        $(`#result-uv-index`).text(`UV Index: ` + UVResponse.value)
            if (UVResponse.value <= 2){
                $(`#result-uv-index`).removeClass(`moderate`)
                $(`#result-uv-index`).removeClass(`high`)
                $(`#result-uv-index`).removeClass(`very-high`)
                $(`#result-uv-index`).addClass(`low`)
            } else if (UVResponse.value <= 5) {
                $(`#result-uv-index`).removeClass(`low`)
                $(`#result-uv-index`).removeClass(`high`)
                $(`#result-uv-index`).removeClass(`very-high`)
                $(`#result-uv-index`).addClass(`moderate`)
            } else if (UVResponse.value <= 7) {
                $(`#result-uv-index`).removeClass(`moderate`)
                $(`#result-uv-index`).removeClass(`low`)
                $(`#result-uv-index`).removeClass(`very-high`)
                $(`#result-uv-index`).addClass(`high`)
            } else {
                $(`#result-uv-index`).removeClass(`moderate`)
                $(`#result-uv-index`).removeClass(`high`)
                $(`#result-uv-index`).removeClass(`low`)
                $(`#result-uv-index`).addClass(`very-high`)
            }

        })
        

        var clear = `http://openweathermap.org/img/wn/01d@2x.png`
        var fewClouds = `http://openweathermap.org/img/wn/02d@2x.png`
        var scatteredClouds = `http://openweathermap.org/img/wn/03d@2x.png`
        var brokenClouds = `http://openweathermap.org/img/wn/04d@2x.png`
        var showerRain = `http://openweathermap.org/img/wn/09d@2x.png`
        var rain = `http://openweathermap.org/img/wn/10d@2x.png`
        var thunderStorm = `http://openweathermap.org/img/wn/11d@2x.png`
        var snow = `http://openweathermap.org/img/wn/13d@2x.png`


        // setting city name
        var cityDiv = $('#result-name');

        // Storing the city name
        var name = response.city.name;

        //storing the date

        var date = new Date(response.list[0].dt_txt)

        var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

        date = date.toLocaleDateString("en-US", options);
        //getting icon information
        var icon = response.list[0].weather[0].icon

        if (icon == `01d` || icon == `01n`) {
            var image = $(`#result-icon`).attr(`src`, clear)
            $(`#result-icon`).append(image)
        } else if (icon == `02d` || icon == `02n`) {
            var image = $(`#result-icon`).attr(`src`, fewClouds)
            $(`#result-icon`).append(image)
        } else if (icon == `03d` || icon == `03n`) {
            var image = $(`#result-icon`).attr(`src`, scatteredClouds)
            $(`#result-icon`).append(image)
        } else if (icon == `04d` || icon == `04n`) {
            var image = $(`#result-icon`).attr(`src`, brokenClouds)
            $(`#result-icon`).append(image)
        } else if (icon == `09d` || icon == `09n`) {
            var image = $(`#result-icon`).attr(`src`, showerRain)
            $(`#result-icon`).append(image)
        } else if (icon == `10d` || icon == `10n`) {
            var image = $(`#result-icon`).attr(`src`, rain)
            $(`#result-icon`).append(image)
        } else if (icon == `11d` || icon == `11n`) {
            var image = $(`#result-icon`).attr(`src`, thunderStorm)
            $(`#result-icon`).append(image)
        } else if (icon == `13d` || icon == `13n`) {
            var image = $(`#result-icon`).attr(`src`, snow)
            $(`#result-icon`).append(image)
        }



        // setting name and date text
        var cityName = $(`#result-name`).text(name + ` ` + date);

        // Displaying the city name
        cityDiv.append(cityName);

        // getting temp 
        var temp = response.list[0].main.temp;


        // setting temp text
        $("#result-temp").text("Temperature: " + temp + ` F°`);

        // getting humidity level
        var humidity = response.list[0].main.humidity


        // setting humidity text
        $("#result-humidity").text("Humidity: " + humidity + `%`);

        // getting wind speed
        var windSpeed = response.list[0].wind.speed

        // setting wind speed text
        $(`#result-wind-speed`).text(`Wind Speed: ` + windSpeed + ` MPH`)

        

        var cardIndex = 1;
        for (var i = 0; i < response.list.length; i += 8) {
            // Setting up forcast tiles
            var cardDate = new Date(response.list[i].dt_txt)

            var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

            cardDate = cardDate.toLocaleDateString("en-US", options);

            var cardTemp = response.list[i].main.temp
            var cardHumidity = response.list[i].main.humidity
            var cardIcon = response.list[i].weather[0].icon

            $(`#day${cardIndex}date`).text(cardDate)
            $(`#day${cardIndex}Temp`).text(`Temp: ` + cardTemp + `F°`)
            $(`#day${cardIndex}Humidity`).text(`Humidity: ` + cardHumidity + `%`)

            if (cardIcon == `01d` || cardIcon == `01n`) {
                var image = $(`#day${cardIndex}Icon`).attr(`src`, clear)
                $(`#day${cardIndex}Icon`).append(image)
            } else if (cardIcon == `02d` || cardIcon == `02n`) {
                var image = $(`#day${cardIndex}Icon`).attr(`src`, fewClouds)
                $(`#day${cardIndex}Icon`).append(image)
            } else if (cardIcon == `03d` || cardIcon == `03n`) {
                var image = $(`#day${cardIndex}Icon`).attr(`src`, scatteredClouds)
                $(`#day${cardIndex}Icon`).append(image)
            } else if (cardIcon == `04d` || cardIcon == `04n`) {
                var image = $(`#day${cardIndex}Icon`).attr(`src`, brokenClouds)
                $(`#day${cardIndex}Icon`).append(image)
            } else if (cardIcon == `09d` || cardIcon == `09n`) {
                var image = $(`#day${cardIndex}Icon`).attr(`src`, showerRain)
                $(`#day${cardIndex}Icon`).append(image)
            } else if (cardIcon == `10d` || cardIcon == `10n`) {
                var image = $(`#day${cardIndex}Icon`).attr(`src`, rain)
                $(`#day${cardIndex}Icon`).append(image)
            } else if (cardIcon == `11d` || cardIcon == `11n`) {
                var image = $(`#day${cardIndex}Icon`).attr(`src`, thunderStorm)
                $(`#day${cardIndex}Icon`).append(image)
            } else if (cardIcon == `13d` || cardIcon == `13n`) {
                var image = $(`#day${cardIndex}Icon`).attr(`src`, snow)
                $(`#day${cardIndex}Icon`).append(image)
            }
            cardIndex += 1;
        }
    });
}


// Function for displaying weather data
function renderButtons() {

    // Deletes the weather info prior to adding new info

    $("#buttons-view").empty();
    // Loops through the array of cities
    for (var i = 0; i < cities.length; i++) {

        // Then dynamicaly generates buttons for each city in the array
        var a = $("<button>");
        // Adds a class of city to our button
        a.addClass("city btn btn-primary m-1 col-12");
        // Added a data-attribute
        a.attr("data-name", cities[i]);
        // Provided the initial button text
        a.text(cities[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").prepend(a);
    }
}

// This function handles events where the search button is clicked
$("#button-addon2").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var city = $("#city-input").val().trim();    
    cities.push(city);
    //renderButtons 
        renderButtons();
});

// Adding click event listeners to all elements with a class of "city"
$(document).on("click", ".city", displayWeatherInfo);

// Calling the renderButtons function to display the initial buttons
renderButtons();