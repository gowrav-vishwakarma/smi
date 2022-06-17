<template>
    <div class="d-flex justify-center mt-5">
        <div class="d-flex flex-column">
            <v-card
                width="400px"
                outline
                class="d-flex flex-column mb-5"
                style="overflow: hidden"
            >
                <div class="ml-auto">
                    <v-img src="https://i.pravatar.cc/100" width="100"></v-img>
                </div>
                <div class="ml-auto mr-auto mt-10 mb-10 d-flex flex-column">
                    <v-img
                        src="https://i.pravatar.cc/200"
                        width="200"
                        class="mb-5"
                    />
                    <div class="align-self-center">Sign Up</div>
                    <div class="mt-5 font-weight-bold caption">
                        Enter your number
                    </div>
                    <v-text-field
                        outlined
                        class="mt-2 mb-n5"
                        label="Phone Number"
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        maxlength="10"
                        minlength="10"
                        x-small
                    ></v-text-field>
                    <div class="align-self-center">
                        <v-btn color="success">Submit</v-btn>
                    </div>
                </div>
            </v-card>

            <v-card
                width="400px"
                outline
                class="d-flex flex-column rounded-xl overflow-hidden"
            >
                <div>
                    <v-app-bar color="purple" dark class="pt-5" height="100">
                        <div class="text-h6">
                            <div class="d-flex justify-start">
                                <v-icon>mdi-arrow-left</v-icon> Register
                            </div>
                        </div>
                    </v-app-bar>
                </div>
                <div class="d-flex align-self-center flex-column ma-10">
                    <v-img
                        src="https://i.pravatar.cc/200"
                        width="200"
                        class="mt-10 mb-5 align-self-center"
                    />
                    <div class="d-flex justify-space-around">
                        <div class="mr-2">
                            <div>Name</div>
                            <div>
                                <v-text-field
                                    name="name"
                                    label="label"
                                    id="id"
                                ></v-text-field>
                            </div>
                        </div>
                        <div class="ml-2">
                            <div>Sirname</div>
                            <div>
                                <v-text-field
                                    name="name"
                                    label="label"
                                    id="id"
                                ></v-text-field>
                            </div>
                        </div>
                    </div>
                    <div class="align-self-center mt-5">
                        <v-btn color="purple" dark>Login</v-btn>
                    </div>
                    <div
                        class="align-self-center mt-10 green--text text--lighten-1 font-weight-bold"
                    >
                        Partner Login
                    </div>
                    <div class="d-flex justify-space-between ma-5">
                        <div>Devesh Mathur</div>
                        <div>9610005727</div>
                    </div>
                </div>
            </v-card>
        </div>
    </div>
</template>
