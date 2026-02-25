import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonLabel, IonList, IonItem, IonIcon, IonButton,
  IonSelect, IonSelectOption 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  logoYoutube, logoFacebook, bookOutline, 
  helpCircleOutline, heartOutline, open, list, 
  chevronUp, chevronDown, searchOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, 
    IonLabel, IonList, IonItem, IonIcon, IonButton,
    IonSelect, IonSelectOption
  ]
})
export class Tab2Page {
  selectedTopic = signal<string>('family'); 
  showMoreLinks = signal<boolean>(false);

   topics = [
    { id: 'family', name: 'Family & Relatives' },
    { id: 'food', name: 'Food & Drinks' },
    { id: 'greetings', name: 'Greetings' },
    { id: 'travel', name: ' Travel & Places' },
    { id: 'numbers', name: 'Numbers & Time' },
    { id: 'animals', name: 'Animals' },
    { id: 'colors', name: 'Colors' },
    { id: 'verbs', name: 'Common Verbs' },
    { id: 'adjectives', name: 'Adjectives' },
    { id: 'phrases', name: 'Useful Phrases' },
    { id: 'culture', name: 'Culture & Traditions' },
    { id: 'misc', name: 'Miscellaneous' },
    { id: 'religion', name: 'Religion & Beliefs' },
    { id: 'all', name: 'All Topics' }
  ];

  keywords = [
    { topic: 'family', word: 'Mámá', translation: 'Mother' },
    { topic: 'family', word: 'Tátá', translation: 'Father' },
    { topic: 'food', word: 'Sǎ', translation: 'Food' },
    { topic: 'food', word: 'Mǎŋɡə́', translation: 'Mango' },
    { topic: 'greetings', word: 'Mǎlá', translation: 'Hello' },
    { topic: 'greetings', word: 'Sàwàdì', translation: 'Goodbye' },
    { topic: 'travel', word: 'Rót', translation: 'Car' },
    { topic: 'travel', word: 'Báŋ', translation: 'Boat' },
    { topic: 'numbers', word: 'Nùŋ', translation: 'One' },
    { topic: 'numbers', word: 'Sɔ̌ɔ', translation: 'Two' },
    { topic: 'animals', word: 'Mǎa', translation: 'Dog' },
    { topic: 'animals', word: 'Mǐa', translation: 'Cat' },
    { topic: 'colors', word: 'Sǐa', translation: 'Red' },
    { topic: 'colors', word: 'Fǐa', translation: 'Blue' },
    { topic: 'verbs', word: 'Kin', translation: 'Eat' },
    { topic: 'verbs', word: 'Dòk', translation: 'Drink' },
    { topic: 'adjectives', word: 'Yǐa', translation: 'Big' },
    { topic: 'adjectives', word: 'Nǐa', translation: 'Small' },
    { topic: 'phrases', word: 'Kɔ̌ɔp kun', translation: 'Thank you' },
    { topic: 'phrases', word: 'Mǎi pen rai', translation: "You're welcome" },
    { topic: 'culture', word: 'Sǐp sǎm', translation: 'Songkran Festival' },
    { topic: 'culture', word: 'Lɔ̌ɔy krathɔŋ', translation: 'Loy Krathong Festival' },
    { topic: 'misc', word: 'Sǐa mǎa', translation: 'Dog food' },
    { topic: 'misc', word: 'Fǐa nùŋ', translation: 'Blue shirt' },
    { topic: 'religion', word: 'Buddhism', translation: 'Buddhism' },
    { topic: 'religion', word: 'Sǎŋkhǎ', translation: 'Monk' }
  ];

  allLinks = [
    { label: 'YouTube Channel', description: 'Video lessons', icon: 'logo-youtube', url: 'https://youtube.com' },
    { label: 'Facebook Page', description: 'Community updates', icon: 'logo-facebook', url: 'https://facebook.com' },
    { label: 'Grammar Books', description: 'PDF Resources', icon: 'book-outline', url: '#' },
    { label: 'Mobile App FAQ', description: 'Usage guide', icon: 'help-circle-outline', url: '#' },
    { label: 'Support Project', description: 'Donate', icon: 'heart-outline', url: '#' }
  ];

  constructor() {
    // This is the specific block causing the error. 
    // This version contains NO shorthand duplicates.
    addIcons({list,open,'logoYoutube':logoYoutube,'logoFacebook':logoFacebook,'bookOutline':bookOutline,'helpCircleOutline':helpCircleOutline,'heartOutline':heartOutline,'chevronUp':chevronUp,'chevronDown':chevronDown,'searchOutline':searchOutline});
  }

  filteredKeywords = computed(() => {
    return this.keywords.filter(k => k.topic === this.selectedTopic());
  });

  visibleLinks = computed(() => {
    return this.showMoreLinks() ? this.allLinks : this.allLinks.slice(0, 3);
  });

  openLink(url: string) {
    if(url !== '#') window.open(url, '_blank');
  }
}