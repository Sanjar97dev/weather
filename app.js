const input = document.querySelector('input');
const root = document.querySelector('#root');
const globalRoot=document.querySelector('#glroot')

const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = 'f631ea87daddf959f8d7a12c30009e4c';
const imgUrl = 'https://openweathermap.org/img/wn/';

async function getWeather(name) {
  try {
    const res = await fetch(`${url}${name}&appid=${apiKey}`);
    const data = await res.json();
    console.log(data);
    renderInfo(data);
    glRenderInfo(data);
  } catch {
    alert('Кечиресиз, мындай шаар табылган жок.');
  }
}

function glRenderInfo(obj){
  globalRoot.innerHTML='';
  globalRoot.innerHTML=`
  <div class='gl-card'>
  <h2>${Math.floor(obj.main.temp)}°C</h2>
  <h3 class='name'>${obj.name}</h3>
  <img src='${imgUrl}${obj.weather[0].icon}@2x.png'/>
  </div>
  `
}

function renderInfo(obj) {
  root.innerHTML=''
  root.innerHTML = `
    <div class='city'>
      <h1>${obj.name}, ${obj.sys.country}</h1>
      <div class='country'>
        <img src='${imgUrl}${obj.weather[0].icon}@2x.png'/>
        <h2>${Math.floor(obj.main.temp)}°C</h2>
      </div>
      <p>${obj.weather[0].description}</p>
      <h3>Feels like: ${Math.floor(obj.main.feels_like)}°C</h3>
      <h4>Wind: ${obj.wind.speed}m/s, ${getWindDirection(obj.wind.deg)}</h4>
      <p>Clouds: ${obj.clouds.all}%</p>
      <h5>Pressure: ${obj.main.pressure}hPa</h5>
      <p>Humidity: ${obj.main.humidity}%</p>
    </div>
  `;
}



function getWindDirection(degrees) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

input.onchange = () => {
  getWeather(input.value);
};
