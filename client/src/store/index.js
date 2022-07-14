import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import createLogger from "vuex/dist/logger";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentUser: null,
        preferredOnlineState: "online",
        onlineState: "online",
        actualOnlineState: "online",
        filters: {
            topics: [],
            tags: [],
            languages: [],
            isPaid: undefined,
            sortBy: 1,
            filterBy:0,
            tagBy:0
        },
        notifications: [],
        currentQuestion: null,
    },
    mutations: {
        // mutation to set current user in vuex state
        setCurrentUser(state, user) {
            state.currentUser = user;
        },
        logout(state) {
            state.currentUser = null;
        },
        setPreferedOnlineState(state, stateName) {
            state.preferredOnlineState = stateName;
        },
        // mutation to set online state in vuex state
        setActualOnlineState(state, onlineState) {
            state.actualOnlineState = onlineState;
        },
        // mutation to update filters
        updateFilters(state, filters) {
            state.filters = filters;
        },
        setCurrentTopic(state,topic){
              state.filters.topics = topic
        },
        setCurrentsortBy(state,val){
            state.filters.sortBy = val
        },
        setCurrentfilterBy(state,val){
            state.filters.filterBy = val
        },
        setCurrenttagBy(state,val){
            state.filters.tagBy = val
        },
        // mutation to update notifications
        showNotification(state, notification) {
            state.notifications.push(notification);
        },
        // set currentQuestion
        setCurrentQuestion(state, question) {
            state.currentQuestion = question;
        },
        // set currentError
        setCurrentError(state, error) {
            state.CurrentError = error;
        },
    },
    actions: {
        // action to set current user in vuex state
        setCurrentUser({ commit }, user) {
            commit("setCurrentUser", user);
        },
        // action to set current error in vuex state
        setCurrentError({ commit }, error) {
            commit("setCurrentError", error);
        },
        setCurrentTopic({commit},topic) {
            commit("setCurrentTopic",topic)
        },
        setCurrentsortBy({commit},val){
            commit("setCurrentsortBy",val)
        },
        setCurrentfilterBy({commit},val){
            commit("setCurrentfilterBy",val)
        },
        setCurrenttagBy({commit},val){
            commit("setCurrenttagBy",val)
        }
    },
    getters: {
        isLoggedIn: (state) =>
            state.currentUser !== undefined && state.currentUser !== null,
        currentUser: (state) => state.currentUser,
        onlineState: (state) => {
            if (
                (state.preferredOnlineState == "online" &&
                    state.actualOnlineState == "busy") ||
                (state.preferredOnlineState == "busy" &&
                    state.actualOnlineState == "online")
            ) {
                return "busy";
            }
            return state.preferredOnlineState;
        },
        filters: (state) => state.filters,
        sortBy: (state) => state.filters.sortBy,
        filterBy: (state) => state.filters.filterBy,
        tagBy: (state) => state.filters.tagBy,
        notifications: (state) => state.notifications,
        currentQuestion: (state) => state.currentQuestion,
        CurrentError : (state)=>state.CurrentError
    },
    modules: {},
    plugins: [
        new VuexPersistence({ key: "SolutionNow" }).plugin,
        createLogger(),
    ],
});
