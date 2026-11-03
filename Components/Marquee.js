import styles from "../styles/Marquee.module.css"

const WORDS = ["Wood-fired pizza", "Towering burgers", "Ice-cold drinks", "Free delivery", "Made to order"]

const Row = ({ hidden }) => (
    <div className={styles.row} aria-hidden={hidden}>
        {WORDS.map((word) => (
            <span key={word}>{word}<i>✦</i></span>
        ))}
    </div>
)

const Marquee = () => (
    <div className={styles.marquee}>
        <div className={styles.track}>
            <Row />
            <Row hidden />
        </div>
    </div>
)

export default Marquee
