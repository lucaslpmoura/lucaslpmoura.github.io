<template>
    <div class="language-button">
        <span :class="locale_class"></span>
    </div>
</template>

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
        data() {
            return {
            locale_class : ""
            }
        },
        mounted() {
            this.locale_class = 'pt-BR'
            if(this.defaultLocale == 'en-US'){
                this.locale_class = "fi fi-us";
            }
            if(this.defaultLocale == 'pt-BR'){
                this.locale_class = "fi fi-br";
            }
        }
    }
</script>

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