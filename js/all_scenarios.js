// Scenario List

var localData = localStorage.getItem('scenario');

if(localData !== null && localData !== '' && localData !== 'undefined'){

    var dataConvert = JSON.parse(localData);
    $.each(dataConvert, function(index,value){

        var scenario_row = '';
            scenario_row += '<tr>';
            scenario_row += '    <td>'+value.scenario_id+'</td>';
            scenario_row += '    <td>'+value.scenario_name+'</td>';
            scenario_row += '    <td>'+value.scenario_time+'</td>';
            scenario_row += '    <td>'+getVehicleId(value.scenario_id)+'</td>';
            scenario_row += '    <td><a href="add_vehicle_page.html" class="text-dark"><i class="fa-solid fa-circle-plus" id="add-vehicle"></i></a></td>';

            scenario_row += '    <td><a href="edit_page.html?scenario_id="'+value.scenarios_id+'" class="text-dark" onclick="editScenario(this,'+value.scenario_id+')"><i class="fa-solid fa-pencil" id="edit-scenario"></i></a></td>';

            scenario_row += '    <td><a href="#" class="text-dark"  onclick="deleteRow(this,'+value.scenario_id+')"><i class="fa-solid fa-trash-can" id="delete-one-scenario"></i></a></td>';

            scenario_row += '</tr>';

        
        $("#scenario-data").append(scenario_row);
    });

}else{

    var scenario_row = '';
        scenario_row += '<tr>';
        scenario_row += '    <td colspan="7">No Data Has Been Added</td>';
        scenario_row += '</tr>';
    $("#scenario-data").html(scenario_row);
}

// Delete ALL Scenario List

$("#delete-scenarios").click(function(){
    localStorage.removeItem('scenario');

    alert(" Data Of Scenario Has been deleted ");
    location.reload();
});


// Delete One Scenario from List

function deleteRow(e,scenarios_id){

    var localScenariosData = localStorage.getItem('scenario');
    var tempScenariosData = JSON.parse(localScenariosData);
    localScenariosData = JSON.parse(localScenariosData);

    $.each(localScenariosData, function(index,value){
        
        if(value.scenarios_id == scenarios_id){
            tempScenariosData.splice(index,1);
        }

    });

    localStorage.setItem('scenario',JSON.stringify(tempScenariosData));

    $(e).parent().parent().remove();

}

// Vehicle Count

function getVehicleId(scenario_id){
    var vehicledata = localStorage.getItem('vehicle');
    vehicledata = JSON.parse(vehicledata);

    var vehicleCount = 0;

    $.each(vehicledata, function(index,value){
        if(value.scenario_id == scenario_id){
            vehicleCount++;
        }

    });

    return vehicleCount;
}