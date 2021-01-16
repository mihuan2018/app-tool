<template>
    <ul class="sidebar">
        <li>
            <div>蜜獾应用Tool</div>
        </li>
        <router-link tag="li"
            v-for="(item,i) in aside"
            :key="item.text" :to="item.path"
        >
                <img :src="aside[i].path === $route.path ? aside[i].selected : aside[i].normal">
                <span>{{ item.text }}</span>
        </router-link>
    </ul>
</template>
<script>
export default {
    data() {
        return {
            aside: [
                {
                    path: '/',
                    text: '工具应用',
                    normal: 'https://sanyetongsj.oss-cn-shanghai.aliyuncs.com/system/bar/%E8%90%A5%E9%94%80.png',
                    selected: 'https://sanyetongsj.oss-cn-shanghai.aliyuncs.com/system/bar/%E8%90%A5%E9%94%80-.png'
                },
                {
                    path: '/list',
                    text: '订单列表',
                    normal: 'https://sanyetongsj.oss-cn-shanghai.aliyuncs.com/system/bar/%E8%AE%A2%E5%8D%95-.png',
                    selected: 'https://sanyetongsj.oss-cn-shanghai.aliyuncs.com/system/bar/%E8%AE%A2%E5%8D%95.png'
                },
                {
                    path: '/setting',
                    text: '设置',
                    normal: 'https://sanyetongsj.oss-cn-shanghai.aliyuncs.com/system/bar/%E8%AE%BE%E7%BD%AE-.png',
                    selected: 'https://sanyetongsj.oss-cn-shanghai.aliyuncs.com/system/bar/%E8%AE%BE%E7%BD%AE.png'
                },
            ]
        }
    },
    mounted() {


    },
    methods: {},
    computed: {}

}
</script>
<style>
.sidebar {
    /*width: 125px;*/
    /*height: 100vh;*/
    /*height: 100%;*/
    /*background-color: #444;*/

    width: 125px;
    height: 100%;
    min-height: 400px;
    background-color: #444
}

.sidebar li {
    display: flex;
    color: #cacaca;
    height: 44px;
    font-size: 12px;
    cursor: pointer;
    transition: border-color .3s,background-color .3s,color .3s;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
}

.sidebar li span {
    display: inline-block;
    width: 60px
}
.sidebar img {
    width: 14px;
    height: 14px;
    margin-right: 10px;
}
.router-link-exact-active span{
    color: #ffd04b!important;
}

</style>
