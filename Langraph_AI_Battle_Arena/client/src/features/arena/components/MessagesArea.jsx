import React from 'react';
import UserMessage from './UserMessage';
import ResponseMessage from './ResponseMessage';

const MessagesArea = ({ messages = [] }) => {
    return (
        <div className="flex flex-col gap-12 px-4 md:px-8">
            {messages.map((msg, index) => (
                <div key={msg.id || index} className="flex flex-col gap-8">
                    {msg.problem && <UserMessage content={msg.problem} />}
                    {(msg.solution_1 || msg.solution_2) && <ResponseMessage data={msg} />}
                </div>
            ))}
        </div>
    );
};

export default MessagesArea;
