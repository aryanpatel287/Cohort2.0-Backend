import React from 'react';
import ReactMarkdown from 'react-markdown';
import JudgeResponse from './JudgeResponse';

const ResponseMessage = ({ data }) => {
    if (!data) return null;

    return (
        <div className="flex flex-col gap-8 w-full">
            {/* Dual AI Response Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                
                {/* Solution 1 */}
                <div className="flex flex-col rounded-2xl bg-zinc-900 border border-zinc-800 shadow-sm overflow-hidden">
                    <div className="bg-zinc-800/50 px-4 py-3 border-b border-zinc-700/50">
                        <h3 className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Solution 1
                        </h3>
                    </div>
                    <div className="p-5 overflow-x-auto text-sm md:text-base prose prose-invert max-w-none">
                        <ReactMarkdown>{data.solution_1 || ''}</ReactMarkdown>
                    </div>
                </div>

                {/* Solution 2 */}
                <div className="flex flex-col rounded-2xl bg-zinc-900 border border-zinc-800 shadow-sm overflow-hidden">
                    <div className="bg-zinc-800/50 px-4 py-3 border-b border-zinc-700/50">
                        <h3 className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                            Solution 2
                        </h3>
                    </div>
                    <div className="p-5 overflow-x-auto text-sm md:text-base prose prose-invert max-w-none">
                        <ReactMarkdown>{data.solution_2 || ''}</ReactMarkdown>
                    </div>
                </div>
            </div>

            {/* Judge Evaluation Section */}
            {data.judge && (
                <div className="mt-2">
                    <JudgeResponse judgeData={data.judge} />
                </div>
            )}
        </div>
    );
};

export default ResponseMessage;
