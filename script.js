 var driversData = [
      {
        "name": "JAYDEN",
        "roadLength": 200000,
        "position": 0
      },
      {
        "name": "SASHA",
        "roadLength": 75000,
        "position": 0
      },
      {
        "name": "CHRIS N",
        "roadLength": 150000,
        "position": 0
      },
      {
        "name": "GEORGE",
        "roadLength": 75000,
        "position": 0
      },
      {
        "name": "ADAM",
        "roadLength": 50000,
        "position": 0
      },
      {
        "name": "VICTOR",
        "roadLength": 25000,
        "position": 0
      }
    ];

  function handleDriverChange() {
  var selectedDriver = parseInt(document.getElementById("driverSelect").value);
  var car = document.querySelector(".car" + selectedDriver);
  var driver = driversData[selectedDriver];
  var driverNameElement = car.querySelector(".driver-name");
  var driverPositionElement = car.querySelector(".driver-position");
  driverNameElement.textContent = driver.name;
  driverPositionElement.textContent = "Position: " + (driver.position * 100).toFixed(2) + "%";
  car.style.left = (driver.position * 100) + "%";

  // Сохраняем выбранного водителя в локальное хранилище
  localStorage.setItem("selectedDriver", selectedDriver);

  // Обновляем таблицу с позициями
  updateTournamentTable();
}



  function moveCar() {
  var amountInput = document.getElementById("amount");
  var amount = parseFloat(amountInput.value);
  if (!isNaN(amount)) {
    var selectedDriver = document.getElementById("driverSelect").value;
    var driver = driversData[selectedDriver];
    
    // Устанавливаем новую позицию, используя только введенное значение
    driver.position = amount / driver.roadLength;

    // Ограничиваем позицию от 0 до 1
    if (driver.position < 0) {
      driver.position = 0;
    } else if (driver.position > 1) {
      driver.position = 1;
    }

    var car = document.getElementById("car" + selectedDriver);
    car.style.left = (driver.position * (100 - car.offsetWidth / window.innerWidth * 100)) + "%";

    var driverPositionElement = car.querySelector(".driver-position");
    driverPositionElement.textContent = "Position: " + (driver.position * 100).toFixed(2) + "%";

    if (driver.position >= 1) {
      showVictory(selectedDriver);
    }

    // Обновляем таблицу с позициями
    updateTournamentTable();
  }
}



    function showVictory(driverIndex) {
      var flagText = document.getElementById("flag-text" + driverIndex);
      flagText.style.display = "block";
    }

    function updateTournamentTable() {
      var tournamentTable = document.getElementById("tournament-table");
      var selectedDriver = document.getElementById("driverSelect").value;
      var driver = driversData[selectedDriver];
      var currentPosition = driver.position * 100;

      // Сортировка водителей по позиции
      driversData.sort(function(a, b) {
        return b.position - a.position;
      });

      // Обновление позиции водителей в таблице
      for (var i = 0; i < driversData.length; i++) {
        var currentDriver = driversData[i];
        var driverRow = tournamentTable.querySelector("tr[data-driver='" + currentDriver.name + "']");

        if (!driverRow) {
          driverRow = document.createElement("tr");
          driverRow.setAttribute("data-driver", currentDriver.name);
          tournamentTable.appendChild(driverRow);
        }

        var position = i + 1;
        var positionText = position + (position === 1 ? "st" : position === 2 ? "nd" : position === 3 ? "rd" : "th");

        driverRow.innerHTML = `
          <td>${currentDriver.name}</td>
          <td>${positionText}</td>
        `;
      }
    }