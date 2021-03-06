import React, {useState} from "react";
import TaskList from "../../../TaskList";
import "./style.css";
import EdiText from "react-editext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalendarAlt,
    faCheck,
    faCheckCircle,
    faInfoCircle,
    faTimes,
    faTrash,
    faWrench
} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {
    cancelCardTermCompletion,
    completeCard,
    completeCardTerm,
    deleteCard,
    editCardDescription
} from "../../../../redux/cards/actions";
import moment from "moment";
import PickDateTimeModal from "./PickDateTimeModal";
import Alert from "react-bootstrap/Alert";
import {hideCompletionErrorAlert, showCompletionErrorAlert} from "../../../../redux/alert/actions";

const TaskCardContent = ({card}) => {
    const dispatch = useDispatch();
    const showSuccessAlert = useSelector(state => state.alert.showCompletionSuccessAlert);
    const showErrorAlert = useSelector(state => state.alert.showCompletionErrorAlert);
    const done = useSelector(state => state.cards.fetchedCards.find(c => c.cardId === card.cardId).done);
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [termCompleted, setTermCompleted] = useState(card.completedAtTerm)

    const handleDescriptionUpdate = description => dispatch(editCardDescription(card.cardId, description));
    const handleCardComplete = () => {
        const allTasksCompleted = card.tasks.length > 0 && card.tasks.every(task => task.completed);
        if (allTasksCompleted) {
            if (showErrorAlert) {
                dispatch(hideCompletionErrorAlert());
            }
            dispatch(completeCard(card.cardId));
        } else {
            dispatch(showCompletionErrorAlert());
            setTimeout(() => dispatch(hideCompletionErrorAlert()), 3000);
        }
    }

    const handleTermCompletionChange = () => {
        if (termCompleted) {
            setTermCompleted(false);
            dispatch(cancelCardTermCompletion(card.cardId));
        } else {
            setTermCompleted(true);
            dispatch(completeCardTerm(card.cardId));
        }
    }

    const getCardStatus = (term) => {
        if (card.completedAtTerm) {
            return "success";
        }
        const today = moment(Date.now()).format("YYYY-MM-DDTHH:mm");
        return today > term ? "expired" : "none";
    }

    return (
        <div>
            <div className={`${done && "disabled"}`}>
                <h3 className="card-title">{card.title}</h3>
                <div className="card-term">
                    <h6 className="text-muted font-weight-bold small text-uppercase">
                        <FontAwesomeIcon icon={faCalendarAlt}/>
                        <span className="text">Term</span>
                    </h6>
                    <div className="term-content">
                        <input id="c1" type="checkbox"
                               title="Mark as completed at term" checked={termCompleted}
                               className={`${!card.term && "d-none"}`}
                               onChange={handleTermCompletionChange}/>
                        <span>
                            <div className="term-box">
                            <span className="term-date" onClick={() => setShowDateTimePicker(true)}>
                                {card.term ? moment(card.term).format("MMMM D, HH:mm") : "No time limit"}
                            </span>
                                <span className={`term-status ${getCardStatus(card.term)}`}>
                                    {getCardStatus(card.term)}
                                </span>
                            </div>
                        </span>
                    </div>
                </div>
                <div className="card-description">
                    <h6 className="text-muted font-weight-bold small text-uppercase">
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        <span>Description</span>
                    </h6>
                    <EdiText className="text-muted"
                             mainContainerClassName="main-text-container"
                             editContainerClassName="edit-text-container"
                             editButtonClassName="edit-btn"
                             saveButtonClassName="save-btn"
                             cancelButtonClassName="cancel-btn"
                             cancelButtonContent={<FontAwesomeIcon icon={faTimes} title="Cancel"/>}
                             saveButtonContent={<FontAwesomeIcon icon={faCheck} title="Save changes"/>}
                             type="text"
                             value={card.description || "No description."}
                             onSave={handleDescriptionUpdate}
                             editOnViewClick/>
                </div>
                <div className="card-tasks-title">
                    <h6 className="text-muted font-weight-bold small text-uppercase">
                        <FontAwesomeIcon icon={faCheckCircle}/>
                        <span>Tasks</span>
                    </h6>
                </div>
                <TaskList card={card} done={done}/>
            </div>
            <div className="card-actions">
                <h6 className="text-muted font-weight-bold small text-uppercase">
                    <FontAwesomeIcon icon={faWrench}/>
                    <span>Actions</span>
                </h6>
                <div className="button-box">
                    {done ?
                        <button className="button-remove-done" onClick={() => dispatch(deleteCard(card.cardId))}>
                            <FontAwesomeIcon icon={faTrash}/>
                            <span>REMOVE</span>
                        </button>
                        :
                        <button className="button-remove-normal" onClick={() => dispatch(deleteCard(card.cardId))}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </button>
                    }

                    <button className={`button-mark-done ${done && "d-none"}`} onClick={handleCardComplete}>
                        <FontAwesomeIcon icon={faCheck}/>
                        <span>Mark as done</span>
                    </button>
                </div>
            </div>

            {showSuccessAlert &&
            <div className="card-completion-alert">
                <Alert variant="success">Congratulations! You have completed this card</Alert>
            </div>
            }

            {showErrorAlert &&
            <div className="card-completion-alert">
                <Alert variant="danger">To mark a card as completed, you need to complete all the tasks in it</Alert>
            </div>}

            <PickDateTimeModal show={showDateTimePicker} onClose={() => setShowDateTimePicker(false)} card={card}/>
        </div>
    );
}

export default TaskCardContent;