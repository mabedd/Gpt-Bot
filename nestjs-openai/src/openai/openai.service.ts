import { ChatCompletionMessageDto } from './dto/create-chat-completion.request';
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';

@Injectable()
export class OpenaiService {
  constructor(private readonly openai: OpenAI) {}

  async createChatCompletion(message: ChatCompletionMessageDto[]) {
    return this.openai.chat.completions.create({
      messages: message as ChatCompletionMessageParam[],
      model: 'gpt-3.5-turbo',
    });
  }
}
