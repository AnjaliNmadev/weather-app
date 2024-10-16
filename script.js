const apikey ="6970e727f1c6bdf5a659ea2765accbbe";
const apiurl= "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiURL ="https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";


$(document).ready( function()
{    
  clock();
  setInterval(clock,10);
  inputvalue.keypress(function (event)
{
    if( event.keyCode==13)  //for enter key 
    {
      fetchweatherdate(searchbox.value);
      fetchforecastedate(searchbox.value);
     
    }
})
  
});
  
const day =document.getElementById("dy"); 
const date =document.getElementById("dt");
const time = document.getElementById("t");

function clock()
{         //  Sat, 31 Aug 2023   04:05 PM 
   const monthname = [ "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","dec"];
    const dayname = [ "Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  
    const now = new Date();
    
    var mname = monthname[now.getMonth()];
    var dname = dayname[now.getDay()];
    var year = now.getFullYear();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var d = now.getDate();
    var ampm = hours >=12 ? 'PM':'AM';
     hours = hours % 12 || 12;  // hours in 12 houre formate
      hours = hours <10 ? '0' + hours : hours ;
      minutes =  minutes <10 ? '0' + minutes: minutes ;
    var cdy = d + " "+mname +" "+ year ;
    var ct = hours + ":"+ minutes + " "+ ampm ;
    day.textContent=dname + ",";
    date.innerHTML =cdy;
    time.textContent=ct;
  
} 
  //weather information
  const inputvalue = document.querySelector(".input-container");
  const searchbox = document.querySelector(".city-input");
  const searchbtn = document.querySelector(".search-btn");
  const weathericon = document.querySelector(".weather-summary-img");
  const weathertxt = document.querySelector(".condition-txt");
  const weatherinfo = document.querySelector(".weather-info");
  const weathererror = document.querySelector(".not-found ");
  const maincontainer = document.querySelector(".main-container");
  const searchcity = document.querySelector(".search-city");
  const forcasteitemconatiner = document.querySelector(".forcaste-item-conatiner");
 

 async function fetchweatherdate(city)
 {
    const response = await fetch(apiurl + city +`&appid=${apikey}`);

      //for page not found

      if(response.status==404)
      {
        
        weathererror.style.display="block";
        weatherinfo.style.display="none";
        searchcity.style.display="none";
       
        

      }
      else{

        var data = await response.json();
        document.querySelector(".city").innerHTML=data.name;
        document.querySelector(".temp-txt").innerHTML=Math.round(data.main.temp)+"℃ ";
        document.querySelector(".humidity-txt-value").innerHTML=data.main.humidity+"%";
        document.querySelector(".wind-txt-value").innerHTML=data.wind.speed+"m/s";
    
        if(data.weather[0].main == "Clouds")
        {
          weathericon.src ="images/clouds.png";
          weathertxt.innerHTML="Clouds"
        }
        else if(data.weather[0].main == "Rain")
        {
          weathericon.src ="images/thundersc.png";
           weathertxt.innerHTML="Rain"
        }
        else if(data.weather[0].main == "Drizzle")
          {
            weathericon.src ="images/drizzle.png";
             weathertxt.innerHTML="Drizzel"
          }
          else if(data.weather[0].main == "Mist")
            {
              weathericon.src ="images/mist.png";
               weathertxt.innerHTML="Mist"
            }
            else if(data.weather[0].main == "Clear")
              {
                weathericon.src ="images/clearcloud.png";
                 weathertxt.innerHTML="Clear"
              }
              else if(data.weather[0].main == "Haze")
                {
                  weathericon.src ="images/haze.png";
                   weathertxt.innerHTML="Haze"
                }
                else if(data.weather[0].main == "snow")
                  {
                    weathericon.src ="images/snow.png";
                     weathertxt.innerHTML="snow"
                  }
    
                else if(data.weather[0].main == "Fog")
                  {
                    weathericon.src ="images/fog.png";
                     weathertxt.innerHTML="Foggy"
                  }
                  weatherinfo.style.display="block";
                  weathererror.style.display="none";
                  searchcity.style.display="none";
                }
                
              

      }

      async function fetchforecastedate(city)
    {
      const response = await fetch(apiURL + city +`&appid=${apikey}`);
      var forecastedata = await response.json();
         

          const timetaken ='12:00:00';
          const todatdate = new Date().toISOString().split('T')[0];  //to compare date and split to next 5 day ,we haev 2 index 

          forcasteitemconatiner.innerHTML ='';



          forecastedata.list.forEach(forecastedata => {

            if( forecastedata.dt_txt.includes(timetaken) && !forecastedata.dt_txt.includes(todatdate) ) 
              {
           
            updateforecasteitems(forecastedata);
          } 
          });
    }




    function getWeatherIcon(id)
    {
        if(id<= 232 )  return 'thundersc.png';
        if(id<= 321 )  return 'drizzle.png';
        if(id<= 531 )  return 'thundersc.png';
        if(id<= 622)  return 'snow.png';
        if(id<= 781 )  return 'haze.png';
        if(id<= 800 )  return 'clearcloud.png';

        else   return 'clouds.png';

    }


    //update forecaste data for next 5 days

    function updateforecasteitems(weatherData)
    {
     console.log(weatherData);
     const { 
      dt_txt :date,
      weather : [{ id }],
      main : { temp }
  
    }  =weatherData ;

      let dates = new Date(weatherData.dt*1000 );
    let daydate = dates.getDate();
    const monthname = [ "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","dec"];
    var mname = monthname[dates.getMonth()];
    var year = dates.getFullYear();
    
     const forecasteitems =`

          <div class="forecaste-item" >
            <h5 class="forcaste-item-date regular-txt"> ${daydate } ${mname} ${year} </h5>
            <img src=" images/${getWeatherIcon(id)}"  class="forecaste-item-img">
            <h5 class="forecaste-item-temp"> ${ Math.round(temp)} ℃   </h5>
        </div> `  


      forcasteitemconatiner.insertAdjacentHTML('beforeend',forecasteitems);
    }
 
 searchbtn.addEventListener("click",()=>
  {
  fetchweatherdate(searchbox.value);
  fetchforecastedate(searchbox.value);
 });
 
 
