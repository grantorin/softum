<template>
    <div class="drum-box">
        <div class="drum">
            <svg
                class="drum__wheel"
                v-if="paths.length"
                :viewBox="`0 0 ${size} ${size}`"
                :style="{ transform: `rotate(${deg}deg)` }"
            >
                <path
                    v-for="(path, i) of paths"
                    :key="path.d"
                    :class="['drum__segment', `bg-${i + 1}`]"
                    :d="path.d"
                ></path>
                <text
                    v-for="path of paths"
                    :key="path.desc.text"
                    :rotate="path.desc.rotate"
                    :transform="
                        `translate(${path.desc.position.x},${path.desc.position.y}) rotate(${path.desc.rotate})`
                    "
                    class="drum__wheel-text"
                >
                    {{ path.desc.text }}
                </text>
            </svg>
        </div>
        <div class="drum__btn-box">
            <button type="button" class="drum__btn btn" @click="runDrum" :disabled="isRun">Run</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Drum',
    props: {
        size: {
            type: Number,
            default: 400
        },
        maxRandom: {
            type: Number,
            default: 10
        },
        newRun: {
            type: Boolean
        }
    },

    data() {
        return {
            deg: 0,
            isRun: false
        }
    },

    watch: {
        newRun(val) {
            if (val === true) {
                this.runDrum()
            }
        }
    },

    computed: {
        paths() {
            const segments = []
            segments.push(
                this.createSegment({
                    ange1: 5 / 12,
                    ange2: 7 / 12,
                    text: '1',
                    textRotate: 0
                })
            )
            segments.push(
                this.createSegment({
                    ange1: 7 / 12,
                    ange2: 9 / 12,
                    text: '2',
                    textRotate: 30
                })
            )
            segments.push(
                this.createSegment({
                    ange1: 9 / 12,
                    ange2: 11 / 12,
                    text: '3',
                    textRotate: 60
                })
            )
            segments.push(
                this.createSegment({
                    ange1: -1 / 12,
                    ange2: 1 / 12,
                    text: '4',
                    textRotate: 90
                })
            )
            segments.push(
                this.createSegment({
                    ange1: 1 / 12,
                    ange2: 3 / 12,
                    text: '5',
                    textRotate: 120
                })
            )
            segments.push(
                this.createSegment({
                    ange1: 3 / 12,
                    ange2: 5 / 12,
                    text: '6',
                    textRotate: 150
                })
            )

            return segments
        }
    },

    methods: {
        createSegment({ ange1, ange2, text, textRotate }) {
            let angle1,
                angle2,
                dir = 0

            const rad = this.size / 2 - 20,
                cx = this.size / 2,
                cy = this.size / 2

            if (angle2 - angle1 > 0.5) {
                dir = 1
            }

            angle1 = Math.PI * 2 * ange1
            angle2 = Math.PI * 2 * ange2

            const dx1 = (Math.sin(angle1) * rad + cx).toFixed(3)
            const dy1 = (-Math.cos(angle1) * rad + cy).toFixed(3)

            const dx2 = (Math.sin(angle2) * rad + cx).toFixed(3)
            const dy2 = (-Math.cos(angle2) * rad + cy).toFixed(3)

            const tx = +(Math.sin(Math.PI * 2 * (ange1 + +(1 / 12).toFixed(2))) * (rad / 1.5) + cx).toFixed(0)
            const ty = +(-Math.cos(Math.PI * 2 * (ange1 + +(1 / 12).toFixed(2))) * (rad / 1.5) + cy).toFixed(0)

            return {
                d: `M ${dx1},${dy1} A ${rad},${rad} 0 ${dir} 1 ${dx2},${dy2} L ${cx},${cy} Z`,
                desc: {
                    text,
                    position: {
                        x: tx,
                        y: ty
                    },
                    rotate: textRotate
                }
            }
        },

        randomInteger(min, max) {
            return Math.floor(min + Math.random() * (max + 1 - min))
        },

        getNum(deg) {
            const numberRevolutions = deg / 60
            return numberRevolutions % 6 ? 6 - (numberRevolutions % 6) + 1 : 1
        },

        runDrum() {
            const rand = this.randomInteger(1, this.maxRandom)
            const deg = rand * 60

            this.isRun = true

            if (this.deg > 7200) {
                this.deg = 0
            } else {
                this.deg += deg
            }
            setTimeout(() => {
                this.isRun = false
                this.$emit('onFinish', this.getNum(this.deg))
            }, 1000)
        }
    }
}
</script>

<style lang="sass">
@import '@app/assets/sass/components/drum'
</style>
