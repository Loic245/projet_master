const Head = (jsPDF: any, data: any, note: any) => {
  jsPDF.rect(20, 20, 80, 40);
  jsPDF.text("Etablissement", 40, 30);
  jsPDF.text("Scolaire", 50, 40);

  jsPDF.setFontSize(10);
  jsPDF.setFont(undefined, "bold");
  jsPDF.text("Nom ", 120, 30);
  jsPDF.text("Prénom ", 120, 35);
  jsPDF.text("CIN ", 120, 40);
  jsPDF.text("Adresse ", 120, 45);
  jsPDF.text("Niveau ", 120, 50);
  jsPDF.text("Année ", 120, 55);

  jsPDF.setFontSize(10);
  jsPDF.setFont(undefined, "normal");
  jsPDF.text(`: ${data.nom || data.nomEtu}`, 135, 30);
  jsPDF.text(`: ${data.prenom || data.prenomEtu}`, 135, 35);
  jsPDF.text(`: ${data.CIN || ""}`, 135, 40);
  jsPDF.text(`: ${data.adresse || data.adresseEtu || ""}`, 135, 45);
  jsPDF.text(`: ${note.note[0].niveau || ""}`, 135, 50);
  jsPDF.text(`: ${note.note[0].annee || ""}`, 135, 55);

  let yIndex = 100;
  let xINdex = 90;

  for (let k = 0; k < note.periode?.length; k++) {
    jsPDF.setFontSize(8);
    jsPDF.setFont(undefined, "normal");
    jsPDF.text(`${note.periode[k].periode}`, xINdex, 80);

    xINdex += 18;
  }

  xINdex = 94;

  for (let i = 0; i < note.matiere?.length; i++) {
    jsPDF.setFontSize(10);
    jsPDF.setFont(undefined, "bold");
    jsPDF.text(`${note.matiere[i].matiere}`, 15, yIndex);

    for (let j = 0; j < note.note?.length; j++) {
      if (note.matiere[i].matiere === note.note[j].matiere) {
        for (let m = 0; m < note.periode?.length; m++) {
          if (note.periode[m].periode === note.note[j].periode) {
            jsPDF.setFontSize(8);
            jsPDF.setFont(undefined, "normal");
            jsPDF.text(`${note.note[j].note}`, xINdex, yIndex);

            xINdex += 18;
          }
        }
      }
    }
    xINdex = 94;

    yIndex += 10;
  }

  jsPDF.setFontSize(10);
  jsPDF.setFont(undefined, "normal");
  jsPDF.text("Directeur Général de l'établissement", 135, 250);
  jsPDF.rect(150, 260, 30, 20);
};

export default Head;
