import { HumanMessage } from '@langchain/core/messages';
import {
    StateSchema,
    MessagesValue,
    ReducedValue,
    StateGraph,
    START,
    END,
} from '@langchain/langgraph';
import { z } from 'zod';

// type JUDGMENT = {
//     winner: 'solution_1' | 'solution_2';
//     solution_1_score: number;
//     solution_2_score: number;
// };

// type AIBATTLESTATE = {
//     messages: typeof MessagesValue;
//     solution_1: string;
//     solution_2: string;
//     judgment: JUDGMENT;
// };

// const state: AIBATTLESTATE = {
//     messages: MessagesValue,
//     solution_1: '',
//     solution_2: '',
//     judgment: {
//         winner: 'solution_1',
//         solution_1_score: 0,
//         solution_2_score: 0,
//     },
// };

import type { GraphNode } from '@langchain/langgraph';
import { cohereModel, geminiModel, mistralModel } from './model.service.js';
import { createAgent, providerStrategy } from 'langchain';

const State = new StateSchema({
    messages: MessagesValue,
    solution_1: new ReducedValue(z.string().default(''), {
        reducer: (current, next) => {
            return next;
        },
    }),
    solution_2: new ReducedValue(z.string().default(''), {
        reducer: (current, next) => {
            return next;
        },
    }),
    judgeRecommendation: new ReducedValue(
        z.object().default({
            solution_1_score: 0,
            solution_2_score: 0,
        }),
        {
            reducer: (current, next) => {
                return next;
            },
        },
    ),
});

const solutionNode: GraphNode<typeof State> = async (state: typeof State) => {
    const [mistral_solution, cohere_solution] = await Promise.all([
        mistralModel.invoke(state.messages[0].text),
        cohereModel.invoke(state.messages[0].text),
    ]);

    return {
        solution_1: mistral_solution.text,
        solution_2: cohere_solution.text,
    };
};

const judgeNode: GraphNode<typeof State> = async (state: typeof State) => {
    const { solution_1, solution_2 } = state;

    const judge = createAgent({
        model: geminiModel,
        tools: [],
        responseFormat: providerStrategy(
            z.object({
                solution_1_score: z.number().min(0).max(10),
                solution_2_score: z.number().min(0).max(10),
            }),
        ),
    });

    const judgeResponse = judge.invoke({
        messages: [
            new HumanMessage(
                `You are a judge tasked with evaluating two solution to the question: ${state.messages[0].text}. The first solution is: ${solution_1}. The second solution is: ${solution_2}. Please provide a score between 0 and 10 for each solution based on their quality, correctness, and completeness.`,
            ),
        ],
    });

    const judgeRecommendation = (await judgeResponse).structuredResponse;

    return {
        judgeRecommendation,
    };
};

/**
 * This is the sample of langgraph with two nodes and three edges to demonstrate how to use langgraph.
 * Flow is : --START--> solutionNode --> judgeNode --END--> End
 */

const graph = new StateGraph(State)
    .addNode('solution', solutionNode)
    .addNode('judge', judgeNode)
    .addEdge(START, 'solution')
    .addEdge('solution', 'judge')
    .addEdge('judge', END)
    .compile();

export default async function useGraph(userMessage: string) {
    const result = await graph.invoke({
        messages: [new HumanMessage(userMessage)],
    });

    console.log(result);

    return result;
}
