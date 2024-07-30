window.onload = () => {
  generaHTMLTransazioni(transazioni);
};
let modalitaModifica = false;
let indiceTransazioneCheStoModificando
const generaHTMLTransazioni = () => {
  // <tr>
  //     <td>1</td>
  //     <td>2022-01-20</td>
  //     <td>ENTRATA</td>
  //     <td>Stipendio</td>
  //     <td>€ 5000</td>
  //     <td></td>
  //     <td></td>
  //     <td></td>
  // </tr>
  const transazioniTBody = document.getElementById("transazioniTBody");
  transazioniTBody.innerHTML = ""
  let indice = 0
  for (const t of transazioni) {
    const tr = document.createElement("tr");
    transazioniTBody.appendChild(tr);

    //progressivo
    const tdprogressivo = document.createElement("td");
    tr.appendChild(tdprogressivo); //tdprogressivo.parentElement = tr
    tdprogressivo.innerHTML = indice + 1;
    //data
    const tdData = document.createElement("td");
    tr.appendChild(tdData); //tdprogressivo.parentElement = tr
    tdData.innerHTML = t.data;
    //tipo
    const tdTipo = document.createElement("td");
    tr.appendChild(tdTipo); //tdprogressivo.parentElement = tr
    tdTipo.innerHTML = t.tipo;
    //descrizione
    const tdDescrizione = document.createElement("td");
    tr.appendChild(tdDescrizione); //tdprogressivo.parentElement = tr
    tdDescrizione.innerHTML = t.descrizione;
    //importo
    const tdImporto = document.createElement("td");
    tr.appendChild(tdImporto); //tdprogressivo.parentElement = tr
    tdImporto.innerHTML = "€" + t.importo;
    //1
   /*  if(t.tipo == "ENTRATA"){
        tdImporto.classList.add("text-success");
    }
    else {
        tdImporto.classList.add("text-danger");
    } */
    //2
    //t.tipo == "ENTRATA" ? tdImporto.classList.add("text-success") : tdImporto.classList.add("text-danger");//operatore ternario
    //3
    tdImporto.classList.add(t.tipo == "ENTRATA" ? "text-success" : "text-danger"); //operatore ternario
    //bottone MODIFICA
    const tdModifica = document.createElement("td");
    tr.appendChild(tdModifica); //tdprogressivo.parentElement = tr

    // <button type="button" class="btn btn-primary" >
        //     <i class="bi bi-pencil-fill"></i>
        // </button>
    const btnModifica = document.createElement("button");
    btnModifica.className = "btn btn-primary"; 
    btnModifica.type= "button";
    tdModifica.appendChild(btnModifica);
    const iModifica = document.createElement("i")
    btnModifica.appendChild(iModifica);
    iModifica.className = "bi bi-pencil-fill";

    iModifica.setAttribute("data-indice", indice)
        btnModifica.setAttribute("data-indice", indice)
        btnModifica.addEventListener("click", (e)=> {
            let i = e.target.getAttribute("data-indice");
        modifica(i)
        });
    //bottone elimina
    const tdElimina = document.createElement("td");
    tr.appendChild(tdElimina); //tdprogressivo.parentElement = tr
   
     // <button type="button" class="btn btn-danger">
        //     <i class="bi bi-trash-fill"></i>
        // </button>
        const btnElimina = document.createElement("button");
        tdElimina.appendChild(btnElimina);
        btnElimina.className = "btn btn-danger";
        btnElimina.type = "button";

        const iElimina = document.createElement("i");
        btnElimina.appendChild(iElimina);
        iElimina.className = "bi bi-trash-fill";

        iElimina.setAttribute("data-indice", indice)
        btnElimina.setAttribute("data-indice", indice)
        btnElimina.addEventListener("click", (e)=> {
            let i = e.target.getAttribute("data-indice");
        elimina(i)
    })
       indice++
  }
  const totaleTransazioni = document.getElementById("totaleTransazioni")
  totaleTransazioni.innerHTML = calcolaTotale(transazioni)
}
const calcolaTotale = (movimenti) =>{
    let totale = 0;
    for(const m of movimenti){
        if(m.tipo == "ENTRATA"){
            totale += m.importo
        }
        else{
            totale -= m.importo
        }
    }
    return totale;
}
const elimina= (indice) =>{
    console.log(indice)
    transazioni.splice(indice,1);
    generaHTMLTransazioni(transazioni);
}
const modifica = (indice) =>{
    modalitaModifica = true;
    indiceTransazioneCheStoModificando = indice;
    //prendo il riferimento agli input
    const inputData=document.getElementById("data")
    const inputTipo=document.getElementById("tipo")
    const inputDescrizione=document.getElementById("descrizione")
    const inputImporto=document.getElementById("importo")
    const btnSalva=document.getElementById("btnSalva")
    //perndo il riferimento alla tarnsazione che voglio modificare attraverso l indice
    const transazioneCheVoglioModificare = transazioni[indice]
    //copio i dati  della tarnsazione negli input
    inputData.value=transazioneCheVoglioModificare.data
    inputTipo.value=transazioneCheVoglioModificare.tipo
    inputDescrizione.value=transazioneCheVoglioModificare.descrizione
    inputImporto.value=transazioneCheVoglioModificare.importo
    //cambio il testo del bottone 
    btnSalva.innerHTML= "salva"
}
const salvaTransazione = () =>{
    //prendo il riferimento agli input
    const inputData=document.getElementById("data")
    const inputTipo=document.getElementById("tipo")
    const inputDescrizione=document.getElementById("descrizione")
    const inputImporto=document.getElementById("importo")
    

    //validazione input
    if(inputData.value.trim()==""){
        //messaggio all utente
        inviaMessaggio("valore data mancante",false) 
        inputData.className = "bordoRosso"


        return

    }
    if(inputDescrizione.value.trim()==""){
        //messaggio all utente
        inviaMessaggio("valore descrizione mancante",false)
        inputDescrizione.className = "bordoRosso"
        return

    }
    if(inputImporto.value.trim()==""){
        //messaggio all utente
        inviaMessaggio("valore importo mancante",false)
        inputImporto.className = "bordoRosso"
        return

    }
    if(parseFloat(inputImporto.value)<0){
        inviaMessaggio(" l importo deve essere positivo",false);
        return
    }
    //controllo se sto modificando o se sto inserendo
    if(modalitaModifica){
        //modifico transazione esistente
        transazioni[indiceTransazioneCheStoModificando].data = inputData.value
        transazioni[indiceTransazioneCheStoModificando].tipo = inputTipo.value
        transazioni[indiceTransazioneCheStoModificando].descrizione = inputDescrizione.value
        transazioni[indiceTransazioneCheStoModificando].importo = parseFloat(inputImporto.value)
    

    }else{
        //inserisco nuova transazione
        let nuovaTransazione ={
        
            data: inputData.value,
            tipo: inputTipo.value,
            descrizione: inputDescrizione.value,
            importo: parseFloat(inputImporto.value)
        }
        transazioni.push(nuovaTransazione);

    }
    
    // messaggio ok
    inviaMessaggio(`transazione ${modalitaModifica? "modicata": "inserita"} con successo`,true)
    //pulisco la form
    inputData.value="";
    inputTipo.value="ENTRATA";
    inputDescrizione.value="";
    inputImporto.value=0;
    modalitaModifica = false;
    indiceTransazioneCheStoModificando = undefined;
    document.getElementById("btnSalva").innerHTML="aggiungi"
    //ridenero la tabella delle transazioni
    generaHTMLTransazioni(transazioni);
}
const inviaMessaggio=(testo,ok)=>{
    
    const divMessaggio = document.getElementById("messaggio")
    divMessaggio.innerHTML = testo
    divMessaggio.className =ok ? "text-success": "text-danger"
   /*  if(ok==true){
        
        divMessaggio.className = "text-success"
    } */
    

}