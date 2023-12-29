import {
  RaccoonMeadowsVolunteers,
  RaccoonMeadowsActivity,
  raccoonMeadowsVolunteers,
} from './raccoon-meadows-log';

import {
  WolfPointVolunteers,
  WolfPointActivity,
  wolfPointVolunteers,
} from './wolf-point-log';

type CombinedActivity = RaccoonMeadowsActivity | WolfPointActivity;

type Volunteers = {
  id: number;
  name: string;
  activities: CombinedActivity[];
};

function combineVolunteers(
  volunteers: (RaccoonMeadowsVolunteers | WolfPointVolunteers)[]
): Volunteers[] {
  return  volunteers.map(volunteer => {
    const id: string | number = volunteer.id;
    return {
      id: (typeof id === 'string' ? parseInt(id, 10) : id),
      name: volunteer.name,
      activities: volunteer.activities
    };
  });
}

const isVerified = (verified: string | boolean) => {
  if (typeof verified === 'string') {
    return verified === 'Yes' ? true : false;
  }
  return verified;
}

function calculateHours(volunteers: Volunteers[]) {
  return volunteers.map((volunteer) => {
    let hours = 0;

    volunteer.activities.forEach((activity: CombinedActivity) => {
      if (isVerified(activity.verified)) {
        if ('time' in activity) {
          hours += activity.time;
        } else if ('hours' in activity) {
           hours += activity.hours; 
        }     
      }
    });

    return {
      id: volunteer.id,
      name: volunteer.name,
      hours: hours,
    };
  }).sort(byHours);
}

const byHours = (a: {hours: number}, b: {hours: number}) => {
  return b.hours - a.hours;
}

const combinedVolunteers: Volunteers[] = combineVolunteers(
  [].concat(wolfPointVolunteers, raccoonMeadowsVolunteers)
);

// Main
console.log(combinedVolunteers);
console.log(calculateHours(combinedVolunteers));
