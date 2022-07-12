<template>
    <div class="d-flex justify-space-between">
        <div class="mt-2">
            <DockerVue :questions="questions"/>
        </div>
        <div>
        <div class="d-flex sticky-top bar mt-3 pl-2 pr-2 justify-space-between">
              <h3>Top Questions</h3>
              <div>
                <v-btn @click="isShow2 = !isShow2" class="filter"><v-icon class="mr-1">mdi-dns</v-icon> Filter</v-btn>
                <v-btn to="/ask-question" class="ask">Ask Question</v-btn>
              </div>
              <div v-show="isShow2" class="tray">
              <div class="d-flex justify-space-between">
                  <div class="d-flex flex-column Fbox">
                        <h4 class="text-center mb-8">Filter by</h4>
                        <div v-for="(filter,key) in filters" :key="key" class="d-flex flex-row justify-space-between">
                             <input type="checkbox" v-model="filter.val">
                              <label>{{filter.name}}</label>
                        </div>
                  </div>
                  <div class="d-flex flex-column Fbox">
                        <h4 class="text-center mb-8">Sort by</h4>
                        <div v-for="(sort,key) in sorts" :key="key" class="d-flex flex-row justify-space-between">
                             <input type="checkbox" v-model="sort.val">
                              <label>{{sort.name}}</label>
                        </div>
                  </div>
                  <div class="d-flex flex-column Fbox">
                        <h4 class="text-center mb-8">Filter by</h4>
                        <div v-for="(tag,key) in tags" :key="key" class="d-flex flex-row justify-space-between">
                             <input type="checkbox" v-model="tag.val">
                              <label>{{tag.name}}</label>
                        </div>  
                  </div>
                  </div> 
              <v-btn class="ml-5 ask">Apply</v-btn>
              </div>
        </div>
          
        <QuestionList :questions="questions" />
        <v-layout style="border-top: 1px solid" class="pt-2">
            <v-flex xs12>
                <v-btn
                    class="primary"
                    @click="prevPage"
                    :disabled="!hasPrevPage"
                    :class="{
                        disabled: !hasPrevPage,
                        active: hasPrevPage,
                    }"
                    :style="{
                        'margin-right': '10px',
                    }"
                >
                    Previous
                </v-btn>
                <v-btn
                    class="primary"
                    @click="nextPage"
                    :disabled="!hasNextPage"
                    :class="{
                        disabled: !hasNextPage,
                        active: hasNextPage,
                    }"
                    :style="{
                        'margin-left': '10px',
                    }"
                >
                    Next
                </v-btn>
            </v-flex>
        </v-layout>
        </div>
        <div class="mt-2 d-flex justify-end ml-0">
            <TopAdsenseVue/>
        </div>
    </div>
</template>

<style>
.Fbox{
    margin: 3rem;
}
.Fbox
label{
    line-height: 24.7px;
    font-size: .8rem;
    font-weight: 400;
    text-align: right;
    margin-left: 1rem;
}
.tray{
    position: fixed;
    background-color: white;
    width: 800px;
    height: 336px;
    top: 140px;
    left: 180px;
    border-radius: 12px;
    border: 1px solid #777777;

}
.bar{
    top: 60px!important;
    padding-top: 1rem;
    background-color: rgb(255, 255, 255);
}
.filter{
    background-color: white;
    border: 1px solid #69AEFE;
    border-radius: 12px;
    color: black;
    margin-right: 1rem;
    font-weight: 400;
    font-size: 16px;
}

.ask{
    background-color: #69AEFE!important;
    border: 1px solid #69AEFE;
    border-radius: 12px;
    width: 252px;
    color: rgb(255, 255, 255)!important;
    font-weight: 700;
    font-size: 20px;
}
</style>

<script>
import QuestionList from "@/components/Question/List";
import TopAdsenseVue from "@/components/UI/Top-Adsense.vue";
import DockerVue from "@/components/UI/Docker.vue";
import DataService from "../services/DataService";
import { topics } from "@/services/staticValues";

export default {
    components: {
        QuestionList,
        DockerVue,
        TopAdsenseVue
    },
    data() {
        return {
            filters:[
                {
                    name:'No Answers',
                    val:false
                },
                {
                    name:'No Accepted Answers',
                    val:false
                },
                {
                    name:'Only Video Questions',
                    val:false
                },
                {
                    name:'Without Video',
                    val:false
                },
             ],
            sorts:[
                {
                    name:'Newest',
                    val:false
                },
                {
                    name:'No Voted Questions',
                    val:false
                },
                {
                    name:'Most viewed Questions',
                    val:false
                },
             ],
            tags:[
                {
                    name:'Question with my tags',
                    val:false
                },
                {
                    name:'Question without my tags',
                    val:false
                },
             ],
            isShow2:false,
            questions: [],
            showNext: false,
            showPrevious: false,
            currentPage: 1,
            questionsPerPage: 10,
            hasNextPage: false,
            hasPrevPage: false,
            topic:this.$store.state.currentUser.topic,
            topics
        };
    },
    mounted() {
        this.getQuestionsFromApi();
    },
    methods: {
        getQuestionsFromApi() {
            DataService.getQuestions(
                this.$store.getters.filters,
                this.currentPage,
                this.questionsPerPage,
                this.$store.getters.sortBy,
            )
                .then((response) => {
                    console.log(response.data);
                    this.questions = response.data;
                    this.hasNextPage =
                        response.data.length === this.questionsPerPage;
                    this.hasPrevPage = this.currentPage > 1;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        nextPage() {
            this.currentPage++;
            this.getQuestionsFromApi();
        },
        prevPage() {
            this.currentPage--;
            this.getQuestionsFromApi();
        },
        updateFilter(){
        this.$store.commit("setCurrentTopic", this.topic);
        this.getQuestionsFromApi();
        }
    },
};
</script>
