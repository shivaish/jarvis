const btn = document.querySelector('.talk');
const content = document.querySelector('.content');



function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

//start og

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}


window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
});

//till here

//weather
function weather(location) {
    const weatherCont=document.querySelector(".temp").querySelectorAll("*");
    
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=4a7584ec892700d20613efc8ca5924d0`;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onload = function () {
        if (this.status === 200) {
            let data = JSON.parse(this.responseText);
            weatherCont[0].textContent = `Location : ${data.name}`;
            weatherCont[1].textContent = `Country : ${data.sys.country}`;
            weatherCont[2].textContent = `Weather Type : ${data.weather[0].main}`;
            weatherCont[3].textContent = `Weather Description : ${data.weather[0].description}`;
            weatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            weatherCont[5].textContent = `Original Temperature : ${ktc(data.main.temp)}`;
            
            weatherCont[6].textContent =`But it feels like ${ktc(data.main.feels_like)}`;
            weatherCont[7].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
            weatherCont[8].textContent = `Max temperature ${ktc(data.main.temp_max)}`;

            weatherStatement=`The weather in ${data.name} is ${data.weather[0].description}, the original temperature is ${ktc(data.main.temp)} and
     feels like ${ktc(data.main.feels_like)}`;}
          else{
            weatherCont[0].textContent="Weather Info not Found";}};
            //end 
    xhr.send();
}


function ktc(k) {
    k = (k - 273.15);
    return k.toFixed(2);
}

//calling weather fnx
weather ("rohtak")
//weather end

//speech setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());

};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes("how are you") ) {
        speak("Hello Boss, I am fine");}
    else if (message.includes("who is your boss")||message.includes("who is your master") ) {
            speak("My boss is Mister Shivaish");}
            else if (message.includes("who is my mother") ) {
                speak(" mrs sanjay");}
                else if (message.includes("who is my father") ) {
                    speak("vinod ji khar");}
    else if (message.includes("hey") || message.includes("hello")) {
        speak("Hello Boss, How May I Help You?");
    }
    else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open(`https://youtube.com/youtube/${message.replace("youtube", "").trim()}`, "_blank");
       // window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes("wikipedia")) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia  ";
        speak(finalText);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    } else if (message.includes('temperature')) {
        speak(weatherStatement);}
    
        else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}