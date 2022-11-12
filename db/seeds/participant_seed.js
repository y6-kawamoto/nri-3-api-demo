/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('participant').del();
    await knex('participant').insert([
        {
            id: 1,
            first_name: 'Yoshiaki',
            last_name: 'Kawamoto',
            origin: '兵庫県尼崎市',
            interesting_1:
                '今もなお将来の夢を模索し続けています。変遷としては、ドッジボール選手(〜幼稚園)⇨漫画家(〜小1)⇨野球選手(〜小4)です。',
            interesting_2:
                '昔から胃腸が弱いです。テレワークでも会議中よく途中で抜けて:トイレ::目が回る:行ってます。辛いです。',
            warnings: '0',
        },
        {
            id: 2,
            first_name: 'Shutaro',
            last_name: 'Tsuchida',
            origin: '大阪府東大阪市',
            interesting_1:
                '豆から挽くことを覚えてからコーヒーにハマっています。出かける先で都度焙煎所を探すのが趣味になってきました。',
            interesting_2:
                '身長が185弱あります。顔からそんなに大きく見えないのかリモートワーク下では会って驚かれることが多いです。',
            warnings: 0,
        },
        {
            id: 3,
            first_name: 'Shuntaro',
            last_name: 'ide',
            origin: '長野県小諸市',
            interesting_1:
                '猫が大好きなので、早く飼えるところに引っ越したいです。',
            interesting_2:
                '生き物や自然が好きで、未だに地元の方に帰ると昆虫観察をしたり、川にザリガニ捕りに行ったりしています。',
            warnings: 0,
        },
        {
            id: 4,
            first_name: 'Kohei',
            last_name: 'Kawamura',
            origin: '京都府長岡京市',
            interesting_1:
                'なんか変わってる、と時々言われます。自分では普通過ぎる人と思っているので、自覚はないです。',
            interesting_2:
                '最近、納豆を1度に3パック食べると同期に話したら、普通に引かれました。1食1パックって少なくないですか。。。',
            warnings: 0,
        },
        {
            id: 999,
            first_name: 'Kakeru',
            last_name: 'Kawamura',
            origin: '山梨県甲斐市',
            interesting_1:
                '今は神奈川県の山間部（秦野市）に住んでいます。が！ナンバープレートの地名部分には“湘南“って記載されているので湘南在住です',
            interesting_2:
                '動画の倍速視聴が癖で、YouTubeやNetflixの動画を1.5 ~ 3倍速で観ることが多いです。Video Speed Controllerというchromeプラグインにいつもお世話になっています',
            warnings: 0,
        },
    ]);
};
