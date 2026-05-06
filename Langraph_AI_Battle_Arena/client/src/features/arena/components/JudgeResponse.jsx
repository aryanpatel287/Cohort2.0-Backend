import React from 'react';
import ReactMarkdown from 'react-markdown';

const JudgeResponse = ({ judgeData }) => {
    if (!judgeData) return null;

    const { solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning } = judgeData;

    return (
        <div className="bg-zinc-800/30 rounded-3xl border border-zinc-700/50 p-6 md:p-8">
            <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
                Judge Recommendation
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Score & Reasoning 1 */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-zinc-400">Solution 1 Score</span>
                        <div className="flex items-center justify-center h-10 px-4 rounded-full bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20">
                            {solution_1_score}/10
                        </div>
                    </div>
                    <div className="text-sm md:text-base text-zinc-300 prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown>{solution_1_reasoning || ''}</ReactMarkdown>
                    </div>
                </div>

                {/* Score & Reasoning 2 */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-zinc-400">Solution 2 Score</span>
                        <div className="flex items-center justify-center h-10 px-4 rounded-full bg-purple-500/10 text-purple-400 font-bold border border-purple-500/20">
                            {solution_2_score}/10
                        </div>
                    </div>
                    <div className="text-sm md:text-base text-zinc-300 prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown>{solution_2_reasoning || ''}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JudgeResponse;