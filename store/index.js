import { mapState } from "vuex";

export const state = () => ({
    stops: [],
    locales: ['en', 'ro'],
    locale: 'en',
    userPosition: {
        xCoord: '',
        yCoord: ''
    }
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
    setLang (state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
            state.locale = locale
        }
    },
    updateSchedules (state, {id, schedules}) {
        if (state.stops[id]) {
            state.stops[id].schedules = schedules
        }
    }
};

export const actions = {
    nuxtServerInit({ commit }, { app }) {
        return Promise.all([ // TODO: CLEAN ^^
            app.mbta.fetchStopsByRoute('Orange').then(stop => stop.map(mapResponseToStore('Orange'))),
            app.mbta.fetchStopsByRoute('Red').then(stop => stop.map(mapResponseToStore('Red'))),
            app.mbta.fetchStopsByRoute('Blue').then(stop => stop.map(mapResponseToStore('Blue')))
        ]).then(values => {
            const stops = values.flat().reduce((map, curr) => {
                map[curr.id] = curr;
                return map;
            }, {});

            commit('initStops', stops);
        })
    }
}

const mapResponseToStore = (line) => (stop, index,) => ({
    order: index,
    line,
    ...stop
});