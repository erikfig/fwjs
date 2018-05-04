export default {
    el: '#app',
    data: {
        name: 'World'
    },
    template: require('./template.html'),
    afterBind() {
        this.data.name = 'Erik';
        console.log('hello world componente done');
    }
}
