<template>
    <v-card
        class="mx-auto mt-5 pa-10"
        min-width="80%"
        max-width="90%"
    >
        <v-card-title v-model="name" >
            <h2>{{name}}</h2>
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
                        max-height="25em"
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
                <v-card>
                    <v-card-title :on="seller">
                        
                        {{seller}}
                        <v-rating
                            :value=star
                            color="amber"
                            readonly
                            size="25"
                        ></v-rating>
                    </v-card-title>
                </v-card>
            </v-col>
            <v-col
                cols=7
                class="pa-10"
            >
                <v-card>
                    <v-card-title>
                        商品介紹
                    </v-card-title>
                    <v-card-text :on="intro" style="font-size:15px;">
                        {{intro}}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
    export default{
        data:()=>({
            star:4.5,
            name:'商品名稱',
            intro:"    普希金曾經提過，人的影響短暫而微弱，書的影響則廣泛而深遠。這啟發了我。總結來說，巴爾扎克曾講過，他作為銀錢老虎，每天可以用投機這門大砲瞄準一筆財產，他作為男人，卻要聽從幸福的擺佈。這不禁令我重新仔細的思考。每個人的一生中，幾乎可說碰到商品介紹這件事，是必然會發生的。阿拉伯在過去曾經講過，斃虎者飽餐虎肉，畏虎者葬身虎口。這句話看似簡單，卻埋藏了深遠的意義。不要先入為主覺得商品介紹很複雜，實際上，商品介紹可能比你想的還要更複雜。孔子說過，君子之道四焉，強於行義，弱於受諫，怵於待祿，慎於治身。這段話看似複雜，其中的邏輯思路卻清晰可見。商品介紹對我來說有著舉足輕重的地位，必須要嚴肅認真的看待",
            seller:'Rabbit'
        })
    }
</script>