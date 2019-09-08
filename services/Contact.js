/**
  * Contact.js
  */
 import Hubspot from 'hubspot';
 import superagent from 'superagent';
 
 const CONFIG = '/@boilerplatejs/core/Config/service?bundle=@boilerplatejs/hubspot';
 const API_SUBSCRIPTIONS = 'https://api.hubapi.com/email/public/v1/subscriptions';
 
 const serialize = properties => Object.keys(properties).map((property) => ({ property, value: properties[property] }));
 
 /**
   * POST /service/@boilerplatejs/hubspot/Contact/update
   */
 export const update = async (req, params) => {
     const { apiKey, owner } = await req.service.get(CONFIG);
     const { contacts } = new Hubspot({ apiKey, checkLimit: false });
     const { lead, newsletter, properties } = req.body;
     const { email } = properties;
     let contact;

     try {
      contact = await contacts.getByEmail(email);
     } catch (e) {
       if (e.statusCode !== 404) {
        throw e;
       }
     }

     const subscribed = contact ? (await superagent.get(`${API_SUBSCRIPTIONS}/${email}?hapikey=${apiKey}`).set('Content-Type', 'application/json')).body.subscribed : true;
 
     if ((!lead && newsletter) && contact && (subscribed || subscribed === false)) {
       throw {
         ...new Error(),
         message: `The email address "${email}" has already subscribed, or has opted out of emails.`,
         status: 409
       };
     }

     if (contact) {
       await contacts.update(contact.vid, { properties: serialize(properties) });
       contact = await contacts.getByEmail(email);
     } else {
       contact = await contacts.create({
         email,
         properties: serialize({ ...properties, hubspot_owner_id: owner })
       });
     }
 
     if (subscribed && !newsletter) {
       await superagent
         .put(`${API_SUBSCRIPTIONS}/${email}?hapikey=${apiKey}`)
         .set('Content-Type', 'application/json')
         .send({ unsubscribeFromAll: true });
     }
 
     return contact.properties;
 };