

<script>
    
    import "flag-icons/css/flag-icons.min.css";

    export default {
        name: "LanguageButton",
        props: {
            defaultLocale : {
                type: String,
                required: true
            }
        },
        methods: {
            showLocales: function () {

            },
            changeLocale: function () {
                this.$i18n.locale = this.$i18n.locale == 'en-US' ? 'pt-BR' : 'en-US';
                this.setLocaleFlagIcon();
            },
            setLocaleFlagIcon: function() {
                this.locale_class = 'pt-BR'
                switch(this.$i18n.locale){
                    case 'en-US':
                        this.locale_class = "fi fi-us";
                        break;
                    case 'pt-BR':
                        this.locale_class = 'fi fi-br';
                        break;
                }
            }
        },
        data() {
            return {
            locale_class : "",

            }
        },
        mounted() {
            this.setLocaleFlagIcon();
        },
    }
</script>

<template>
    <div class="language-button" @click="changeLocale">
        <span :class="locale_class"></span>
    </div>
</template>
<style scoped>

.language-button {
    position: fixed;      
    top: 50px;         
    right: 50px;         
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    z-index: 999; 
}

</style>