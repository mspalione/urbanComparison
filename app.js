// components
let selectedCity = {
    template: '#selected-city-template',
    props: {
        cityUrl: String,
    },
    data() {
        return {
            country: '',
            continent: '',
            fullname: '',
            photo: '',
            mayor: '',
            popsize: {},
            language: '',
            capp: {},
            lunch: {},
            beer: {},
            movie: {},
        }
    },
    async mounted() {
        axios.get(this.cityUrl)
            .then(res => {
                this.fullname = res.data.full_name
                this.country = res.data._links['ua:countries'][0].name
                this.continent = res.data.continent
                this.mayor = res.data.mayor
            })
            .catch(e => console.log(e))

        axios.get(`${this.cityUrl}images`)
             .then(res => {
                 let pic =  res.data.photos[0]
                 this.photo = pic.image.web
             })
             .catch(e => console.log(e))

        axios.get(`${this.cityUrl}details`)
             .then(res => {
                 let details = res.data.categories
                 let size = details.find(d => d.id === 'CITY-SIZE')
                 this.popsize = size.data.find(s => s.id === 'POPULATION-SIZE')
                 let lang = details.find(d => d.id === 'LANGUAGE')
                 this.language = lang.data.find(s => s.id === 'SPOKEN-LANGUAGES').string_value
                 let livingcosts = details.find(d => d.id === 'COST-OF-LIVING').data
                 this.capp = livingcosts.find(l => l.id === 'COST-CAPPUCCINO')
                 this.movie = livingcosts.find(l => l.id === 'COST-CINEMA')
                 this.beer = livingcosts.find(l => l.id === 'COST-IMPORT-BEER')
                 this.lunch = livingcosts.find(l => l.id === 'COST-RESTAURANT-MEAL')
             })
             .catch(e => console.log(e))
    },
}

let citySelection = {
    template: '#city-selection-template',
    components: {
        selectedCity: selectedCity
    },
    props: {
        cities: Array,
    },
    emits: ['chosen-city'],
    data() {
        return {
            selectedCity: null,
        }
    },
    watch: {
        selectedCity(newval, oldval) {
            this.$emit('chosen-city', newval)
        }
    },
}

// init vue
Vue.createApp({
    components: {
        citySelection: citySelection,
    },
    data() {
        return {
            cities: [],
            cityOne: undefined,
            cityTwo: undefined,
        }
    },
    async mounted() {
        axios.get('https://api.teleport.org/api/urban_areas')
            .then(res => (this.cities = res.data._links['ua:item']))
    },
    computed: {
        message() {
            let city = this.cityOne || this.cityTwo
            return this.cityOne && this.cityTwo ? `You chose ${this.cityOne.name} and ${this.cityTwo.name}!` :
                (this.cityOne && !this.cityTwo) || (!this.cityOne && this.cityTwo) ? `You chose ${city.name}. Please make a second selection to compare two cities.` :
                    'Choose two cities.'
        }
    }
})
.mount('#urban-comp')