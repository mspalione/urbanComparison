let selectedCity = {
    template: '#selected-city-template',
    props: {
        cityUrl: String,
    },
    data() {
        return {
            city: {},
            country: '',
            continent: '',
            fullname: '',
            photo: '',
            mayor: '',
            salaries: [],
            popsize: {},
            livingcosts: undefined,
            language: '',
            capp: {},
            lunch: {},
            beer: {},
            movie: {},
        }
    },
    async mounted() {
        let res = await axios.get(this.cityUrl)
        this.assignData(res.data)
        axios.get(`${this.cityUrl}images`)
             .then(res => {
                 let pic =  res.data.photos[0]
                 this.photo = pic.image.web
             })
             .catch(e => console.log(e))

        axios.get(`${this.cityUrl}salaries`)
             .then(res => {
                 this.salaries = res.data.salaries
             })
             .catch(e => console.log(e))

        axios.get(`${this.cityUrl}details`)
             .then(res => {
                 let details = res.data.categories
                 let size = details.find(d => d.id === 'CITY-SIZE')
                 this.popsize = size.data.find(s => s.id === 'POPULATION-SIZE')
                 let lang = details.find(d => d.id === 'LANGUAGE')
                 this.language = lang.data.find(s => s.id === 'SPOKEN-LANGUAGES').string_value
                 this.livingcosts = details.find(d => d.id === 'COST-OF-LIVING').data
                 this.capp = this.livingcosts.find(l => l.id === 'COST-CAPPUCCINO')
                 this.movie = this.livingcosts.find(l => l.id === 'COST-CINEMA')
                 this.beer = this.livingcosts.find(l => l.id === 'COST-IMPORT-BEER')
                 this.lunch = this.livingcosts.find(l => l.id === 'COST-RESTAURANT-MEAL')
             })
             .catch(e => console.log(e))
    },
    methods: {
        async assignData(res) {
            this.city = res
            this.fullname = res.full_name
            this.country = res._links['ua:countries'][0].name
            this.continent = res.continent
            this.mayor = res.mayor
        },
    }
}

let citySelection = {
    
}

Vue.createApp({
    data() {
        return {
            header: "Let's see some data!",
            info: null,
            cities: [],
            selectedCity: null,
            cityName: '',
            cityData: {},
            showResults: false,
        }
    },
    async mounted() {
        let info = await this.getData('https://api.teleport.org/api/cities/?search=san%20francisco')
        this.info = info.data._embedded['city:search-results']
        //axios.get('https://api.teleport.org/api/cities/?search=san%20francisco')
        //    .then(res => (this.info = res.data._embedded['city:search-results']))

        axios.get('https://api.teleport.org/api/urban_areas')
            .then(res => (this.cities = res.data._links['ua:item']))

            // axios.get("https://api.teleport.org/api/urban_areas/slug:amsterdam/")
            //     .then(res => (this.cityDeets = res.data))
    },
    watch: {
        selectedCity(newval, oldval) {
            //debugger
            //this.getCityData(newval)
            axios.get(newval)
                .then(res => this.cityData = res.data)
            
        }
    },
    methods: {
        async getData(url) {
            return await axios.get(url)
        },
        citySelected(e) {
            debugger
            console.log(e)  
        },
        getCityData(val){
            debugger
            axios.get(val)
                .then(res => {
                    //debugger
                    //this.setCityData(res.data)
                    this.cityData = res.data
                })
                .catch(e => console.log(e))
        },
        setCityData(data) {
            //console.log(data)
            this.cityName = data.full_name
            this.cityData = data
            debugger
        },
        async getdata() {
            let x = await this.getData(this.selectedCity)
            this.cityData = x.data
            debugger
        }
    },
    components: {
        selectedCity: selectedCity
    }
})
.mount('#urban-comp')