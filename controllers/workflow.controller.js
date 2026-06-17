import dayjs from "dayjs";
import { serve } from "@upstash/workflow/express";
import Subscription from "../models/subscription.model.js";

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  
  // Use lowercase 'subscription' to avoid clashing with the Model name
  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== 'active') return;

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(`Renewal date has passed for subscription ${subscription._id}. No reminder sent.`);
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, 'day');

    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
    }
    
    await triggerReminders(context, `Reminder ${daysBefore} days before`);
  } // <--- Added this to close the for loop
}); // <--- This closes the 'serve' function

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run('get subscription', async () => {
    return Subscription.findById(subscriptionId).populate('user', 'name email');
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminders = async (context, label) => {
  return await context.run(label, () => {
    console.log(`Triggering ${label} reminder`);
  });
};