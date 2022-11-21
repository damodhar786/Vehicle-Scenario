// Scenario List

var localData = localStorage.getItem('scenario');

if(localData !== null && localData !== '' && localData !== 'undefined'){

    var dataConvert = JSON.parse(localData);
    $.each(dataConvert, function(index,value){
        console.log(value);

        var scenario_row = '';
        scenario_row += '<tr>';
        scenario_row += '    <td>'+value.scenario_id+'</td>';
        scenario_row += '    <td>'+value.scenario_name+'</td>';
        scenario_row += '    <td>'+value.scenario_time+'</td>';
        scenario_row += '    <td>1</td>';
        scenario_row += '    <td><i class="fa-solid fa-circle-plus" id="add-vehicle"></i></td>';
        scenario_row += '    <td><i class="fa-solid fa-pencil" id="edit-scenario"></i></td>';
        scenario_row += '    <td><i class="fa-solid fa-trash-can" id="delete-one-scenario"></i></td>';
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

$("#delete-one-scenario").click(function(){
    localStorage.removeItem()
});