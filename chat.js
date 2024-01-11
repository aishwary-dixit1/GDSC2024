const userMessage = [
    ["cyber", "cyber security"],
    ["yes"],
    ["answer1"],
    ["answer2"],
    ["web developer", "developer", "full stack developer"],
    ["yes"],
    ["answer3"],
    ["answer4"],
    ["thankyou"]
  ];
  let Flag=0;
  const botReply = [
    ["Okay, So i will test your knowledge.\n Are you ready?"], 
    ["What do you mean by a firewall?"],
    ["What is ethical hacking?"],
    ["Thank you, we will process the result and make a suitable road map for you!"],
    ["Okay, So i will test your knowledge.\n Are you ready?"], 
    ["Why is CSS used in web dev?"],
    ["What do you mean by full stack developer?"],
    ["Thank you, we will process the result and make a suitable road map for you!"],
    ["exit"]
  ];
  
  const alternative = [
    "Well, we are still figuring it out!",
    "Sorry, we are still developing that part!",
    "This case needs to be handeled! "
  ];
  
  const synth = window.speechSynthesis;
  
  function voiceControl(string) {
    if(string!="exit"){

    
    let u = new SpeechSynthesisUtterance(string);
    u.text = string;
    u.lang = "en-aus";
    u.volume = 1;
    u.rate = 1;
    u.pitch = 1;
    synth.speak(u);}
  }
  
  function sendMessage() {
    const inputField = document.getElementById("input");
    let input = inputField.value.trim();
    input != "" && output(input);
    inputField.value = "";
  }
  document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    inputField.addEventListener("keydown", function (e) {
      if (e.code === "Enter") {
        let input = inputField.value.trim();
        input != "" && output(input);
        inputField.value = "";
      }
    });
  });
  
  function output(input) {
    let product;

    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
  
    text = text
      .replace(/[\W_]/g, " ")
      .replace(/ a /g, " ")
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "")
      .trim();
  
    let comparedText = compare(userMessage, botReply, text);
  
    product = comparedText
      ? comparedText
      : alternative[Math.floor(Math.random() * alternative.length)];
    addChat(input, product);
  }
  
  function compare(triggerArray, replyArray, string) {
    let item;
    for (let x = 0; x < triggerArray.length; x++) {
      if (x==0) Flag=1;
      else if (x==4) Flag=2;
      else Flag=0;
      for (let y = 0; y < replyArray.length; y++) {
        for(let z=0; z<string.split(" ").length;z++){
          if (triggerArray[x][y] == string.split(" ")[z]){
            if (string.split(" ")[z]=="yes"){
              if (Flag==1){
                item = [replyArray[1]];
            }
              else item = [replyArray[5]];
            
            }
            else item = [replyArray[x]];
          }
        }       
      }
    }
    if (item) return item;
  }
  
  
  function addChat(input, product) {
    if(product=="exit") {
      window.open("HomePage1.html","_top")
    }
    const mainDiv = document.getElementById("message-section");
    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.classList.add("message");
    userDiv.innerHTML = `<span id="user-response">${input}</span>`;
    mainDiv.appendChild(userDiv);
  
    let botDiv = document.createElement("div");
    botDiv.id = "bot";
    botDiv.classList.add("message");
    botDiv.innerHTML = `<span id="bot-response">${product}</span>`;
    mainDiv.appendChild(botDiv);
    var scroll = document.getElementById("message-section");
    scroll.scrollTop = scroll.scrollHeight;
    voiceControl(product);
  }