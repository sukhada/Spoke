import { r } from "../../models";
import _ from "lodash";
import request from "superagent";

async function notifyOnTagConversation(campaignContactId, userId, webhookUrls) {
  const promises = {
    mostRecentlyReceivedMessage: (async () => {
      const message = await r
        .knex("message")
        .where({
          campaign_contact_id: parseInt(campaignContactId),
          is_from_contact: true
        })
        .orderBy("created_at", "desc")
        .first("*");

      return message;
    })(),
    taggingUser: (async () => {
      const user = await r
        .knex("user")
        .where({ id: parseInt(userId) })
        .first("*");

      return user;
    })(),
    taggedContact: (async () => {
      const contact = await r
        .knex("campaign_contact")
        .where({ id: parseInt(campaignContactId) })
        .first("*");

      return contact;
    })()
  };

  const [
    mostRecentlyReceivedMessage,
    taggingUser,
    taggedContact
  ] = await Promise.all([
    promises.mostRecentlyReceivedMessage,
    promises.taggingUser,
    promises.taggedContact
  ]);

  await Promise.all(
    webhookUrls.map(url =>
      request
        .post(url)
        .send({ mostRecentlyReceivedMessage, taggingUser, taggedContact })
    )
  );
}

export { notifyOnTagConversation };
