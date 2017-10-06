var slideIndex = 1;

function drawDots() {
  var j,
      slides = document.getElementsByClassName("mySlides"),
      dots = document.createElement('div');
  dots.className = "dots";
  document.body.appendChild(dots);
  for (var j = 1; j <= slides.length; j++) {
    var span = '<span class="dot" onclick="currentSlide(' + j + ')"></span>';
    dots.innerHTML += span;
  }
};

function showSlides(n) {
  var i,
      slides = document.getElementsByClassName("mySlides"),
      dots = document.getElementsByClassName("dot");

  if (n > slides.length)
  {slideIndex = 1}

  if (n < 1)
  {slideIndex = slides.length}

  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
};

function plusSlides(n) {
  showSlides(slideIndex += n);
};

function currentSlide(n) {
  showSlides(slideIndex = n);
};

function showActive() {
  var dots = document.getElementsByClassName("dot");
  dots[slideIndex-1].className += " active";
};

drawDots();
showSlides(slideIndex);
showActive();
