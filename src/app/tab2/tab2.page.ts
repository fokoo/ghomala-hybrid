import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonChip, IonLabel, IonList, IonItem, IonIcon, IonButton, IonSpinner 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  logoYoutube, logoFacebook, bookOutline, 
  helpCircleOutline, heartOutline, openOutline,
  chevronUp, chevronDown 
} from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, 
    IonChip, IonLabel, IonList, IonItem, IonIcon, IonButton, IonSpinner
  ]
})
export class Tab2Page {
  // State Signals
  selectedTopic = signal<string>('family'); // Default topic
  showMoreLinks = signal<boolean>(false);

  topics = [
    { id: 'family', name: 'Family' },
    { id: 'food', name: 'Food & Drinks' },
    { id: 'greetings', name: 'Greetings' },
    { id: 'travel', name: 'Travel' }
  ];

  keywords = [
    { topic: 'family', word: 'Mámá', translation: 'Mother' },
    { topic: 'family', word: 'Tátá', translation: 'Father' },
    { topic: 'food', word: 'Sǎ', translation: 'Food' },
    { topic: 'food', word: 'Mǎŋɡə́', translation: 'Mango' },
    { topic: 'greetings', word: 'Mǎlá', translation: 'Hello' },
  ];

  allLinks = [
    { label: 'YouTube Channel', description: 'Video lessons', icon: 'logo-youtube', url: 'https://youtube.com' },
    { label: 'Facebook Page', description: 'Community updates', icon: 'logo-facebook', url: 'https://facebook.com' },
    { label: 'Grammar Books', description: 'PDF Resources', icon: 'book-outline', url: '#' },
    { label: 'Mobile App FAQ', description: 'Usage guide', icon: 'help-circle-outline', url: '#' },
    { label: 'Support Project', description: 'Donate', icon: 'heart-outline', url: '#' }
  ];

  constructor() {
    addIcons({ 
      'logo-youtube': logoYoutube, 
      'logo-facebook': logoFacebook, 
      'book-outline': bookOutline,
      'help-circle-outline': helpCircleOutline,
      'heart-outline': heartOutline,
      'open-outline': openOutline,
      'chevron-up': chevronUp,
      'chevron-down': chevronDown
    });
  }

  // Computed signal to filter keywords based on selection
  filteredKeywords = computed(() => {
    return this.keywords.filter(k => k.topic === this.selectedTopic());
  });

  // Computed signal to slice links (3 vs All)
  visibleLinks = computed(() => {
    return this.showMoreLinks() ? this.allLinks : this.allLinks.slice(0, 3);
  });

  openLink(url: string) {
    if(url !== '#') window.open(url, '_blank');
  }
}
