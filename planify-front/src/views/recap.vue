<template>
    <div ref="captureSection" class="template-section flex justify-center items-center flex-col">
      <div class="flex justify-center m-10">
        <img src="./../assets/img/logo.png" class="w-72" alt="" />
      </div>
  
      <div class="flex justify-center gap-24 my-10">
        <recapfinal class="w-96 text-center" @name="nom" />
        <activityAddComp2 />
      </div>
    </div>
    <div class="flex justify-center items-center w-full">
      <button @click="captureAndDownload" class="p-5 rounded-lg bg-blue-400 m-5 mb-16">Télécharger Votre Planify</button>
    </div>
  </template>
  
  <script setup>
  import activityAddComp2 from '@/components/activityAddComp2.vue';
  import recapfinal from '@/components/recapfinal.vue';
  import { ref } from 'vue';
  import jsPDF from 'jspdf';
  import html2canvas from 'html2canvas';
  const named = ref ()
  const captureSection = ref(null);
  const nom = (name) => {
    named.value = name 
  }
  const captureAndDownload = () => {
    if (captureSection.value) {
      html2canvas(captureSection.value, { scale: 2 })  // Augmente la résolution de l'image
        .then(canvas => {
          const imageData = canvas.toDataURL('image/png');
          
          // Initialiser le PDF en mode paysage (format "a4" en mm)
          const pdf = new jsPDF("landscape", "mm", "a4");
  
          // Dimensions pour la page A4 en paysage (297 mm x 210 mm)
          const pdfWidth = 297;
          const pdfHeight = 210;
  
          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;
  
          // Calculer le ratio pour l'image
          let imgWidth = pdfWidth;
          let imgHeight = (canvasHeight * imgWidth) / canvasWidth;
  
          // Si l'image est trop grande, la redimensionner pour tenir dans la page
          if (imgHeight > pdfHeight) {
            const scaleFactor = pdfHeight / imgHeight;
            imgWidth *= scaleFactor;
            imgHeight = pdfHeight;
          }
  
          // Calculer les positions pour centrer l'image horizontalement et verticalement
          const centerX = (pdfWidth - imgWidth) / 2;
          const centerY = (pdfHeight - imgHeight) / 2;
  
          // Ajouter l'image centrée au PDF
          pdf.addImage(imageData, 'PNG', centerX, centerY, imgWidth, imgHeight);
  
          // Télécharger le PDF
        
          pdf.save(`Planify-${named.value}.pdf`);
        })
        .catch(error => {
          console.error('Erreur lors de la capture:', error);
        });
    }
  };
  </script>