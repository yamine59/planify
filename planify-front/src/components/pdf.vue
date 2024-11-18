<template>
    <div class="flex justify-center items-end content-end cursor-pointer m-4">
      <div  @click="savePdf" class="px-5 py-2 w-52 rounded-xl bg-blue-500 text-center">
        Télécharger le récap
      </div>
    </div>
  </template>
  
  <script setup>
  import { jsPDF } from 'jspdf';
  
  const props = defineProps({
    recapData: {
      type: Object,
      required: true,
      default: () => ({
        destination: '',
        arrive: '',
        depart: '',
        nom: '',
        participants: '',
        description: '',
        prix: ''
      })
    }
  });
  
  const emit = defineEmits(['pdf-saved']);
  


  const savePdf = () => {
    const pdf = new jsPDF();
  
    // Ajouter un cadre
    pdf.rect(5, 5, 200, 287, 'S');
  
    // Titre
    pdf.text('Votre récap', 90, 11);
    pdf.line(84, 13, 125, 13);
  
    // Destination
    pdf.text('Destination:', 10, 25);
    pdf.text(props.recapData.destination, 45, 25);
  
    // Dates
    pdf.text('Arrivée:', 10, 35);
    pdf.text(props.recapData.arrive, 45, 35);
    pdf.text('/', 75, 35);
    pdf.text(props.recapData.depart, 80, 35)
  
    // Nom
    pdf.text('Nom:', 10, 45);
    pdf.text(props.recapData.nom, 45, 45);
  
    // Participants
    pdf.text('Participants:', 10, 55);
    pdf.text(props.recapData.participants.toString(), 45, 55);

    // Prix
    pdf.text('Prix:', 10, 65);
    pdf.text(`${props.recapData.prix.toString()} €`, 45, 65);
  
    // Description (avec gestion des retours à la ligne)
    pdf.text('Description:', 10, 75);
    const descriptionLines = pdf.splitTextToSize(props.recapData.description, 195); // Limite à 195 unités
    pdf.text(descriptionLines, 10, 82);
  
    pdf.save('recap.pdf');
  
    emit('pdf-saved');
  };
  </script>
  