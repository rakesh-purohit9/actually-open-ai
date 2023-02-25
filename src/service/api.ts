import { apis } from "service";

import { AxiosPromise, AxiosRequestConfig } from "axios";

const COMMON_URL = `https://api.openai.com/v1/`;

const API_URLS = { POST_COMPLETIONS: `${COMMON_URL}completions` } as const;

export type PostCompletionsRequestType = Partial<{
  model: string;
  prompt: string;
  temperature: number;
  max_tokens: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
}>;

export type PostCompletionsResponseType = Partial<{
  id: string;
  object: string;
  created: number;
  model: string;
  choices: any[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}>;

export const postCompletions = (
  payload: AxiosRequestConfig<PostCompletionsRequestType>
): AxiosPromise<PostCompletionsResponseType> =>
  apis.post(API_URLS.POST_COMPLETIONS, payload);
