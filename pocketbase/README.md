# PocketBase

RideTrack uses a PocketBase **auth collection** named `users`. PocketBase owns the SQLite database, password hashing, authentication tokens, and the admin dashboard. The generated `pb_data/` directory is intentionally not committed.

## Local setup

1. Download the PocketBase executable for your operating system from [pocketbase.io/docs](https://pocketbase.io/docs/).
2. Place the executable in this `pocketbase/` directory.
3. From this directory, run `./pocketbase serve` (Windows: `./pocketbase.exe serve`).
4. Open `http://127.0.0.1:8090/_/` and create the first superuser account.
5. Create an auth collection called `users` with email/password authentication and enable the `username` identity field. Add these fields:

| Field | Type | Required | Unique |
| --- | --- | --- | --- |
| `name` | Text | Yes | No |
| `mobile` | Text | Yes | Yes |
| `role` | Text | Yes | No |

Set API rules for the collection as follows during development:

- List/view: leave locked (the app does not query user records directly).
- Create: allow everyone.
- Update/delete: use `id = @request.auth.id`.

The app stores the mobile number as the PocketBase `username`, allowing sign-in with either email or mobile. Configure `EXPO_PUBLIC_POCKETBASE_URL` in a local `.env` file from `.env.example`; for a physical device use the machine's LAN address.
