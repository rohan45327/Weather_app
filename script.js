const text=document.getElementById('main')
const cityname=document.getElementById('city')
const check=document.getElementById('check')
const temp=document.getElementById('card')
const weatherIcon = document.getElementById('weather-icon');
const api='a7a13a7720231cd82fda6993eba18290'
const country='IN'
const base_url = 'https://api.openweathermap.org/data/2.5/weather?'
check.addEventListener('click',()=>{
const x=cityname.value.trim()
if(!x){
    alert("PLEASE ENTER VALID CITY NAME")
    return;
}
const url= `${base_url}q=${x},${country}&appid=${api}&units=metric`
fetch(url)
.then(response=>{
    if(!response.ok){
        throw new Error(`Error ${response.status}`)
    }
    if(response=='Error 404'){
        text.innerText="Please Check the city name provided"
        throw new Error(`Error 404! not found ${x} city name in Dictionary`)
    }
    return response.json()
})
.then(data=>{
    if(data['cod']=='200'){
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

