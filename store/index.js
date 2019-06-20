export const state = () => ({
    stops: [],
    locales: ['en', 'ro'],
    locale: 'en'
});

export const MBTA_LINES = {
    '1': {
        id: '1',
        name: 'orange'
    },
    '2': {
        id: '2',
        name: 'red'
    },
    '3': {
        id: '3',
        name: 'blue'
    }
};

export const mutations = {
    initStops (state, payload) {
        state.stops = payload
    },
    set_lang (state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
            state.locale = locale
        }
    }
};

export const actions = {
    nuxtServerInit({ commit }, { app }) {
        return Promise.all(Object.values(MBTA_LINES)
            .map( ({ name }) => app.mbta.fetchStopsByRoute(name)
                .then(stop => stop.map(mapResponseToStore(name))))
        ).then(values => {
            commit('initStops', values.flat())
        })
    }
}

const mapResponseToStore = (line) => (stop, index,) => ({
    order: index,
    line,
    ...stop
});