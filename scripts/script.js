import { adminTablazat, alapTablazat, szur } from "./fuggvenyek.js";
import { kutyakObjektumLista } from "./data.js";

$(function() {
    alapTablazat(kutyakObjektumLista);
    adminTablazat(kutyakObjektumLista);
    $("#nev").on("keyup",function(){
        szur(kutyakObjektumLista)
    })
    $("#faj").on("keyup",function(){
        szur(kutyakObjektumLista)
    })
    $("#kor").on("keyup",function(){
        szur(kutyakObjektumLista)
    })



    $('#felvitel').click(function() {
        var nev = $('#ujNev').val();
        var fajta = $('#ujFaj').val();
        var kor = $('#ujKor').val();
      
        var ujKutya = { nev: nev, fajta: fajta, kor: kor };
      
        kutyakObjektumLista.push(ujKutya);

        console.log(kutyakObjektumLista);

        updateTable();
    });

    function updateTable() {
        var tableBody = $('#tablazat tbody');
      
        tableBody.empty();
      
        for (var i = 0; i < kutyakObjektumLista.length; i++) {
            var obj = kutyakObjektumLista[i];
            var row = $('<tr>');
            row.append($('<td>').text(obj.nev));
            row.append($('<td>').text(obj.fajta));
            row.append($('<td>').text(obj.kor));
            row.append($('<td>').append($('<button>').text('❌').attr('data-index', i).addClass('delete-btn')));
            tableBody.append(row);
        }

        $('.delete-btn').click(function() {
            var index = $(this).data('index');
            kutyakObjektumLista.splice(index, 1);
            updateTable();
        });
    }
});