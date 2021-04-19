import Telegraf from 'telegraf/telegram'

class Bot {
  constructor(token, chatId) {
    this.telegram = new Telegraf(token)
	this.chatId = chatId
  }

  async sendMessage(msg, quite){
    const extra = quite ? {disable_notification: 'true'} : {}
    await this.telegram.sendMessage(this.chatId, msg, extra)
  }
}

module.exports = {Bot: Bot}