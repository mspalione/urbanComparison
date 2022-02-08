# urbanComparison
Compare two urban areas using Teleport API.
## Running the Project
This is built using Vue cdn. No special steps are needed to run this locally.
If you have Vue dev tools installed as a google chrome extension, you can see the data, computed and property values displayed.
If you would like to download the Vue dev tools extension, you may do so here.
[Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg)
[Firefox](https://github.com/vuejs/vue-devtools/releases/download/v6.0.0-beta.8/vuejs_devtools_beta-6.0.0.8-an+fx.xpi)
Vue dev tools are not necessary to see the functionality and success of the project.

## Objectives
### 1. User should be able to select two urban areas from the Teleport API to compare.
The list of available cities is being returned from the Teleport API and is used to fill two dropdowns.
The user will choose one city from each dropdown. The results will show using Bootstraps grid layout and cards.

### 2. Once two urban areas are selected, present the user with a comparison of the urban areas.
The results are displayed with two Bootstrap cards side by side. 
If the user wants to change one of the cities, selecting the 'Clear Results' button at the bottom of the card will cause the card to disappear and the dropdown to reappear. 
Once a city is selected, the dropdown is removed and the card will show. 
If there is only one city selected, one dropdown remains available and the selected city's data will show.

### 3. Choose at least 5 data points to compare and display those.
The data points that are displayed include:
* Country
* Continent
* Mayor, or a 'No known mayor' message will display
* Urban area population (millions)
* Language Spoken
* Cost of Living estimates in the form of prices of everyday purchases
    * Cappuccino
    * Movie ticket
    * Beer
    * Lunch

## Where I'd go from here
If I were to continue work on this project, I would spend some time on the styling to add some flair.
I would allow the user to choose more than 2 cities to compare.
I would consume more data from the API, exploring the salaries and the city scores.
Depending on the ui changes, it may make sense to manipulate the data before returning it to the user.

## Wrap-up
This was a fun exercise. I enjoyed working with the Telegram API. 
This is my first time using axios. It was a breeze.
I prefer to use Vue single file components, but for simplicity in testing and the small size of the project, this structure worked perfectly!
I have written more in Vue 2, but used Vue 3 in this project. Vue 3 has the option in the components for emits to be specified which is a new feature I hadn't tried yet. 
Thanks for testing my code!