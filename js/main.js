'use strict';

$(document).ready(function () {
  alert('Welcome to the Neon Calculator!\n\nYou can keep track of all your calculations in the web console!\n\nTo open console: Option + Cmd + J (Mac) OR Ctrl + Shift + J (Windows)');

  //Static variables
  var $btnCE = $('#ceButton');
  var $btnALL = $('button');
  var $calcInput = $('#calcInput');
  var $calcScreen = $('#calcScreen');

  //Dynamic variables
  var calcAnswer = void 0;
  var calcQuestion = '';
  var previousButton = '';

  //Static functions
  var clearText = function clearText() {
    return $calcInput.text('');
  };
  var disableBtnCE = function disableBtnCE() {
    return $btnCE.prop('disabled', true);
  };
  var enableBtnCE = function enableBtnCE() {
    return $btnCE.prop('disabled', false);
  };
  var extendMathsEquation = function extendMathsEquation(buttonValue) {
    return calcQuestion += '' + buttonValue;
  };
  var clearLastEntry = function clearLastEntry(buttonValue, numberLength) {
    if (buttonValue === 'CE') {
      calcQuestion = calcQuestion.slice(0, -numberLength);
      previousButton = '' + buttonValue;
      disableBtnCE();
    } else {
      calcQuestion = calcQuestion.slice(0, -1);
    }
  };
  var verifyCalcInput = function verifyCalcInput() {
    var _multiplyCheck = calcQuestion.startsWith('*');
    var _divisionCheck = calcQuestion.startsWith('/');

    if (_multiplyCheck || _divisionCheck) {
      calcQuestion = '';
    }
    console.log(calcQuestion);
  };
  var cssAlterations = function cssAlterations() {
    $calcScreen.css({ 'animation-name': '', 'animation-duration': '', 'animation-play-state': 'paused' });
    $calcInput.css({ 'color': '#FFF' });
    $btnALL.css({ 'background-color': 'black', 'transition': '0.5s' });
  };
  var cssErrorAlterations = function cssErrorAlterations() {
    $calcInput.append('ERROR');
    $calcInput.css({ 'color': '#AAA' });
    $calcScreen.css({ 'animation-name': 'calc-screen-shake', 'animation-duration': '1s', 'animation-play-state': 'running' });
  };

  //Button 'click' function
  $('.btn').on('click', function (evt) {
    //Static variables
    var $_btn = $(evt.target);
    var $_btnValue = $(evt.target).text();
    var $_numberLength = $calcInput.text().length;

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
      previousButton = '' + $_btnValue;
      disableBtnCE();

      //DMAS button response
    } else if ($_btn.hasClass('operatorBtn')) {
      //If previous button selected was a DMAS button
      if (previousButton !== '' && previousButton !== '=') {
        clearLastEntry($_btnValue, $_numberLength);
      }
      extendMathsEquation($_btnValue);
      previousButton = '' + $_btnValue;
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