<template>
    <div class="authorizer-wrapper">
        <div class="authorizer-loading">
            <i class="el-icon-loading"></i>
            <div style="margin-top: 1rem;">正在授权</div>
        </div>
    </div>
</template>

<script>
    export default {
        created(options) {

        },
        mounted(options) {
            console.log(this.$route)
        },
        data() {
            return {

            }
        }
    }
</script>

<style scoped="scoped">
    .authorizer-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .authorizer-wrapper .authorizer-loading {
        text-align: center;
    }
    .el-icon-loading {
        font-size: 1.5rem;
    }
</style>
