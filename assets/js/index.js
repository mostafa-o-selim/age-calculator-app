(function () {
  const main = document.getElementById("main"),
    age_calculator = document.createElement("section"),
    content = document.createElement("div"),
    from = document.createElement("form"),
    fieldset = document.createElement("fieldset"),

    dayForm = document.createElement("div"),
    dayLabel = document.createElement("label"),
    dayInput = document.createElement("input"),
    dayError = document.createElement("p"),

    monthForm = document.createElement("div"),
    monthLabel = document.createElement("label"),
    monthInput = document.createElement("input"),
    monthError = document.createElement("p"),

    yearForm = document.createElement("div"),
    yearLabel = document.createElement("label"),
    yearInput = document.createElement("input"),
    yearError = document.createElement("p"),
    line = document.createElement("div"),
    submit = document.createElement("button"),
    submitImg = document.createElement("img"),
    result = {
      years: document.createElement("h2"),
      yearsNumber: document.createElement("strong"),
      months: document.createElement("h2"),
      monthsNumber: document.createElement("strong"),
      days: document.createElement("h2"),
      daysNumber: document.createElement("strong")
    };

  dayError.setAttribute("id", "day_error");
  dayError.setAttribute("role", "alert");
  dayError.setAttribute("class", "input-error day-error");
  dayInput.setAttribute("type", "number");
  dayInput.setAttribute("name", "day");
  dayInput.setAttribute("id", "day");
  dayInput.setAttribute("placeholder", "DD");
  dayInput.setAttribute("required", "");
  dayInput.setAttribute("class", "input day-input");
  dayLabel.setAttribute("for", "day");
  dayLabel.setAttribute("class", "label day-label");
  dayForm.setAttribute("class", "input-form day-form");

  monthError.setAttribute("id", "month_error");
  monthError.setAttribute("role", "alert");
  monthError.setAttribute("class", "input-error month-error");
  monthInput.setAttribute("type", "number");
  monthInput.setAttribute("name", "month");
  monthInput.setAttribute("id", "month");
  monthInput.setAttribute("placeholder", "MM");
  monthInput.setAttribute("required", "");
  monthInput.setAttribute("class", "input month-input");
  monthLabel.setAttribute("for", "month");
  monthLabel.setAttribute("class", "label month-label");
  monthForm.setAttribute("class", "input-form month-form");

  yearError.setAttribute("id", "year_error");
  yearError.setAttribute("role", "alert");
  yearError.setAttribute("class", "input-error year-error");
  yearInput.setAttribute("type", "number");
  yearInput.setAttribute("name", "year");
  yearInput.setAttribute("id", "year");
  yearInput.setAttribute("placeholder", "YYYY");
  yearInput.setAttribute("required", "");
  yearInput.setAttribute("class", "input year-input");
  yearLabel.setAttribute("for", "year");
  yearLabel.setAttribute("class", "label year-label");
  yearForm.setAttribute("class", "input-form year-form");

  submitImg.setAttribute("src", "assets/images/icon-arrow.svg");
  submitImg.setAttribute("alt", "Arrow");
  submitImg.setAttribute("class", "submit-img");
  submit.setAttribute("type", "button");
  submit.setAttribute("id", "submit");
  line.setAttribute("class", "line");

  from.setAttribute("method", "GET");

  result.years.setAttribute("class", "result years");
  result.yearsNumber.setAttribute("class", "result-number years-number");

  result.months.setAttribute("class", "result months");
  result.monthsNumber.setAttribute("class", "result-number months-number");

  result.days.setAttribute("class", "result days");
  result.daysNumber.setAttribute("class", "result-number days-number");

  content.setAttribute("class", "content");
  age_calculator.setAttribute("id", "age_calculator");

  dayLabel.appendChild(document.createTextNode("DAY"));
  dayForm.appendChild(dayLabel);
  dayForm.appendChild(dayInput);
  dayError.appendChild(document.createTextNode("This filed is required"));
  dayForm.appendChild(dayError);
  fieldset.appendChild(dayForm);

  monthLabel.appendChild(document.createTextNode("MONTH"));
  monthForm.appendChild(monthLabel);
  monthForm.appendChild(monthInput);
  monthError.appendChild(document.createTextNode("This filed is required"));
  monthForm.appendChild(monthError);
  fieldset.appendChild(monthForm);

  yearLabel.appendChild(document.createTextNode("YEAR"));
  yearForm.appendChild(yearLabel);
  yearForm.appendChild(yearInput);
  yearError.appendChild(document.createTextNode("This filed is required"));
  yearForm.appendChild(yearError);
  fieldset.appendChild(yearForm);

  from.appendChild(fieldset);
  submit.appendChild(submitImg);
  line.appendChild(submit);
  from.appendChild(line);
  content.appendChild(from);

  result.yearsNumber.appendChild(document.createTextNode("--"));
  result.years.appendChild(result.yearsNumber);
  result.years.appendChild(document.createTextNode(" years"));
  content.appendChild(result.years);

  result.monthsNumber.appendChild(document.createTextNode("--"));
  result.months.appendChild(result.monthsNumber);
  result.months.appendChild(document.createTextNode(" months"));
  content.appendChild(result.months);

  result.daysNumber.appendChild(document.createTextNode("--"));
  result.days.appendChild(result.daysNumber);
  result.days.appendChild(document.createTextNode(" days"));
  content.appendChild(result.days);

  age_calculator.appendChild(content);
  main.appendChild(age_calculator);

  function showError(el, msg = "This filed is required") {
    el.parentElement.classList.add("error");
    el.previousElementSibling.ariaInvalid = true;
    el.previousElementSibling.setAttribute("aria-describedby", el.id);
    el.innerHTML = msg;
  }

  function hiddenError(el) {
    el.parentElement.classList.remove("error");
    el.previousElementSibling.removeAttribute("aria-invalid");
    el.previousElementSibling.removeAttribute("aria-describedby");
    el.innerHTML = "This filed is required";
  }

  function getResult() {
    const dateNow = new Date();
    let validYear = false;
    let validMonth = false;
    let validDay = false;

    if (yearInput.value != "") {
      if (!isNaN(parseInt(yearInput.value))) {
        if (+yearInput.value < dateNow.getFullYear() && +yearInput.value > 0) {
          hiddenError(yearError);
          validYear = true;
        } else showError(yearError, "Must be in the past");
      } else showError(yearError, "Please enter number");
    } else showError(yearError);

    if (monthInput.value != "") {
      if (!isNaN(parseInt(monthInput.value))) {
        if (+monthInput.value > 0 && +monthInput.value < 13) {
          hiddenError(monthError)
          validMonth = true;
        } else showError(monthError, "Must be a valid month");
      } else showError(monthError, "Please enter number");
    } else showError(monthError);

    if (dayInput.value != "") {
      if (!isNaN(parseInt(dayInput.value))) {
        if (+dayInput.value > 0 && +dayInput.value < 32) {
          if (+monthInput.value == 4 && +dayInput.value > 30) {
            showError(dayError, "Must be a valid date");
            validDay = false;
          } else {
            hiddenError(dayError)
            validDay = true;
          }
        } else showError(dayError, "Must be a valid day");
      } else showError(dayError, "Please enter number");
    } else showError(dayError);

    if (validDay && validMonth && validYear) {
      const birthDate = new Date(`${yearInput.value}-${monthInput.value}-${dayInput.value}`).getTime();
      const age = dateNow.getTime() - birthDate;
      let day = age / 1000 / 60 / 60 / 24;
      let ageYear = ~~(day / 365.25);
      let ageMonth = ~~(day % 365.25 / 30);
      let ageDay = ~~(day % 365.25 % 30);

      interval(result.yearsNumber, ageYear);
      interval(result.monthsNumber, ageMonth);
      interval(result.daysNumber, ageDay);

    }

  }

  function interval(el, num) {
    let i = 0;
    let action = setInterval(function () {
      el.innerHTML = i.toString().length < 2 ? `0${i}` : `${i}`;
      if (i == num) clearInterval(action);
      i++
    }, 300 / num);
  }

  function getAge() {
    submit.addEventListener("click", getResult);
  }

  getAge();

  function style() {
    const stylesheet = new CSSStyleSheet();
    const colors = {
      "purple": "hsl(259, 100%, 65%)",
      "light-red": "hsl(0, 100%, 67%)",
      "white": "hsl(0, 0%, 100%)",
      "off-white": "hsl(0, 0%, 94%)",
      "light-grey": "hsl(0, 0%, 86%)",
      "smokey-grey": "hsl(0, 1%, 44%)",
      "off-black": "hsl(0, 0%, 8%)"
    }

    stylesheet.replaceSync(`* {
    background-color: transparent;
    border: none;
    margin: 0;
    padding: 0;
    }
    *, ::after, ::before {
      box-sizing: border-box;
    }
    [type="button"], [type="reset"], [type="submit"], button, select {
      cursor: pointer;
      user-select: none;
    }
    button, datalist, input, select, textarea {
      color: initial;
      font-family: inherit;
    }
    article, aside, datalist, footer, header, img, main, nav, section, svg, video {
      display: block;
    }
    code, kbd, pre, samp, var {
      font-family: monospace;
    }
    #age_calculator {
      background-color: ${colors["off-white"]};
      font-family: Poppins, sans-serif;
      ${flex()}
      min-height: 100vh;
      line-height: 2;
    }
    #age_calculator .content {
      background-color: ${colors["white"]};
      border-radius: 1.5rem 1.5rem 7.5rem;
      ${width('91.466666667%', '52.5rem')}
      padding: 1.5rem;
    }
    ${onDesktop(`#age_calculator .content {
      border-radius: 3rem 3rem 15rem;
      padding: 3.25rem;
    }`)}
    #age_calculator .content fieldset {
      ${flex('center', 'flex-start')}
      column-gap: 1rem;
    }
    ${onDesktop(`#age_calculator .content fieldset {
      column-gap: 2rem;
    }`)}
    #age_calculator .content fieldset .input-form .label {
      color: ${colors["smokey-grey"]};
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.25rem;
    }
    #age_calculator .content fieldset .input-form.error .label {
      color: ${colors["light-red"]};
    }
    #age_calculator .content fieldset .input-form .input {
      border: 1px solid ${colors["light-grey"]};
      border-radius: 0.5rem;
      color: ${colors["off-black"]};
      caret-color: ${colors["purple"]};
      display: block;
      font-size: 1.125rem;
      font-weight: 700;
      width: 5.5rem;
      padding: 1rem;
      outline: none;
      line-height: 1.3;
    }
    #age_calculator .content fieldset .input-form .input::placeholder {
      color: ${colors["smokey-grey"]};

    }
    #age_calculator .content fieldset .input-form .input:focus {
      border-color: ${colors["purple"]};
    }
    #age_calculator .content fieldset .input-form.error .input {
      border-color: ${colors["light-red"]};
    }
    ${onDesktop(`#age_calculator .content fieldset .input-form .input {
      font-size: 2rem;
      width: 10rem;
    }`)}
    #age_calculator .content fieldset .input-form .input-error {
      color: ${colors["light-red"]};
      font-size: 0.75rem;
      font-weight: 400;
      font-style: italic;
      visibility: hidden;
    }
    #age_calculator .content fieldset .input-form.error .input-error {
      visibility: visible;
    }
    #age_calculator .content .line {
      position: relative;
      margin-bottom: 2.5rem;
      ${flex()}
    }
    ${onDesktop(`#age_calculator .content .line {
      justify-content: flex-end;
    }`)}
    #age_calculator .content .line::after {
      background-color: ${colors["light-grey"]};
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    ${onDesktop(`#age_calculator .content .line::after {
      height: 2px;
    }`)}
    #age_calculator .content .line #submit {
      background-color: ${colors["purple"]};
      border-radius: 50%;
      aspect-ratio: 1 / 1;
      width: 4rem;
      height: 4rem;
      z-index: 1;
      ${flex()}
    }
    ${onDesktop(`#age_calculator .content .line #submit {
      width: 6rem;
      height: 6rem;
    }`)}
    #age_calculator .content .line #submit:hover,
    #age_calculator .content .line #submit:focus {
      background-color: ${colors["off-black"]};
    }
    #age_calculator .content .line #submit .submit-img {
      width: 50%;
    }
    #age_calculator .content .result {
      font-size: 3rem;
      font-weight: 800;
      font-style: italic;
      line-height: 1.2;
    }
    ${onDesktop(`#age_calculator .content .result {
      font-size: 6rem;
    }`)}
    #age_calculator .content .result .result-number {
      color: ${colors["purple"]};
    }
    @font-face {
      font-family: Poppins;
      font-weight: 700;
      font-style: normal;
      src: url(assets/fonts/Poppins-Bold.ttf)
    }
    @font-face {
      font-family: Poppins;
      font-weight: 400;
      font-style: italic;
      src: url(assets/fonts/Poppins-Italic.ttf)
    }
    @font-face {
      font-family: Poppins;
      font-weight: 800;
      font-style: italic;
      src: url(assets/fonts/Poppins-ExtraBoldItalic.ttf)
    }`);

    document.adoptedStyleSheets = [stylesheet];

    function flex(items = "center", justify = "center") {
      return `display: flex;
      align-items: ${items};
      justify-content: ${justify};`;
    }

    function width(min = 'auto', max = 'auto') {
      return `width: ${min};
      max-width: ${max};`;
    }

    function onDesktop(css) {
      return `@media (min-width: 57rem) {
        ${css}
      }`
    }
  }

  style();
})();