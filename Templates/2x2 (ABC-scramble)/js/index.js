var button, contentCtr, headerContentCtr, mainContentCtr, headerTitle1, headerTitle2, scramble, header;
  button = document.querySelector(".cta");
  contentCtr = document.querySelector(".content-ctr");
  scramble = document.querySelector(".container");
  headerContentCtr = document.querySelector(".header-content-ctr");
  mainContentCtr = document.querySelector(".main-content-ctr");
	headerTitle1 = document.querySelector(".header-bg > .title");
	headerTitle2 = document.querySelector(".title2");
	header = document.getElementsByTagName("header")[0];
function material(e) {

		headerTitle2.scrollTop=0;
		headerTitle1.scrollTop=0;
		headerContentCtr.scrollTop=0;
		mainContentCtr.scrollTop=0;
//    var header;
//    header = this.parentElement.parentElement;
		header.classList.toggle("active");
      e.stopPropagation();
//    header.classList.toggle("active");
//    scramble.style.display = "block";
	if (scramble) {
      if (scramble.style.display === ""){
          scramble.style.display = "block";
      }else{
          scramble.style.display = null;
      }
      if (scramble.className !== "container active" ){
    setTimeout(function(){scramble.classList.add("active")}, 500);
      }
    scramble.classList.remove("active");
	}
    return contentCtr.classList.toggle("active");
  }
(function() {
  button.addEventListener("click", material);
}).call(this);
