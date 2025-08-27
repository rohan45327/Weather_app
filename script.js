const text=document.getElementById('main')
const cityname=document.getElementById('city')
const check=document.getElementById('check')
const temp=document.getElementById('card')
const weatherIcon = document.getElementById('weather-icon');
const api='4d27d404fbf77aee75a28d12430fbab9'
const country='IN'
const base_url = 'https://api.openweathermap.org/data/2.5/weather?'
check.addEventListener('click',()=>{
const x=cityname.value.trim()
if(!x){
    alert("PLEASE ENTER VALID CITY NAME")
    return;
}
const url= `${base_url}q=${x},${country}&appid=${api}&units=metric`
text.innerText = `Fetching weather for ${x}...`;
fetch(url)
.then(response=>{
    if(!response.ok){
        throw new Error(`Error ${response.status}`)
    }
    return response.json()
})
.then(data=>{
    if(data['cod']!='404'){
        main = data["main"]
        climate = data["weather"][0]
        temperature = main["temp"]
        feels_like = main["feels_like"]
        description = climate["description"]
        humidity = main["humidity"]
        const iconId = climate["icon"];
        const iconUrl = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = climate["description"];
        wind=data['wind']['speed']
        temp.innerText=`${temperature} C`
        text.innerText=`The Weather in ${x} is ${temperature} but feels like ${feels_like}.Todays Weather is likely ${description} with ${humidity}% of humidity .The wind speed is ${wind} m/sec`;
    }
})
.catch(error => {
    console.error('Failed to fetch weather data:', error);
  });

})
