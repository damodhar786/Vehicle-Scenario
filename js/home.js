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

// Movement of Vehicles

    // Forward: top:50px; left:60px - left: x
    // Backward: top:50px; right:60px - right: x
    // Upward: top:50px; right:60px - bottom: y
    // Downward: bottom:50px; right:60px - top: y

function start_simulation(){
    var vehicles = $('#road').find('.vehicles');
    $.each(vehicles,function(vIndex,vehicle){
        var position = 1;
        var id = $(this).attr('id');
        var x = $(this).attr('data-x');
        var y = $(this).attr('data-y');
        var direction = $(this).attr('data-direction');

        // console.log($(this).attr('id'))
        // console.log("x: "+$(this).attr('data-x'))
        // console.log("y: "+$(this).attr('data-y'))
        // console.log("direction: "+$(this).attr('data-direction'))

        move_vehicle(position,id,x,y,direction);
    });
}

function move_vehicle(position,id,x,y,direction){

    // console.log(id);
    var move = document.getElementById(id);
    if(direction == 'forward'){
        console.log(direction)
        console.log(position)
        console.log(x+":"+y)
        position = parseInt(x) + 10;
        x = position;
        
        //$('#'+id).css({})
        //$('#'+id).css({"left": position+"px", "top": y+"px", "right":'unset',"bottom":'unset'})
        //document.getElementById(id).style.transform = 'translate('+y+'%,-'+position+'%)';

        // document.getElementById(id).style.left = position + "px";
        // document.getElementById(id).style.top = y+ "px";

        move.style.left = position+"px";
        move.style.bottom = y+"px";
    }
    else if(direction == 'backward'){
        
        position = parseInt(x) + 10;
        x = position;
        //document.getElementById(id).style.right = position + "px";
        move.style.right = position+"px";
        move.style.bottom = y+"px";
    }else if(direction == 'upward'){
        
        position = parseInt(y) + 10;
        y = position;
        //document.getElementById(id).style.bottom = position + "px";
        move.style.bottom = position+"px";
    }else if(direction == 'downward'){
        position = parseInt(y) + 10;
        y = position;
        //document.getElementById(id).style.top = position + "px";
        move.style.top = position+"px";
    }

    if (position <= 1000) {
        window.setTimeout('move_vehicle('+position+',"'+id+'",'+x+','+y+',"'+direction+'")', 1000);
    }
}