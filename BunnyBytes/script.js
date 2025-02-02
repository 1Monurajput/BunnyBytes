console.log("script.js");

const time = document.getElementById("time");
const word = document.getElementById("word");
const chars = document.getElementById("chars");
const acc = document.getElementById("accuracy");

const hidden = document.getElementById("hidden-output");
const output = document.getElementById("output");
const input = document.getElementById("textarea");

const progress = document.getElementById("progress");

var wordSpeed;
var charSpeed;
var accuracySpeed;


var flag = false;

var paragraphs = [
  "Success is not just about talent but also about persistence. Hard work, dedication, and discipline pave the way to achievement. Many people give up when challenges arise, but those who push through adversity often reach their goals. Stay focused, keep learning, and never be afraid to make mistakes. Every setback is a lesson in disguise, guiding you toward a brighter future. It's important to recognize that success doesn't happen overnight. It requires patience, perseverance, and the ability to adapt to changing circumstances. If you continue to work hard and remain determined, you'll eventually see the fruits of your efforts, no matter how difficult the journey may seem.",
  "Technology has transformed the way we live, work, and communicate. From smartphones to artificial intelligence, innovations continue to shape our daily routines. The internet has connected the world like never before, making information accessible with just a few clicks. As technology advances, adapting to change is essential for growth and progress in the modern era. Today, people are able to work remotely, connect with others across the globe, and learn new skills at their own pace, thanks to the power of digital tools. Embracing these technological advancements is crucial for staying competitive and achieving success in various industries, from business to healthcare to education.",
  "A beautiful sunrise marks the beginning of a new day. The golden rays spread warmth and light, inspiring hope and positivity. Birds chirp in harmony as nature awakens from its slumber. The world feels fresh, offering endless possibilities to those who embrace the morning with energy and enthusiasm. Every sunrise is a reminder that each day brings a new opportunity. It's a chance to reset, refocus, and set new goals for the day ahead. Whether you take time to meditate, exercise, or simply enjoy the view, starting your day with intention can set the tone for a more productive and fulfilling day. Every new morning is a blessing.",
  "Reading books is one of the best habits a person can develop. It expands knowledge, enhances creativity, and improves vocabulary. Whether fiction or non-fiction, books transport readers to different worlds and perspectives. A good book can inspire, educate, and entertain, making it a lifelong source of wisdom and joy. The more you read, the more you grow. It also opens up new ways of thinking and encourages personal growth. Books provide an escape from reality and offer valuable insights into human nature, history, and society. If you make reading a daily habit, you'll continually enrich your life and broaden your understanding of the world around you.",
  "Exercise is essential for a healthy body and mind. Regular physical activity boosts energy, reduces stress, and strengthens the heart. Simple habits like walking, stretching, or cycling can make a significant difference over time. Staying active not only improves physical fitness but also enhances mental well-being, leading to a happier and more fulfilling life. It's important to find an exercise routine that works for you and your lifestyle. Whether it's yoga, running, or lifting weights, any form of exercise can contribute to a healthier, more balanced life. Remember, consistency is key, and even small changes in your routine can have long-lasting benefits for both your body and mind.",
  "The world is full of amazing opportunities waiting to be discovered. Every day brings new possibilities, whether it's learning something new, meeting someone inspiring, or exploring a new place. Embracing opportunities requires a mindset of openness and curiosity. By staying positive and proactive, you can find ways to turn challenges into opportunities for growth. It's important to remain flexible and adaptable as the world changes around you. Pursuing your passions and following your interests can lead to remarkable experiences and personal growth. Never underestimate the power of seizing the right opportunities at the right time, as they may open doors to new adventures and achievements you never imagined.",
  "The internet has become an essential part of daily life for millions of people around the world. It connects individuals, businesses, and communities, enabling communication and access to information in ways never before possible. Through the internet, people can shop online, take classes, work remotely, and even stay in touch with friends and family. It has revolutionized the way we live, making our lives more convenient and efficient. However, it's important to use the internet responsibly, being mindful of privacy and security. As technology continues to evolve, the internet will only become more integrated into our lives, offering even more opportunities for innovation and connection.",
  "The importance of a good night's sleep cannot be overstated. Sleep is vital for both physical and mental health. During sleep, the body repairs itself, the brain consolidates memories, and the immune system strengthens. People who consistently get enough quality sleep tend to have better mood, increased energy, and improved cognitive function. Poor sleep, on the other hand, can lead to a variety of health problems, such as weight gain, reduced concentration, and even a weakened immune system. To get better sleep, it's important to establish a consistent bedtime routine, create a relaxing environment, and limit exposure to screens before bed. Your health and well-being depend on a good night's rest.",
  "A positive mindset can make a huge difference in the way we approach life. When we choose to focus on the good rather than the bad, we attract more positivity into our lives. Positive thinking can improve our mood, boost our energy, and even strengthen our relationships. By staying optimistic in the face of challenges, we can find solutions more easily and maintain a sense of hope. Developing a positive mindset takes practice, but the benefits are well worth the effort. Surround yourself with people who uplift and support you, and take time each day to focus on gratitude and appreciation for the things that make life special.",
  "Traveling is one of the most rewarding experiences a person can have. It opens up new perspectives, introduces you to different cultures, and creates lasting memories. Whether you're exploring a nearby city or traveling to a far-off country, the experiences you gain from traveling can change the way you see the world. Traveling helps you learn about different ways of life and broadens your understanding of the people around you. It can also provide a sense of adventure, excitement, and personal growth. No matter how far you go, traveling allows you to connect with the world in a meaningful way, enriching your life in ways you never expected."
  ,"A positive mindset can make a huge difference in the way we approach life. When we choose to focus on the good rather than the bad, we attract more positivity into our lives. Positive thinking can improve our mood, boost our energy, and even strengthen our relationships. By staying optimistic in the face of challenges, we can find solutions more easily and maintain a sense of hope. Developing a positive mindset takes practice, but the benefits are well worth the effort. Surround yourself with people who uplift and support you, and take time each day to focus on gratitude and appreciation for the things that make life special.",
  "Traveling is one of the most rewarding experiences a person can have. It opens up new perspectives, introduces you to different cultures, and creates lasting memories. Whether you're exploring a nearby city or traveling to a far-off country, the experiences you gain from traveling can change the way you see the world. Traveling helps you learn about different ways of life and broadens your understanding of the people around you. It can also provide a sense of adventure, excitement, and personal growth. No matter how far you go, traveling allows you to connect with the world in a meaningful way, enriching your life in ways you never expected."
];

let random = Math.floor(Math.random() * 10 + 1);
let para = paragraphs[random];

output.innerHTML = para;
output.style.color = "gray";
var spaceCount = 0;

var text;
input.addEventListener("input", () => {

  document.getElementById("label").style.display="none";

  text = input.value;
  var numOfChars = text.length;
  const numOfWords = text.trim().split(/\s+/).length;
  if (text[numOfChars - 1] === " ") {
    spaceCount++;
    
    if (spaceCount > 1) {
      handleSpace();
      return;
    }
  } else if (text[numOfChars - 1] != " ") {
    spaceCount = 0;
  }

  if (!flag) {
    countDown();
  }

  output.innerHTML = "";
  var words = para.split(" ");
  var typedWords = text.split(" ");
  var curWord = typedWords.length - 1;


  for (let i = 0, wordIndex = 0; i < para.length; i++) {
    const span = document.createElement("span");
    span.innerHTML = para[i];

    if (i < text.length) {
      if (text[i] === para[i]) {
        span.className = "correct";
      } else {
        span.className = "wrong";
      }
    }
    else if (typedWords.length-1 === curWord) {
      span.className = "current";
      
    }

    if (
      para[i] === " " &&
      words[curWord].length == typedWords[curWord].length
    ) {
      wordIndex++;
      
    }

    output.appendChild(span);
  }


  const span = document.createElement("span");
  span.textContent = text;
  hidden.appendChild(span);
  var width = span.offsetWidth;
  hidden.removeChild(span);

  scrollParagraph(width);
  calculateStates(numOfChars, numOfWords);
  calculateAccuracy(text);
});

function scrollParagraph(width) {
  output.style.transform = `translateX(-${width}px)`;
}
function calculateStates(typedChars, words) {
  word.innerText = words;
  chars.innerText = typedChars;

  wordSpeed = words;
  charSpeed = typedChars;
}

var timeValue = 60;

function countDown() {
  flag = true;
  const timer = setInterval(() => {
    if (timeValue > 0) {
      timeValue--;
      time.innerHTML = timeValue;
      restTimeDeg = (timeValue / 60) * 360;

      progress.style.background = `conic-gradient(#ff009f ${restTimeDeg}deg, gray ${restTimeDeg}deg)`;
    } else {
      time.innerHTML = "0";
      document.getElementById("result").style.display="flex";
      showResult();
    }
  }, 1000);
}

function calculateAccuracy(text) {
  let num = text.length;
  let correct = 0;

  for (let i = 0; i < num; i++) {
    if (text[i] === para[i]) {
      correct++;
    }
  }

  let percentage = ((correct / num) * 100).toFixed(0);
  acc.innerHTML = percentage;

  accuracySpeed = percentage;
}

function handleSpace() {
  text = text.slice(0, -1);
  input.value = text;
}

function refreshPage(){
  
  location.reload();
}

function showResult(){

var name;
var image;
var greet;
  if(wordSpeed < 15){
    name = "Tutle";
    image="images/turtle.svg";
    greet = "You need Practice"
  }
  else if(wordSpeed >15 && wordSpeed < 30){
    name = "Rabbit"
    image= "images/rabbit.png"
    greet = "Neat"
  }
  else if(wordSpeed >30 && wordSpeed < 40){
    name= "T-Rex";
    image = "images/dino.svg";
    greet = "Nice"
  }
  else{
    name = "Octopus";
    image = "images/octopus.svg";
    greet="Super"
  }


  resultPara = document.getElementById("resultPara");
  document.getElementById("img").src=image;
  document.getElementById("title2").innerHTML = `You're a ${name}.`;


  resultPara.innerHTML = `${greet}! You type with the speed of <span style="background-color:#ff009f; padding-left:8px; padding-right:8px; border-radius:5px; color:black; font-weight:500">${wordSpeed} WPM</span> (${charSpeed} CPM). Your accuracy was ${accuracySpeed}%. Keep practicing!`

}

document.addEventListener("DOMContentLoaded",()=>{
  welcome();
})

function welcome(){
  let ran = Math.floor(Math.random() * 3 + 1);
  if(ran == 1){
    document.getElementById("welImg").src="images/wel (1).png";
  }
  else if(ran ==2){
    document.getElementById("welImg").src="images/wel (2).png";
  }
  else{
    document.getElementById("welImg").src="images/wel (3).png";
  }
  
  setTimeout(() => {
    document.getElementById("wel").style.display="none";
  }, 2000);
}