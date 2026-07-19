Provide calendar-backend/service-account-key.json from google cloud

Run backend command
```
npx tsx server.ts
```



## Configuration

Create a `calendars.yaml` file in the root directory to define which Google Calendars to track and how they should be styled in the UI. 

You can mix public calendars (like national holidays) with your own personal or work calendars.

example:
```yaml
# Replace calendarIds with the IDs of the calendars you want to fetch from
calendars:
  - calendarId: "pl.polish#holiday@group.v.calendar.google.com"
    name: "Holiday"
    background_color: "text-blue-900"
    text_color: "text-blue-300"
    
  - calendarId: "7f26bb133bc8d3d6cf6cad000345c4969fada937c0519fcd159a253ad5795664@group.calendar.google.com"
    name: "Work"
    background_color: "text-blue-900"
    text_color: "text-blue-300"
    
  - calendarId: "18b00ea3bf26eb393182f5fb1febb22637c136860a46008120bc6613ef174f8c@group.calendar.google.com"
    name: "Other"
    background_color: "text-brown-900"
    text_color: "text-brown-300"
