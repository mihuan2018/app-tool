import Vue from 'vue'

import { Button, Input,Form,FormItem, Breadcrumb, BreadcrumbItem,
    Pagination,Carousel, CarouselItem,Row,Col,Card,InputNumber, Dialog, Select, DatePicker,
    Option, Tabs, tabPane, tableColumn, Table, Switch, Message, Progress, MessageBox} from 'element-ui'
Vue.use(Button)
Vue.use(Input)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Pagination)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(DatePicker)
Vue.use(Option)
Vue.use(Tabs)
Vue.use(tabPane)
Vue.use(tableColumn)
Vue.use(Table)
Vue.use(Switch)
Vue.use(Progress)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox



var VueCookie = require('vue-cookie');
Vue.use(VueCookie);
