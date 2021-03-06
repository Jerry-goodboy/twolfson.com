{
  "title": "Timezones for programmers",
  "author": "Todd Wolfson",
  "date": "2016-04-22T01:49:06-0500",
  "keywords": "timezones, programmers",
  "summary": "Explanation of how to handle timezones as a programmer."
}

Until recently I always thought I had a decent grasp of timezones. It turns out my previous assumptions were reasonable but not practical. I thought:

- Saving/using a numerical timezone offset (e.g. `-0600`) was "good enough"
- JavaScript wasn't great at dates but it was better than most since it had the `Date` primitive

As it turns out: nope and nope.

## Numerical offsets vs timezones
Timezones are typically based on geographical locations. For example, we have the [IANA timezone][] `America/Chicago` which can represent Central Time for the United States.

[IANA timezone]: https://www.iana.org/time-zones

Depending on the time of year, this will be a numerical offset of `-0500` or `-0600` from UTC. The change depends on the United States definition of [daylight saving time][]. For example:

```
2016-01-01T00:00:00Z + America/Chicago -> 2016-01-01T00:00:00-0600
2016-04-01T00:00:00Z + America/Chicago -> 2016-04-01T00:00:00-0500
```

[daylight saving time]: https://en.wikipedia.org/wiki/Daylight_saving_time

Unfortunately, regions can share the same offset (e.g. another country North/South) so if we save/restore the data, then we won't know what country the original datetime corresponded to.

```
2016-04-01T00:00:00Z + America/Chicago     -> 2016-04-01T00:00:00-0500
2016-04-01T00:00:00Z + America/Mexico_City -> 2016-04-01T00:00:00-0500
```

In most scenarios, this can be slipped under the rug but if you want to let users create/edit timezone-aware datetimes, then it won't work.

Additionally, in PostgreSQL [all datetime values are stored in UTC](postgresql-utc) with no preservation of IANA timezone. As a result, we must save both the UTC value and the IANA timezone in 2 separate columns.

[postgresql-utc]: http://www.postgresql.org/docs/9.3/static/datatype-datetime.html#AEN5869

## JavaScript frustrations
In JavaScript's `Date` implementation, there is support for numerical offsets but not for IANA timezones. As a result, we need to perform some guess work. Thankfully there are a few solutions:

- Guess based off of the user's IP address
- Guess based off of the browser's timezone offset
    - https://bitbucket.org/pellepim/jstimezonedetect
    - http://momentjs.com/timezone/docs/#/using-timezones/guessing-user-timezone/

Once we have the timezone, we recommend to stick to using [moment][] with [moment-timezone][] to prevent any loss of IANA timezone. This includes when saving/restoring from a database.

[moment]: http://momentjs.com/
[moment-timezone]: http://momentjs.com/timezone/

## Further reading
Here are some resources I found practical when reading up on timezones:

- [Computerphile - The Problem with Time & Timezones](https://www.youtube.com/watch?v=-5wpm-gesOY)
- [IANA timezone database](https://www.iana.org/time-zones)
- [PostgreSQL Date/Time Types](www.postgresql.org/docs/9.3/static/datatype-datetime.html)
