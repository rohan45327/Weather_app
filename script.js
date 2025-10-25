
const text=document.getElementById('main')
const cityname=document.getElementById('city')
const check=document.getElementById('check')
const temp=document.getElementById('card')
const weatherIcon = document.getElementById('weather-icon');
const bg=document.getElementById('bg')
const api='a7a13a7720231cd82fda6993eba18290'
const country='IN'
const base_url = 'https://api.openweathermap.org/data/2.5/weather?'
async function setbg(background) {
    try{
        const backs={
        'Clear':'https://i.pinimg.com/736x/fb/6a/8d/fb6a8de590bd6ebf1009e87018e866cb.jpg',
        'Rain':'https://media.licdn.com/dms/image/v2/C5612AQGfrCHgvYAtfg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1594661100786?e=2147483647&v=beta&t=1M4A7bsjOmTPGsV3MYC_qXH2KTktUhavELXuahqSwEs',
        'Sunny':'https://t4.ftcdn.net/jpg/03/29/60/15/360_F_329601547_xDmIzUwEyDSvDW6eGWQvFy044zGxcDTP.jpg',
        'Cloudy':'https://www.thoughtco.com/thmb/J3Rgj51HG6lQKDL8k-PJgtdf2bI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-528903279-599d1549aad52b001107054d.jpg',
        'Overcast':'https://media.gettyimages.com/id/682789858/video/rain-strom-in-sun-set.jpg?s=640x640&k=20&c=rlBwVrArS-ijdkhzQR_dzl4yKNBglAZX17GQiYBI3tk=',
        'Mist':'https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/FD4A/production/_87524846_87524845.jpg',
        'Clouds':'https://media.gettyimages.com/id/868958502/photo/the-london-o2-arena-and-river-thames-london.jpg?s=612x612&w=0&k=20&c=-vZbgxRYRrvIqGmMd6soTwNoxlDeOVL16L8ZXDcWv7o=',
        
        }
        if(background in backs){
            const bkurl=backs[background]
            bg.src=bkurl
        }
    }
    catch(error){
        console.error(error)
    }
    
}
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
        text=innerText="Please Check the city name provided"
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
        backgr=climate.main
        text.innerText=`The Weather in ${x} is ${temperature} but feels like ${feels_like}.Todays Weather is likely ${description} with ${humidity}% of humidity .The wind speed is ${wind} m/sec`;
        setbg(backgr)
    }
})
.catch(error => {
    console.error('Failed to fetch weather data:', error);
  });
})
