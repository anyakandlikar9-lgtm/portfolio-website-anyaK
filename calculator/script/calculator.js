let calculation = localStorage.getItem('calculation') || '';
  displayCalculator();

      function updateCalculation(value) {
        calculation+= value;
        displayCalculator();

        localStorage.setItem('calculation', calculation);
      }

      function displayCalculator() {
        document.querySelector('.js-calculation')
          .innerHTML = calculation;
      }