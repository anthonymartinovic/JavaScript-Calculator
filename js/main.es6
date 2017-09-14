$(document).ready(function() {
  alert('Welcome to the Neon Calculator!\n\nYou can keep track of all your calculations in the web console!\n\nTo open console: Option + Cmd + J (Mac) OR Ctrl + Shift + J (Windows)');

  //Static variables
  const $btnCE = $('#ceButton');
  const $btnALL = $('button');
  const $calcInput = $('#calcInput');
  const $calcScreen = $('#calcScreen');

  //Dynamic variables
  let calcAnswer;
  let calcQuestion = '';
  let previousButton = '';

  //Static functions
  const clearText = () => $calcInput.text('');
  const disableBtnCE = () => $btnCE.prop('disabled', true);
  const enableBtnCE = () => $btnCE.prop('disabled', false);
  const extendMathsEquation = buttonValue => calcQuestion += `${buttonValue}`;
  const clearLastEntry = (buttonValue, numberLength) => {
    if (buttonValue === 'CE') {
      calcQuestion = calcQuestion.slice(0, -numberLength);
      previousButton = `${buttonValue}`;
      disableBtnCE();
    } else {
      calcQuestion = calcQuestion.slice(0, -1);
    }
  }
  const verifyCalcInput = () => {
    let _multiplyCheck = calcQuestion.startsWith('*');
    let _divisionCheck = calcQuestion.startsWith('/');

    if (_multiplyCheck || _divisionCheck) {
      calcQuestion = '';
    }
    console.log(calcQuestion);
  }
  const cssAlterations = () => {
    $calcScreen.css({'animation-name': '', 'animation-duration': '', 'animation-play-state': 'paused'});
    $calcInput.css({'color': '#FFF'});
    $btnALL.css({'background-color': 'black', 'transition': '0.5s'});
  }
  const cssErrorAlterations = () => {
    $calcInput.append('ERROR');
    $calcInput.css({'color': '#AAA'});
    $calcScreen.css({'animation-name': 'calc-screen-shake', 'animation-duration': '1s', 'animation-play-state': 'running'});
  }

  //Button 'click' function
  $('.btn').on('click', function(evt) {
    //Static variables
    const $_btn = $(evt.target);
    const $_btnValue = $(evt.target).text();
    const $_numberLength = $calcInput.text().length;

    cssAlterations();

    //AC button response
    if ($_btnValue === 'AC') {
      clearText();
      calcQuestion = '';

    //CE button response
    } else if ($_btnValue === 'CE') {
      clearLastEntry($_btnValue, $_numberLength);
      clearText();

    //= button response
    } else if ($_btnValue === '=') {
      clearText();
      calcAnswer = eval(calcQuestion);

      //If user /'s by 0, provide error message
      if (calcAnswer === Infinity || calcAnswer === -Infinity) {
        cssErrorAlterations();
      } else {
        $calcInput.append(calcAnswer);
      }
      previousButton = `${$_btnValue}`;
      disableBtnCE();

    //DMAS button response
    } else if ($_btn.hasClass('operatorBtn')) {
      //If previous button selected was a DMAS button
      if (previousButton !== '' && previousButton !== '=') {
        clearLastEntry($_btnValue, $_numberLength);
      }
      extendMathsEquation($_btnValue);
      previousButton = `${$_btnValue}`;
      disableBtnCE();

    //Number button response
    } else {
      //If previous button selected was = button
      if (previousButton === '=') {
        calcQuestion = '';
      }
      //If previous button selected was a DMAS button
      if (previousButton !== '') {
        clearText();
        previousButton = '';
      }
      $calcInput.append($_btnValue);
      extendMathsEquation($_btnValue);
      enableBtnCE();
    }

    //Updates console log
    verifyCalcInput();
  }); // .on()
}); // .ready()
