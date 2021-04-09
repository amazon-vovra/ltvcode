$(document).ready(function () {
  var activeTab = 'email';
  var phones = [{ "mask": "(###)###-####"}];
    $('#phone-input').inputmask({ 
      mask: phones, 
      greedy: false, 
      definitions: { '#': { validator: "[0-9]", cardinality: 1}} });
  $("#phone-tab").on("click", function (e) {
    e.preventDefault();
    $('#phone-input').css('display','block');
    $('#email-input').css('display','none');
    $('.error-msg').text('Please enter a valid phone number');
    document.querySelector('#email-input').parentNode.classList.remove("error");
    $('#phone-tab').addClass("tab-active");
    $('#email-tab').removeClass("tab-active");
    activeTab = 'phone';
  });

  $("#email-tab").on("click", function (e) {
    e.preventDefault();
    $('#email-input').css('display','block');
    $('#phone-input').css('display','none');
    $('.error-msg').text('Please enter a valid email address');
    document.querySelector('#phone-input').parentNode.classList.remove("error");
    $('#email-tab').addClass("tab-active");
    $('#phone-tab').removeClass("tab-active");
    activeTab = 'email'
  });

  $("#btn-search").on("click", function (e) {
    console.log(activeTab)
    if(activeTab === 'email'){
      e.preventDefault();
      localStorage.clear(); //Clears storage for next request
      email = $('#email-input').val().toLowerCase();

      var x, y;
      regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (email.match(regEx)) {
        x = true;
      } else {
        x = false;
      }

      if (x === true) {
        $(".above-the-fold").hide();
        $(".features").hide();
        $(".waiting").show();
        document.querySelector('#email-input').parentNode.classList.remove("error");
        const proxyurl = "";
        const url =
          'https://ltv-data-api.herokuapp.com/api/v1/records.json?email=' + email;
        fetch(proxyurl + url)
          .then((response) => response.text())
          .then(function (contents) {
            localStorage.setItem("userObject", contents);
            window.location.href = "result.html";
          })
          .catch((e) => {
            $(".above-the-fold").show();
            $(".features").show();
            $(".waiting").hide();
            console.log(e)
          });
      } else if (x !== true) {
        document.querySelector('#email-input').parentNode.classList.add("error");
      }
    }
    if(activeTab === 'phone'){
      e.preventDefault();
      localStorage.clear(); //Clears storage for next request
      phone = $('#phone-input').val().toLowerCase();
      var x, y;
      regEx = /^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/;
      if (phone.match(regEx)) {
        x = true;
      } else {
        x = false;
      }

      if (x === true) {
        phone = phone.replace(/\D/g, "");
        $(".above-the-fold").hide();
        $(".features").hide();
        $(".waiting").show();
        document.querySelector('#phone-input').parentNode.classList.remove("error");
        const proxyurl = "";
        const url =
          'https://ltv-data-api.herokuapp.com/api/v1/records.json?phone=' + phone;
        fetch(proxyurl + url)
          .then((response) => response.text())
          .then(function (contents) {
            localStorage.setItem("userObject", contents);
            window.location.href = "result.html";
          })
          .catch((e) => {
            $(".above-the-fold").show();
            $(".features").show();
            $(".waiting").hide();
            console.log(e)
          });
      } else if (x !== true) {
        document.querySelector('#phone-input').parentNode.classList.add("error");
      }
    }
  });

  $('input[type="text"]').keypress(function (event) {
    email = $('input[type="text"]').val().toLowerCase();
    regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(regEx)) {
      x = true;
      document.querySelector('input[type="text"]').parentNode.classList.remove("error");
    } else {
      x = false;
    }
    keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      /**
       * Makes a request to ltv API to search an specific email address.
       * If there's a response, it gets stored in the local storage and redirects to results page
       */
      event.preventDefault();
      localStorage.clear(); //Clears storage for next request

      var x, y;


      if (x === true) {
        const proxyurl = "";
        const url =
          'https://ltv-data-api.herokuapp.com/api/v1/records.json?email=' + email;
        fetch(proxyurl + url)
          .then((response) => response.text())
          .then(function (contents) {
            localStorage.setItem("userObject", contents);
            window.location.href = "result.html";
          })
          .catch((e) => console.log(e));
      } else if (x !== true) {
        document.querySelector('input[type="text"]').parentNode.classList.add("error");
      }
    }
  });

});
