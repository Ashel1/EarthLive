var UIcontroller=(function(){
    var DOMStrings={
        inputCity: '.citybox',
        upper: '.cards'
        }
    return{
        getDOMstrings:function(){
        return DOMStrings;
        },
        displayWeather: function (data) {
            console.log('Display function is selected')
            var html,newHtml;
            html = '<div class="cityCard grow"><h1>%City%</h1><br><br><br><p>Temp: %temp% <br><br>Feels Like: %tempfelt%<br><br>Max Temp: %MaxTemp%<br><br>Min Temp: %MinTemp%<br><br>Pressure: %Pressure%<br><br>Humidity: %Humidity%<br><br></p></div>'
            newHtml=html.replace('%temp% ',data.main.temp+' C');
            newHtml = newHtml.replace('%City%', data.name);
            newHtml = newHtml.replace('%tempfelt%', data.main.feels_like + ' C');
            newHtml = newHtml.replace('%MaxTemp%', data.main.temp_max + ' C');
            newHtml = newHtml.replace('%MinTemp%', data.main.temp_min + ' C');
            newHtml = newHtml.replace('%Pressure%', data.main.pressure );
            newHtml = newHtml.replace('%Humidity%', data.main.humidity);
            document.querySelector(DOMStrings.upper).insertAdjacentHTML('beforeend',newHtml);
        }
    }
})();
var Appcontroller=(function(UIcontroller){
    var DOM=UIcontroller.getDOMstrings();
    var getCity=()=>{
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + document.querySelector(DOM.inputCity).value + '&units=metric&appid=d4a374e00a557b13a1142c3f1e466b72')
            .then(response => response.json())
            .then(data => {
                if(data.cod>=200 && data.cod<=299){
                    console.log(data);
                    UIcontroller.displayWeather(data);
            }else{
                    alert('Wrong data');
            }
        })
            .catch(err => alert("Network error"));

    }
    document.addEventListener('keypress', function (event) {
        if(event.keyCode===13 || event.which===13){
            getCity();
        }
    });
})(UIcontroller);