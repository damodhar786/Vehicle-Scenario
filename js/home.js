//  Select Scenario

var localData = localStorage.getItem('scenario');

if (localData !== null && localData !== '' && localData !== 'undefined') {

    var dataConvert = JSON.parse(localData);
    $.each(dataConvert, function (index, value) {

        var selectScenario = '';
        selectScenario += '<option value="' + value.scenario_id + '">' + value.scenario_name + '</option>';

        $("#select-scenario").append(selectScenario);
    });

    // View Data of selected Scenario and vehicles position

    $("#select-scenario").change(function () {

        var vehicleData = localStorage.getItem('vehicle');
        vehicleData = JSON.parse(vehicleData);

        var scenarioId = $("#select-scenario").val();
        var scenarioTime = 0;
        $.each(dataConvert, function (index, value) {
            if (value.scenario_id == scenarioId) {
                scenarioTime = value.scenario_time;

                localStorage.setItem('scenarioTime', scenarioTime);
            }
        });

        $("#vehicle-data").html('');

        if (vehicleData !== null && vehicleData !== '' && vehicleData !== 'undefined') {
            var found = 0;

            $("#road").html('');

            $.each(vehicleData, function (index, value) {

                if (value.scenario_id == scenarioId) {
                    var vehicle_row = '';
                    vehicle_row += '<tr>';
                    vehicle_row += '<td>' + value.vehicle_id + '</td>';
                    vehicle_row += '<td>' + value.vehicle_name + '</td>';
                    vehicle_row += '<td>' + value.position_x + '</td>';
                    vehicle_row += '<td>' + value.position_y + '</td>';
                    vehicle_row += '<td>' + value.speed + '</td>';
                    vehicle_row += '<td>' + value.direction + '</td>';

                    vehicle_row += '<td><a href="./edit_vehicle_page.html?vehicle_id=' + value.vehicle_id + '" class="text-dark"><i class="fa-solid fa-pencil"></i></a></td>';

                    vehicle_row += '<td><a href="#" class="text-dark" onclick="deleteRow(this,' + value.vehicle_id + ')"><i class="fa-solid fa-trash-can" ></i></a></td>';

                    vehicle_row += '</tr> ';

                    $("#vehicle-data").append(vehicle_row);
                    found++;

                    var vehiclesOnRoad = '';

                    vehiclesOnRoad += '<div class="vehicles bg-info" id="' + value.vehicle_name + '" style=" width:20px; height:20px; border-radius:50px; text-align: center;   position: absolute; left: ' + value.position_x + 'px; bottom:' + value.position_y + 'px;" data-x="' + value.position_x + '" data-y="' + value.position_y + '" data-speed="' + value.speed + '" data-direction="' + value.direction + '">';

                    vehiclesOnRoad += '<span style="padding: 5px;">' + value.vehicle_id + '</span>';

                    vehiclesOnRoad += '</div>';

                    $("#road").append(vehiclesOnRoad);
                }
            });

            if (found == 0) {
                var vehicle_row = '';
                vehicle_row += '<tr>';
                vehicle_row += '    <td colspan="8">No Data Has Been Added</td>';
                vehicle_row += '</tr>';
                $("#vehicle-data").html(vehicle_row);
            }

        }
    });
}



// Color of vehicles

// color:'+hexColor+';

// const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

// let hexColor = '#';

//     for(let i = 0; i < 6; i++){
//         hexColor += hex[getRandomColor()];
//     }

//     color.textContent = hexColor;
//     document.body.style.color = hexColor;

//     function getRandomColor(){
//         return Math.floor(Math.random() * hex.length);
//     }





// Delete a row 

function deleteRow(e, vehicle_id) {

    var localVehicleData = localStorage.getItem('vehicle');
    var tempVehicleData = JSON.parse(localVehicleData);
    localVehicleData = JSON.parse(localVehicleData);

    $.each(localVehicleData, function (index, value) {

        if (value.vehicle_id == vehicle_id) {
            tempVehicleData.splice(index, 1);
        }

    });

    localStorage.setItem('vehicle', JSON.stringify(tempVehicleData));

    $(e).parent().parent().remove();

}

// Movement of Vehicles

// Forward: top:50px; left:60px - left: x
// Backward: top:50px; right:60px - right: x
// Upward: top:50px; right:60px - bottom: y
// Downward: bottom:50px; right:60px - top: y

function start_simulation() {
    var vehicles = $('#road').find('.vehicles');

    var scenarioTime = localStorage.getItem('scenarioTime');
    var startTime = 0;

    $.each(vehicles, function (vIndex, vehicle) {
        var position = 1;
        var id = $(this).attr('id');
        var x = $(this).attr('data-x');
        var y = $(this).attr('data-y');
        var speed = $(this).attr('data-speed');
        var direction = $(this).attr('data-direction');

        move_vehicle(position, id, x, y, speed, direction, scenarioTime, startTime);
    });
}

function move_vehicle(position, id, x, y, speed, direction, scenarioTime, startTime) {

    console.log('startTime');
    console.log(startTime);
    console.log('scenarioTime');
    console.log(scenarioTime);
    var move = document.getElementById(id);
    if (direction == 'Towards') {

        position = parseInt(x) + 5;
        x = position;

        move.style.left = position + "px";
        move.style.bottom = y + "px";
    }
    else if (direction == 'Backwards') {

        position = parseInt(x) - 5;
        x = position;

        move.style.bottom = y + "px";
        move.style.left = position + "px";

    } else if (direction == 'Upwards') {

        position = parseInt(y) + 5;
        y = position;

        move.style.bottom = position + "px";

    } else if (direction == 'Downwards') {
        position = parseInt(y) + 5;
        y = position;

        move.style.top = position + "px";

    }

    if (startTime <= scenarioTime) {

        startTime++;

        window.setTimeout('move_vehicle(' + position + ',"' + id + '",' + x + ',' + y + ',' + speed + ',"' + direction + '",' + scenarioTime + ',' + startTime + ')', speed);

        
    }

}

// Stop Simulation

function stopSimulation() {
    $("#road").html('');
}