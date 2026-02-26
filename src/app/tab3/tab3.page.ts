
import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonCard, IonCardHeader, IonCardTitle,
  IonCardContent, IonIcon, IonButton, IonBadge, IonModal,
  IonSegment, IonSegmentButton, IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  libraryOutline, peopleOutline, earthOutline, 
  calendarOutline, mapOutline, colorPaletteOutline, 
  closeOutline, locationOutline, languageOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, 
    IonCard, IonCardHeader, IonCardTitle, 
    IonCardContent, IonIcon, IonButton, IonBadge, IonModal,
    IonSegment, IonSegmentButton, IonLabel
  ]
})
export class Tab3Page {
  appLanguage = signal<'en' | 'fr'>('fr'); 
  isHistoryModalOpen = signal(false);

  content = {
    fr: {
      title: "Culture & Histoire",
      heroTitle: "Héritage Bamiléké",
      heroSub: "Voyage au cœur de la langue Ghɔmálá’",
      historyBtn: "En savoir plus",
      gridCal: "Semaine de 8 jours",
      gridLoc: "Région de l'Ouest",
      modalTitle: "Détails Culturels",
      close: "Fermer",
      locationTitle: "Localisation",
      dialectsTitle: "Langue et Accents",
      intro: "Le ghɔmálá’ est une des principales langues des Grassfields du Cameroun.",
      locDetail: "Le ghɔmálá’ est principalement parlé au Cameroun, dans les départements de la Mifi, du Koung-Khi et des Hauts-Plateaux.",
      locGlobal: "On retrouve d'importantes communautés en Europe, aux USA et au Canada.",
      dialects: [
        { region: "Centre", towns: "Jo (Bandjoun), Wɛ (Bahouan), Hɔm (Baham), Yɔgam (Bayangam)" },
        { region: "Nord", towns: "Fʉ'sap (Bafoussam), Ləŋ (Baleng)" },
        { region: "Sud", towns: "Tyə (Batié), Ngam (Bagam), Pa (Bapa), Dəŋkwop (Badenkop)" },
        { region: "Ouest", towns: "Mukɔm (Bameka), Muju (Bamendjou), Sʉɔ (Bansoa), Mugəm (Bamougoum), Fu'nda (Bafounda)" }
      ]
    },
    en: {
      title: "Culture & History",
      heroTitle: "Bamiléké Heritage",
      heroSub: "Journey to the heart of Ghɔmálá’",
      historyBtn: "Learn More",
      gridCal: "8-Day Week",
      gridLoc: "West Region",
      modalTitle: "Cultural Details",
      close: "Close",
      locationTitle: "Localization",
      dialectsTitle: "Language and Accents",
      intro: "Ghɔmálá’ is one of the major Grassfields languages of Cameroon.",
      locDetail: "Ghɔmálá’ is primarily spoken in Cameroon, in the departments of Mifi, Koung-Khi, and Hauts-Plateaux.",
      locGlobal: "Large communities are also found in Europe, the USA, and Canada.",
      dialects: [
        { region: "Central", towns: "Jo (Bandjoun), Wɛ (Bahouan), Hɔm (Baham), Yɔgam (Bayangam)" },
        { region: "North", towns: "Fʉ'sap (Bafoussam), Ləŋ (Baleng)" },
        { region: "South", towns: "Tyə (Batié), Ngam (Bagam), Pa (Bapa), Dəŋkwop (Badenkop)" },
        { region: "West", towns: "Mukɔm (Bameka), Muju (Bamendjou), Sʉɔ (Bansoa), Mugəm (Bamougoum), Fu'nda (Bafounda)" }
      ]
    }
  };

  t = computed(() => this.content[this.appLanguage()]);

  constructor() {
    addIcons({ 
      'app-history': libraryOutline, 
      'app-culture': peopleOutline, 
      'app-geo': earthOutline,
      'app-activity': colorPaletteOutline,
      'app-map': mapOutline,
      'app-calendar': calendarOutline,
      'app-close': closeOutline,
      'app-location': locationOutline,
      'app-lang': languageOutline
    });
  }

  updateLanguage(event: any) {
    const val = event.detail.value as 'en' | 'fr';
    if (val) this.appLanguage.set(val);
  }
}