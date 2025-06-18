<template>
    <div>
        {{text_shown}}
    </div>
</template>

<script>
    export default {
        name: "TypedLine",
        props: {
            text: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                min_type_delay: 89,
                max_type_delay: 101,
                text_shown: ""
            }
        },
        methods: {
            startTypingText() {
                let text = this.text;
                let text_shown = "";

                this.typeText(text, text_shown);
            },
            typeText(text, text_shown){
                if(text.length > text_shown.length){
                    let delay = Math.floor(Math.random() * (this.max_type_delay - this.min_type_delay +1)) + this.min_type_delay;
                    text_shown += text.charAt(text_shown.length);
                    this.text_shown = text_shown;
                    setTimeout(() => {this.typeText(text, text_shown)}, delay )
                }
            }
        },
        mounted() {
            this.startTypingText();
        }
    }
</script>

<style lang="sccs" scoped>
</style>