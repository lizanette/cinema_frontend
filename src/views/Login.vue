<template>
    <v-parallax
          dark
          height="100%"
          src="../assets/background.jpg"
          style="height:100vh"
    >
        <UserHeaderBar />

        <v-container>
            <v-row align="center" justify="center">
                <v-col align="center" justify="center">
                    <v-card
                        style="outline: 5px white solid; border-radius: 30px;"
                        color="transparent"
                        class="mx-auto px-5 py-5"
                        max-width="344"
                    >

                        <v-card-text>
                            <v-row>
                                <v-col>
                                    <v-avatar
                                        class="profile"
                                        size="128"
                                    >
                                        <v-img src="../assets/administrador.png"></v-img>
                                    </v-avatar>
                                    <v-card-title class="white--text" style="justify-content:center">Administrador</v-card-title>
                                </v-col>
                            </v-row>
                            
                            <v-row>
                                <v-form
                                    style="width: 100%; border-radius: 10px"
                                    v-model="loginForm"
                                >
                                    <v-text-field
                                        label="Email"
                                        solo
                                        v-model="admin.email"
                                    ></v-text-field>

                                    <v-text-field
                                        type="password"
                                        label="Contraseña"
                                        solo
                                        v-model="admin.passcode"
                                        @keyup.enter= "login()"
                                    ></v-text-field>
                                </v-form>
                            </v-row>
                        </v-card-text>
                        <!-- #7F3690 #1FA4E7-->
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="login()" class="my-3" color="#1FA4E7">Ingresar</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>

                        <v-alert
                              v-model="alerta"
                              dismissible
                              type="warning"
                         >
                              {{mensaje}}
                         </v-alert>
                    </v-card>

                </v-col>
            </v-row>
        </v-container>
       
    </v-parallax>
</template>

<script>
    import router from '../router';
    // @ is an alias to /src
    import UserHeaderBar from '@/components/UserHeaderBar.vue'

    export default {
        name: 'Login',
        components: {
            UserHeaderBar
        },
        
        data () {
            return {
                loginForm: false,
                alerta: false,
                mensaje: '',

                admin: {
                    email: '',
                    passcode: ''
                }
            }
        },

        methods: {
            async login() {
                await this.axios.post('/admin/login', this.admin)
                    .then( res => {
                        router.push({ path: '/peliculas' })
                    })
                    .catch( error => {
                         console.log(error);
                         this.mensaje = error.response.data.message
                         this.alerta = true
                    })
            },
        },
    }
</script>

<style scoped>

</style>