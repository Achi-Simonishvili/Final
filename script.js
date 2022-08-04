const navSlider = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");

    navLinks.forEach((item, index) => {
      if (item.style.animation) {
        item.style.animation = "";
      } else {
        item.style.animation = `navLinksAnim 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });
    burger.classList.toggle("change");
  });
};

navSlider();

$(function () {
  $(".multiple-items").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

// filter
let result = document.getElementById("result");
let filter = document.getElementById("filter");
let listItems = [];

function getUsers() {
  fetch("https://reqres.in/api/users?page=2", {
    method: "GET",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (responseData) {
      responseData.data.forEach((item) => {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.innerHTML = `${item.first_name} ${item.last_name}`;

        let img = document.createElement("img");
        img.src = item.avatar;
        li.appendChild(img);
        li.appendChild(span);
        listItems.push(li);

        result.appendChild(li);
      });
    })
    .catch(function (e) {
      console.log(e);
    });
}
getUsers();

function filterData(searchItem) {
  listItems.forEach((item) => {
    console.log(item);
    if (item.innerText.toLowerCase().includes(searchItem.toLowerCase())) {
      item.classList.remove("active");
    } else {
      item.classList.add("active");
    }
  });
}

filter.addEventListener("input", (event) => filterData(event.target.value));

// Accordion

let accordition = document.getElementsByClassName("faq");

for (let i = 0; i < accordition.length; i++) {
  accordition[i].addEventListener("click", function () {
    this.classList.toggle("active");
  });
}

// form

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});

// localstorage & sessionstorage
let counterUser = sessionStorage.getItem("counter");
let newValue;

if (!counterUser) {
  newValue = 1;
} else {
  newValue = parseInt(counterUser) + 1;
}

sessionStorage.setItem("counter", newValue);
document.getElementById("counter").textContent =
  sessionStorage.getItem("counter");
