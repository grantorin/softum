<template>
    <div>
        <div class="modal animate__animated animate__fadeInDown" :class="{ show: isShow }" v-if="isShow">
            <div class="modal__dialog">
                <button type="button" class="modal__close" aria-label="Close" @click="onClose"></button>
                <div class="modal__header">Header</div>
                <div class="modal__body">
                    <div class="modal__img">
                        <img :src="`assets/img/${imgsrc}.jpg`" :srcset="`assets/img/${imgsrc}@2.jpg 2x`" :alt="text" />
                    </div>
                    <div class="modal__text">{{ text }}</div>
                </div>
                <div class="modal__footer">
                    <button type="button" class="btn" @click="onRrunDrum">Run</button>
                </div>
            </div>
        </div>
        <div class="modal-backdrop" :class="{ show: isShow }"></div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        isShow: {
            type: Boolean
        },
        text: {
            type: Number
        }
    },
    computed: {
        imgsrc() {
            return this.text
        }
    },
    methods: {
        onRrunDrum() {
            this.$emit('onClose')
            this.$emit('onAction')
        },
        onClose() {
            this.$emit('onClose')
        }
    }
}
</script>

<style lang="sass">
@import '@app/assets/sass/components/modal'
</style>
