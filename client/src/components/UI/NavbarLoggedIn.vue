 <template>
 <v-app-bar app outlined dark class="white" height="60">
        <v-toolbar-title class="mr-10">
            <v-btn plain :ripple="false" class="text-dark" to="/">
                <v-img src="@/assets/logo.png" class="mr-2"></v-img>
                Solve My Issue
            </v-btn>
        </v-toolbar-title>

        <v-toolbar-items class="tabs">
            <v-btn plain class="text-dark" to="/" exact> About </v-btn>
        </v-toolbar-items>
        <v-toolbar-items class="tabs">
            <v-btn plain class="text-dark" to="/" exact> Badges </v-btn>
        </v-toolbar-items>
        <v-toolbar-items>
            <!-- search field -->
                 <!-- <v-combobox
                    class="sBar mt-3 mr-2 text-dark"
                    v-model="topic"
                    :items="topics"
                    label="Search by topic"
                    placeholder="Search"
                    multiple
                    chips
                    outlined
                    dense
                    rounded
                    v-on:change="updateFilter"
                    clearable
                    :delimiters="[',']"
                    deletable-chips
                ></v-combobox>    -->
        </v-toolbar-items>

        <v-spacer></v-spacer>
    
         <div class="d-flex flex-row justify-space-between dropd" v-if="this.$store.state.currentUser">
                <h5 class="mt-2 text-dark">Hello, {{this.$store.state.currentUser.name.split(" ")[0]}}</h5>
                <v-icon @click="isShow = !isShow" class="text-black ml-2">mdi-chevron-down</v-icon>
            </div>

             <div v-show="isShow" class="dropdown-content">
                <v-btn plain class="text-dark" to="/profile"> Profile </v-btn>
                  <v-btn plain class="text-dark" @click="logout"> Logout </v-btn>
                </div>
        
    </v-app-bar>
</template>

<style>
 .sBar{
    border: 1px solid #EEEEEE;
    width: 40rem!important;
    height: 2rem;
}

.tabs{
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 24.2px;
    color: #000000;
}

.nbtn{
    margin: .8rem;
    color: #444444!important;
    background-color: white!important;
    border-radius: 5px;
    border: 1px solid #444444;
}
.nbtn:hover{
    color: white!important;
    border: 1px solid #69AEFE;
    background-color: #69AEFE!important;
}   
.dropdown-content {
  background-color: #ffffff;
  color: black;
  position: fixed;
  top: 60px;
  right: 20px;
  max-width: 90px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}


.dropdown-content a:hover {
  background-color: #ddd;
}

.dropd{
    cursor: pointer;
    margin-top: .1rem;
}

.dropd:hover .dropdown-content {
  display: block;
}
</style>

<script>
export default {
    data(){
        return{
            isShow:false
        }
    },
    methods: {
        logout() {
            this.$store.commit("logout");
            this.$router.push("/");
        },
    },
};
</script>

<style scoped></style>
