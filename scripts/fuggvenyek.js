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
            <th>kép</th>
            <th>név</th>
            <th>fajta</th>
            <th>kor</th>
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
        </tr>`;
    }
    $("table").eq(0).html(tartalom+=`</tbody>`);
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