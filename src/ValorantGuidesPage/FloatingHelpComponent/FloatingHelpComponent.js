import React, { useState, useEffect, useRef } from 'react';
import './FloatingHelpComponent.css'; // Assuming the CSS is in this file

const FAQItem = ({ question, answer, isAnswerVisible, toggleAnswer }) => (
    <div className="faq-item">
        <div className="faq-question" onClick={toggleAnswer}>
            {question}
            <span className={`arrow-icon ${isAnswerVisible ? 'arrow-up' : 'arrow-down'}`}></span>
        </div>
        {isAnswerVisible && <div className="faq-answer">{answer}</div>}
    </div>
);

const FloatingHelp = () => {
    const [isHelpVisible, setHelpVisible] = useState(false);
    const [visibleAnswers, setVisibleAnswers] = useState({}); // Track which FAQ answers are visible
    const helpRef = useRef(null); // For detecting outside clicks

    // Toggle visibility of help section
    const toggleHelpItems = () => {
        setHelpVisible(!isHelpVisible);
        if (isHelpVisible) {
            // Collapse all FAQ answers when the help section is closed
            setVisibleAnswers({});
        }
    };

    // Handle FAQ answer visibility toggle
    const toggleAnswer = (question) => {
        setVisibleAnswers((prevVisible) => ({
            ...prevVisible,
            [question]: !prevVisible[question],
        }));
    };

    // Close help when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (helpRef.current && !helpRef.current.contains(event.target)) {
                setHelpVisible(false);
                setVisibleAnswers({}); // Collapse all answers when closing help
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [helpRef]);

    return (
        <div ref={helpRef}>
            <div className={`help-items ${isHelpVisible ? 'active' : ''}`}>
                <FAQItem 
                    question="FAQ 1: How to use the guide?" 
                    answer="To use the guide, select a map and click on the desired lineup to view details." 
                    isAnswerVisible={visibleAnswers["FAQ 1: How to use the guide?"]}
                    toggleAnswer={() => toggleAnswer("FAQ 1: How to use the guide?")}
                />
                <FAQItem 
                    question="FAQ 2: What are lineups?" 
                    answer="Lineups refer to specific positions or strategies used for ability placements in Valorant." 
                    isAnswerVisible={visibleAnswers["FAQ 2: What are lineups?"]}
                    toggleAnswer={() => toggleAnswer("FAQ 2: What are lineups?")}
                />
                <FAQItem 
                    question="FAQ 3: How to improve aim?" 
                    answer="Have a warmup routine everyday. To get tips, join the discord server and contact @occissorr." 
                    isAnswerVisible={visibleAnswers["FAQ 3: How to improve aim?"]}
                    toggleAnswer={() => toggleAnswer("FAQ 3: How to improve aim?")}
                />
                {/* Add more FAQ items as needed */}
            </div>
            <div className="floating-help-icon" onClick={toggleHelpItems}>
                ?
                <span className="hover-text">Help & FAQs</span>
            </div>
        </div>
    );
};

export default FloatingHelp;
