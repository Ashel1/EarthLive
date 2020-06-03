var UIcontroller=(function(){
    var DOMStrings={
        inputCity: '.citybox',
        upper: '.cards',
        cityName:'.cityName',
        card1:'card1',
        card2:'card2',
        card3:'card3',
        card4:'card4',
        city_weather:'.city_weather'
        }
    var getDate=()=>{
        var date= new Date();
        var month=new Date();
        var year=new Date();
        date= date.getDate();
        if(date<10){
            date=('0'+date);
        }
        month = month.getMonth();
        month++;
        if (month < 10) {
            month = ('0' + month);
        }
        var monthDate=( year.getFullYear()+'-'+month+'-'+date);
        var today = new Date();
        var time = today.getHours()
        var approx = (time / 3);
        approx = Math.round(approx);
        approx = approx * 3;
        if(approx<10){
            approx='0'+approx;
        }
        time = approx + ":00:00";
        return (monthDate+' '+time);
    }

    var compareDate = (data) => {
        var date=getDate();
        var list = data.list;
        var i, current, todayEvening, tomorrowMorning,tomorrowEvening;
        for (i = 0; i < list.length; i++) {
            if (date === list[i].dt_txt) {
                break;
            }
        }
        current = i;
        todayEvening=5;
        tomorrowMorning=10;
        tomorrowEvening=13;
        dates={
            current: current,
            todayEvening: todayEvening,
            tomorrowMorning: tomorrowMorning,
            tomorrowEvening: tomorrowEvening
        }
        return dates;
    };


    var cards=(data)=>{
        var html, newHtml1, newHtml2, newHtml3;
        var { current, todayEvening, tomorrowMorning, tomorrowEvening}=compareDate(data);
        /*console.log(data.list[current].dt_txt);    
        console.log(data.list[todayEvening].dt_txt);
        console.log(data.list[tomorrowMorning].dt_txt);
        console.log(data.list[tomorrowEvening].dt_txt);      To check if date are correct */
        html = '<div class="weatherCard grow" id="%card%"><h1>%day%</h1><br><br><br><p>Temp: %temp% <br><br>Feels Like: %tempfelt%<br><br>Max Temp: %MaxTemp%<br><br>Min Temp: %MinTemp%<br><br>Pressure: %Pressure%<br><br>Humidity: %Humidity%<br><br></p></div>';
        
        newHtml1= html.replace('%day%', 'Current Weather');
        newHtml1 = newHtml1.replace('%temp%', data.list[current].main.temp + ' C');
        newHtml1 = newHtml1.replace('%card%','card1');
        newHtml1 = newHtml1.replace('%tempfelt%', data.list[current].main.feels_like + ' C');
        newHtml1 = newHtml1.replace('%MaxTemp%', data.list[current].main.temp_max + ' C');
        newHtml1 = newHtml1.replace('%MinTemp%', data.list[current].main.temp_min + ' C');
        newHtml1 = newHtml1.replace('%Pressure%', data.list[current].main.pressure);
        newHtml1 = newHtml1.replace('%Humidity%', data.list[current].main.humidity);
        
        newHtml2= html.replace('%day%','Today Evening');
        newHtml2 = newHtml2.replace('%temp% ', data.list[todayEvening].main.temp + ' C');
        newHtml2 = newHtml2.replace('%card%', 'card2');
        newHtml2 = newHtml2.replace('%tempfelt%', data.list[todayEvening].main.feels_like + ' C');
        newHtml2 = newHtml2.replace('%MaxTemp%', data.list[todayEvening].main.temp_max + ' C');
        newHtml2 = newHtml2.replace('%MinTemp%', data.list[todayEvening].main.temp_min + ' C');
        newHtml2 = newHtml2.replace('%Pressure%', data.list[todayEvening].main.pressure);
        newHtml2 = newHtml2.replace('%Humidity%', data.list[todayEvening].main.humidity);
        
        newHtml3 = html.replace('%day%', 'Tomorrow Morning');
        newHtml3 = newHtml3.replace('%temp% ', data.list[tomorrowMorning].main.temp + ' C');
        newHtml3 = newHtml3.replace('%card%', 'card3');
        newHtml3 = newHtml3.replace('%tempfelt%', data.list[tomorrowMorning].main.feels_like + ' C');
        newHtml3 = newHtml3.replace('%MaxTemp%', data.list[tomorrowMorning].main.temp_max + ' C');
        newHtml3 = newHtml3.replace('%MinTemp%', data.list[tomorrowMorning].main.temp_min + ' C');
        newHtml3 = newHtml3.replace('%Pressure%', data.list[tomorrowMorning].main.pressure);
        newHtml3 = newHtml3.replace('%Humidity%', data.list[tomorrowMorning].main.humidity);

        newHtml4 = html.replace('%day%', 'Tomorrow Evening');
        newHtml4 = newHtml4.replace('%temp% ', data.list[tomorrowEvening].main.temp + ' C');
        newHtml4 = newHtml4.replace('%card%', 'card4');
        newHtml4 = newHtml4.replace('%tempfelt%', data.list[tomorrowEvening].main.feels_like + ' C');
        newHtml4 = newHtml4.replace('%MaxTemp%', data.list[tomorrowEvening].main.temp_max + ' C');
        newHtml4 = newHtml4.replace('%MinTemp%', data.list[tomorrowEvening].main.temp_min + ' C');
        newHtml4 = newHtml4.replace('%Pressure%', data.list[tomorrowEvening].main.pressure);
        newHtml4 = newHtml4.replace('%Humidity%', data.list[tomorrowEvening].main.humidity);
        
        html={
            html1: newHtml1,
            html2: newHtml2,
            html3: newHtml3,
            html4: newHtml4,
        }
        return html;
    }
    return{
        displayWeather: function (data) {
            var city;
            var {html1,html2,html3,html4}=cards(data);
            city ='<div class="cityName"><h1 class="city">%City%</h1></div>';
            city=city.replace('%City%',data.city.name);
            document.querySelector(DOMStrings.city_weather).insertAdjacentHTML('afterbegin',city);
            document.querySelector(DOMStrings.upper).insertAdjacentHTML('beforeend',html1);
            document.querySelector(DOMStrings.upper).insertAdjacentHTML('beforeend', html2);
            document.querySelector(DOMStrings.upper).insertAdjacentHTML('beforeend', html3);
            document.querySelector(DOMStrings.upper).insertAdjacentHTML('beforeend', html4);
        },
        getDOMstrings: function () {
            return DOMStrings;
        },
        deletePreviousSearch(){
            var cityName,card1,card2,card3,card4;
            cityName=document.querySelector(DOMStrings.cityName);
            card1 = document.getElementById(DOMStrings.card1);
            card2 = document.getElementById(DOMStrings.card2);
            card3 = document.getElementById(DOMStrings.card3);
            card4 = document.getElementById(DOMStrings.card4);
            cityName.parentNode.removeChild(cityName);
            card1.parentNode.removeChild(card1);
            card2.parentNode.removeChild(card2);
            card3.parentNode.removeChild(card3);
            card4.parentNode.removeChild(card4);
        }
    }
})();


var Appcontroller=(function(UIcontroller){
    var DOM=UIcontroller.getDOMstrings();
    var flag=0;
    var getCity=()=>{
        fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + document.querySelector(DOM.inputCity).value + '&units=metric&appid=d4a374e00a557b13a1142c3f1e466b72')
            .then(response => response.json())
            .then(data => {
                if(data.cod>=200 && data.cod<=299){
                    console.log(data);
                    if (flag != 0) {
                        UIcontroller.deletePreviousSearch();
                    }
                    flag = 1;
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