$(".hide-examples")[0].innerHTML = $(".hide-examples")[0].innerHTML.replace(/<\/span> /g, "</span>")
var audioButton;
var audioArr = [];
for (var i = 0; i < $(".speaker>a").length; i++) {
  audioArr[i] = $(".speaker")[i].innerHTML;
}

if ($(".audio-front>a").length === 0) {
  for (var i = 0; i < audioArr.length; i++) {
    $(".audio-front")[0].innerHTML += audioArr[i];
    $(".speaker")[i].innerHTML = "";
  } 
    audioButton = $(".audio-front>span>a")
  }

if ($(".audio-front>a").length > 0) {
  audioButton = $(".audio-front>a");
}

var examples = $(".hide-examples");
var translation = $(".question>div");
var englishList = [];

/**
 * [for Merriam Webster "Word of the day" (http://www.learnersdictionary.com/word-of-the-day)]
 * @type {[type]}
 */
englishList = $(".hide-examples>div>div>.vibs>.vib>ul>li");
var defineWordClass = "midbt";

/**
 * [for LDOCE (http://www.ldoceonline.com)]
 * @type {[type]}
 */
if (!englishList[0]) {
  for (var i = 0; i < $("span.EXAMPLE").length; i++) {
    if ($("span.EXAMPLE")[i].parentNode.parentNode.className !== "GramBox" && 
        $("span.EXAMPLE")[i].parentNode.className !== "F2NBox") {
    englishList.push($("span.EXAMPLE")[i]);
    defineWordClass = "DEF";
    }
  }
}
if (!englishList[0]) {
  englishList = $(".hide-examples > ul > li")
}
/*--------------------DIVIDE BY ( "/ ")-------------------------*/
/**
 * [divide by ";"]
 * @param  {[type]} target [description]
 * @return {[type]}        [description]
 */
function divide(target){
var choices = target.text();
  var re = /\s*\/\s*/;
  var boxes = choices.split(re);
var list = "";
list = list + "<ul>";
      for (var i = 0; i < boxes.length; i++) {
      list = list + "<li>" + boxes[i] + "</li>";
    }
list = list + "</ul>";
target[0].innerHTML = list;
}
if (examples.length > 0 && englishList[0] === undefined) {
  divide(examples);
}
if (translation.length > 0 && $(".question>div>ul")[0] === undefined) {
  divide(translation);
}

if (!englishList[0]) {
  for (var i = 0; i < $(".hide-examples > ul > li").length; i++) {
  englishList.push($(".hide-examples > ul > li")[i]);
  }
  var defineWordClass = "default";
}
/*--------------------SCRAMBLE-------------------------*/
var russian = $(".question>div>ul>li");
for (var z = 0; z < englishList.length; z++) {
    englishList[z].textContent = englishList[z].textContent.replace(/\[([^[]*)\]./g, "");
    englishList[z].textContent = englishList[z].textContent.replace(/\[([^[]*)\]/g, "");
    englishList[z].textContent = englishList[z].textContent.replace(/.\(([^[]*)\)/g, "");
    englishList[z].textContent = englishList[z].textContent.replace(/[\.]./g, ".");
    englishList[z].textContent = englishList[z].textContent.replace(/(\/\w*)/g, "");
  }
  if (defineWordClass === "deyault") {
    englishList[z].textContent = englishList[z].textContent.replace(/\./g, ".   ");
  }
//russian.splice(0, 1);
var answers = [];
for (var i = 0; i < englishList.length; i++) {
  var arrEnglishList = englishList[i];
  if (arrEnglishList) {
    answers[i] = arrEnglishList.textContent.split(" ");
    answers[i] = answers[i].join("/");
  }
}

//answers.splice(0, 1);
app();
//--// MODEL CONTROL //--//
var endOfTheWordsGlob;
var arrayNumberGlob;
var currentRusArr;
var currentAudioButton;
var count = 0;
var questionMax = answers.length
  , questionMaxGlob = answers.length;
switch (questionMax) {
case 1: questionMax = "One"; break;
case 2: questionMax = "Two"; break;
case 3: questionMax = "Three"; break;
case 4: questionMax = "Four"; break;
case 5: questionMax = "Five"; break;
case 6: questionMax = "Six"; break;
case 7: questionMax = "Seven"; break;
case 8: questionMax = "Eight"; break;
case 9: questionMax = "Nine"; break;
case 10: questionMax = "Ten"; break;
}
/*--------------------START-------------------------*/
var preArrayNode;
function app() {
  
  var rigtAnswer = "";

  function saikoro(max) {
    return Math.floor(Math.random() * max);
  }

  function shuffle(array) {
    var currentIndex = array.length
      , temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  function deepNode(target, deep){
    if (deep === 3) {
      return target.parentNode.parentNode.parentNode;
    }else if (deep === 4) {
      return target.parentNode.parentNode.parentNode.parentNode;
    }else if (deep === 5) {
      return target.parentNode.parentNode.parentNode.parentNode.parentNode;
    }else if (deep === 6) {
      return target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    }
  }
  if(preArrayNode !== undefined) {
  var parentDiv2 = preArrayNode.parentNode;
  }
  var arrayNumber = saikoro(answers.length);
  var parentDiv = $(".question")[0].parentNode;
  var defWord;
  var currentIndexOfDEF;
  var parentNodeOfList;

  if ($(".par>.midbt")[0]){
    defWord = $(".par>.midbt")[0];
    parentDiv2.insertBefore(defWord, preArrayNode);
  }
  if ($(".par>.DEF")[0]){
    defWord = $(".par>.DEF")[0];
    preArrayNode.insertBefore(defWord,preArrayNode.children[2]);
  }

  var firstCase, secondCase = false;
  if (englishList && englishList[arrayNumber] && englishList[arrayNumber].parentNode) {
    for (var i = 0; i < englishList[arrayNumber].parentNode.children.length; i++) {
      if (englishList[arrayNumber].parentNode.children[i].className === "DEF") {
        firstCase = true;
      }
    }
  }
  if(englishList.length > 0) {
    if (defineWordClass === "midbt") {
      preArrayNode = deepNode(englishList[arrayNumber], 3);
      parentNodeOfList = deepNode(englishList[arrayNumber], 4);
    }
    if (defineWordClass === "DEF" && englishList[arrayNumber].parentNode.className === "Sense" ||
      englishList[arrayNumber].parentNode.className === "newline Sense") {
      preArrayNode = englishList[arrayNumber].parentNode;
      parentNodeOfList = englishList[arrayNumber].parentNode;
    }
    if (defineWordClass === "DEF" && englishList[arrayNumber].parentNode.parentNode.className === "Sense" ||
      englishList[arrayNumber].parentNode.parentNode.className === "newline Sense") {
      preArrayNode = englishList[arrayNumber].parentNode.parentNode;
      parentNodeOfList = englishList[arrayNumber].parentNode.parentNode;
    }
    if (defineWordClass === "DEF" && englishList[arrayNumber].parentNode.parentNode.parentNode.className === "Sense" ||
      englishList[arrayNumber].parentNode.parentNode.parentNode.className === "newline Sense") {
      preArrayNode = englishList[arrayNumber].parentNode.parentNode;
      parentNodeOfList = englishList[arrayNumber].parentNode.parentNode;
    }
    if (defineWordClass === "DEF" && firstCase) {
      preArrayNode = englishList[arrayNumber].parentNode;
      parentNodeOfList = englishList[arrayNumber].parentNode;
    }
    if (defineWordClass === "default") {
      preArrayNode = englishList[arrayNumber].parentNode;
      parentNodeOfList = englishList[arrayNumber].parentNode;
    }

    var newNode;
    function addDef(arr){
        newNode = parentNodeOfList.children[arr];
        parentDiv.insertBefore(newNode, $(".question")[0]);
    }

    if       (parentNodeOfList.children[0] && parentNodeOfList.children[0].className === defineWordClass) {
      addDef(0);
    }else if(parentNodeOfList.children[1] && parentNodeOfList.children[1].className === defineWordClass) {
      addDef(1);
    }else if (parentNodeOfList.children[2] && parentNodeOfList.children[2].className === defineWordClass) {
      addDef(2);
    }else if (parentNodeOfList.children[3] && parentNodeOfList.children[3].className === defineWordClass) {
      addDef(3);
    }else if (parentNodeOfList.children[4] && parentNodeOfList.children[4].className === defineWordClass) {
      addDef(4);
    }else if (parentNodeOfList.children[5] && parentNodeOfList.children[5].className === defineWordClass) {
      addDef(5);
    }else if (parentNodeOfList.children[6] && parentNodeOfList.children[6].className === defineWordClass) {
      addDef(6);
    }else if (parentNodeOfList.children[7] && parentNodeOfList.children[7].className === defineWordClass) {
      addDef(7);
    }else{
      console.log ("def not found");
      // addDef(0);
        // englishList[arrayNumber].parentNode.style.display = "none";
    }

    console.log(englishList[arrayNumber].textContent);
    console.log(answers[arrayNumber]);
    console.log(arrayNumber);
    console.log("anwers sum " + answers.length);
    console.log("englishList sum " + answers.length);
  }
  function audioOrder(){
    for (var i = 0; i < audioButton.length; i++) {
      if (audioButton[i] === audioButton[arrayNumber]) {
        currentAudioButton = i;
      }
    }
    if (audioButton.length > 0 && currentAudioButton === arrayNumber && audioButton[arrayNumber] !== undefined) {
      return true;
    }
  }
  for (var i = 0; i < russian.length; i++) {
    if (russian[i] === russian[arrayNumber]) {
      currentRusArr = i;
    }
  }
  if (russian.length > 0 && currentRusArr === arrayNumber && russian[arrayNumber] !== undefined) {
    $(".russian")[0].style.display = "inline-table";
    russian[arrayNumber].style.display = "inline-table";
  }
  else {
    for (var i = 0; i < russian.length; i++) {
      // russian[i].style.display = "none";
      // russian[i].parentNode.parentNode.style.display = "none";
      $(".russian")[0].style.display = "none";
    };
  }
  var theAnswer = answers[arrayNumber];
  var target = theAnswer;
  if (theAnswer !== undefined) {
    theAnswer = theAnswer.split("/");
    shuffle(theAnswer.slice()).forEach(function (item) {
      $("#words").append("<span>" + item + "</span>");
    });
  }
  /*--------------------FULL STAGE-------------------------*/
  function fullStage() {
    if ($('#words')[0].innerHTML === "") {
      $(".myButt").css("display", "block");
      $(".myButt div")[1].textContent = "CHECK";
      $(".layer")[0].classList.remove("active");
      $(".layer")[0].textContent = "BUTT";
      // dynamic change margin button from container
      function portraitRule() {
        if ($("#stage")[0]) {
          style1 = window.getComputedStyle($("#stage")[0]), heightWords = style1.getPropertyValue('height');
          heightWordsLow = parseInt(heightWords, 10);
        }
        if ($("div.container.active")[0]) {
          style2 = window.getComputedStyle($("div.container.active")[0]), heightContainer = style2.getPropertyValue('height');
          heightContainerLow = parseInt(heightContainer, 10);
          $(".myButt").css("margin-top", Math.floor((heightContainerLow - heightWordsLow) / 3) + "px");
          console.log("window width is less than 568px")
        }
      }
      // RESPONSIVE
      function landscapeRule() {
        if ($("#stage")[0]) {
          style3 = window.getComputedStyle($("#stage")[0]), heightWords = style3.getPropertyValue('height');
        }
        heightWordsHigh = parseInt(heightWords, 10);
        if ($("div.container.active")[0]) {
          style4 = window.getComputedStyle($("div.container.active")[0]), heightContainer = style4.getPropertyValue('height');
        }
        heightContainerHigh = parseInt(heightContainer, 10);
        $(".myButt").css("margin-top", Math.floor((heightContainerHigh - heightWordsHigh) / 6) + "px");
        console.log("window width is at least 568px")
      }

      function mediaQuery_567() {
        function butPositioniPhone(mqiPhone) {
          if (mqiPhone.matches) { // window width is less than 568px
            portraitRule()
          }
          else { // window width is at least 568px
            landscapeRule()
          }
        }
        if (matchMedia) {
          var mqiPhone = window.matchMedia("(max-width: 567px)");
          mqiPhone.addListener(butPositioniPhone);
          butPositioniPhone(mqiPhone);
        }
      }

      function mediaQuery_769() {
        function butPositioniPad(mqiPad) {
          if (mqiPad.matches) { // window width is less than 568px
            portraitRule()
          }
          else { // window width is at least 568px
            landscapeRule()
          }
        }
        if (matchMedia) {
          var mqiPad = window.matchMedia("(max-width: 769px)");
          mqiPad.addListener(butPositioniPad);
          butPositioniPad(mqiPad);
        }
      }
      if (matchMedia('(min-width: 768px)').matches) {
        mediaQuery_769()
      }
      if (matchMedia('(min-width: 320px) and (max-width: 737px)').matches) {
        mediaQuery_567()
      }
    }
    else {
      $(".myButt").css("display", "none");
      $(".myButt")[0].style.marginTop = null;
    }
  }
  /**
   * [myClick description]
   * @return {[type]} [description]
   */
  function myClick(e) {
      var self = $(this), 
      siblings = self.nextAll(),
      dex = self.index();
      if (self.parent().attr("id") === "words") {
        self.appendTo($("#stage"));
      }
      else if (self.parent().attr("id") === "stage" && e.type === "click") {
        // if (self.parent().attr("id") === "stage") {
        self.appendTo($("#words"));
        self[0].className = "";
        console.log(self[0]);
        siblings.appendTo($("#words"));
        for (i = 0; i < siblings.length; i++) {
          siblings[i].className = "";
        }
        $("#stage>span").nextAll().className = "";
      }
      fullStage();
      $(".myButt div")[1].onclick = function () {
        if ($("#stage > span").length > 1) {
          checkEachWord();
        }
        $(".layer")[0].classList.add("active");
        if (answers.length === 1) {
          $(".layer")[0].textContent = "END";
        }
        else if ($(".layer")[0].textContent !== "YEAH") {
          $(".layer")[0].textContent = "NEXT";
        }
      }
  };
  /*--------------------END WORDS-------------------------*/
  function endOfTheWords() {
    if ($('#words')[0].innerHTML === "") {
      rigtAnswer = rigtAnswer.slice(0, -1);
      if (rigtAnswer === answers[arrayNumber]) {
        count++;
        console.log(count + " right answer");
      }
    }
  }
  endOfTheWordsGlob = endOfTheWords;
  var bottomRowWords = $("#words>span");

  bottomRowWords.on("click touchstart", myClick);

  /*--------------------SORTABLE 1-------------------------*/
  $(function () {
    $("#stage").sortable({
      update: function (event, ui) {
      // $(this).on("touchcancel", myClick);
        ui.item.unbind("click");
        ui.item.one("click", function (event) {
          console.log("one-time-click");
          event.stopImmediatePropagation();
          $(this).click(myClick);
        });
        $(".myButt div")[1].textContent = "CHECK";
        $(".layer")[0].classList.remove("active");
        $(".layer")[0].textContent = "BUTT";
        console.log('update')
      }, delay: 30
    });
    //        $("#stage").disableSelection();
  });
  /*--------------------CHECK WORDS-------------------------*/
  function checkEachWord() {
    $("#stage>span").each(function (index) {
      if ($(this).text() === theAnswer[index]) {
        console.log($(this).text());
        rigtAnswer = rigtAnswer + ($(this).text()) + "/";
        $(this)[0].className = "active-right";
      }
      else {
        $(this)[0].className = "active-wrong";
      }
    });
    rigtAnswer = rigtAnswer.substring(0, rigtAnswer.length - 1);
    if (rigtAnswer === answers[arrayNumber]) {
      console.log("Hello World");
      count++;
      $(".layer")[0].textContent = "YEAH";
      $("#stage").sortable("disable");
      if (audioOrder()){
      audioButton[arrayNumber].classList.toggle("active");  
      }
    }
    else {
      $(".layer")[0].textContent = "NEXT";
      function allRight (el){
        for (var i = 0; i < el.length; i++) {
          switch(false) {
            case el[i].className === "active-right": 
                  return false; 
                  break;
          }
        }
          return true;
      };
      if (allRight($("#stage span"))){
        if(audioOrder()){
        audioButton[arrayNumber].classList.toggle("active");
        }
        $("#stage").sortable("disable");
      }
    }
      $("#stage>span").unbind("click");
  }
  arrayNumberGlob = arrayNumber;
  // Choose  first letter
  /**
   * Choose first letter
   * @param  {[type]} var i             [description]
   * @return {[type]}     [description]
   */
  for (var i = 0; i < $("#words>span").length; i++) {
    if ($("#words>span")[i].textContent === theAnswer[0]) {
      $("#stage").append($("#words>span")[i]);
      $("#stage>span").unbind("click");
      break;
    }
  }
  /*--------------------RESET TO RIGHT MESSAGE CLICK-------------------------*/
  if (answers.length > 0) {
    $("#stage>span")[0].onclick = function () {
      $("#stage").append($("#words>span"));
      for (var i = 0; i < theAnswer.length; i++) {
        $("#stage>span")[i].textContent = theAnswer[i];
      }
      fullStage();
      $('#stage > span').unbind("click");
      $("#stage").sortable("disable");
      $(".layer")[0].classList.add("active");
      $(".layer")[0].textContent = "NEXT";
      if(audioOrder()){
      audioButton[arrayNumber].classList.toggle("active");
      }
      if (answers.length === 1) {
        $(".layer")[0].textContent = "END";
      }
    };
  }
  /*--------------------COLLOR RESULT FOR MESSAGE-------------------------*/
  function colorResult() {
    var procentRed = 0
      , procentYellow = Math.round(.35 * questionMaxGlob)
      , procentGreen = Math.round(.85 * questionMaxGlob);
    if (count <= procentYellow && count && questionMaxGlob !== 2) {
      for (var i = 0; i < $("#stage>span").length; i++) {
        $("#stage>span")[i].classList.toggle("active-wrong")
      }
    }
    else if (count > procentYellow && count < procentGreen || questionMaxGlob === 2 && count === 1) {
      for (var i = 0; i < $("#stage>span").length; i++) {
        $("#stage>span")[i].classList.toggle("active-middle")
      }
    }
    else if (count >= procentGreen) {
      for (var i = 0; i < $("#stage>span").length; i++) {
        $("#stage>span")[i].classList.toggle("active-right")
      }
    }else{
        for (var i = 0; i < $("#stage>span").length; i++) {
        $("#stage>span")[i].classList.toggle("active-wrong")
      }
    }
  }
  /*--------------------RESULT MESSAGE------------------------*/
  if (answers.length === 0) {
    var result = count + " correct from " + questionMax;
    result = result.split(" ");
    for (var i = 0; i < result.length; i++) {
      var span = document.createElement('span');
      console.log(result[i])
      span.innerHTML = result[i];
      stage.appendChild(span);
    }
    colorResult();
  }
} // END OF APP()
/*--------------------MY BUTTON-------------------------*/
$(".myButt div")[0].onclick = function (e) {
  if ($(".layer")[0].textContent === "NEXT" || $(".layer")[0].textContent === "YEAH" || $(".layer")[0].textContent === "END") {
    endOfTheWordsGlob();
    $("#words")[0].innerHTML = "";
    if (russian.length > 0 && currentRusArr === arrayNumberGlob && russian[arrayNumberGlob] !== undefined) {
      russian[arrayNumberGlob].style.display = "none";
    }
    if (audioButton[arrayNumberGlob]){
    audioButton[arrayNumberGlob].classList.remove("active");
    }
    answers.splice(arrayNumberGlob, 1);
    russian.splice(arrayNumberGlob, 1);
    englishList.splice(arrayNumberGlob, 1);
    audioButton.splice(arrayNumberGlob, 1);
    var stage = document.getElementById("stage");
    while (stage.firstChild) {
      stage.removeChild(stage.firstChild);
    }
    $(".myButt").css("display", "none");
    console.log(russian.length);
    console.log("audioButton: " + audioButton.length);
    if (answers.length > 0) {
      material(e);
    }
    $(".myButt")[0].style.marginTop = null;
    $("#stage").sortable("option", "disabled", false);
    app();
  }
};
