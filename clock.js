function getFormattedTime(){
  let dateTime = new Date();
  let hours = dateTime.getHours();
  if(hours>12){
    hours = hours-12;
  }
  let minutes = dateTime.getMinutes();
  if(minutes < 10){
    minutes = "0" + minutes;
  }
  let seconds = dateTime.getSeconds();
  if(seconds < 10){
    seconds = "0" + seconds;
  }

  let time = `${hours}:${minutes}:${seconds}`;
  return time;
}

function displayTime(){
  document.getElementById("clock").innerHTML = `<h1>${getFormattedTime()}</h1>`;

}

function getNews()
{
  const url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=143f2dc9a075469787596dc5899edd01";
  fetch(url)
  .then((resp) => resp.json())
  .then(function(data){
    console.log(data);
    storyArray = data;
    let out = "";
    for(var x=0; x< data.articles.length; x++){
      out += `<h2 class="item" onclick="displayStory(${x})">${data.articles[x].title}</h2>`;
    }
    document.getElementById('news').innerHTML = out;
  }).catch(function(error){
    alert(error);
  })
}

function displayStory(story){
  const title = storyArray.articles[story].title;
  const image = storyArray.articles[story].urlToImage;
  const source = storyArray.articles[story].source.name;
  const content = storyArray.articles[story].content;

  out = `<div id="touch" onclick="closeTouch()"><h2>${title}</h2>
  <img src="${image}" class="detailImage" />
  <h3>${source}</h3>
  <p>${content}</p></div>`;

  document.getElementById('detail').innerHTML = out;
  document.getElementById('clock').style.display = "none";
  document.getElementById('news').style.display = "none";

}

function closeTouch() {
document.getElementById('detail').innerHTML = "";
document.getElementById('clock').style.display = "block";
document.getElementById('news').style.display = "block";
}

let intv= setInterval(displayTime, 1000);
getNews();
