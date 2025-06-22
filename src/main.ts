import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { createI18n } from 'vue-i18n'
import messages from './localization/messages.ts'

var currentPageIconIndex: number = 0;

const i18n = createI18n({
    locale: 'pt-BR',
    backupLocale: 'en-US',
    messages
});
export default i18n;

const app = createApp(App)

app.use(i18n);
app.mount('#app')

let icon: HTMLLinkElement = document.getElementById("page_icon") as HTMLLinkElement;

setInterval(() => {changePageIcon()}, 2000);


function changePageIcon(){
    if(icon != null){
        switch(currentPageIconIndex){
            case 0:
                icon.href = import.meta.env.BASE_URL + 'diamonds.png';
                currentPageIconIndex = 1;
                break;
            case 1:
                icon.href = import.meta.env.BASE_URL + 'spades.png';
                currentPageIconIndex = 2;
                break;
            case 2:
                icon.href = import.meta.env.BASE_URL + 'hearts.png';
                currentPageIconIndex = 3;
                break;
            case 3:
                icon.href = import.meta.env.BASE_URL + 'clubs.png';
                currentPageIconIndex = 0;
                break;
        }
    }
}