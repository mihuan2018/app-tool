export default {
    debounce(fn, delay = 300) {   //默认300毫秒
        let timer;
        return function() {
            let args = arguments;
            if(timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                fn.apply(this, args);   // this 指向vue
            }, delay);
        };
    }
}
