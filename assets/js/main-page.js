var glide = new Glide('.glide', {
            type: "carousel",
            focusAt: "center",
            peek: {
                before: 100,
                after: 100
            },
            autoplay: 2000,
            perView: 3
        })

        const mediaQuery = window.matchMedia('(max-width: 992px)')

        glide.on(['mount.before', 'run'], function () {
            if (mediaQuery.matches)
                glide.update({ perView: 1, peek: { before: 50, after: 50 } })
        })

        glide.mount()