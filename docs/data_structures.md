## Data Structures to Consider

### Person

- id: Number
- firstName: String
- surname: String
- birthday: Date
- circleId: Number
- giftNotes: String
- photoUrl: String
- createdAt: Date

### Circle

- id: Number
- name: String
- colour: String
- createdAt: Date

### Reminder

- id: Number
- personId: Number
- type: ReminderType
- enabled: Boolean