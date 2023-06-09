export function kartya(lista) {
    let tartalom = "";
    for (let index = 0; index < lista.length; index++) {
        tartalom +=
        `<div class = "card-body">
            <img src="${lista[index].kep}" alt="kutya">
            <div id = "adatok">
            <h1>Név: ${lista[index].nev}</h1>
            <h2>Fajta: ${lista[index].fajta}</h2>
            <h2>Kor: ${lista[index].kor}</h2>
            </div>
        </div>`;
    }
    $(".card").eq(0).html(tartalom);
}


export function adminTablazat(lista) {
    let tartalom = 
    `<thead>
        <tr>
            <th id="kepTh">kép</th>
            <th id="nevTh">név</th>
            <th id="fajtaTh">fajta</th>
            <th id="korTh">kor</th>
            <th>módosítás</th>
            <th>törlés</th>
        </tr>
    </thead>
    <tbody>`;
    for (let index = 0; index < lista.length; index++) {
        tartalom +=
        `<tr>
            <td id="kepMezo"><img src="${lista[index].kep}" class="listaKep" alt="kutya"></td>
            <td>${lista[index].nev}</td>
            <td>${lista[index].fajta}</td>
            <td>${lista[index].kor}</td>
            <td class="modositasMezo" data-index="${index}">
                <input type="text" class="modositasInput" value="${lista[index].nev},${lista[index].fajta},${lista[index].kor}"><button class="modositasGomb">✏️</button>
            </td>
            <td class="torlesGomb" data-index="${index}">❌</td>
        </tr>`;
    }
    $("table").eq(0).html(tartalom+=`</tbody>`);

    $("#kepTh, #nevTh, #fajtaTh, #korTh").on("click", function() {
        let columnId = $(this).attr("id");
        let columnName = columnId.slice(0, -2);
        let sortedLista = lista.slice();
        if (columnName === "kor") {
            sortedLista.sort((a, b) => {
                return a[columnName] - b[columnName];
            });
        } else {
            sortedLista.sort((a, b) => {
                return a[columnName].localeCompare(b[columnName], 'hu-HU', {sensitivity: 'base'});
            });
        }
        adminTablazat(sortedLista);
    });

    $(".modositasGomb").on("click", function() {
        let index = $(this).parent().data("index");
        let inputVal = $(this).prev(".modositasInput").val();
        let [nev, fajta, kor] = inputVal.split(",");
        lista[index].nev = nev;
        lista[index].fajta = fajta;
        lista[index].kor = kor;
        adminTablazat(lista);
    });

    $(".torlesGomb").on("click", function() {
        let index = $(this).data("index");
        lista.splice(index, 1);
        adminTablazat(lista);
    });
}

export function szurNevSzerint(lista, feltetel){
    const eredmenyLista = lista.filter(function(kutya){
        return kutya.nev.toLowerCase().includes(feltetel);
    });
    return eredmenyLista;
}

export function szurFajtaSzerint(lista, feltetel){
    const eredmenyLista = lista.filter(function(kutya){
        return kutya.fajta.toLowerCase().includes(feltetel);
    });
    return eredmenyLista;
}

export function szurKorSzerint(lista, elojel, feltetel){
    try{
        const eredmenyLista = lista.filter(function(kutya){
            return eval(kutya.kor+elojel+feltetel)
        })
        return eredmenyLista
    }
    catch{
        return lista
    }
}

export function szur(belista){
    let lista=szurNevSzerint(belista, $("#nev").val());
    lista=szurFajtaSzerint(lista, $("#faj").val());
    lista=szurKorSzerint(lista, $("#kovetelmeny").val(), $("#kor").val());
    adminTablazat(lista);
}
