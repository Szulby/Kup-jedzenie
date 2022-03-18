import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { defColor } from '../config'
import { useRef } from 'react'

const menuList = [
    {
        text: 'Popularne',
        icon: 'https://dodomku.pl/gfx/category_icons/min/00003868.png?v=1632463411',
        link: '/popular'
    },
    {
        text: 'Nabiał i mięso',
        icon: 'https://dodomku.pl/gfx/category_icons/min/00003868.png?v=1632463411',
        link: '/category/1',
        content: `
            1 % Mleko, śmietana
            2 % Jogurty, desery
            3 % Sery, twarogi
            4 % Napoje mleczne i roślinne
            5 % Tłuszcze, jaja, drożdże
            6 % Mięso, drób
            7 % Ryby
            8 % Wędliny
            9 % Garmażerka
        `
    },
    {
        text: 'Pieczywo, cukiernia',
        icon: 'https://dodomku.pl/gfx/category_icons/min/00003868.png?v=1632463411',
        link: '/category/2',
        content: `
            10 % Chleby
            11 % Bułki
            12 % Ciasta, przekąski
            13 % Tosty
            14 % Do odpieku
            15 % Pozostałe
        `
    },
    {
        text: 'Owoce i warzywa',
        icon: 'https://dodomku.pl/gfx/category_icons/min/00003868.png?v=1632463411',
        link: '/category/3',
        content: `
            16 % Owoce
            17 % Warzywa
            18 % Zioła
            19 % Gotowe do spożycia
            20 % Kiszonki
        `
    },
    {
        text: 'Mrożonki',
        icon: 'https://dodomku.pl/gfx/category_icons/min/00003868.png?v=1632463411',
        link: '/category/4',
        content: `
            21 % Warzywa i owoce
            22 % Ryby i owoce morza
            23 % Pizza
            24 % Frytki
            25 % Dania gotowe
            26 % Lody, desery
        `
    },
    {
        text: 'Artykuły spożywcze',
        icon: 'https://dodomku.pl/gfx/category_icons/min/00003868.png?v=1632463411',
        link: '/category/5',
        content: `
            27 % Sól, cukier
            28 % Mąka
            29 % Makaron, ryż, kasza
            30 % Olej, oliwa, ocet
            31 % Musztardy, ketchupy, sosy
            32 % Przyprawy
            33 % Do pieczenia, desery
            34 % Bakalie
            35 % Śniadanie
            36 % Przetwory owocowe
            37 % Miód
            38 % Konserwy
            39 % Przetwory warzywne
            40 % Kuchnie świata
            41 % Dania gotowe, buliony
        `
    },
    {
        text: 'Słodycze i przekąski',
        icon: 'https://dodomku.pl/gfx/category_icons/min/00003868.png?v=1632463411',
        link: '/category/6',
        content: `
            42 % Czekolady
            43 % Praliny, bombonierki
            44 % Batony, wafelki     
            45 % Cukierki, żelki     
            46 % Ciastka, wafle
            47 % Słone przekąski
        `
    },
    {
        text: 'Napoje',
        icon: 'https://dodomku.pl/gfx/category_icons/min/00003868.png?v=1632463411',
        link: '/category/7',
        content: `
            48 % Kawa, herbata, kakao
            49 % Soki, nektary, syropy
            50 % Wody
            51 % Napoje
            52 % Energetyki i izotoniki
        `
    },
    {
        text: 'Chemia i detergenty',
        icon: 'https://dodomku.pl/gfx/category_icons/min/00003868.png?v=1632463411',
        link: '/category/8',
        content: `
            54 % Pranie i płukanie
            55 % Zmywanie
            56 % Sprzątanie
            57 % Papier toaletowy, ręczniki
            58 % Worki na śmieci, folie
            59 % Pozostałe
        `
    },
    {
        text: 'Kosmetyki, higiena i zdrowie',
        icon: 'https://dodomku.pl/gfx/category_icons/min/00003868.png?v=1632463411',
        link: '/category/9',
        content: `
            60 % Higiena intymna
            61 % Do twarzy
            62 % Do włosów
            63 % Do ciała
            64 % Pielęgnacja jamy ustnej
            65 % Golenie
            66 % Do kąpieli
            67 % Chusteczki higieniczne, płatki
            68 % Dezodoranty
            69 % Wody toaletowe
            70 % Zdrowie
        `
    },
    {
        text: 'Dla dzieci',
        icon: 'https://dodomku.pl/gfx/category_icons/min/00003868.png?v=1632463411',
        link: '/category/10',
        content: `
            71 % Żywność
            72 % Pieluchy, chusteczki
            73 % Pielęgnacja
            74 % Akcesoria
        `
    },
    {
        text: 'Dla zwierząt',
        icon: 'https://dodomku.pl/gfx/category_icons/min/00003868.png?v=1632463411',
        link: '/category/11',
        content: `
            75 % Dla kota
            76 % Dla psa
            77 % Pozostałe produkty
        `
    },
    {
        text: 'Artykuły przemysłowe',
        icon: 'https://dodomku.pl/gfx/category_icons/min/00003868.png?v=1632463411',
        link: '/category/12',
        content: `
            78 % Art. Papiernicze, serwetki
            79 % Art. Sezonowe
            80 % Auto
            81 % Baterie, żarówki
            82 % Tekstylia
            83 % Torby zakupowe
            84 % Znicze, Świece
        `
    },
]

const MenuContainer = styled.div`
    position:fixed;
    top: 80px;
    left: 0;
    width: 350px;
    max-height: ${window.innerHeight - 80}px;
    border-radius: 4px;
    background: white;
    margin-left: 10px;
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    transform: 1s;
    .container {
        overflow:scroll;
        max-height: ${window.innerHeight - 120}px;
        overflow-x: auto;
    }
    @media (max-width: 991px) {
        overflow: scroll;
        &.desktop {
            display:none;
        }
    }
    @media (max-width: 767px) {
        top:50px;
        margin-left: 0;
        width: 100%;
        border-radius: 0;
        max-height: ${window.innerHeight - 50}px;
        .container {
            max-height: ${window.innerHeight - 85}px;
            
        }
    }
    .link {
        display:block;
        border-bottom: 3px solid #EFF0F1;
        line-height: 50px;
        color:black;
        text-decoration:none;
        position:relative;
        text-align:left;
        padding-left: 60px;
        font-weight: 600;
        text-decoration:none;
        cursor:pointer;
        &:hover {
            text-decoration:none;
        }
        img {
            position:absolute;
            left:10px;
            top:5px;
        }
        p {
            margin: 0;
        }
    }
    a:hover {
        text-decoration:underline;
    }
    a:last-child {
        border-bottom: 0;
    }
    .title {
        background:#006620;
        color:white;
        font-size: 22px;
        margin:0;
        border-radius: 4px 4px 0 0;
        font-weight: normal;
        padding: 2px 0;
        text-align:center;
        @media (max-width: 767px) {
            border-radius: 0;
            padding: 4px 0;
        }
    }
    .submenu {
        box-sizing:border-box;
        max-height:0;
        overflow:hidden;
        margin-left: -60px;
        padding-left: 10px;
        transition: .5s;
        .slink {
            display:block;
            box-sizing:border-box;
            border-bottom: 3px solid #EFF0F1;
            color: ${defColor};
            line-height: 40px;
            text-decoration :none;
            text-align:left;
            &:last-child {
                border-bottom: none;
            }
            &:first-child {
                border-top: 3px solid #EFF0F1;
            }
        }
    }
    .link.active .submenu {
        max-height: 700px;
    }
`

function Menu({ toggle, device }) {
    const containerRef = useRef(null)

    function menuToggle(e) {
        if (!e.target.classList.contains('slink')) {
            containerRef.current.querySelectorAll('.link').forEach(item => {
                if (item !== e.target) {
                    item.classList.remove('active')
                }
            })
            e.target.classList.toggle('active')
        }
    }
    return (
        <MenuContainer ref={containerRef} onClick={toggle && ((e) => toggle(e))} className={device ? "desktop" : ""}>
            <h2 className="title">
                Kategorie
            </h2>
            <div className="container custom-scroll">
                {menuList.map((menu, key) => {
                    if (key === 0) {
                        return (
                            <Link key={key} className="link" to={menu.link}>
                                <img src={menu.icon} alt="gif" />
                                {menu.text}
                            </Link>
                        )
                    } else {
                        return (
                            <div key={key} className="link" onClick={e => menuToggle(e)}>
                                <img src={menu.icon} alt="gif" />
                                {menu.text}
                                <div className="submenu">
                                    {menu.content && menu.content.split('\n').map((item, key) => {
                                        let arr = item.trim() && item.trim().split('%').map(item => item.trim())
                                        return arr && <Link className="slink" to={'/category/' + arr[0]} key={key}>{arr[1]}</Link>
                                    })}
                                </div>
                            </div>
                        )
                    }

                })}
            </div>

        </MenuContainer >
    )
}

export default Menu
