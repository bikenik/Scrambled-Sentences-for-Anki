/* jshint browser: true */
/* jshint browser: true */
/*jslint devel: true */
/*eslint no-console: "error"*/
/*eslint no-undef: "error"*/
/* global document */
/* eslint-env browser */
// MODEL //--//

/*--------------------DIVIDE BY ( "; ")-------------------------*/
var examples = $(".hide-examples");
var translation = $(".question>div");

function divide(target){
var choices = target.text();
	var re = /\s*;\s*/;
	var boxes = choices.split(re);
var list = "";
list = list + "<ul>";
			for (var i = 0; i < boxes.length; i++) {
			list = list + "<li>" + boxes[i] + "</li>";
		}
list = list + "</ul>";
target[0].innerHTML = list;
}
if (examples.length > 0 && $(".hide-examples>ul")[0] === undefined) {
	divide(examples);
}
if (translation.length > 0 && $(".question>div>ul")[0] === undefined) {
	divide(translation);
}
/*--------------------SCRAMBLE-------------------------*/
var russian = $(".question>div>ul>li");
//russian.splice(0, 1);
var answers = [];
for (var i = 0; i < 10; i++) {
	if ($(".hide-examples>ul>li")[i]) {
		answers[i] = $(".hide-examples>ul>li")[i].textContent.split(" ");
		answers[i] = answers[i].join("/");
	}
}
//answers.splice(0, 1);
app();
//--// MODEL CONTROL //--//
var endOfTheWordsGlob;
var arrayNumberGlob;
var currentRusArr;
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
	var arrayNumber = saikoro(answers.length);
	for (var i = 0; i < russian.length; i++) {
		if (russian[i] === russian[arrayNumber]) {
			currentRusArr = i;
		}
	}
	if (russian.length > 0 && currentRusArr === arrayNumber && russian[arrayNumber] !== undefined) {
		russian[arrayNumber].style.display = "block";
	}
	else {
		for (var i = 0; i < russian.length; i++) {
			russian[i].style.display = "none";
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
				style1 = window.getComputedStyle($("#stage")[0]), heightWords = style1.getPropertyValue('height');
				heightWordsLow = parseInt(heightWords, 10);
				style2 = window.getComputedStyle($("div.container.active")[0]), heightContainer = style2.getPropertyValue('height');
				heightContainerLow = parseInt(heightContainer, 10);
				$(".myButt").css("margin-top", Math.floor((heightContainerLow - heightWordsLow) / 3) + "px");
				console.log("window width is less than 568px")
			}
			// RESPONSIVE
			function landscapeRule() {
				style3 = window.getComputedStyle($("#stage")[0]), heightWords = style3.getPropertyValue('height');
				heightWordsHigh = parseInt(heightWords, 10);
				style4 = window.getComputedStyle($("div.container.active")[0]), heightContainer = style4.getPropertyValue('height');
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
	/*--------------------MAIN VIEW CONTROL-------------------------*/
	function myClick() {
		var self = $(this)
			, siblings = self.nextAll()
			, dex = self.index();
		if (self.parent().attr("id") === "words") {
			self.appendTo($("#stage"));
		}
		else if (self.parent().attr("id") === "stage") {
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
	}
	$(".myButt div")[1].addEventListener("click", function () {
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
	});
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
	$("span").on("click", myClick);
	/*--------------------SORTABLE 1-------------------------*/
	$(function () {
		$("#stage").sortable({
			update: function (event, ui) {
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
			}
			, delay: 30
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
		}
		else {
			$(".layer")[0].textContent = "NEXT";
		}
		$('#stage > span').unbind("click");
	}
	arrayNumberGlob = arrayNumber;
	// Choose  first letter
	for (var i = 0; i < $("#words>span").length; i++) {
		if ($("#words>span")[i].textContent === theAnswer[0]) {
			$("#stage").append($("#words>span")[i]);
			$("#stage>span").unbind("click");
			break;
		}
	}
	/*--------------------RESET TO RIGHT MESSAGE CLICK-------------------------*/
	if (answers.length > 0) {
		$("#stage>span")[0].addEventListener("click", function () {
			$("#stage").append($("#words>span"));
			for (var i = 0; i < theAnswer.length; i++) {
				$("#stage>span")[i].textContent = theAnswer[i];
			}
			fullStage();
			//		for (var i = 0; i < $("#stage>span").length; i++) {
			//			$("#stage>span")[i].className = "";
			//		}
			$('#stage > span').unbind("click");
			$("#stage").sortable("disable");
			$(".layer")[0].classList.add("active");
			$(".layer")[0].textContent = "NEXT";
			if (answers.length === 1) {
				$(".layer")[0].textContent = "END";
			}
		});
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
$(".myButt div")[0].addEventListener("click", function (e) {
	if ($(".layer")[0].textContent === "NEXT" || $(".layer")[0].textContent === "YEAH" || $(".layer")[0].textContent === "END") {
		endOfTheWordsGlob();
		$("#words")[0].innerHTML = "";
		if (russian.length > 0 && currentRusArr === arrayNumberGlob && russian[arrayNumberGlob] !== undefined) {
			russian[arrayNumberGlob].style.display = "none";
		}
		answers.splice(arrayNumberGlob, 1);
		russian.splice(arrayNumberGlob, 1);
		var stage = document.getElementById("stage");
		while (stage.firstChild) {
			stage.removeChild(stage.firstChild);
		}
		$(".myButt").css("display", "none");
		console.log(russian.length);
		if (answers.length > 0) {
			material(e);
		}
		$(".myButt")[0].style.marginTop = null;
		$("#stage").sortable("option", "disabled", false);
		//				$("header")[0].classList.toggle("active");
		//      e.stopPropagation();
		app();
	}
});
//	console.log ($("#words>span").length);
//$(window).on("load",function() {
//  var ht = $(window).height();
//  $("#words").css("height", Math.floor(ht * 0.4));
//  //$("#stage").css("height", Math.floor(ht * 0.4));
//});