// Load local storage data of scenario 
var scenarioLocalData = localStorage.getItem('scenario');

if(scenarioLocalData !== null && scenarioLocalData !== '' && scenarioLocalData !== 'undefined'){

    var dataConvert = JSON.parse(scenarioLocalData);
    $.each(dataConvert, function(index,value){

        var scenarioList = '';
        scenarioList += '<option value="'+value.scenario_id+'">'+value.scenario_name+'</option>';

        $("#scenario-id").append(scenarioList);
    });

}

var url = new URL(window.location.href );
var vehicleParam = url.searchParams.get("vehicle_id");

var vehicleLocalData = localStorage.getItem('vehicle');
vehicleLocalData = JSON.parse(vehicleLocalData);

$.each(vehicleLocalData, function(index,value){
    if(value.vehicle_id == vehicleParam){

    $("#scenario-id").val(value.scenario_id);
    $("#vehicle-name").val(value.vehicle_name);
    $("#speed").val(value.speed);
    $("#position-x").val(value.position_x);
    $("#position-y").val(value.position_y);
    $("#direction").val(value.direction);

    }
});

// Edit Vehicle Details

function editVehicle(){
    $("#scenario-id-error").hide();
    $("#vehicle-name-error").hide();
    $("#speed-error").hide();
    $("#position-x-error").hide();
    $("#position-y-error").hide();
    $("#direction-error").hide();

    var scenarioId = $("#scenario-id").val();
    var vehicleName = $("#vehicle-name").val();
    var speed = $("#speed").val();
    var positionX = $("#position-x").val();
    var positionY = $("#position-y").val();
    var direction = $("#direction").val();

    var tempLocalData = vehicleLocalData;

    
    if(scenarioId !== '' && vehicleName !== '' && speed !== '' && positionX !== '' || positionY !== '' ||direction !== '' )
    {
        $.each(vehicleLocalData, function(index,value){
            if(value.vehicle_id == vehicleParam){

              tempLocalData[index]['scenario_id'] = scenarioId;
              tempLocalData[index]['vehicle_name'] = vehicleName;
              tempLocalData[index]['speed'] = speed;
              tempLocalData[index]['position_x'] = positionX;
              tempLocalData[index]['position_y'] = positionY;
              tempLocalData[index]['direction'] = direction;

            }
        });

        localStorage.setItem('vehicle',JSON.stringify(tempLocalData));

        alert("Vehicle Data Updated Successfully");


    }else{

        if(scenarioId == '' || scenarioId == null){
            
            $("#scenario-id-error").show();
        }
        if(vehicleName == '' || vehicleName == null){
            
            $("#vehicle-name-error").show();
        }
        if(speed == '' || speed == null){
            
            $("#speed-error").show();
        }
        if(positionX == '' || positionX == null){
            
            $("#position-x-error").show();
        }
        if(positionY == '' || positionY == null){
            
            $("#position-y-error").show();
        }
        if(direction == '' || direction == null){
            
            $("#direction-error").show();
        }
    } 
}

// Reset

$("#reset").click(function(){
    $("#scenario-id").val('');
    $("#vehicle-name").val('');
    $("#speed").val('');
    $("#position-x").val('');
    $("#position-y").val('');
    $("#direction").val('');

    $("#scenario-id-error").hide();
    $("#vehicle-name-error").hide();
    $("#speed-error").hide();
    $("#position-x-error").hide();
    $("#position-y-error").hide();
    $("#direction-error").hide();
});