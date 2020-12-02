<template>
    <v-card
        class="mx-auto mt-5 pa-10"
        min-width="80%"
        max-width="90%"
    >
        <v-card-title v-model="name" >
            <h2>商品名稱</h2>
        </v-card-title>
        <v-row>
            <v-col
                cols=5
                class="pa-10"
            >
                <v-card
                >
                    
                    <v-img
                        src="https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png"
                        max-height="17em"
                    ></v-img>
                    
                </v-card>
                <v-row>
                    <v-col cols=3>
                        <v-img
                            src="https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png"
                        ></v-img>
                    </v-col>
                    <v-col cols=3>
                        <v-img
                            src="https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png"
                        ></v-img>
                    </v-col>
                    <v-col cols=3>
                        <v-img
                            src="https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png"
                        ></v-img>
                    </v-col>
                    <v-col cols=3>
                        <v-img
                            src="https://www.screenja.com/static/img/thumbs/nyan-cat-1-normal-636.png"
                        ></v-img>
                    </v-col>
                </v-row>
            </v-col>
            <v-col
                cols=7
                class="pa-10"
            >
                <v-card>
                    <v-card-title>
                        商品介紹
                    </v-card-title>
                    <v-card-text>
                        sdasdd
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
    export default{
        data:()=>({
        })
    }
</script>