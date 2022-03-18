import Header from "./header"
import styled from 'styled-components'
import { defColor } from "../config"
import { CgMail } from 'react-icons/cg'
import { GrPhone } from 'react-icons/gr'
const AboutContainer = styled.div`
    text-align:center;
    background: white;
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    max-width: 1200px;
    margin: auto;
    padding: 10px;
    margin-top: 20px;
    &.first {
        margin-top: 100px;
    }
    &.last {
        margin-bottom: 20px;
    }
    h3 {
        color: ${defColor};
    }
    @media (max-width: 991px) {
        margin: 0 10px;
        margin-top: 20px;
    }
    a {
        display:flex;
        margin:0;
        justify-content: center;
        align-items: center;
        color: ${defColor};
    }
`
function About() {
    return <>
        <Header />
        <AboutContainer className="first">
            <h3>Jak działamy?</h3>
            Nasza usługa jest banalnie prosta.<br />
            Wybierając produkt na naszej stronie, tak naprawdę wybierają Państwo<br />
            rzecz, która znajduję się jeszcze w Supermarkecie.<br />
            Tworząc "koszyk" tworzą państwo listę zakupów dla naszych kurierów,<br />
            Którzy najzwyczajniej w świecie ją dla Państwa realizują 🙂<br />
            Świeże produkty trafiają bezpośrednio z półek ulubionych Supermarketów do Państwa domu.
        </AboutContainer>

        <AboutContainer>
            <h3>Konakt z kurierem</h3>
            Boją się państwo, że kurier zrobi złe zakupy ?<br />
            Nic podobnego!
            Od samego początku po złożeniu zamówienia, kurier kontaktuję się z Panstwem<br />
            w celu ustalenia szczegółów i ewentualnych zmian.<br />
            Sam proces realizacji "Listy zakupów" w sklepie przez kuriera<br />
            również jest w stałym kontakcie telefonicznym z Państwem.<br />
            Dzięki czemu jesteśmy w stanie zaoferować najwyższą jakość naszych usług i zapewnić zadowolenie<br />
            nawet najbardziej wymagającemu klientowi 🙂
        </AboutContainer>

        <AboutContainer>
            <h3>Brak produktu w sklepie?</h3>
            Co w przypadku braku wybranego produktu w sklepie?<br />
            W tym wypadku kurier skontaktuję się z Państwem w celu ustalenia dalszych czynności<br />
            (wybranie zamiennika, pominięcie produktu)
        </AboutContainer>
        <AboutContainer>
            <h3>Gdzie działamy?</h3>
            Działamy w mieście garwolin
            Dowozimy też do okolic +/-10km
            W razie pytań, zalecany kontakt.
        </AboutContainer>
        <AboutContainer className="last">
            <h3>Kontakt</h3>
            <a href="mailto:kupjedzenie.garwolin@gmail.com">
                <CgMail style={{ width: '25px', height: '25px' }} />&nbsp;kupjedzenie.garwolin@gamil.com
            </a>
            <a href="tel:517619032">
                <GrPhone style={{ width: '25px', height: '25px' }} />
                &nbsp; +48 517 619 032
            </a>
        </AboutContainer>


    </>
}

export default About