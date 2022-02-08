Vue.createApp({
    data() {
        return {
            header: "Let's see some data!",
            info: null,
        }
    },
    mounted() {
        axios.get('https://api.teleport.org/api/cities/?search=san%20francisco')
            .then(res => (this.info = res.data._embedded['city:search-results']))
    },
})
.mount('#urban-comp')