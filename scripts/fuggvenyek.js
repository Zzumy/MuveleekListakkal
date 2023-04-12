export function alapTablazat(lista) {
    let tartalom = 
    `<thead>
        <tr>
            <th>név</th>
            <th>fajta</th>
            <th>kor</th>
        </tr>
    </thead>
    <tbody>`;
    for (let index = 0; index < lista.length; index++) {
        tartalom +=
        `<tr>
            <td>${lista[index].nev}</td>
            <td>${lista[index].fajta}</td>
            <td>${lista[index].kor}</td>
        </tr>`;
    }
    $("table").eq(0).html(tartalom+=`</tbody>`);
}

export function adminTablazat(lista) {
    let tartalom = 
    `<thead>
        <tr>
            <th>név</th>
            <th>fajta</th>
            <th>kor</th>
            <th>törlés</th>
        </tr>
    </thead>
    <tbody>`;
    for (let index = 0; index < lista.length; index++) {
        tartalom +=
        `<tr>
            <td>${lista[index].nev}</td>
            <td>${lista[index].fajta}</td>
            <td>${lista[index].kor}</td>
            <td>❌</td>
        </tr>`;
    }
    $("#tablazat").eq(0).html(tartalom+=`</tbody>`);
    
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

export function szurKorSzerint(lista, feltetel){
    try {
        const filteredList = lista.filter(kutya => eval(`${kutya.kor}${feltetel}`));
        return filteredList;
      } catch(error) {
        return lista;
      }
}

export function szur(belista){
    let lista=szurNevSzerint(belista, $("#nev").val());
    lista=szurFajtaSzerint(lista, $("#faj").val());
    lista=szurKorSzerint(lista, $("#kor").val());
    alapTablazat(lista);
}