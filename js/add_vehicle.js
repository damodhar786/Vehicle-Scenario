var localData = localStorage.getItem('scenario');

if(localData !== null && localData !== '' && localData !== 'undefined'){

    var dataConvert = JSON.parse(localData);
    $.each(dataConvert, function(index,value){

        var scenarioList = '';
        scenarioList += '<option value="'+value.scenario_id+'">'+value.scenario_name+'</option>';

        $("#scenario-id").append(scenarioList);
    });

}


$("#add").click(function(){

    
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

    
    if(scenarioId !== '' && vehicleName !== '' && speed !== '' && positionX !== '' || positionY !== '' ||direction !== '' )
    {
        var localData = localStorage.getItem('vehicle');
        if(localData !== null && localData !== '' && localData !== 'undefined'){

            var dataConvert = JSON.parse(localData);

            var vehicle = {
                'scenario_id': scenarioId,
                'vehicle_id': dataConvert.length + 1,
                'vehicle_name': vehicleName,
                'speed': speed,
                'position_x': positionX,
                'position_y': positionY,
                'direction': direction
            }; 

            dataConvert.push(vehicle);
            localStorage.setItem('vehicle',JSON.stringify(dataConvert));

            alert("Your Vehicle Added");
                $("#scenario-id").val('');
                $("#vehicle-name").val('');
                $("#speed").val('');
                $("#position-x").val('');
                $("#position-y").val('');
                $("#direction").val('');

            
        }else
        { 
            var vehicle = [{
                'scenario_id': scenarioId,
                'vehicle_id': 1,
                'vehicle_name': vehicleName,
                'speed': speed,
                'position_x': positionX,
                'position_y': positionY,
                'direction': direction
            }];

            localStorage.setItem('vehicle',JSON.stringify(vehicle));

            alert("Your Vehicle Added");
            
            $("#scenario-id").val('');
            $("#vehicle-name").val('');
            $("#speed").val('');
            $("#position-x").val('');
            $("#position-y").val('');
            $("#direction").val('');
        }

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

});


// Reset

$("#reset").click(function(){
    $("#scenario-id").val('');
    $("#vehicle-name").val('');
    $("#speed").val('');
    $("#position-x").val('');
    $("#position-y").val('');
    $("#direction").val('');
});