import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import Loading from "./Loading";

const FIVE_MINUTES = 300000;

const StartScreen = ({ goToNext }) => {
    const { t } = useTranslation();

    const [inputData, setInputData] = useState('');
    const [error, setError] = useState(false);  // State to handle input validation

    const handleDrawCards = (cardCount) => {
        if (!inputData.trim()) {  // Check if the inputData is empty or just whitespaces
            setError(true);
            return;
        }
        goToNext(inputData, cardCount);
    };

    return (
        <>
            <Row>
                <Col>
                    <p>{t("cartomancy.screen2.p0")}</p>
                    <p>{t("cartomancy.screen2.p1")}</p>
                    <p>{t("cartomancy.screen2.p2")}</p>
                    <ul>
                        <li>{t("cartomancy.screen2.example1")}</li>
                        <li>{t("cartomancy.screen2.example2")}</li>
                        <li>{t("cartomancy.screen2.example3")}</li>
                    </ul>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form>
                        <Form.Group controlId="textInput">
                            <Form.Control
                                type="text"
                                placeholder={t("cartomancy.screen2.questionPlaceholder")}
                                value={inputData}
                                onChange={(e) => {
                                    setInputData(e.target.value);
                                    setError(false);
                                }}
                            />
                            {error && <Alert variant="danger">{t("cartomancy.screen2.questionError")}</Alert>}
                        </Form.Group>

                        <a className="btn btn-outline-secondary" onClick={() => handleDrawCards('3')}>
                            {t("cartomancy.screen2.drawThree")}
                        </a>
                        <a className="btn btn-outline-secondary" onClick={() => handleDrawCards('5')}>
                            {t("cartomancy.screen2.drawFive")}
                        </a>
                    </Form>
                </Col>
            </Row>
        </>
    );
};



async function getReading(question, keywords, readingLanguageString) {
    let input = question.trim();

    const input_string =
        `Generate a cartomancy reading based on the practices of Jean-Baptiste Alliette from the 18th century.
         Pretend you are an online cartomancer, interpreting the mystical themes of Alliette's historic teachings.

         The user's query is: "${input}".

         Based on the cards that were drawn, the prediction should have the following themes:
             ${[...keywords].join(", ")}

         Note that these are themes indicated by the combination of cards we have generated, but not the names of the
         cards themselves. You should not write "the card of X" where X is a theme - cards do not indicate a specific theme,
         but rather the combination of cards produced these themes.

         Your response should span 3-5 sentences.
         Emphasize a narrative coherence in the prediction while maintaining a neutral yet mystic tone.
         For instance, if the themes are "journey, obstacles, prosperity" and the question is about career prospects,
         You might say, "A journey awaits you in your career, but obstacles will test your resolve.
         Overcome them, and prosperity is assured."

         ` + readingLanguageString;

    console.log(input_string);




    try {
        const response = await fetch("/generate-prediction/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: input_string,
                user_input: input,
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.log(error);
        return "Something went wrong. Please try again later.";
    }

}

const CardReadingScreen = ({ question, cards, keywords, timer, setTimer, goToNext }) => {
    const [loading, setLoading] = useState(false); // Start with loading as false
    const [reading, setReading] = useState('');
    const [showReading, setShowReading] = useState(false); // This state determines when to show the reading

    const { t } = useTranslation();

    async function fetchReading() {
        try {
            timer && clearTimeout(timer);
            setLoading(true); // Set loading to true when fetching starts
            const fetchedReading = await getReading(question, keywords, t("cartomancy.getReadingLanguage"));
            setReading(fetchedReading);
        } catch (error) {
            console.log("Error fetching reading:", error);
        } finally {
            setLoading(false);
            setTimer(setTimeout(() => goToNext(), FIVE_MINUTES));
        }
    }

    const generateReading = () => {
        setShowReading(true);
        fetchReading();
    };

    const nextPage = () => {
        timer && clearTimeout(timer);
        goToNext();
    };

    return (
        <div>
            <p>{t("cartomancy.screen3.p")}</p>

            <Row className="justify-content-center mb-2">
                <h2>{t("cartomancy.screen3.question")}</h2>
                <p className="lead">{question}</p>
            </Row>

            <Row className="justify-content-center mb-4">
                <h2 className="mb-4">{t("cartomancy.screen3.cards")}</h2>
                {cards.map((card, i) => (
                    <Col md={2} sm={4} key={i} className="mb-2">
                            <div className="card-name">{card.name}</div>
                        <img className="img-fluid" src={"/static/img/cartomancy/" + card.image} alt={`Card ${card.id}`} />
                        <div>
                        {keywords[i].map((keyword, i) => (
                            <div key={i} className="keyword-bubble mt-2">{keyword}</div>
                        ))}
                        </div>
                    </Col>
                ))}
            </Row>

            {!showReading && (
                <Row className="justify-content-center mb-4">
                    <button className="btn btn-outline-dark" onClick={generateReading}>{t("cartomancy.screen3.generateButton")}</button>
                </Row>
            )}

            {showReading && (
                <Row className="justify-content-center mb-2">
                    <h2>{t("cartomancy.screen3.reading")}</h2>
                    {loading
                        ? <><p>{t("cartomancy.screen3.loadingReading")}</p><Loading /> </>
                        : <p className="lead">{reading}</p>}
                </Row>
            )}

            {!loading && (
                <Row className="justify-content-end">
                    <Col xs="auto">
                        <a className="btn btn-outline-dark" onClick={nextPage}>{t("cartomancy.screen4.nextButton")}</a>
                    </Col>
                </Row>
            )}
        </div>
    );
};

function getKeywords(cards) {
    const keywords = [];

    for (let i = 0; i < cards.length; i++) {
        const thisCardKeywords = [];
        keywords.push(thisCardKeywords);

        const currentCard = cards[i];
        if (currentCard.rank === 'E') continue;
        thisCardKeywords.push(currentCard.value);

        // Check for multiples
        const matches = [currentCard.rank];
        for (let j = 0; j < cards.length; j++) {
            const otherCard = cards[j];
            if (i !== j &&
                currentCard.rank === otherCard.rank &&
                currentCard.orientation === otherCard.orientation
            ) {
                matches.push(otherCard.rank);
            }
        }
        let repeats = matches.length;
        if (repeats === 4) thisCardKeywords.push(currentCard.quad);
        if (repeats === 3) thisCardKeywords.push(currentCard.triple);
        if (repeats === 2) thisCardKeywords.push(currentCard.double);

        // Check for 31s
        for (let j = 0; j < cards.length; j++) {
            if (currentCard.number + cards[j].number === 31) {
                thisCardKeywords.push(currentCard.thirty_one);
                break;
            }
        }

        // Check for Etteilla on the left of the current card
        let etteillaIndex = i+1;
        if (etteillaIndex === cards.length) etteillaIndex = 0;
        if (cards[etteillaIndex].rank === 'E') {
            thisCardKeywords.push(currentCard.etteilla);
        }

    }

    return keywords;
}

async function getCards(num, language) {
    const response = await fetch(`/divination-card/?num=${num}&language=${language}`);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.cards;
};


const Cartomancy = () => {
    const [screen, setScreen] = useState(0);
    const [question, setQuestion] = useState(null);
    const [cards, setCards] = useState(null);
    const [keywords, setKeywords] = useState("");
    const [timer, setTimer] = useState(null);
    const { i18n } = useTranslation();

    React.useEffect(() => {
        document.title = "Cartomancy | French Playing Cards";
    }, []);

    const handleScreenSubmit = async (questionInput, numCardsInput) => {
        setQuestion(questionInput);
        const cards = await getCards(numCardsInput, i18n.language);
        const keywords = getKeywords(cards);
        setCards(cards);
        setKeywords(keywords);
        setScreen(1);
        setTimer(setTimeout(() => setScreen(0), FIVE_MINUTES));
    };

    return (
        <Container id="divination" className="mt-4">
            {screen === 0 && <StartScreen goToNext={handleScreenSubmit} />}
            {screen === 1 && <CardReadingScreen goToNext={() => setScreen(0)}
                                                question={question}
                                                cards={cards}
                                                keywords={keywords} 
                                                timer={timer} 
                                                setTimer={setTimer} />}
        </Container>
    );

};

export default Cartomancy;
