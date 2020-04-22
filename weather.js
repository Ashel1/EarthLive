var button=document.querySelector('.button')
var inputValue=document.querySelector('.inputValue')
var name=document.queryCommandEnabled('.name')
var desc=document.queryCommandEnabled('.desc')
var temp=document.queryCommandEnabled('.temp')

button.addEventListener('click',function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=d4a374e00a557b13a1142c3f1e466b72')
    .then(response=>response.json())
    .then(data=>console.log(data))

    .catch(err=alert("Wrong city name!"))


})