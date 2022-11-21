//  Select Scenario

var localData = localStorage.getItem('scenario');

if(localData !== null && localData !== '' && localData !== 'undefined'){

    var dataConvert = JSON.parse(localData);
    $.each(dataConvert, function(index,value){
        

        var selectScenario = '';
        selectScenario += '<option value="'+value.scenario_id+'">'+value.scenario_name+'</option>';

        $("#select-scenario").append(selectScenario);
    });

    // View Data of selected Scenario

    $("#select-scenario").change(function(){

        var vehicleData = localStorage.getItem('vehicle');
        vehicleData = JSON.parse(vehicleData);

        var scenarioId = $("#select-scenario").val();

        $("#vehicle-data").html('');

        if(vehicleData !== null && vehicleData !== '' && vehicleData !== 'undefined'){
            var found = 0;
            $.each(vehicleData, function(index,value){
                
                if(value.scenario_id == scenarioId){    
                    var vehicle_row = '';
                        vehicle_row += '<tr>';
                        vehicle_row +=      '<td>'+value.vehicle_id+'</td>';
                        vehicle_row +=      '<td>'+value.vehicle_name+'</td>';
                        vehicle_row +=      '<td>'+value.position_x+'</td>';
                        vehicle_row +=      '<td>'+value.position_y+'</td>';
                        vehicle_row +=      '<td>'+value.speed+'</td>';
                        vehicle_row +=      '<td>'+value.direction+'</td>';

                        vehicle_row +=      '<td><a href="#" class="text-dark"><i class="fa-solid fa-pencil"></i></a></td>';

                        vehicle_row +=      '<td><a href="#" class="text-dark" onclick="deleteRow(this,'+value.vehicle_id+')"><i class="fa-solid fa-trash-can" ></i></a></td>';

                        vehicle_row +=  '</tr> ';

                    $("#vehicle-data").append(vehicle_row);
                    found++;
                }
            });

            if(found == 0){
                var vehicle_row = '';
                vehicle_row += '<tr>';
                vehicle_row += '    <td colspan="8">No Data Has Been Added</td>';
                vehicle_row += '</tr>';
                $("#vehicle-data").html(vehicle_row);
            }

        }
    });
}

// Delete

function deleteRow(e,vehicle_id){
    // alert(vehicle_id);

    var localVehicleData = localStorage.getItem('vehicle');
    var tempVehicleData = JSON.parse(localVehicleData);
    localVehicleData = JSON.parse(localVehicleData);

    $.each(localVehicleData, function(index,value){
        
        if(value.vehicle_id == vehicle_id){
            tempVehicleData.splice(index,1);
        }

    });

    // localStorage.setItem('vehicle',JSON.stringify(tempVehicleData));

    $(e).parent().parent().remove();

}

// Edit
