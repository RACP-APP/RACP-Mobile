const sample = [
    {
        Name: "General Advice",
        id: "1",
        subtitle: 'Here is something to try',
        icon: "https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        Pages: [
            {
                id: '1',
                number: '1',
                contentData: [
                    {
                        type: "Video",
                        id: '1',
                        subtitle: "Watch!",
                        content: "https://i.imgur.com/Sa8o2cx.mp4",
                        md5: '7543a4d3eafd92590af3812fe21e8a41'
                    },
                    {
                        type: "Text",
                        id: '2',
                        subtitle: "text here",
                        content: "hello there",
                    }

                ]

            },
            {
                id: '2',
                number: '2',
                contentData: [
                    {
                        type: "Image",
                        id: '3',
                        subtitle: "duck!",
                        content: 'https://vignette.wikia.nocookie.net/animalsimulator/images/2/2d/Duck.jpg/revision/latest?cb=20190807204556',
                    },
                    {
                        type: "Text",
                        id: '4',
                        subtitle: "text here image",
                        content: "hello there",
                    }

                ]

            }, {
                id: '3',
                number: '3',
                contentData: [
                    {
                        type: "TextNot",
                        id: '5',
                        subtitle: "Watch!",
                        content: "no",
                    },
                    {
                        type: "Text",
                        id: '6',
                        subtitle: "text here",
                        content: "hello there last",
                    }

                ]

            }

        ]
    }
]


export default sample;