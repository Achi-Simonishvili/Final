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

document
  .getElementById("registration")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let errors = {};
    let form = event.target;

    let username = document.getElementById("username").value;

    if (username == " ") {
      errors.username = "Username can not be empty";
    }

    let checkbox = document.getElementById("agreecheckbox").checked;

    if (!checkbox) {
      errors.agree = "You must agree our terms and conditions";
    }

    let age = false;

    form.querySelectorAll('[name = "age"]').forEach((item) => {
      if (item.checked) {
        age = true;
      }
    });

    if (!age) {
      errors.age = "Please select your Age";
    }

    console.log(errors);

    form.querySelectorAll(".error-text").forEach((item) => {
      item.textContent = "";
    });

    for (let item in errors) {
      let errorPlaceholder = document.getElementById("error_" + item);

      if (errorPlaceholder) {
        errorPlaceholder.textContent = errors[item];
      }
    }

    if (Object.keys(errors).length == 0) {
      form.submit();
    }
  });

let counter = localStorage.getItem("counter");

let newValue;

if (!counter) {
  newValue = 1;
} else {
  newValue = parseInt(counter) + 1;
}

localStorage.setItem("counter", newValue);
