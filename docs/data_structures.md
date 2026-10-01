## Data Structures to Consider

### Person

- id: Number
- firstName: String
- surname: String
- birthDay: Number
- birthMonth: Number
- birthYear: Number | null
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