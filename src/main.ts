import * as calendar from "./calendar";
import * as sm from "./scheduled_message";
import * as reminder from "./reminder";
import config from "./config.json";

declare let global: any;

const getTomorrow = (now: Date): Date => {
  if (config.debug) {
    return now;
  }
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0,
    0
  );
};

/**
 * Entry point function
 */
global.main = (): void => {
  const now = new Date();
  const tomorrow = getTomorrow(now);
  if (calendar.isHoliday(tomorrow)) {
    console.log("tomorrow is a holiday.");
    return;
  }
  const scheduledMessages = sm.getScheduledMessages(tomorrow);
  for (const scheduledMessage of scheduledMessages) {
    const date = new Date(scheduledMessage.datetime);
    if (tomorrow.getFullYear() !== date.getFullYear()) {
      console.log(`${tomorrow.getFullYear()} !== ${date.getFullYear()}`);
      continue;
    }
    if (tomorrow.getMonth() !== date.getMonth()) {
      console.log(`${tomorrow.getMonth()} !== ${date.getMonth()}`);
      continue;
    }
    if (tomorrow.getDate() !== date.getDate()) {
      console.log(`${tomorrow.getDate()} !== ${date.getDate()}`);
      continue;
    }
    if (!scheduledMessage.disabled) {
      reminder.setReminder(scheduledMessage);
    }
  }
};
