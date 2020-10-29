import $ from 'jquery'
import Vue from 'vue'
import App from './components/nav.vue'
import './css/index.css'
import './css/index.less'
import './css/index.scss'

(function () {
    $('li:odd').css('backgroundColor', 'red')
    $('li:even').css('backgroundColor', 'green')
})();


class Person {
    static info = '123'
}


console.log(Person.info);


const vm  = new Vue({
    el: '#app',
    render: h => h(App)
});

