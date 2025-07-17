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
                text_shown: "",
                typingTimeoutId: null
            }
        },
        methods: {
            startTypingText() {
                this.stopTypingText();
                let text = this.text;
                let text_shown = "";

                this.typeText(text, text_shown);
            },
            stopTypingText() {
                if (this.typingTimeoutId !== null) {
                    clearTimeout(this.typingTimeoutId);
                    this.typingTimeoutId = null;
                }
            },
            typeText(text, text_shown){
                if(text.length > text_shown.length){
                    let delay = Math.floor(Math.random() * (this.max_type_delay - this.min_type_delay +1)) + this.min_type_delay;
                    text_shown += text.charAt(text_shown.length);
                    this.text_shown = text_shown;
                    this.typingTimeoutId = setTimeout(() => {this.typeText(text, text_shown)}, delay )
                }
            }
        },
        mounted() {
            this.startTypingText();
        },
        watch: {
            text(newVal, oldVal){
                if(newVal !== oldVal){
                    this.startTypingText();
                }
            }
        }
    }
</script>

<style lang="sccs" scoped>
</style>