export const state = () => ({
    stops: [],
    locales: ['en', 'ro'],
    locale: 'en'
});

export const mutations = {
    initStops (state, payload) {
        state.stops = payload
    },
    SET_LANG (state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
            state.locale = locale
        }
    }
};

export const actions = {
    nuxtServerInit({ commit }, { app }) {
        return Promise.all([
            app.mbta.fetchStopsByRoute('Orange').then(stop => stop.map(mapResponseToStore('Orange'))),
            app.mbta.fetchStopsByRoute('Red').then(stop => stop.map(mapResponseToStore('Red'))),
            app.mbta.fetchStopsByRoute('Blue').then(stop => stop.map(mapResponseToStore('Blue')))
        ]).then(values => {
            commit('initStops', values.flat())
        })
    }
}

const mapResponseToStore = (line) => (stop, index,) => ({
    order: index,
    line,
    ...stop
});