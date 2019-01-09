$(function () {
    $.ajax({
        type: "GET",
        url: "json/honor_upload.json",
        dataType: "json",
        success: function (data) {
            var tr = "";
            $.each(data, function (i, val) {
                tr += "<tr>" +
                    "<td>" + data[i].id + "</td>" +
                    "<td>" + data[i].user + "</td>" +
                    "<td>" + data[i].honor_num + "</td>" +
                    "<td>" + data[i].zero + "</td>" +
                    "<td>" + data[i].one + "</td>" +
                    "<td>" + data[i].two + "</td>" +
                    "<td>" + data[i].three + "</td>" +
                    "<td>" + data[i].four + "</td>" +
                    "<td>" + data[i].five + "</td>" +
                    "<td>" + data[i].six + "</td>" +
                    "<td>" + data[i].seven + "</td>" +
                    "<td>" + data[i].eight + "</td>" +
                    "<td>" + data[i].nine + "</td>" +
                    "<td>" + data[i].ten + "</td>" +
                    "</tr>";
            });
            $("#honor_table").html(tr);


        },
        error: function () {

        }
    })
});