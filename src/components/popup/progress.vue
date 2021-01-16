<template>
    <div class="see-wl">
        <el-dialog
            :visible.sync="dialogVisible"
            width="500px"
            :show-close="false"
            :before-close="closeFn"
            custom-class="see-dialog"
        >
            <div class="see-wuliu">
                <div>订单导入中, 请勿关闭窗口...</div>
                <el-progress :text-inside="true" :stroke-width="26" :percentage="num"></el-progress>
            </div>


        </el-dialog>
    </div>
</template>

<script>
/**
 * @author jjz
 * @use 进度条弹框
 */
export default {
    name: 'progressMoudle',
    props: {
        wlArray: {
            type: Array,
            default: function () {
                return []
            }
        },
        dialogVisible: {
            type: Boolean,
            default: false
        },
        num: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {}
    },
    methods: {
        closeFn() {
            this.$emit('fatherMethod');
        }
    }
}
</script>

<style scoped>
.see-wl-ul {
    padding: 18px 20px 0;
    max-height: 400px;
    overflow-y: auto;
    cursor: pointer;
    margin-bottom: 15px
}

.dialog-footer {
    display: flex;
    justify-content: center;
    align-items: center
}

.see-wuliu>div {
    margin-bottom:20px
}

</style>
