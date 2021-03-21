<template>
    <div class="container">
        <drum :size="700" :newRun="isNewRun" :maxRandom="15" @onFinish="handleFinishDrum" />

        <modal :isShow="isShowModal" :text="drumResult" @onAction="handleModalAction" @onClose="drumResult = null" />
    </div>
</template>

<script>
import Drum from '@app/components/Drum'
import Modal from '@app/components/Modal'

export default {
    name: 'App',

    components: {
        Drum,
        Modal
    },

    data() {
        return {
            isNewRun: false,
            drumResult: null
        }
    },

    computed: {
        isShowModal() {
            return !!this.drumResult
        }
    },

    methods: {
        handleModalAction() {
            this.isNewRun = true
        },
        handleFinishDrum(val) {
            this.isNewRun = false
            this.drumResult = val
        }
    }
}
</script>

<style lang="sass">
@import '@app/assets/sass/global'
@import '@app/assets/sass/app'
</style>
